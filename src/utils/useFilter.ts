import { useQuery } from './useQuery';

/**
 * Gives back the filters
 */
export function useFilter() {
  const query = useQuery();
  const sortOrder = query.get('sort') || 'asc';
  const selectedBrands = query.get('brand');
  const brands = selectedBrands?.split(':');
  const selectedSize = query.get('size');
  const sizes = selectedSize?.split(':');
  const selectedGenders = query.get('gender');
  const genders = selectedGenders?.split(':');
  return { sortOrder, brands, sizes, genders };
}
