import React from 'react';
import IPlayer from '../../../../types/interface/IPlayer';
import {useFormik} from 'formik';
import InputField from '../../../Form/InputField';

type Props = {
  id: number
  players: IPlayer[]
  onSubmit: (data: any, team: any) => void
}

const PlaydayAddPlayer: React.FC<Props> = ({players, id, onSubmit}) => {
  const loginFormOptions = useFormik({
    initialValues: {},
    onSubmit: values => {
      onSubmit(values, id)
    }
  });

  if (!players.length) return null;

  const options = players.map(({_id, name}: IPlayer) => {
    return <option value={_id} key={_id}>{name}</option>
  });

  const {handleSubmit, ...props} = loginFormOptions;

  return (
      <div className="playday-add-player mt-3 border-top pt-3 mt-3">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-8">
            <InputField name={`select_team_${id}`} type="select" {...props}>
              <option defaultValue={''}>Выбрать игрока</option>
              {options}
            </InputField>
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-info w-100 mt-1 mt-md-0" type="submit">Добавить</button>
          </div>
        </form>

      </div>
  );
};

export default PlaydayAddPlayer;
