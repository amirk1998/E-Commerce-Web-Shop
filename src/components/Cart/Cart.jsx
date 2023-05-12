import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const EmptyCart = () => {
    return (
      <div>
        <h1 className='font-medium text-xl text-center mt-6'>
          You do not have any items in your shopping cart
        </h1>
        <Link to='/'>
          <p className='text-blue-500 hover:text-blue-700 font-medium text-lg mt-4 text-center'>
            Start adding some items
          </p>
        </Link>
      </div>
    );
  };

  const FilledCart = () => {
    return (
      <div className='flex flex-col py-2 overflow-y-auto w-full h-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-x-4 gap-y-6 py-4'>
          {cart?.line_items.map((item) => {
            return (
              <div key={item.id}>
                <CartItem
                  item={item}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </div>
            );
          })}
        </div>
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-between mt-4 rounded-xl px-4 bg-white py-4 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'>
            <p className='font-semibold text-3xl text-slate-800 mr-4'>
              Subtotal : {cart.subtotal.formatted_with_symbol}
            </p>
            <div className='flex items-center justify-between px-8 gap-x-4'>
              <button
                type='button'
                onClick={handleEmptyCart}
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2'
              >
                Empty Cart
              </button>
              <button
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 focus:outline-none '
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!cart.line_items) {
    return (
      <div className='flex flex-col w-full px-8 h-full'>
        <h1 className='text-3xl font-semibold text-slate-800 text-center'>
          Loading ...
        </h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-4xl font-semibold text-slate-800 text-center mt-4 mb-8'>
        Your Shopping Cart
      </h1>
      {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default Cart;
