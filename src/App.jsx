import { Route, Routes } from 'react-router-dom';
import Products from './components/Products/Products';
import routes from './routes';

function App() {
  return (
    <div className='App w-full h-screen bg-gray-100 px-8 py-4'>
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
