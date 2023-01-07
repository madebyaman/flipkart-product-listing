export type Product = {
  productName: string;
  brand: string;
  price: number;
  sizes: string[];
  img: string;
  gender: string;
};

export const products: Product[] = [
  {
    productName: 'Men Color Black Henley Nect Multicolor T-shirt',
    brand: 'Roadster',
    price: 256,
    sizes: ['M', 'XL'],
    gender: 'male',
    img: 'https://rukminim1.flixcart.com/image/612/612/k0zlsi80/t-shirt/z/j/u/l-9329619-roadster-original-imafkgbrz8jdwygq.jpeg?q=70',
  },
  {
    productName: 'Men Slim Fit Solid Casual Shirt',
    brand: 'Being Human',
    price: 689,
    sizes: ['S', 'XL', 'L'],
    gender: 'male',
    img: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/y/h/5/-original-imagkx55hqkpvgjs.jpeg?q=70',
  },
  {
    productName: 'Men Slim Fit Light Green Cotton Blend Trousers',
    brand: 'Being Human',
    price: 499,
    sizes: ['S', 'M'],
    gender: 'male',
    img: 'https://rukminim1.flixcart.com/image/612/612/klscivk0/trouser/q/q/k/28-sktr-4242-olv-fubar-original-imagyuff8uq6cxny.jpeg?q=70',
  },
  {
    productName: 'Women Stripped Pure Cotton Straight Kura',
    brand: 'Metro Fashion',
    price: 499,
    sizes: ['S', 'M', 'L', 'XL'],
    gender: 'female',
    img: 'https://rukminim1.flixcart.com/image/612/612/kr9jafk0/kurta/e/w/u/m-kr499b-metro-fashion-original-imag537e9whwftd7.jpeg?q=70',
  },
  {
    productName: 'Digital Print, Stripped Bollywood Georgette Saree',
    brand: 'Clemira',
    price: 662,
    sizes: ['M', 'XL'],
    gender: 'female',
    img: 'https://rukminim1.flixcart.com/image/612/612/l111lzk0/sari/p/s/3/free-lg-1397-hsfashionhub-unstitched-original-imagczxygwpnte5f.jpeg?q=70',
  },
  {
    productName: 'Embellished Bollywood Georgette Saree',
    brand: 'Clemira',
    price: 650,
    sizes: ['S', 'L'],
    gender: 'female',
    img: 'https://rukminim1.flixcart.com/image/612/612/xif0q/shopsy-sari/l/x/q/free-designer-dindla-unstitched-original-imag5db47qbsngqw.jpeg?q=70',
  },
];
