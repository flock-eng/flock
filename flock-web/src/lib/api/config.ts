import { createApiClient } from './client';
import { createMockApiClient } from './mock-client';
import type { ApiClient } from './client';

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (!url) throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  return url;
}

let client: ApiClient;

if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
  console.log('Using mock ConnectRPC client');
  client = createMockApiClient();
} else {
  console.log('Using real ConnectRPC client');
  client = createApiClient(getApiBaseUrl());
}

export const api = client; 