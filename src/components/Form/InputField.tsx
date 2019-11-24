import React from 'react';
import cnames from 'classnames';

type Props = {
  name: string
  type: string
  onBlur: any
  onChange: any
  value: string
  touch?: any
  error?: any
  placeholder?: string
}

const InputField: React.FC<Props> = ({onBlur, onChange, touch, error, value, name, type, placeholder}) => {
  return (
      <div className={cnames('form-group', {'has-danger': touch && error})}>
        <input
            name={name}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            type={type}
            className={cnames('form-control', {'is-invalid': touch && error})}
            placeholder={placeholder}
        />
        {touch && error && <span className="invalid-feedback">{error}</span>}
      </div>
  )
};

export default InputField;
