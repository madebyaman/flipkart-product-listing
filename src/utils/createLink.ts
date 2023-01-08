export function createLink({
  type,
  param,
}: {
  type: 'SORT' | 'BRAND' | 'SIZE' | 'GENDER';
  param: string;
}) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (type === 'SORT') {
    param ? urlParams.set('sort', param) : urlParams.delete('sort');
  }
  if (type === 'BRAND') {
    param ? urlParams.set('brand', param) : urlParams.delete('brand');
  }
  if (type === 'SIZE') {
    param ? urlParams.set('size', param) : urlParams.delete('size');
  }
  if (type === 'GENDER') {
    param ? urlParams.set('gender', param) : urlParams.delete('gender');
  }
  const newUrl = '?' + urlParams.toString();
  return newUrl;
}
