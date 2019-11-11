import React from 'react';
import * as Yup from 'yup';

import { Formik } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Must have a character')
    .max(255, 'Must be shorter')
    .required('Must enter a name'),
  email: Yup
    .string()
    .email('Invalid email')
    .min(6, 'Must have a character')
    .max(255, 'Must be shorter')
    .required('Must enter a email')
});

const Login2 = () => {
  return (
    <Formik
      initialValues={{ email: '', name: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500)
      }}
    >
      {({
        values, errors, touched,
        handleChange, handleBlur,
        handleSubmit, isSubmitting
      }) => (
          <form className={`login-2`} onSubmit={handleSubmit}>
            {JSON.stringify(values, errors)}
            <h1>Login2</h1>

            <div
              className={`form-group ${touched.email && errors.email ? 'has-danger' : ''}`}
            >
              <input
                type="email" name="email" placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : 'is-valid'}`}
              />
              <ErrorM touched={touched.email} message={errors.email} />
            </div>

            <input
              type="text" name="name" placeholder="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? 'has-error' : null}
            />

            <button
              disabled={isSubmitting}
              type="submit">
              Submit
                </button>
          </form>
        )}
    </Formik>
  );
};

const ErrorM = ({ touched, message }) => {
  if (!touched) {
    return <div>&nbsp;</div>
  }

  if (message) {
    return <div>{message}</div>
  }

  return <div>All good</div>
}

export default Login2;
