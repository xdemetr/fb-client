import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {required} from '../../../../utils/validators';
import {Checkbox, Input, Select} from '../../../Form/Input';
import Spinner from '../../../Spinner';

const PostPlayerForm = React.memo(({handleSubmit, initialValues}) => {
  if (!initialValues) return <Spinner/>;

  return (
      <form onSubmit={handleSubmit}>
        <Field
            validate={[required]}
            component={Input} placeholder="Имя" name={"name"}/>

        <Field
            validate={[required]}
            component={Input} placeholder="Логин" name={"handle"}/>

        <Field
            validate={[]}
            component={Input} placeholder="Ссылка на фото" name={"image"}/>

        <Field
            validate={[required]}
            component={Select} placeholder="Корзина" name={"box"}>
          <option value="1">Первая</option>
          <option value="2">Вторая</option>
          <option value="3">Третья</option>
        </Field>

        <Field
            validate={[]}
            label={"Травма"}
            id={`damage`}
            component={Checkbox} placeholder="Травма" name={"damage"}/>

        <button className="btn btn-primary w-100">Сохранить</button>
      </form>
  );
});

export default reduxForm({
  form: 'post-player',
  enableReinitialize: true
})(PostPlayerForm);
