import { createApiClient } from './client';
import { createMockApiClient } from './mock-client';
import type { ApiClient } from './client';

// Get the API base URL from environment variables
const getApiBaseUrl = (): string => {
	const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL;
	if (!baseUrl) {
		throw new Error('VITE_PUBLIC_API_BASE_URL environment variable is not set');
	}
	return baseUrl;
};

// Create the appropriate client based on environment
export const createClient = (): ApiClient => {
	// Use mock client if in development mode and mock flag is set
	if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
		return createMockApiClient();
	}

	// Otherwise, use the real client
	return createApiClient(getApiBaseUrl());
};

// Export a singleton instance of the client
export const api = createClient();
