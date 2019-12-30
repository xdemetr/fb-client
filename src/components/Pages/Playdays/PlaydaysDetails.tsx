import React from 'react';

import Team from '../../Team/Team';

import { Link } from 'react-router-dom';
import { ROUTE_EDIT_PLAYDAY } from '../../../const/Routes';
import { TXT_EDIT } from '../../../const/Vars';
import IPlayday from '../../../types/interface/IPlayday';

interface IProps {
  playday: IPlayday | null;
  auth: boolean;
}

const PlaydaysDetails: React.FC<IProps> = ({ playday, auth }) => {

  if (!playday) {
    return null;
  }

  const teamList = playday.teams.map((team, idx) => (
      <div className="col-md-4 mt-3 mt-md-0" key={idx}>
        <Team
          players={team}
          goals={playday.goals[idx]}
          color={idx}
          view="compact"
        />
      </div>
    ),
  );

  const EditLink = () => {
    return (
      <Link
        className="btn btn-primary mb-3"
        to={`${ROUTE_EDIT_PLAYDAY}${playday._id}`}
      >
        {TXT_EDIT}
      </Link>
    );
  };

  const editLink = auth ? <EditLink/> : null;

  return (
    <div className="playdays-details">
      <h2 className="d-flex">
        {playday.name}
      </h2>

      {editLink}

      <div className="row">
        {teamList}
      </div>
    </div>
  );
};

export default PlaydaysDetails;
