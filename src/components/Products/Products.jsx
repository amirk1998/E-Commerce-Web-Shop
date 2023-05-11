import Product from './Product/Product';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$5',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
  },
  {
    id: 2,
    name: 'Surface',
    description: 'Microsoft Surface',
    price: '$10',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
  },
  {
    id: 3,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$5',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
  },
  {
    id: 4,
    name: 'Surface',
    description: 'Microsoft Surface',
    price: '$10',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
  },
];

const Products = () => {
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
