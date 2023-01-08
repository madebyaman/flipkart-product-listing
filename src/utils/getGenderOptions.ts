import { Product } from '../products';

export function getGenderOptions(products: Product[]): string[] {
  function reduceProductsToGenders(cur: string[], next: Product) {
    if (cur.length === 0) return [next.gender];
    if (cur.includes(next.gender)) return cur;
    else return [...cur, next.gender];
  }
  return products.reduce(reduceProductsToGenders, []);
}
