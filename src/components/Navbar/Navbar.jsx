import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/image/commerce.png';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Navbar = ({ totalItems }) => {
  const location = useLocation();

  return (
    <div className='h-16 mb-6 flex items-center px-4 bg-white w-full rounded-lg'>
      <div className='flex items-center justify-between w-full pr-4'>
        <Link to='/'>
          <div className='flex items-center'>
            <img src={logo} alt='Commerce.js' className='h-6 w-6' />
            <h2 className='ml-2 text-2xl'>Commerce.js</h2>
          </div>
        </Link>
        {location.pathname === '/' && (
          <Link to='/cart'>
            <button className='relative'>
              <div className='absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-red-500 border-2 border-red-500 rounded-full -top-1 -right-1 '>
                <span>{totalItems}</span>
              </div>

              <div className='text-slate-600 hover:text-slate-900 hover:bg-gray-100 hover:rounded-full p-4'>
                <MdOutlineShoppingCart
                  className='w-6 h-6  
              '
                />
              </div>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
