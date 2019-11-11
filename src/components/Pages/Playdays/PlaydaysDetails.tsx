import React from 'react';
import IPlayday from '../../../types/interface/IPlayday';
import Team from '../../Team/Team';
import {Link} from 'react-router-dom';
import {ROUTE_EDIT_PLAYDAY} from '../../../const/Routes';

interface Props {
  playday: IPlayday | null
}

const PlaydaysDetails: React.FC<Props> = ({playday}) => {

  if (!playday) return null;

  const teamList = playday.teams.map((team, idx) => (
          <div className="col-md-4 mt-3 mt-md-0" key={idx}>
            <Team players={team} title={`Команда ${idx + 1}`} goals={playday.goals[idx]}/>
          </div>
      )
  );

  return (
      <div className={`playdays-details`}>
        <h2 className="d-flex">
          {playday.name}
        </h2>

        <Link
            className="btn btn-primary mb-3"
            to={`${ROUTE_EDIT_PLAYDAY}${playday.name}`}>Редактировать</Link>

        <div className="row">
          {teamList}
        </div>
      </div>
  );
};

export default PlaydaysDetails;
