import { Product } from '../products';

export function getSizes(products: Product[]): string[] {
  function reduceProductsToSizes(cur: string[], next: Product): string[] {
    if (cur.length === 0) return [...next.sizes.map((size) => size)];
    let newCurrent = cur;
    next.sizes.forEach((size) => {
      if (cur.includes(size)) {
        return;
      } else newCurrent = [...cur, size];
    });
    return newCurrent;
  }
  return products.reduce(reduceProductsToSizes, []);
}
