import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { Spinner } from '@chakra-ui/react';

const PaymentForm = ({ isLoading, checkoutToken }) => {
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
    </div>
  );
};

export default PaymentForm;
