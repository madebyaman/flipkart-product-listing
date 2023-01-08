import { MouseEvent, ReactNode } from 'react';
import { Product as ProductType } from '../products';
import { capitalizedWord } from '../utils/capitalized';
import { FilterItem } from './FilterItem';
import { XMarkIcon, BackspaceIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { removedFilterLink } from '../utils/removedFilterLink';

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
  const navigate = useNavigate();
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
      <div className="flex items-center justify-between">
        <h2>Filters</h2>
        {(selectedBrands || selectedGenders || selectedSizes) && (
          <button
            className="flex uppercase items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700"
            onClick={() => navigate('/')}
          >
            Clear Filters
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {selectedBrands &&
          selectedBrands
            .split(':')
            .map((brand) => (
              <FilterRemoveButton key={`brand-${brand}`} filter={brand} />
            ))}
        {selectedSizes &&
          selectedSizes
            .split(':')
            .map((size) => (
              <FilterRemoveButton key={`size-${size}`} filter={size} />
            ))}
        {selectedGenders &&
          selectedGenders
            .split(':')
            .map((gender) => (
              <FilterRemoveButton key={`gender-${gender}`} filter={gender} />
            ))}
      </div>
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

function FilterRemoveButton({ filter }: { filter: string }) {
  const navigate = useNavigate();
  function removeFilter(e: MouseEvent) {
    e.preventDefault();
    const link = removedFilterLink(filter);
    if (link) navigate(link);
  }
  return (
    <button
      className="flex items-center bg-gray-100 text-gray-700 p-1 rounded text-xs gap-1 hover:line-through"
      onClick={removeFilter}
    >
      <span>
        <XMarkIcon className="h-3 w-3" />
      </span>
      {capitalizedWord(filter)}
    </button>
  );
}
