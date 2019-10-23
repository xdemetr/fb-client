import React from 'react';
import Team from '../../Team';

const GeneratorResult = React.memo(({result}) => {
  if (!result.length > 0) return  null;

  const genRes = result.map((team, idx) => {
    if (Object.keys(team).length === 0) return  null;

    return (
        <div className="col-md-4 mt-3 mt-md-0" key={idx}>
          <Team players={team} title={`Команда ${idx+1}`} />
        </div>
    )
  });

  return (
      <div className="jumbotron mt-3 pt-5 pb-5">
        <h2>Результаты</h2>

        <div className="row">
          {genRes}
        </div>
      </div>
  );
});

export default GeneratorResult;
