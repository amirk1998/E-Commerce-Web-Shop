import Product from './Product/Product';

const Products = ({ products }) => {
  return (
    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 w-full gap-x-4 gap-y-6 '>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Product product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
