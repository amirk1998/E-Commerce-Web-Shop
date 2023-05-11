import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { commerce } from './lib/commerce';
import routes from './routes';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className='App w-full h-full bg-gray-100 px-8 py-4'>
      <Navbar />
      <Products products={products} />
      {/* <Routes>
            {routes.map((route) => {
              return <Route {...route} key={crypto.randomUUID()} />;
            })}
          </Routes> */}
    </div>
  );
}

export default App;
