import { useState } from 'react';
import { Product } from './Product';
import { products } from './products';
import { capitalizedWord } from './utils/capitalized';
import { useQuery } from './utils/useQuery';
import { Link, useNavigate } from 'react-router-dom';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

function createLink({
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

const sortActiveLink = 'text-blue-700 underline underline-offset-4';

function sortedProducts(sort: string) {
  return products.sort((a, b) => {
    if (a.price > b.price) {
      if (sort === 'asc') return 1;
      if (sort === 'desc') return -1;
    }
    if (a.price < b.price) {
      if (sort === 'asc') return -1;
      if (sort === 'desc') return 1;
    }
    return 0;
  });
}

function App() {
  const query = useQuery();
  const sortOrder = query.get('sort') || 'asc';
  const selectedBrands = query.get('brand');
  const selectedSize = query.get('size');
  const selectedGenders = query.get('gender');

  return (
    <div className="bg-white container my-0 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-gray-200 pt-12 pb-6 items-end">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Products
        </h1>
        <div className="flex text-sm gap-2 lg:col-span-3">
          <p className="inline font-semibold">Sort By:</p>
          <Link
            className={sortOrder === 'asc' ? sortActiveLink : ''}
            to={createLink({ type: 'SORT', param: 'asc' })}
          >
            Price - Low to High
          </Link>
          <Link
            to={createLink({ type: 'SORT', param: 'desc' })}
            className={sortOrder === 'desc' ? sortActiveLink : ''}
          >
            Price - High to Low
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <FilterSidebar
          selectedBrands={selectedBrands}
          selectedSizes={selectedSize}
          selectedGenders={selectedGenders}
        />
        <div className="lg:col-span-3">
          <div></div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-6">
            {sortedProducts(sortOrder).map((product) => (
              <Product key={product.productName} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSidebar({
  selectedBrands,
  selectedSizes,
  selectedGenders,
}: {
  selectedBrands: string | null;
  selectedSizes: string | null;
  selectedGenders: string | null;
}) {
  return (
    <div>
      <FilterItem
        name="Gender"
        options={['male', 'female']}
        selected={selectedGenders}
      />
    </div>
  );
}

function FilterItem({
  name,
  options,
  selected,
}: {
  name: string;
  options: string[];
  selected: string | null;
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  // From selected, gather which all options are checked
  let selectedOptions: string[] = [];
  if (selected) {
    selectedOptions = selected.split(':');
  }

  function selectOrUnselectOption(option: string, checked: boolean) {
    let newSelectedOptions: string[] = [];
    if (!checked) {
      // remove option
      newSelectedOptions = selectedOptions.filter(
        (givenOption) => givenOption.toLowerCase() !== option.toLowerCase()
      );
    }
    if (checked) {
      // add option
      newSelectedOptions = [...selectedOptions, option.toLowerCase()];
    }
    // generate link
    const lowercasedName = name.toLowerCase();
    let link: string | null = null;
    if (lowercasedName === 'brand') {
      link = createLink({ type: 'BRAND', param: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'size') {
      link = createLink({ type: 'SIZE', param: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'gender') {
      link = createLink({
        type: 'GENDER',
        param: newSelectedOptions.join(':'),
      });
    }
    // open the link
    link && navigate(link);
  }

  function isChecked(option: string): boolean {
    return selectedOptions.some(
      (selectedOption) => selectedOption.toLowerCase() === option.toLowerCase()
    );
  }

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{name}</span>
        {open ? (
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div>
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`filter-${option}`}
                className="mr-1 leading-tight h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                type="checkbox"
                checked={isChecked(option)}
                onChange={(e) =>
                  selectOrUnselectOption(option, e.target.checked)
                }
              />
              <label
                className="ml-1 text-sm text-gray-600"
                htmlFor={`filter-${option}`}
              >
                {capitalizedWord(option)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
