import { useState } from 'react';
import { Product } from './Product';
import { products } from './products';
import { capitalizedWord } from './utils/capitalized';
import { classNames } from './utils/classNames';

function createLink({
  sort,
  brand,
  size,
  gender,
}: {
  sort?: string;
  brand?: string;
  size?: string;
  gender?: string;
}) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (sort) urlParams.set('sort', sort);
  if (brand) {
    urlParams.set('brand', brand);
    console.log(urlParams.toString());
  }
  if (size) urlParams.set('size', size);
  if (gender) urlParams.set('gender', gender);
  const currentUrl = window.location.origin;
  const newUrl = currentUrl + '?' + urlParams.toString();
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
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sortOrder = urlParams.get('sort') || 'asc';
  const selectedBrands = urlParams.get('brand');
  const selectedSize = urlParams.get('size');
  const selectedGenders = urlParams.get('gender');

  return (
    <div>
      <FilterSidebar
        selectedBrands={selectedBrands}
        selectedSizes={selectedSize}
        selectedGenders={selectedGenders}
      />
      <div>
        <h1 className="text-2xl leading-tight font-medium mb-2">Products</h1>
        <div className="flex text-sm gap-2 mb-2">
          <p className="inline font-semibold">Sort By</p>
          <a
            className={sortOrder === 'asc' ? sortActiveLink : ''}
            href={createLink({ sort: 'asc' })}
          >
            Price - Low to High
          </a>
          <a
            href={createLink({ sort: 'desc' })}
            className={sortOrder === 'desc' ? sortActiveLink : ''}
          >
            Price - High to Low
          </a>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-6">
        {sortedProducts(sortOrder).map((product) => (
          <Product key={product.productName} product={product} />
        ))}
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
      link = createLink({ brand: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'size') {
      link = createLink({ size: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'gender') {
      link = createLink({ gender: newSelectedOptions.join(':') });
    }
    // open the link
    window.history.pushState({}, '', link);
  }

  function isChecked(option: string): boolean {
    console.log('option', option);
    console.log(
      selectedOptions.some(
        (selectedOption) =>
          selectedOption.toLowerCase() === option.toLowerCase()
      )
    );
    return selectedOptions.some(
      (selectedOption) => selectedOption.toLowerCase() === option.toLowerCase()
    );
  }

  return (
    <div>
      <button
        className="flex gap-2 items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <h3>{name}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classNames('h-5 w-5', open ? 'rotate-180' : '')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
          />
        </svg>
      </button>
      {open && (
        <div>
          {options.map((option) => (
            <label key={option} className="flex items-center mb-1 font-medium">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={isChecked(option)}
                onChange={(e) =>
                  selectOrUnselectOption(option, e.target.checked)
                }
              />
              <span className="text-sm">{capitalizedWord(option)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
