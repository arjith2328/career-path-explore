import { AnalyzeResumeResponse } from '../types';
import { getApiBaseUrl, requestWithTimeout, ApiError, ErrorClassification } from './api';

/**
 * Parses and maps server error responses into human-readable messages.
 */
async function parseErrorMessage(response: Response): Promise<{ message: string; code: ErrorClassification }> {
  let errorDetail = '';
  let errorCode = '';

  try {
    const errorJson = await response.json();
    if (typeof errorJson.detail === 'string') {
      errorDetail = errorJson.detail;
    } else if (errorJson.detail && typeof errorJson.detail === 'object') {
      errorDetail = errorJson.detail.message || errorJson.detail.error || JSON.stringify(errorJson.detail);
      errorCode = errorJson.detail.error || '';
    } else if (errorJson.message) {
      errorDetail = errorJson.message;
      errorCode = errorJson.error || '';
    }
  } catch {
    // Non-JSON response
  }

  // Handle specific known error scenarios
  if (response.status === 400) {
    if (errorCode === 'UNSUPPORTED_FILE_TYPE' || errorDetail.includes('PDF or DOCX')) {
      return { message: 'Please upload a valid PDF or DOCX resume document.', code: 'HTTP_400' };
    }
    if (errorCode === 'EMPTY_FILE' || errorDetail.includes('empty')) {
      return { message: 'The uploaded resume file is empty. Please select a document containing your resume text.', code: 'HTTP_400' };
    }
    return { message: errorDetail || 'The uploaded file could not be processed.', code: 'HTTP_400' };
  }

  if (response.status === 404) {
    return { message: errorDetail || 'Resume analysis endpoint was not found.', code: 'HTTP_404' };
  }

  if (response.status === 413 || errorCode === 'FILE_TOO_LARGE') {
    return { message: 'The resume file exceeds the 25MB maximum upload limit.', code: 'HTTP_413' };
  }

  if (response.status === 422) {
    if (errorCode === 'NO_TEXT_EXTRACTED' || errorDetail.includes('NO_TEXT_EXTRACTED') || errorDetail.includes('readable text')) {
      return { message: 'No readable text was found in this resume. The PDF may be scanned, image-based, or password-protected.', code: 'HTTP_422' };
    }
    if (errorCode === 'PARSER_FAILURE') {
      return { message: 'Could not parse document. Please ensure the file is not corrupted.', code: 'HTTP_422' };
    }
    return { message: errorDetail || 'The uploaded resume could not be processed because the request format is invalid.', code: 'HTTP_422' };
  }

  if (response.status === 500) {
    return { message: errorDetail || 'Resume analysis failed on the intelligence server.', code: 'HTTP_500' };
  }

  return { message: errorDetail || `Request failed with status ${response.status}`, code: `HTTP_${response.status}` as ErrorClassification };
}

/**
 * Upload and analyze a real resume file (PDF or DOCX).
 */
export async function analyzeResume(file: File): Promise<AnalyzeResumeResponse> {
  const primaryBaseUrl = getApiBaseUrl();
  const endpoint = `${primaryBaseUrl}/api/resume/analyze`;

  // Section 7: Debug logging
  console.log('[Resume Upload] Starting analysis');
  console.log('[Resume Upload] File:', file.name);
  console.log('[Resume Upload] Type:', file.type || 'unknown');
  console.log('[Resume Upload] Size:', file.size);
  console.log('[Resume Upload] API:', primaryBaseUrl);
  console.log('[Resume Upload] Endpoint:', endpoint);

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await requestWithTimeout(
      endpoint,
      {
        method: 'POST',
        body: formData,
        // Important: DO NOT manually set Content-Type header so browser sets multipart boundary
      },
      60000
    );

    console.log('[Resume Response] Status:', response.status);
    console.log('[Resume Response] OK:', response.ok);

    if (!response.ok) {
      const { message, code } = await parseErrorMessage(response);
      console.error('[Resume Analysis Error]', { status: response.status, code, message });
      throw new ApiError(message, response.status, code);
    }

    const data: AnalyzeResumeResponse = await response.json();
    return data;
  } catch (err: any) {
    console.error('[Resume Analysis Error]', err);

    // Fallback between 127.0.0.1 and localhost if needed
    if (err.isBackendDown && primaryBaseUrl.includes('127.0.0.1')) {
      try {
        const fallbackUrl = primaryBaseUrl.replace('127.0.0.1', 'localhost');
        const fallbackEndpoint = `${fallbackUrl}/api/resume/analyze`;
        console.log('[Resume Upload] Retrying with localhost fallback:', fallbackEndpoint);
        
        const fallbackResponse = await requestWithTimeout(
          fallbackEndpoint,
          {
            method: 'POST',
            body: formData,
          },
          60000
        );

        console.log('[Resume Response] Status:', fallbackResponse.status);
        console.log('[Resume Response] OK:', fallbackResponse.ok);

        if (!fallbackResponse.ok) {
          const { message, code } = await parseErrorMessage(fallbackResponse);
          throw new ApiError(message, fallbackResponse.status, code);
        }

        const data: AnalyzeResumeResponse = await fallbackResponse.json();
        return data;
      } catch (fallbackErr) {
        if (fallbackErr instanceof ApiError) throw fallbackErr;
      }
    }

    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError(
      'Resume intelligence service is unavailable.',
      500,
      'NETWORK_ERROR',
      true,
      err
    );
  }
}

/**
 * Run intelligence analysis on a built-in sample candidate.
 */
export async function analyzeSample(sampleKey: 'ai' | 'embedded' | 'data'): Promise<AnalyzeResumeResponse> {
  const primaryBaseUrl = getApiBaseUrl();
  const endpoint = `${primaryBaseUrl}/api/resume/sample/${sampleKey}`;

  console.log('[Resume Sample Request]', {
    method: 'POST',
    sampleKey,
    fullUrl: endpoint
  });

  try {
    const response = await requestWithTimeout(
      endpoint,
      {
        method: 'POST',
      },
      30000
    );

    console.log('[Resume Sample Response]', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const { message, code } = await parseErrorMessage(response);
      throw new ApiError(message, response.status, code);
    }

    const data: AnalyzeResumeResponse = await response.json();
    return data;
  } catch (err: any) {
    console.error('[Resume Sample Error]', { actualError: err });

    // Fallback between 127.0.0.1 and localhost
    if (err.isBackendDown && primaryBaseUrl.includes('127.0.0.1')) {
      try {
        const fallbackUrl = primaryBaseUrl.replace('127.0.0.1', 'localhost');
        const fallbackEndpoint = `${fallbackUrl}/api/resume/sample/${sampleKey}`;
        const fallbackResponse = await requestWithTimeout(
          fallbackEndpoint,
          {
            method: 'POST',
          },
          30000
        );

        if (fallbackResponse.ok) {
          return await fallbackResponse.json();
        }
      } catch {
        // continue
      }
    }

    if (err instanceof ApiError) throw err;
    throw new ApiError(err.message || 'Failed to analyze sample resume.', 500, 'UNKNOWN_ERROR', false, err);
  }
}
