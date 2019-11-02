import React from 'react';

const FormControl = ({input, meta, child, element, ...props}) => {
  const hasError = meta.touched && meta.error;

  return (
      <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
        {props.children}
        {hasError && <div className="invalid-feedback">{meta.error}</div>}
      </div>
  )
};

export const Input = (props) => {
  const {input, meta, child, element, ...restProps} = props;

  const hasError = meta.touched && meta.error;

  return (
      <FormControl {...props}>
        <input {...input} {...restProps}
               className={`form-control ${hasError ? 'is-invalid' : ''}`}/>
      </FormControl>
  )
};

export const Select = (props) => {
  const {input, meta, child, element, ...restProps} = props;
  const hasError = meta.touched && meta.error;

  return (
      <FormControl {...props}>
        <select className={`form-control ${hasError ? 'is-invalid' : ''}`}
                {...input} {...restProps}>
          {props.children}
        </select>
      </FormControl>
  )
};

export const Checkbox = (props) => {
  const {input, meta, child, element, ...restProps} = props;

  return (
      <FormControl {...props}>
        <div className={`custom-control custom-checkbox`}>
          <input {...input}
                 checked={input.value}
                 type="checkbox" className="custom-control-input" id={restProps.id}/>
          <label className={`custom-control-label`} htmlFor={restProps.id}>{restProps.label}</label>
        </div>
      </FormControl>
  )
};
