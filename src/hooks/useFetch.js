import { useQuery } from 'react-query';

import api from '../services/api';

export function useFetch(key, url, options) {
  const query = useQuery(
    key,
    async () => {
      const response = await api.get(url);

      return response.data;
    },
    options
  );

  return query;
}

export default useFetch;
