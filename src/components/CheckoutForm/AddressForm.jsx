import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { commerce } from '../../lib/commerce';
import FormSelect from '../common/FormSelect';
import { Link } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
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
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is Required'),
  address: Yup.string()
    .required('Address is Required')
    .min(8, 'Address length is not valid'),
  city: Yup.string()
    .required('City is Required')
    .min(5, 'City length is not valid'),
  zipCode: Yup.string()
    .required('Zip Code is Required')
    .matches(/^[0-9]{5}$/, 'Invalid Zip Code')
    .nullable(),
  shippingCountry: Yup.string().required('Select Shipping Country'),
  shippingSubdivisions: Yup.string().required('Select Shipping Subdivisions'),
});

const AddressForm = ({ isLoading, checkoutToken, handlerNext }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [allShippingSubdivisions, setAllShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [allShippingOptions, setAllShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    value: code,
    label: name,
  }));
  const subdivisions = Object.entries(allShippingSubdivisions).map(
    ([code, name]) => ({
      value: code,
      label: name,
    })
  );

  const options = allShippingOptions.map((option) => ({
    value: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  // console.log(countries);
  // console.log(subdivisions);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setAllShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setAllShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    shippingCountry && fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    shippingSubdivision &&
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  const onSubmit = (data) => {
    handlerNext({
      ...data,
      shippingCountry,
      setShippingSubdivision,
      shippingOption,
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
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
        <FormInput name='email' label='Email' type='email' formik={formik} />
        <FormInput name='address' label='Address' formik={formik} />
        <FormInput name='city' label='City' formik={formik} />
        <FormInput
          name='zipCode'
          label='Zip Code / Postal Code'
          type='number'
          formik={formik}
        />

        <FormSelect
          name='shippingCountry'
          label='Shipping Country'
          options={countries}
          onChange={(selectedOption) => {
            setShippingCountry(selectedOption.value);
          }}
        />

        <FormSelect
          name='shippingSubdivisions'
          label='Shipping Subdivisions'
          options={subdivisions}
          onChange={(selectedOption) => {
            setShippingSubdivision(selectedOption.value);
          }}
        />

        <FormSelect
          name='shippingOptions'
          label='Shipping Options'
          options={options}
          onChange={(selectedOption) => {
            setShippingOption(selectedOption.value);
          }}
        />
      </form>
      <div className='flex items-center justify-between mt-10 w-full'>
        <Link to='/cart'>
          <button className='text-gray-900  border-2 border-gray-300 hover:bg-slate-200 hover:border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 '>
            Back to Cart
          </button>
        </Link>
        <Link>
          <button className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 focus:outline-none'>
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddressForm;
