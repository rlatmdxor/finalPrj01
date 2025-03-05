import { jwtDecode } from 'jwt-decode';

const getPayload = (token, key) => {
  if (!token) {
    return null;
  }
  const payload = jwtDecode(token);
  if (key) {
    return payload[key];
  }
  return payload;
};

function isTokenExpired(token) {
  try {
    // JWT 디코딩
    const decodedToken = jwt_decode(token);

    // 현재 시간(초 단위)
    const currentTime = Date.now() / 1000;

    // 토큰의 만료 시간 확인 (exp는 JWT에서 초 단위로 제공)
    if (decodedToken.exp < currentTime) {
      return true; // 토큰이 만료됨
    } else {
      return false; // 토큰이 유효함
    }
  } catch (error) {
    console.error('JWT decoding failed:', error);
    return true; // 디코딩이 실패하면 만료된 것으로 처리
  }
}

export { getPayload, isTokenExpired };
