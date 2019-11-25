import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputField from '../../Form/InputField';

type Props = {
  onSubmit: (formData: { email: string, password: string }) => void
}

const LoginForm: React.FC<Props> = ({onSubmit}) => {
  const loginFormOptions = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      onSubmit(values)
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Эл.почта указана неверно').required('Обязательное поле'),
      password: Yup.string().required('Обязательное поле')
    })
  });

  const {handleSubmit, ...props} = loginFormOptions;

  return (
      <form onSubmit={handleSubmit}>
        <InputField placeholder="Эл.почта" name="email" type="email" {...props} />
        <InputField placeholder="Пассворд" name="password" type="password" {...props} />

        <div className="mt-2">
          <button type="submit" className="btn btn-primary w-100">GO</button>
        </div>
      </form>
  )
};

export default React.memo(LoginForm);
