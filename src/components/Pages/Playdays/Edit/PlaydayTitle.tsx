import React, {useState} from 'react';
import IPlayday from '../../../../types/interface/IPlayday';
import {useFormik} from 'formik';
import InputField from '../../../Form/InputField';
import * as Yup from 'yup';

type Props = {
  current: IPlayday,
  onSubmit: any
}

const PlaydayTitle: React.FC<Props> = ({current, onSubmit}) => {
  const [showEditTitle, setEditTitle] = useState(false);

  const loginFormOptions = useFormik({
    initialValues: {
      name: current.name
    },
    onSubmit: values => {
      onSubmit(values, current._id);
      setEditTitle(!showEditTitle);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Обязательное поле')
    })
  });

  const onTitleClick = () => {
    setEditTitle(!showEditTitle);
  };

  let title;
  const {handleSubmit, ...props} = loginFormOptions;

  if (showEditTitle) {
    title = (
        <form onSubmit={handleSubmit}>
          <InputField
              name="name" autoFocus
              placeholder="Название игрового дня"
              {...props}
              handleBlur={handleSubmit}
          />
        </form>
    )
  } else {
    title = <h1 onDoubleClick={onTitleClick}>{current.name}</h1>
  }

  return title;
};

export default PlaydayTitle;
