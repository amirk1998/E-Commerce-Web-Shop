import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi2';

const Product = ({ product }) => {
  return (
    <div className='flex flex-col w-[400px] h-[370px] justify-between border border-slate-300 rounded-lg shadow-sm hover:shadow-2xl hover:border-slate-400 hover:rounded-lg pb-4'>
      <div className='flex flex-col'>
        <img
          className='object-cover max-h-[240px] mb-4 rounded-tr-lg rounded-tl-lg'
          src={product.image}
          alt={product.name}
        />
        <div className='flex justify-between px-8'>
          <p className='font-semibold text-xl text-slate-800'>{product.name}</p>
          <p className='font-semibold text-xl text-slate-800'>
            {product.price}
          </p>
        </div>
        <p className='px-8 pt-2 font-normal text-slate-500 text-base'>
          {product.description}
        </p>
      </div>
      <button aria-label='Add to cart' className='self-end px-8'>
        <MdOutlineAddShoppingCart className='text-slate-500 hover:text-slate-900 w-6 h-6' />
      </button>
    </div>
  );
};

export default Product;