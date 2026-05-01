interface AnalysisResult {
  lufs: number | null;
  peakDb: number | null;
  bpm: number | null;
  key: string | null;
}

function detectBpm(mono: Float32Array, sampleRate: number): number | null {
  const maxSamples = Math.min(mono.length, sampleRate * 180);
  if (maxSamples < sampleRate * 6) {
    return null;
  }

  const targetSampleRate = 22050;
  const factor = Math.max(1, Math.floor(sampleRate / targetSampleRate));
  const actualSampleRate = sampleRate / factor;
  const dsLength = Math.floor(maxSamples / factor);
  if (dsLength < 4096) {
    return null;
  }

  const ds = new Float32Array(dsLength);
  for (let i = 0; i < dsLength; i += 1) {
    ds[i] = mono[i * factor] || 0;
  }

  for (let i = dsLength - 1; i >= 1; i -= 1) {
    ds[i] = ds[i] - 0.97 * ds[i - 1];
  }
  ds[0] = 0;

  const envelopeHop = Math.max(1, Math.round(actualSampleRate / 200));
  const envelopeFrames = Math.floor(dsLength / envelopeHop);
  if (envelopeFrames < 256) {
    return null;
  }

  const envelope = new Float32Array(envelopeFrames);
  for (let f = 0; f < envelopeFrames; f += 1) {
    const start = f * envelopeHop;
    let sum = 0;
    for (let i = 0; i < envelopeHop; i += 1) {
      sum += Math.abs(ds[start + i] || 0);
    }
    envelope[f] = sum / envelopeHop;
  }

  const smooth = new Float32Array(envelopeFrames);
  const smoothWindow = 7;
  let runningSum = 0;
  for (let i = 0; i < envelopeFrames; i += 1) {
    runningSum += envelope[i];
    if (i >= smoothWindow) {
      runningSum -= envelope[i - smoothWindow];
    }
    smooth[i] = runningSum / Math.min(smoothWindow, i + 1);
  }

  const onset = new Float32Array(envelopeFrames);
  let onsetMean = 0;
  for (let i = 1; i < envelopeFrames; i += 1) {
    const delta = smooth[i] - smooth[i - 1];
    const positive = delta > 0 ? delta : 0;
    onset[i] = positive;
    onsetMean += positive;
  }
  onsetMean /= Math.max(1, envelopeFrames - 1);

  const onsetThreshold = onsetMean * 1.55;
  const maxTempo = 220;
  const minPeakGap = Math.max(1, Math.round((60 / maxTempo) * (actualSampleRate / envelopeHop)));

  const peaks: number[] = [];
  let lastPeak = -minPeakGap;
  for (let i = 1; i < envelopeFrames - 1; i += 1) {
    const value = onset[i];
    if (value < onsetThreshold) {
      continue;
    }
    if (value >= onset[i - 1] && value >= onset[i + 1]) {
      if (i - lastPeak >= minPeakGap) {
        peaks.push(i);
        lastPeak = i;
      }
    }
  }

  if (peaks.length < 8) {
    return null;
  }

  const frameRate = actualSampleRate / envelopeHop;
  const tempoScore = new Map<number, number>();
  const lookahead = 12;

  for (let i = 0; i < peaks.length; i += 1) {
    const left = peaks[i];
    const maxJ = Math.min(peaks.length, i + lookahead);
    for (let j = i + 1; j < maxJ; j += 1) {
      const interval = peaks[j] - left;
      if (interval <= 0) {
        continue;
      }

      let bpm = (60 * frameRate) / interval;
      while (bpm < 70) bpm *= 2;
      while (bpm > 180) bpm /= 2;
      if (bpm < 70 || bpm > 180) {
        continue;
      }

      const roundedTempo = Math.round(bpm);
      const pairWeight = lookahead - (j - i) + 1;
      const closeness = Math.max(0, 1 - Math.abs(bpm - roundedTempo));
      const weight = pairWeight * (0.7 + 0.3 * closeness);

      tempoScore.set(roundedTempo, (tempoScore.get(roundedTempo) || 0) + weight);
    }
  }

  if (!tempoScore.size) {
    return null;
  }

  let bestTempo = 0;
  let bestClusterScore = -Infinity;
  for (const [tempo, score] of tempoScore.entries()) {
    const clusterScore = score + (tempoScore.get(tempo - 1) || 0) + (tempoScore.get(tempo + 1) || 0);
    if (clusterScore > bestClusterScore) {
      bestClusterScore = clusterScore;
      bestTempo = tempo;
    }
  }

  let weightedTempo = 0;
  let weightedTotal = 0;
  for (let offset = -1; offset <= 1; offset += 1) {
    const tempo = bestTempo + offset;
    const score = tempoScore.get(tempo) || 0;
    weightedTempo += tempo * score;
    weightedTotal += score;
  }

  return weightedTotal > 0 ? Math.round(weightedTempo / weightedTotal) : bestTempo;
}

