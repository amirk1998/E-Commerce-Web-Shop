import Select from 'react-select';

const FormSelect = ({ name, label, options, value, onChange }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#f3f4f6',
      borderWidth: '2px',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      // color: '#f3f4f6',
    }),
  };

  return (
    <div className='flex flex-col'>
      <label
        htmlFor={name}
        className='block text-lg font-medium text-slate-800 mb-2'
      >
        {label}
      </label>
      <Select
        className='basic-single'
        classNamePrefix='select'
        value={value}
        isDisabled={false}
        isLoading={true}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        styles={customStyles}
        name={name}
        id={name}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default FormSelect;
