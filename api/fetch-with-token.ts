import { baseUrl } from '@/constants/api-constants';
import { Token } from '@/types/token';
import { Session } from 'next-auth';

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        ...token,
        accessToken: data.accessToken,
      };
    } else {
      throw new Error(data.message || '리프레시 토큰 갱신 실패');
    }
  } catch (error) {
    console.error('리프레시 토큰 갱신 중 오류 발생: ', error);
    return {
      ...token,
      error: '리프레시 토큰 갱신 실패',
    };
  }
}

async function apiWithToken(url: string, options: RequestInit = {}, previousToken: Session) {
  const token: Token = {
    accessToken: previousToken?.accessToken || '',
    refreshToken: previousToken?.refreshToken || '',
    error: '',
  };

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (res.status === 401) {
    // accessToken 만료, refreshToken으로 새로운 토큰 요청
    const newToken = await refreshAccessToken(token);
    if (newToken?.accessToken) {
      // 새로운 토큰으로 다시 요청
      const retryRes = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken.accessToken}`,
        },
      });
      return retryRes;
    } else {
      // refreshToken도 만료되었을 경우
      throw new Error('로그인이 필요합니다.');
    }
  }

  return res;
}

/**
 * accessToken으로 API 호출할 때 사용하는 함수
 *
 * @param method - HTTP method (GET, POST, PATCH, DELETE)
 * @param url - API endpoint to request (ex. epidays)
 * @param token - User session containing access token
 * @param data - Optional data to send with POST, PATCH, DELETE requests
 *
 * @returns Response from the API
 */
export async function fetchWithToken(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  token: Session,
  data?: {},
) {
  const options = data && {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await apiWithToken(
    `${baseUrl}/${url}`,
    {
      method,
      ...options,
    },
    token,
  );
  return response;
}
