import { Product } from '../products';

export function getBrands(products: Product[]): string[] {
  function reduceProductsToBrands(cur: string[], next: Product) {
    if (cur.length === 0) return [next.brand];
    if (cur.includes(next.brand)) return cur;
    else return [...cur, next.brand];
  }
  return products.reduce(reduceProductsToBrands, []);
}
