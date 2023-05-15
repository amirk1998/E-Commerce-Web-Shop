const Review = ({ checkoutToken }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-semibold text-slate-800 text-center mb-4 '>
        Order Summary
      </h1>
      <ul className='flex flex-col gap-y-4'>
        {checkoutToken &&
          checkoutToken?.line_items.map((product) => {
            return (
              <li
                className='py-2 px-0 flex justify-between'
                key={product.product_id}
              >
                <p className='font-medium text-slate-800 text-lg flex flex-col'>
                  {product.name}
                  <span className='font-normal text-slate-500 text-base'>
                    Quantity: {product.quantity}
                  </span>
                </p>
                <p className='font-medium text-slate-800 text-lg flex flex-col'>
                  {product.price.formatted_with_symbol}
                </p>
              </li>
            );
          })}
        <div className='flex flex-col py-2'>
          <hr className='border-slate-200 border-2' />
          <p className='font-semibold text-lg text-slate-800'>Total</p>
          <p className='font-bold text-lg text-slate-800'>
            {checkoutToken.subtotal.formatted_with_symbol}
          </p>
        </div>
      </ul>
    </div>
  );
};

export default Review;
