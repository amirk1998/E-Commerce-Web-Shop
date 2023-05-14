import { useState, useEffect } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutToken, setCheckoutToken] = useState(null);

  const steps = [
    { id: 1, title: 'Shipping Address' },
    { id: 2, title: 'Payment Address' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // set loading to false after 3 seconds

    const generateToken = async () => {
      try {
        const fetchedCart = await commerce.cart.retrieve();
        if (fetchedCart.id) {
          const token = await commerce.checkout.generateToken(
            'cart',
            fetchedCart.id
          );
          console.log(token);
          setCheckoutToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // generateToken();
  }, []);

  const handleStepper = () => {
    if (activeStep === 1) {
      setIsLoading(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setIsLoading(true);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const Confirmation = () => {
    return <div>Confirmation</div>;
  };

  const Form = () => {
    return activeStep === 1 ? (
      <AddressForm isLoading={isLoading} />
    ) : (
      <PaymentForm isLoading={isLoading} />
    );
  };

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
                    : 'bg-slate-300 text-slate-500'
                } `}
              >
                {step.id}
                {/* {activeStep === steps.length ? (
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
                ) : (
                  step.id
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

      {activeStep === steps.length ? <Confirmation /> : <Form />}

      {/* <button onClick={handleStepper}>
        {activeStep === 1 ? 'Next' : 'Prev'}
      </button> */}
    </div>
  );
};

export default Checkout;
