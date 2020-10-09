import { queryCache } from 'react-query';

function handleLogout() {
  // Remove cache from react query
  document.cookie = `token=; Max-Age=-99999999;`;
  queryCache.clear();

  localStorage.removeItem('@STMusic:token');
  window.location = '/';
}

export default handleLogout;
