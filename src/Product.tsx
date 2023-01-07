import { Product as ProductType } from './products';

export function Product({ product }: { product: ProductType }) {
  const { productName, img, sizes, brand, price, gender } = product;
  return (
    <div>
      <img src={img} alt={productName} />
      <p className="text-gray-500 text-sm">{brand}</p>
      <h2 className="text-gray-800">{productName}</h2>
      <p className="text-xl mt-1">₹{price}</p>
      <p className="text-gray-500 text-sm">
        Size:{' '}
        <span className="text-gray-800">
          {sizes.map((size) => size).join(', ')}
        </span>
      </p>
    </div>
  );
}
