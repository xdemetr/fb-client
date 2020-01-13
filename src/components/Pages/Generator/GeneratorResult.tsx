import React from 'react';

import Error from 'components/Error';
import Button from 'components/general/Button';
import Team from 'components/Team';

import { TXT_RESULTS, TXT_SAVE } from 'const/Vars';
import ITeam from 'types/interface/ITeam';

interface IProps {
  result: ITeam[];
  errors?: string;
  auth: {
    isAuth: boolean;
  };
  onSaveResult: () => void;
}

const GeneratorResult: React.FC<IProps> = ({ result, onSaveResult, errors, auth: { isAuth } }) => {
  if (!result.length) {
    return null;
  }

  const results = result.map((team: any, idx: number) => {
    if (!Object.keys(team).length) {
      return null;
    }

    return (
      <div className="col-md-4 mt-3 mt-md-0" key={idx}>
        <Team players={team} color={idx}/>
      </div>
    );
  });

  const SaveButton = () => {
    if (!isAuth) {
      return null;
    }
    return <Button onClick={onSaveResult}>{TXT_SAVE}</Button>;
  };

  return (
    <div className="jumbotron mt-3 pt-5 pb-5">
      <h2>{TXT_RESULTS}</h2>

      <Error message={errors}/>

      <div className="row mb-4">
        {results}
      </div>

      <SaveButton/>
    </div>
  );
};

export default React.memo(GeneratorResult);
