import { NextRequest, NextResponse } from "next/server";

/**
 * Helper to create a mock Next.js request for testing API routes
 */
export function createMockRequest(
  method: string,
  body?: any,
  params?: Record<string, string>
) {
  const url = "http://localhost:3000/api/test";

  const request = new NextRequest(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return request;
}

/**
 * Helper to parse response from API route handlers
 */
export async function parseResponse(response: NextResponse) {
  const text = await response.text();

  try {
    return {
      status: response.status,
      data: text ? JSON.parse(text) : null,
    };
  } catch {
    return {
      status: response.status,
      data: text,
    };
  }
}

/**
 * Assert that an API response has an error
 */
export function expectApiError(
  response: { status: number; data: any },
  expectedStatus: number,
  expectedMessage?: string
) {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${
        response.status
      }. Response: ${JSON.stringify(response.data)}`
    );
  }

  if (expectedMessage && response.data.error !== expectedMessage) {
    throw new Error(
      `Expected error message "${expectedMessage}", got "${response.data.error}"`
    );
  }
}

/**
 * Assert that an API response is successful
 */
export function expectApiSuccess(response: { status: number; data: any }) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Expected successful response, got ${
        response.status
      }. Response: ${JSON.stringify(response.data)}`
    );
  }
}
