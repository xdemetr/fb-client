import React from 'react';
import cnames from 'classnames';

type Props = {
  name: string
  type?: 'password' | 'email' | 'checkbox' | 'select' | 'text'
  handleBlur?: (e: any) => void
  handleChange?: (e: any) => void
  values?: any
  touched?: any
  errors?: any
  placeholder?: string
  label?: string
  autoFocus?: any
  autoComplete?: string
}

const Input: React.FC<Props> = ({name, handleChange, values, handleBlur, type, touched, errors, placeholder, autoFocus, autoComplete = 'false'}) => {
  return (
      <input
          name={name}
          onChange={handleChange}
          value={values[name]}
          onBlur={handleBlur}
          type={type}
          className={cnames('form-control', {'is-invalid': touched[name] && errors[name]})}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
      />
  )
};

const Checkbox: React.FC<Props> = ({name, handleChange, values, handleBlur, type, touched, errors, label}) => {
  return (
      <div className="custom-control custom-checkbox">
        <input
            id={name}
            name={name}
            onChange={handleChange}
            value={values[name]}
            onBlur={handleBlur}
            type={type}
            className={cnames('custom-control-input', {'is-invalid': touched[name] && errors[name]})}
            checked={values[name]}
        />
        <label className="custom-control-label" htmlFor={name}>{label}</label>
      </div>
  )
};

const Select: React.FC<Props> = ({name, handleChange, values, handleBlur, touched, errors, children}) => {
  return (
      <select
          id={name}
          name={name}
          onChange={handleChange}
          value={values[name]}
          onBlur={handleBlur}
          className={cnames('form-control ', {'is-invalid': touched[name] && errors[name]})}
      >
        {children}
      </select>
  )
};

const InputField: React.FC<Props> = (props) => {
  const {name, type = 'text', ...rest} = props;

  let renderInput;

  switch (type) {
    case 'text':
    case 'email':
    case 'password': {
      renderInput = <Input name={name} type={type} {...rest} />;
      break;
    }

    case 'checkbox': {
      renderInput = <Checkbox name={name} type="checkbox" {...rest} />;
      break;
    }

    case 'select': {
      renderInput = <Select name={name} {...rest} />;
      break;
    }
  }

  return (
      <div className={
        cnames('form-group', {
          'has-danger': props.touched[name] && props.errors[name]
        })}>
        {renderInput}

        {props.touched[name] && props.errors[name] &&
        <span className="invalid-feedback">{props.errors[name]}</span>}
      </div>
  )
};

export default InputField;
