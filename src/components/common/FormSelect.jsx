import Select from 'react-select';

const FormSelect = ({ name, label, options, defaultValue }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#f3f4f6',
      // color: '#f3f4f6',
    }),
  };

  return (
    <div className='flex flex-col'>
      <label
        htmlFor={name}
        className='block text-lg font-medium text-slate-800'
      >
        {label}
      </label>
      <Select
        className='basic-single'
        classNamePrefix='select'
        defaultValue={defaultValue}
        isDisabled={false}
        isLoading={true}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        styles={customStyles}
        name={name}
        id={name}
        options={options}
      />
    </div>
  );
};

export default FormSelect;
