import { useState } from 'react';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Shipping Address' },
    { id: 2, title: 'Payment Address' },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {/* Stepper */}
      <div className='flex items-center justify-between w-1/2'>
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
    </div>
  );
};

export default Checkout;
