import { XMarkIcon } from '@heroicons/react/20/solid';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product as ProductType } from '../products';
import { capitalizedWord } from '../utils/capitalized';
import { getBrands } from '../utils/getBrands';
import { getGenderOptions } from '../utils/getGenderOptions';
import { getSizes } from '../utils/getSizes';
import { removedFilterLink } from '../utils/removedFilterLink';
import { useFilter } from '../utils/useFilter';
import { FilterItem } from './FilterItem';

export function FilterSidebar({ products }: { products: ProductType[] }) {
  const navigate = useNavigate();
  const { brands, sizes, genders } = useFilter();
  const genderOptions = getGenderOptions(products);
  const brandOptions = getBrands(products);
  const sizeOptions = getSizes(products);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Filters</h2>
        {(brands || genders || sizes) && (
          <button
            className="flex uppercase items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700"
            onClick={() => navigate('/')}
          >
            Clear Filters
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {brands &&
          brands.map((brand) => (
            <FilterRemoveButton key={`brand-${brand}`} filter={brand} />
          ))}
        {sizes &&
          sizes.map((size) => (
            <FilterRemoveButton key={`size-${size}`} filter={size} />
          ))}
        {genders &&
          genders.map((gender) => (
            <FilterRemoveButton key={`gender-${gender}`} filter={gender} />
          ))}
      </div>
      <FilterItem name="Gender" options={genderOptions} selected={genders} />
      <FilterItem name="Size" options={sizeOptions} selected={sizes} />
      <FilterItem name="Brand" options={brandOptions} selected={brands} />
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
