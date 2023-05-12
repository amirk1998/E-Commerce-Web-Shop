import Product from './Product/Product';

const Products = ({ products, onAddToCart }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-x-4 gap-y-6 '>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Product
              product={product}
              onAddToCart={() => onAddToCart(product.id, 1)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
