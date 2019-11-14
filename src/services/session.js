import jwtDecode from 'jwt-decode';

export default function() {
  const token = localStorage.getItem('@STMusic:token');
  if (!token) {
    return false;
  }

  try {
    return { user: jwtDecode(token), jwt: token };
  } catch (err) {
    if (err.message) {
      return false;
    }
  }

  return false;
}