function detectKey(mono: Float32Array, sampleRate: number): string | null {
  const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const chroma = new Float32Array(12);

  const maxSamples = Math.min(mono.length, sampleRate * 30);
  const blockSize = 8192;

  for (let pc = 0; pc < 12; pc += 1) {
    for (let octave = 2; octave <= 5; octave += 1) {
      const midiNote = 36 + pc + (octave - 2) * 12;
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      if (freq >= sampleRate / 2 || freq < 20) continue;

      const coeff = 2 * Math.cos((2 * Math.PI * freq) / sampleRate);
      let totalEnergy = 0;
      let blockCount = 0;

      for (let start = 0; start + blockSize <= maxSamples; start += blockSize) {
        let s1 = 0;
        let s2 = 0;
        for (let i = 0; i < blockSize; i += 1) {
          const s0 = mono[start + i] + coeff * s1 - s2;
          s2 = s1;
          s1 = s0;
        }
        totalEnergy += s1 * s1 + s2 * s2 - coeff * s1 * s2;
        blockCount += 1;
      }
      chroma[pc] += blockCount > 0 ? totalEnergy / blockCount : 0;
    }
  }

  const maxC = Math.max(...chroma);
  if (maxC > 0) {
    for (let i = 0; i < 12; i += 1) chroma[i] /= maxC;
  }

  const MAJ = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  const MIN = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  function pearson(profile: number[], shift: number): number {
    let ma = 0;
    let mb = 0;
    for (let i = 0; i < 12; i += 1) {
      ma += chroma[i];
      mb += profile[(i + shift) % 12];
    }
    ma /= 12;
    mb /= 12;
    let num = 0;
    let da = 0;
    let db = 0;
    for (let i = 0; i < 12; i += 1) {
      const ai = chroma[i] - ma;
      const bi = profile[(i + shift) % 12] - mb;
      num += ai * bi;
      da += ai * ai;
      db += bi * bi;
    }
    return da * db > 0 ? num / Math.sqrt(da * db) : 0;
  }

  let bestKey: string | null = null;
  let bestCorr = -Infinity;
  for (let root = 0; root < 12; root += 1) {
    const mj = pearson(MAJ, root);
    const mn = pearson(MIN, root);
    if (mj > bestCorr) {
      bestCorr = mj;
      bestKey = `${NOTE_NAMES[root]} Major`;
    }
    if (mn > bestCorr) {
      bestCorr = mn;
      bestKey = `${NOTE_NAMES[root]} Minor`;
    }
  }
  return bestKey;
}

export async function analyzeAudio(audioUrl: string): Promise<AnalysisResult> {
  const response = await fetch(audioUrl, { credentials: "include" });
  if (!response.ok) throw new Error("Could not fetch audio file for analysis");

  const arrayBuffer = await response.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  let audioBuffer: AudioBuffer;
  try {
    audioBuffer = await new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
    });
  } finally {
    void audioCtx.close();
  }

  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;

  const mono = new Float32Array(length);
  let sumMeanSquare = 0;
  let peak = 0;

  for (let c = 0; c < numChannels; c += 1) {
    const data = audioBuffer.getChannelData(c);
    let channelSumSq = 0;
    for (let i = 0; i < length; i += 1) {
      const sample = data[i];
      mono[i] += sample;
      const abs = sample < 0 ? -sample : sample;
      if (abs > peak) peak = abs;
      channelSumSq += sample * sample;
    }
    sumMeanSquare += channelSumSq / length;
  }
  for (let i = 0; i < length; i += 1) mono[i] /= numChannels;

  const lufs = sumMeanSquare > 0 ? Math.round((-0.691 + 10 * Math.log10(sumMeanSquare)) * 10) / 10 : null;
  const peakDb = peak > 0 ? Math.round(20 * Math.log10(peak) * 10) / 10 : null;
  const bpm = detectBpm(mono, audioBuffer.sampleRate);
  const key = detectKey(mono, audioBuffer.sampleRate);

  return { lufs, peakDb, bpm, key };
}
