import React from 'react';
import Error from '../../Error/Error';
import ITeam from '../../../types/interface/ITeam';
import Team from '../../Team/Team';
import Button from '../../general/Button/Button';

type Props = {
  result: ITeam[]
  errors?: string
  auth: {
    isAuth: boolean
  }
  onSaveResult: () => void
}

const GeneratorResult: React.FC<Props> = ({result, onSaveResult, errors, auth: {isAuth}}) => {
  if (!result.length) return null;

  const genRes = result.map((team: any, idx: number) => {
    if (Object.keys(team).length === 0) return null;

    return (
        <div className="col-md-4 mt-3 mt-md-0" key={idx}>
          <Team players={team} color={idx}/>
        </div>
    )
  });

  const SaveButton = () => {
    if (!isAuth) return null;
    return <Button onClick={onSaveResult}>Сохранить</Button>
  };


  return (
      <div className="jumbotron mt-3 pt-5 pb-5">
        <h2>Результаты</h2>

        <Error message={errors}/>

        <div className="row mb-4">
          {genRes}
        </div>

        <SaveButton/>
      </div>
  );
};

export default React.memo(GeneratorResult);
