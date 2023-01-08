import { Product as ProductType } from '../products';
import { FilterItem } from './FilterItem';

export function FilterSidebar({
  selectedBrands,
  selectedSizes,
  selectedGenders,
  products,
}: {
  selectedBrands: string | null;
  selectedSizes: string | null;
  selectedGenders: string | null;
  products: ProductType[];
}) {
  function reduceProductsToGenders(cur: string[], next: ProductType) {
    if (cur.length === 0) return [next.gender];
    if (cur.includes(next.gender)) return cur;
    else return [...cur, next.gender];
  }
  const genderOptions = products.reduce(reduceProductsToGenders, []);
  function reduceProductsToBrands(cur: string[], next: ProductType) {
    if (cur.length === 0) return [next.brand];
    if (cur.includes(next.brand)) return cur;
    else return [...cur, next.brand];
  }
  const brandOptions = products.reduce(reduceProductsToBrands, []);
  function reduceProductsToSizes(cur: string[], next: ProductType): string[] {
    if (cur.length === 0) return [...next.sizes.map((size) => size)];
    let newCurrent = cur;
    next.sizes.forEach((size) => {
      if (cur.includes(size)) {
        return;
      } else newCurrent = [...cur, size];
    });
    return newCurrent;
  }
  const sizeOptions = products.reduce(reduceProductsToSizes, []);
  return (
    <div>
      <FilterItem
        name="Gender"
        options={genderOptions}
        selected={selectedGenders}
      />
      <FilterItem name="Size" options={sizeOptions} selected={selectedSizes} />
      <FilterItem
        name="Brand"
        options={brandOptions}
        selected={selectedBrands}
      />
    </div>
  );
}
