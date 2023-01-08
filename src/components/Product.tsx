import { Product as ProductType } from '../products';

export function Product({ product }: { product: ProductType }) {
  const { productName, img, sizes, brand, price } = product;
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={img}
          alt={productName}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex flex-col justify-between">
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
    </div>
  );
}
