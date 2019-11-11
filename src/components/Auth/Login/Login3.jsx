import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

const Login3 = ({values, errors, touched, isSubmitting = true}) => (
    <Form>
      {isSubmitting}
      <div>
        <Field placeholder="Email" type={"email"} name={"email"} value={values.email}/>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <Field placeholder="Password" type={"password"} name={"password"} value={values.password}/>
      </div>

      <label>
        <Field type={"checkbox"} name={"newsletter"} checked={values.newsletter}/>
        Join
      </label>

      <Field component={"select"} name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>

      <button disabled={isSubmitting}>Submit</button>
    </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({email, password, newsletter, plan}) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      plan: plan || 'free'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required()
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {

    setTimeout(() => {
      setSubmitting(true);
      if (values.email === 'dmitriev@joomdesign.ru') {
        setErrors({email: 'This email already exist'})
      } else {
        resetForm();
      }

      setSubmitting(false);

    }, 2000);

    console.log(values)
  }
})(Login3);

export default FormikApp;
