import jwtDecode from 'jwt-decode';
import { queryCache } from 'react-query';

export function isLoggedIn() {
  const token = localStorage.getItem('@STMusic:token');
  if (!token) {
    return false;
  }

  return true;
}

export function getSessionData() {
  try {
    const token = localStorage.getItem('@STMusic:token');
    if (!token) {
      return false;
    }

    return { user: jwtDecode(token), jwt: token };
  } catch (err) {
    if (err.message) {
      return false;
    }
  }

  return false;
}

export function logout() {
  // Remove cache from react query
  document.cookie = `token=; Max-Age=-99999999;`;
  queryCache.clear();

  localStorage.removeItem('@STMusic:token');
  window.location = '/';
}
