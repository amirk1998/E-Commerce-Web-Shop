import { MdOutlineDelete } from 'react-icons/md';
const CartItem = ({ item }) => {
  return (
    <div className='flex flex-col w-[370px] h-[370px] justify-between border border-slate-300 rounded-lg shadow-sm hover:shadow-2xl hover:border-slate-400 hover:rounded-lg pb-4'>
      <div className='flex flex-col'>
        <img
          className='object-cover max-h-[230px] mb-4 rounded-tr-lg rounded-tl-lg'
          src={item.image.url}
          alt={item.name}
        />
        <div className='flex justify-between px-8'>
          <p className='font-semibold text-xl text-slate-800'>{item.name}</p>
          <p className='font-semibold text-xl text-slate-800'>
            {item.line_total.formatted_with_symbol}
          </p>
        </div>
        <div className='grid grid-rows-1 grid-cols-3 justify-end items-center place-content-end mt-6 px-8'>
          <button className='text-red-500 hover:text-white hover:bg-red-500 hover:rounded-full flex items-center justify-center w-8 h-8'>
            <MdOutlineDelete className='w-6 h-6' />
          </button>

          <div className='flex items-center justify-center '>
            <button className='flex items-center justify-center w-8 h-8 border-2 border-slate-500 rounded-tl-md rounded-bl-md hover:border-slate-800 text-slate-700  hover:text-slate-900 '>
              <p className='w-6 h-6'>-</p>
            </button>
            <div className='w-8 h-8 border-t-2 border-b-2 border-slate-500 text-slate-700 flex items-center justify-center'>
              {item.quantity}
            </div>
            <button className='flex items-center justify-center w-8 h-8 border-2 border-slate-500 text-slate-700 rounded-tr-md rounded-br-md hover:border-slate-800 hover:text-slate-900 '>
              <p className='w-6 h-6'>+</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
