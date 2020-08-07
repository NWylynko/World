import { useState, useEffect } from 'react';

interface Fetch {
  loading: boolean;
  error: string | null;
  data: any;
  extraData: any;
}

export default function useFetch(url: RequestInfo): Fetch {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [extraData, setExtraData] = useState<any>(null)

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
        setExtraData({sql: json.sql})
        return json.data
      })
      .then(data => setData(data))
      .catch(err => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { loading, error, data, extraData };
}
