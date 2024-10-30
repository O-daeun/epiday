import { baseUrl } from '@/constants/api-constants';

/**
 * token 없이 API 호출할 때 사용하는 함수
 *
 * @param method - HTTP method (GET, POST, PATCH, DELETE)
 * @param url - API endpoint to request (ex. epidays)
 * @param data - Optional data to send with POST, PATCH, DELETE requests
 *
 * @returns Response from the API
 */
export async function fetchWithoutToken(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  data?: {},
) {
  const options = data && {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    ...options,
  });

  if (!response.ok) {
    throw new Error('API 호출 중 오류 발생');
  }

  return response;
}
