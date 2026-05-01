export function useRuntimeUtils() {
  const getOrigin = () => window.location.origin;

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return {
    getOrigin,
    copyToClipboard,
  };
}
