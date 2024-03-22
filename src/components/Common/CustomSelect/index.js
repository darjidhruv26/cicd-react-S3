import React from 'react';

const CustomSelect = ({ onChange, options, value, className, customStyles, label, defaultValue }) => {

    const defalutStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: 50,
            color: state.isSelected ? 'red' : 'blue',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            marginRight: 5,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            borderRadius: 20,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    return (
        <div className={className}>
            <div className="form-group">
                <label>{label}</label>
                <div className="custom-select">
                    <select
                        style={customStyles || defalutStyles}
                        onChange={value => {
                            onChange(value)
                        }}
                        value={value || defaultValue}
                    >
                    <option>Select One</option>
                    {options?.map((item, index) => {
                        return (<option value={item.value} key={index}>{item.label}</option>);
                    }
                    )}
                    </select>
                </div>
            </div>
        </div>
    )
};

export default CustomSelect;
