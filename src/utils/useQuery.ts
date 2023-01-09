import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Gives back the search params
 * @returns Memoized search params
 */
export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
