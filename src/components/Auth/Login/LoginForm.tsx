import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputField from '../../Form/InputField';
import Button from '../../general/Button/Button';
import {
  TXT_FIELD_EMAIL_INVALID,
  TXT_FIELD_REQUIRED,
  TXT_LABEL_EMAIL,
  TXT_LABEL_PASSWORD,
  TXT_LOGIN
} from '../../../const/Vars';

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
      email: Yup.string().email(TXT_FIELD_EMAIL_INVALID).required(TXT_FIELD_REQUIRED),
      password: Yup.string().required(TXT_FIELD_REQUIRED)
    })
  });

  const {handleSubmit, ...props} = loginFormOptions;

  return (
      <form onSubmit={handleSubmit}>
        <InputField placeholder={TXT_LABEL_EMAIL} name="email" type="email" {...props} />
        <InputField placeholder={TXT_LABEL_PASSWORD} name="password" type="password" {...props} />

        <div className="mt-2">
          <Button wide={true}>{TXT_LOGIN}</Button>
        </div>
      </form>
  )
};

export default React.memo(LoginForm);
