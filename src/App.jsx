import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { commerce } from './lib/commerce';
import routes from './routes';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(products);
  console.log('cart', cart);

  return (
    <div className='App w-full h-full bg-gray-100 px-8 py-4'>
      <Navbar totalItems={cart?.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}

      <Cart cart={cart} />

      {/* _______ */}
      {/* <Routes>
            {routes.map((route) => {
              return <Route {...route} key={crypto.randomUUID()} />;
            })}
          </Routes> */}
    </div>
  );
}

export default App;
