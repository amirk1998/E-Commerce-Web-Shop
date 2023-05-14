const FormInput = ({ label, name, formik, type = 'text' }) => {
  return (
    <div className='flex flex-col'>
      <label
        htmlFor='name'
        className='block mb-2 text-lg font-medium text-slate-800'
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        {...formik.getFieldProps(name)}
        className={`bg-gray-100 border-2 text-slate-800 text-lg rounded-lg focus:border-blue-500 focus:outline-none block w-full p-2.5 ${
          formik.errors[name] && formik.touched[name]
            ? 'border-red-500'
            : 'border-gray-300'
        }`}
        placeholder={label}
        required
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className='text-red-500 mt-1 text-sm '>{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default FormInput;
