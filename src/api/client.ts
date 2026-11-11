import { API_BASE_URL } from "./config";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiClient<T>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body:
      options?.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
  });

if (!response.ok) {
      const errorData = await response.json();

      const detail = errorData.detail;

      if (typeof detail === "string") {
        throw new Error(detail);
      }

     if (Array.isArray(detail)) {
        throw new Error(
          detail
            .map((error) => error.msg.replace(/^Value error, /, ""))
            .join(", ")
        );
      }

      throw new Error(`API Error: ${response.status}`);
    }

  return response.json();
}