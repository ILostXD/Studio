export class ApiError extends Error {
  code: "AUTH_REQUIRED" | "REQUEST_FAILED";

  constructor(message: string, code: "AUTH_REQUIRED" | "REQUEST_FAILED") {
    super(message);
    this.code = code;
  }
}

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: FormData | unknown;
  allowUnauthorized?: boolean;
}

export async function apiRequest<T>(
  url: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { method = "GET", body, allowUnauthorized = false } = options;
  const requestOptions: RequestInit = {
    method,
    credentials: "include",
    headers: {},
  };

  if (body instanceof FormData) {
    requestOptions.body = body;
  } else if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
    (requestOptions.headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const response = await fetch(url, requestOptions);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? ((await response.json().catch(() => ({}))) as Record<string, unknown>)
    : await response.text();

  if (!response.ok) {
    if (response.status === 401 && !allowUnauthorized) {
      throw new ApiError("Authentication required", "AUTH_REQUIRED");
    }

    const message =
      typeof payload === "object" && payload && "error" in payload
        ? String(payload.error)
        : `Request failed (${response.status})`;
    throw new ApiError(
      message,
      response.status === 401 ? "AUTH_REQUIRED" : "REQUEST_FAILED",
    );
  }

  return payload as T;
}
