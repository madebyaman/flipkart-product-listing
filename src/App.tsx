import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterSidebar } from './components/FilterSidebar';
import { Product } from './components/Product';
import { Product as ProductType, products } from './products';
import { compareTwoArrays } from './utils/compareArrays';
import { createLink } from './utils/createLink';
import { getBrands } from './utils/getBrands';
import { getGenderOptions } from './utils/getGenderOptions';
import { getSizes } from './utils/getSizes';
import { useFilter } from './utils/useFilter';

function filteredProductBySizes(
  product: ProductType,
  sizes: string[] | undefined
): ProductType | undefined {
  if (sizes) {
    if (
      sizes.some((size) =>
        product.sizes.some(
          (productSize) => productSize.toLowerCase() === size.toLowerCase()
        )
      )
    )
      return product;
    else return;
  } else {
    return product;
  }
}

function filterProductByGender(
  product: ProductType,
  genders: string[] | undefined
): ProductType | undefined {
  if (genders) {
    if (genders.some((gender) => product.gender.toLowerCase() === gender))
      return product;
    else return;
  } else {
    return product;
  }
}
function filteredProductByBrands(
  product: ProductType,
  brands: string[] | undefined
): ProductType | undefined {
  if (brands) {
    if (brands.some((brand) => product.brand.toLowerCase() === brand))
      return product;
    else return;
  } else {
    return product;
  }
}

function App() {
  const { sortOrder, genders, brands, sizes } = useFilter();
  const navigate = useNavigate();
  const sortActiveLink = 'text-blue-500 underline underline-offset-4';

  // Guard against incorrect filters
  useEffect(() => {
    let mounted: boolean = true;
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      const newLink = createLink({ type: 'SORT', param: '' });
      mounted && navigate(newLink);
    }
    const genderOptions = getGenderOptions(products);
    if (genders && !compareTwoArrays(genders, genderOptions)) {
      const newLink = createLink({ type: 'GENDER', param: '' });
      mounted && navigate(newLink);
    }
    const sizeOptions = getSizes(products);
    if (sizes && !compareTwoArrays(sizes, sizeOptions)) {
      const newLink = createLink({ type: 'SIZE', param: '' });
      mounted && navigate(newLink);
    }
    const brandOptions = getBrands(products);
    if (brands && !compareTwoArrays(brands, brandOptions)) {
      const newLink = createLink({ type: 'BRAND', param: '' });
      mounted && navigate(newLink);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = () => {
    return products
      .filter((product) => filterProductByGender(product, genders))
      .filter((product) => filteredProductByBrands(product, brands))
      .filter((product) => filteredProductBySizes(product, sizes));
  };

  function sortedProducts(a: ProductType, b: ProductType) {
    if (a.price > b.price) {
      if (sortOrder === 'asc') return 1;
      if (sortOrder === 'desc') return -1;
    }
    if (a.price < b.price) {
      if (sortOrder === 'asc') return -1;
      if (sortOrder === 'desc') return 1;
    }
    return 0;
  }

  return (
    <div className="bg-white container my-0 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-gray-200 pt-12 pb-6 items-end">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Products
        </h1>
        <div className="flex text-sm gap-2 lg:col-span-3">
          <p className="inline font-semibold">Sort By:</p>
          <Link
            className={
              sortOrder === 'asc' ? sortActiveLink : 'hover:text-blue-500'
            }
            to={createLink({ type: 'SORT', param: 'asc' })}
          >
            Price - Low to High
          </Link>
          <Link
            to={createLink({ type: 'SORT', param: 'desc' })}
            className={
              sortOrder === 'desc' ? sortActiveLink : 'hover:text-blue-500'
            }
          >
            Price - High to Low
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <FilterSidebar products={products} />
        <div className="lg:col-span-3">
          <div></div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-6">
            {filteredProducts()
              .sort(sortedProducts)
              .map((product) => (
                <Product key={product.productName} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
