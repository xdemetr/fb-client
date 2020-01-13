import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from 'components/Form/InputField';

import { TXT_FIELD_REQUIRED, TXT_LABEL_NAME } from 'const/Vars';
import IPlayday from 'types/interface/IPlayday';

interface IProps {
  current: IPlayday;
  onSubmit: any;
}

const PlaydayTitle: React.FC<IProps> = ({ current, onSubmit }) => {
  const [showEditTitle, setEditTitle] = useState(false);

  const loginFormOptions = useFormik({
    initialValues: {
      name: current.name,
    },
    onSubmit: (values) => {
      onSubmit(values, current._id);
      setEditTitle(!showEditTitle);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(TXT_FIELD_REQUIRED),
    }),
  });

  const onTitleClick = () => {
    setEditTitle(!showEditTitle);
  };

  let title;
  const { handleSubmit, ...props } = loginFormOptions;

  if (showEditTitle) {
    title = (
      <form onSubmit={handleSubmit}>
        <InputField
          name="name"
          autoFocus={true}
          placeholder={TXT_LABEL_NAME}
          {...props}
          handleBlur={handleSubmit}
        />
      </form>
    );
  } else {
    title = <h1 onDoubleClick={onTitleClick}>{current.name}</h1>;
  }

  return title;
};

export default PlaydayTitle;
