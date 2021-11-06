import categorytApi from 'api/category';
import { useEffect, useState } from 'react';

export default function useCategory() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await categorytApi.getAll();
        setCategory(result);
      } catch (error) {
        console.log('Failed to fetch category', error);
      }

      setLoading(false);
    })();
  }, []);

  return { category, loading };
}
