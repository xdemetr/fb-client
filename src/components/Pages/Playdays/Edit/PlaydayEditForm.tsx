import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TXT_GOALS, TXT_SAVE } from '../../../../const/Vars';
import InputField from '../../../Form/InputField';
import Button from '../../../general/Button/Button';

import IPlayday from '../../../../types/interface/IPlayday';

interface IProps {
  onSubmit: (formData: any) => void;
  current: IPlayday;
}

const PlaydayEditForm: React.FC<IProps> = ({ onSubmit, current }) => {
  const loginFormOptions = useFormik({
    initialValues: {
      res1: current.goals[0],
      res2: current.goals[1],
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
    validationSchema: Yup.object().shape({
      res1: Yup.string().required('Обязательное поле'),
      res2: Yup.string().required('Обязательное поле'),
    }),
  });

  const { handleSubmit, ...props } = loginFormOptions;

  if (!current) {
    return null;
  }

  return (
    <div>
      <form className="playday-edit-form mb-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mt-3 mt-md-0">
            <InputField placeholder={TXT_GOALS} name="res1" {...props} autoComplete="off"/>
          </div>

          <div className="col-md-4 mt-3 mt-md-0">
            <InputField placeholder={TXT_GOALS} name="res2" {...props} autoComplete="off"/>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <Button>{TXT_SAVE}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(PlaydayEditForm);
