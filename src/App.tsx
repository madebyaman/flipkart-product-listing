import { Link } from 'react-router-dom';
import { FilterSidebar } from './components/FilterSidebar';
import { Product } from './Product';
import { Product as ProductType, products } from './products';
import { createLink } from './utils/createLink';
import { useQuery } from './utils/useQuery';

function filteredProductBySizes(
  product: ProductType,
  selectedSizes: string | null
): ProductType | undefined {
  const sizes = selectedSizes?.split(':');
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
  selectedGenders: string | null
): ProductType | undefined {
  const genders = selectedGenders?.split(':');
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
  selectedBrands: string | null
): ProductType | undefined {
  const brands = selectedBrands?.split(':');
  if (brands) {
    if (brands.some((brand) => product.brand.toLowerCase() === brand))
      return product;
    else return;
  } else {
    return product;
  }
}

function App() {
  const query = useQuery();
  const sortOrder = query.get('sort') || 'asc';
  const selectedBrands = query.get('brand');
  const selectedSize = query.get('size');
  const selectedGenders = query.get('gender');
  const sortActiveLink = 'text-blue-700 underline underline-offset-4';

  const filteredProducts = () => {
    return products
      .filter((product) => filterProductByGender(product, selectedGenders))
      .filter((product) => filteredProductByBrands(product, selectedBrands))
      .filter((product) => filteredProductBySizes(product, selectedSize));
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
          products={products}
        />
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
