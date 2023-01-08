import { createLink } from './createLink';

/**
 * Removes a given filter and returns new link
 * @param filter Filter name
 */
export function removedFilterLink(filter: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const brands = urlParams.get('brand')?.split(':');
  const genders = urlParams.get('gender')?.split(':');
  const sizes = urlParams.get('size')?.split(':');
  let link;
  if (brands && brands.includes(filter.toLowerCase())) {
    const newBrands = brands.filter(
      (brand) => brand.toLowerCase() !== filter.toLowerCase()
    );
    link = createLink({ type: 'BRAND', param: newBrands.join(':') });
  } else if (genders && genders.includes(filter.toLowerCase())) {
    const newGenders = genders.filter(
      (gender) => gender.toLowerCase() !== filter.toLowerCase()
    );
    link = createLink({ type: 'GENDER', param: newGenders.join(':') });
  } else if (sizes && sizes.includes(filter.toLowerCase())) {
    const newSizes = sizes.filter(
      (size) => size.toLowerCase() !== filter.toLowerCase()
    );
    link = createLink({ type: 'SIZE', param: newSizes.join(':') });
  }
  return link;
}
