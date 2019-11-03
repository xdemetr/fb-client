import React from 'react';
import IPlayday from '../../../types/interface/IPlayday';
import Team from '../../Team/Team';

interface Props {
  playday: IPlayday | null
}

const PlaydaysDetails:React.FC<Props> = ({playday}) => {

  if (!playday) return null;

  console.log(playday);

  const teamList = playday.teams.map((team, idx) => (
          <div className="col-md-4 mt-3 mt-md-0" key={idx}>
            <Team players={team} title={`Команда ${idx + 1}`}/>
          </div>
      )
  );

  return (
      <div className={`playdays-details`}>
        <h2>{playday.name}</h2>
        <div className="row">
          {teamList}
        </div>
      </div>
  );
};

export default PlaydaysDetails;
