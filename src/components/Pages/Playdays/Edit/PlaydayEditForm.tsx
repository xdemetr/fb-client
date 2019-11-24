import React from 'react';
import {useFormik} from 'formik';
import InputField from '../../../Form/InputField';
import * as Yup from 'yup';

type Props = {
  onSubmit: (formData: any) => void
  current: any
}

const PlaydayEditForm: React.FC<Props> = ({onSubmit, current}) => {
  const loginFormOptions = useFormik({
    initialValues: {
      res1: current.goals[0],
      res2: current.goals[1],
    },
    onSubmit: values => {
      onSubmit(values)
    },
    validationSchema: Yup.object().shape({
      res1: Yup.string().required('Обязательное поле'),
      res2: Yup.string().required('Обязательное поле'),
    })
  });

  const {handleSubmit, handleBlur, handleChange, touched, errors, values} = loginFormOptions;

  if (!current) return null;

  return (
      <div>
        <form className={`playday-edit-form mb-3`} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mt-3 mt-md-0">
              <InputField
                  placeholder="Голы"
                  name={"res1"} type="text"
                  onBlur={handleBlur} onChange={handleChange}
                  value={values.res1}
                  touch={touched.res1} error={errors.res1}
              />
            </div>

            <div className="col-md-4 mt-3 mt-md-0">
              <InputField
                  placeholder="Голы"
                  name={"res2"} type="text"
                  onBlur={handleBlur} onChange={handleChange}
                  value={values.res2}
                  touch={touched.res2} error={errors.res2}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-primary">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default React.memo(PlaydayEditForm);
