import { useState, useEffect } from 'react';

interface Fetch {
  loading: boolean;
  error: string | null;
  data: any;
}

export default function useFetch(url: RequestInfo): Fetch {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          return {error: response.status.toString()}
        }
        return response.json()
      })
      .then(json => {
        if (json.error) { 
          setError(json.error)
          return []
        }
        return json.data
      })
      .then(data => setData(data))
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { loading, error, data };
}
