import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_EDIT_PLAYER, ROUTE_PLAYERS} from '../../../const/Routes';
import IPlayer from '../../../types/interface/IPlayer';

interface Props {
  list: IPlayer[]
}

const Players: React.FC<Props> = ({list}) => {
  const playerList = list.map(({name, image, box, _id: id, handle, damage}) => {
    const damageClass = damage ? 'card-muted' : '';

    return (
        <div className="col-sm-3 mb-4" key={id}>
          <div className={`card bg-light ${damageClass}`}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                    className="rounded-circle border-dark border"
                    src={image} alt={name} width="40"/>

                <h5 className="card-title mb-0 ml-2">
                  <Link to={`${ROUTE_PLAYERS}${handle}`}>{name}</Link>
                </h5>
                <span className="badge badge-pill badge-info ml-auto">{box}</span>
              </div>

              <div className="card-footer p-0 text-right mt-3">
                <Link to={`${ROUTE_EDIT_PLAYER}${id}`} className="card-link small">изменить</Link>
              </div>
            </div>
          </div>
        </div>
    )
  });

  return (
      <div className="row">
        {playerList}
      </div>
  );
};

export default React.memo(Players);
