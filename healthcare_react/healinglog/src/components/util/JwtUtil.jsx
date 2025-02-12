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

export { getPayload };
