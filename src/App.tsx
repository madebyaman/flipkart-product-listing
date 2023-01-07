import { Product } from './Product';
import { products } from './products';

function App() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-6">
        {products.map((product) => (
          <Product key={product.productName} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
