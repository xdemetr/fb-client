import React from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {Input} from '../../Form/Input';
import {email, required} from '../../../utils/validators';
import Error from '../../Error';

interface Props extends InjectedFormProps {
  error: string
}

const LoginForm: React.FC<Props> = ({handleSubmit, error}) => {
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
})(React.memo(LoginForm));
