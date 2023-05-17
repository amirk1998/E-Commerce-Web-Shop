import { useState, useEffect } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const steps = [
    { id: 1, title: 'Shipping Address' },
    { id: 2, title: 'Payment Address' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // set loading to false after 3 seconds
  }, []);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const cartId = commerce.cart.id();
        const token = await commerce.checkout.generateToken(cartId, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handlerNext = (data) => {
    setShippingData(data);
    nextStep();
    console.log(data);
  };

  const Confirmation = () => {
    return (
      <>
        {order.customer ? (
          <div className='flex flex-col items-center justify-center w-full'>
            <h1 className='text-2xl font-semibold text-slate-800'>
              Thank you for your purchase
            </h1>
            <hr className='border-slate-200 border-2 mt-2' />
            <p className='text-xl font-medium text-slate-800'>Order ref : </p>
            <br />
            <Link to='/'>
              <button className='text-gray-900  border-2 border-gray-300 hover:bg-slate-200 hover:border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 '>
                Back To Home
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <Spinner size='xl' color='blue.500' />
          </div>
        )}
      </>
    );
  };

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center w-full gap-y-8'>
        <p className='text-red-500 font-medium text-xl'>Error : {error}</p>
        <Link to='/'>
          <button className='text-gray-900  border-2 border-gray-300 hover:bg-slate-200 hover:border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 '>
            Back To Home
          </button>
        </Link>
      </div>
    );
  }

  const Form = () => {
    if (activeStep === 1) {
      return (
        <AddressForm
          isLoading={isLoading}
          checkoutToken={checkoutToken}
          handlerNext={handlerNext}
        />
      );
    } else if (activeStep === 2) {
      return (
        <PaymentForm
          isLoading={isLoading}
          checkoutToken={checkoutToken}
          shippingData={shippingData}
          backStep={backStep}
          nextStep={nextStep}
          onCaptureCheckout={onCaptureCheckout}
        />
      );
    }
  };

  // if (!checkoutToken) {
  //   return (
  //     <div className='flex items-center justify-center'>
  //       <Spinner size='xl' color='blue.500' />
  //     </div>
  //   );
  // }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {/* Stepper */}
      <div className='flex items-center justify-between w-1/2 mb-8'>
        {steps.map((step) => {
          return (
            <div key={step.id} className='flex items-center'>
              <span
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  parseInt(activeStep) === parseInt(step.id)
                    ? 'bg-blue-500 text-white'
                    : parseInt(activeStep) > parseInt(step.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-500'
                } `}
              >
                {activeStep === step.id || activeStep < step.id ? (
                  step.id
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                )}
                {/* {activeStep === steps.length + 1 && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                )} */}
              </span>
              <p
                className={`ml-2 text-xl ${
                  parseInt(activeStep) === parseInt(step.id)
                    ? 'text-blue-600'
                    : 'text-slate-500'
                } `}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>

      {activeStep === steps.length + 1 ? <Confirmation /> : <Form />}
    </div>
  );
};

export default Checkout;
