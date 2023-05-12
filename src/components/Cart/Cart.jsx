import CartItem from './CartItem/CartItem';

const Cart = ({ cart }) => {
  const EmptyCart = () => {
    return (
      <div>
        <h1 className='font-medium text-xl text-center mt-6'>
          You do not have any items in your shopping cart , start adding some
        </h1>
      </div>
    );
  };

  const FilledCart = () => {
    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-4 py-2 overflow-y-auto'>
        <div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full gap-x-4 gap-y-6 py-4'>
          {cart.line_items.map((item) => {
            return (
              <div key={item.id}>
                <CartItem item={item} />
              </div>
            );
          })}
        </div>
        <div className='flex flex-col items-center justify-between ml-8 bg-white mt-4 px-4 rounded-xl h-[370px] max-h-[370px] shadow-md max-w-[400px]'>
          <p className='font-semibold text-3xl text-slate-800 py-4 justify-self-center'>
            Checkout Summary
          </p>
          <p className='font-semibold text-2xl text-slate-800 py-4 justify-self-center'>
            Subtotal : {cart.subtotal.formatted_with_symbol}
          </p>
          <div className='flex items-center justify-between px-8 pb-4 gap-x-4'>
            <button
              type='button'
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2'
            >
              Empty Cart
            </button>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 focus:outline-none '
            >
              Checkout
            </button>
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
