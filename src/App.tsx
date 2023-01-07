import { Product } from './Product';
import { products } from './products';

function createSortOrderLink(sort: string) {
  const urlParams = new URLSearchParams();
  urlParams.set('sort', sort);
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

  return (
    <div>
      <div>
        <h1 className="text-2xl leading-tight font-medium mb-2">Products</h1>
        <div className="flex text-sm gap-2 mb-2">
          <p className="font-medium text-gray-600 inline">Sort By</p>
          <a
            className={sortOrder === 'asc' ? sortActiveLink : ''}
            href={createSortOrderLink('asc')}
          >
            Price - Low to High
          </a>
          <a
            href={createSortOrderLink('desc')}
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

export default App;
