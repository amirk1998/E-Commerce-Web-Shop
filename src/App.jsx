import { Route, Routes } from 'react-router-dom';
import Products from './components/Products/Products';
import routes from './routes';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='App w-full h-full bg-gray-100 px-8 py-4'>
      <Navbar />
      <Products />
      {/* <Routes>
            {routes.map((route) => {
              return <Route {...route} key={crypto.randomUUID()} />;
            })}
          </Routes> */}
    </div>
  );
}

export default App;
