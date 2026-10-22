/**
 * Centralized API Client for Career Path Explorer
 * Handles base URL configuration, timeouts, network error classification, and response parsing.
 */

// Determine API Base URL from environment or standard fallback
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  
  // Default to 127.0.0.1:8000 for standard local development (prevents Windows IPv6 localhost resolution mismatch)
  return 'http://127.0.0.1:8000';
};

export type ErrorClassification = 
  | 'NETWORK_ERROR'
  | 'CORS_ERROR'
  | 'BACKEND_UNAVAILABLE'
  | 'HTTP_400'
  | 'HTTP_404'
  | 'HTTP_413'
  | 'HTTP_422'
  | 'HTTP_500'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

export class ApiError extends Error {
  statusCode: number;
  errorCode: ErrorClassification;
  isBackendDown: boolean;
  originalError?: any;

  constructor(
    message: string, 
    statusCode = 500, 
    errorCode: ErrorClassification = 'UNKNOWN_ERROR', 
    isBackendDown = false,
    originalError?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isBackendDown = isBackendDown;
    this.originalError = originalError;
  }
}

/**
 * Fetch wrapper with configurable timeout, detailed error diagnostics, and logging.
 */
export async function requestWithTimeout(
  input: string,
  init?: RequestInit,
  timeoutMs = 60000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      console.error('[Resume Request Error]', { type: 'TIMEOUT', url: input, err });
      throw new ApiError(
        'Resume analysis timed out. The server took too long to process the document.',
        408,
        'TIMEOUT',
        false,
        err
      );
    }

    // Classify Network / CORS / Backend unavailable errors
    const isNetworkOrCors =
      err instanceof TypeError ||
      err.message?.includes('Failed to fetch') ||
      err.message?.includes('NetworkError') ||
      err.message?.includes('Network request failed') ||
      err.message?.includes('Load failed');

    if (isNetworkOrCors) {
      console.error('[Resume Request Error]', {
        type: 'BACKEND_UNAVAILABLE / NETWORK_ERROR',
        url: input,
        message: err.message,
        hint: 'Please ensure FastAPI is running on http://127.0.0.1:8000',
        error: err
      });

      throw new ApiError(
        'Resume intelligence service is unavailable. Please make sure the analysis backend is running on port 8000.',
        503,
        'BACKEND_UNAVAILABLE',
        true,
        err
      );
    }

    console.error('[Resume Request Error]', { type: 'NETWORK_ERROR', url: input, err });
    throw new ApiError(
      err.message || 'An unexpected network error occurred while contacting the resume intelligence backend.',
      500,
      'NETWORK_ERROR',
      false,
      err
    );
  }
}

/**
 * Health check to verify backend connectivity.
 */
export async function checkBackendHealth(): Promise<{ status: string; service: string }> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await requestWithTimeout(`${baseUrl}/api/health`, { method: 'GET' }, 4000);
    if (!res.ok) {
      throw new Error(`Health check returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // If 127.0.0.1 fails, try localhost fallback
    if (baseUrl.includes('127.0.0.1')) {
      try {
        const fallbackUrl = baseUrl.replace('127.0.0.1', 'localhost');
        const fallbackRes = await requestWithTimeout(`${fallbackUrl}/api/health`, { method: 'GET' }, 4000);
        if (fallbackRes.ok) {
          return await fallbackRes.json();
        }
      } catch {
        // continue
      }
    }
    throw err;
  }
}
