import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import IPlayer from '../../../../types/interface/IPlayer';
import InputField from '../../../Form/InputField';

type Props = {
  onSubmit: (formData: {
    name: string
    handle: string
    image?: string
    box?: number
    damage?: boolean
  }) => void,
  current: IPlayer
}

const PostPlayerForm: React.FC<Props> = ({onSubmit, current}) => {
  const loginFormOptions = useFormik({
    initialValues: {
      name: current ? current.name : '',
      handle: current ? current.handle : '',
      image: current ? current.image : '',
      box: current ? current.box : 1,
      damage: current ? current.damage : false
    },
    onSubmit: values => {
      onSubmit(values)
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Обязательное поле'),
      handle: Yup.string().required('Обязательное поле'),
      box: Yup.string().required('Обязательное поле')
    })
  });

  const {handleSubmit, ...props} = loginFormOptions;

  return (
      <form onSubmit={handleSubmit}>
        <InputField placeholder="Имя" name="name" {...props} />

        <InputField placeholder="Логин" name="handle" {...props} />

        <InputField placeholder="Ссылка на фото" name="image" {...props} />

        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <InputField name="box" type="select" label="Корзина" {...props}>
              <option value="1">Первая</option>
              <option value="2">Вторая</option>
              <option value="3">Третья</option>
            </InputField>
          </div>
          <div className="col-md-6">
            <InputField name="damage" type="checkbox" label="Травма" {...props} />
          </div>
        </div>

        <button className="btn btn-primary w-100">Сохранить</button>
      </form>
  );
};

export default React.memo(PostPlayerForm);
