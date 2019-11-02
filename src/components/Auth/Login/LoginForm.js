import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../Form/Input';
import {email, required} from '../../../utils/validators';
import Error from '../../Error';

const LoginForm = ({handleSubmit, error}) => {
  return (
      <form onSubmit={handleSubmit}>
        <Error message={error}/>
        <Field
            validate={[required, email]}
            component={Input} placeholder="Почта" name={"email"}/>

        <Field
            validate={[required]}
            component={Input} placeholder="Пассворд" name={"password"} type="password"/>

        <button className="btn btn-primary w-100">GO</button>
      </form>
  );
};

export default reduxForm({
  form: 'login'
})(LoginForm);
