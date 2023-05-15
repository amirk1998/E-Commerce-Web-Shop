import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { Spinner } from '@chakra-ui/react';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

const PaymentForm = ({ isLoading, checkoutToken, backStep }) => {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner size='xl' color='blue.500' />
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-white px-4 py-8 w-1/2 rounded-xl border-2 border-slate-300 shadow-sm hover:shadow-lg'>
      <Review checkoutToken={checkoutToken} />
      <hr className='border-slate-200 border-2 mt-2' />
      <p className='text-xl font-semibold text-slate-800 my-5'>
        Payment Method
      </p>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form>
              <CardElement />
              <br />
              <br />
              <div>
                <button
                  onClick={backStep}
                  className='text-gray-900  border-2 border-gray-300 hover:bg-slate-200 hover:border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 '
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={!stripe}
                  className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 focus:outline-none'
                >
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
