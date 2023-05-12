import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { commerce } from './lib/commerce';
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
      <Routes>
        <Route
          path='/'
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route path='/cart' element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
