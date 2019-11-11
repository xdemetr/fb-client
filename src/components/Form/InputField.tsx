import React from 'react';

interface InputProps {
  name: string
  type: string
  onBlur: any
  onChange: any
  value: string
  touch?: boolean
  error?: string
  placeholder?: string
}

const InputField: React.FC<InputProps> = ({onBlur, onChange, touch, error, value, name, type, placeholder}) => {
  return (
      <div className={`form-group ${touch && error ? 'has-danger' : ''}`}>
        <input
            name={name}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            type={type}
            className={`form-control ${touch && error ? 'is-invalid' : ''}`}
            placeholder={placeholder}
        />
        {touch && error && <span className="invalid-feedback">{error}</span>}
      </div>
  )
};

export default InputField;
