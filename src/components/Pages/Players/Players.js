import React from 'react';
import {Link} from 'react-router-dom';

const Players = React.memo(({list}) => {
  const playerList = list.map(({name, image, box, _id: id, handle, damage}) => {
    const damageClass = damage ? 'card-muted': '';

    return(
        <div className="col-sm-3 mb-4" key={id}>
          <div className={`card bg-light ${damageClass}`}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                    className="rounded-circle border-dark border"
                    src={image} alt={name} width="40" />

                <h5 className="card-title mb-0 ml-2">
                  <Link to={`/players/${handle}`}>{name}</Link>
                </h5>
                <span className="badge badge-pill badge-info ml-auto">{box}</span>
              </div>

              <div className="card-footer p-0 text-right mt-3">
                <Link to={`edit-player/${id}`} className="card-link small">изменить</Link>
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
});

export default Players;
