import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import IPlayer from '../../../../types/interface/IPlayer';
import InputField from '../../../Form/InputField';
import Button from '../../../general/Button/Button';

import {
  TXT_FIELD_REQUIRED,
  TXT_LABEL_BOX,
  TXT_LABEL_BOX_1, TXT_LABEL_BOX_2, TXT_LABEL_BOX_3,
  TXT_LABEL_DAMAGE,
  TXT_LABEL_IMAGE, TXT_LABEL_LOGIN,
  TXT_LABEL_NAME,
  TXT_SAVE,
} from '../../../../const/Vars';

interface IProps {
  onSubmit: (formData: {
    name: string;
    handle: string;
    image?: string;
    box?: number;
    damage?: boolean;
  }) => void;
  current: IPlayer;
}

const PostPlayerForm: React.FC<IProps> = ({ onSubmit, current }) => {
  const loginFormOptions = useFormik({
    initialValues: {
      box: current ? current.box : 1,
      damage: current ? current.damage : false,
      handle: current ? current.handle : '',
      image: current ? current.image : '',
      name: current ? current.name : '',
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
    validationSchema: Yup.object().shape({
      box: Yup.string().required(TXT_FIELD_REQUIRED),
      handle: Yup.string().required(TXT_FIELD_REQUIRED),
      name: Yup.string().required(TXT_FIELD_REQUIRED),
    }),
  });

  const { handleSubmit, ...props } = loginFormOptions;

  return (
    <form onSubmit={handleSubmit}>
      <InputField placeholder={TXT_LABEL_NAME} name="name" {...props} />

      <InputField placeholder={TXT_LABEL_LOGIN} name="handle" {...props} />

      <InputField placeholder={TXT_LABEL_IMAGE} name="image" {...props} />

      <div className="row align-items-center mb-3">
        <div className="col-md-6">
          <InputField name="box" type="select" label={TXT_LABEL_BOX} {...props}>
            <option value="1">{TXT_LABEL_BOX_1}</option>
            <option value="2">{TXT_LABEL_BOX_2}</option>
            <option value="3">{TXT_LABEL_BOX_3}</option>
          </InputField>
        </div>
        <div className="col-md-6">
          <InputField name="damage" type="checkbox" label={TXT_LABEL_DAMAGE} {...props} />
        </div>
      </div>
      <Button type={'submit'} wide={true}>{TXT_SAVE}</Button>
    </form>
  );
};

export default React.memo(PostPlayerForm);
