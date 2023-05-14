import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import { Spinner } from '@chakra-ui/react';

const initialValues = {
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  city: '',
  zipCode: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First Name is Required')
    .min(3, 'First Name length is not valid'),
  lastName: Yup.string()
    .required('Last Name is Required')
    .min(3, 'Last Name length is not valid'),
  address: Yup.string()
    .required('Address is Required')
    .min(8, 'Address length is not valid'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is Required'),
  city: Yup.string()
    .required('City is Required')
    .min(5, 'City length is not valid'),
  zipCode: Yup.string()
    .required('Zip Code is Required')
    .matches(/^[0-9]{5}$/, 'Invalid Zip Code')
    .nullable(),
});

const AddressForm = ({ isLoading }) => {
  //
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spinner size='xl' color='blue.500' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center bg-white px-4 py-8 w-1/2 rounded-xl border-2 border-slate-300 shadow-sm hover:shadow-lg'>
      <h1 className='text-2xl font-semibold text-slate-800 '>
        Shipping Address
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className='grid container gap-y-6 lg:gap-y-3 lg:gap-x-6 grid-cols-1 lg:grid-cols-2 mt-4'
      >
        <FormInput name='firstName' label='First Name' formik={formik} />
        <FormInput name='lastName' label='Last Name' formik={formik} />
        <FormInput name='address' label='Address' formik={formik} />
        <FormInput name='email' label='Email' type='email' formik={formik} />
        <FormInput name='city' label='City' formik={formik} />
        <FormInput
          name='zipCode'
          label='Zip Code / Postal Code'
          type='number'
          formik={formik}
        />
      </form>
    </div>
  );
};

export default AddressForm;
