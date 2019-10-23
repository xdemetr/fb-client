import React, {useEffect} from 'react';
import PostPlayerForm from './PostPlayerForm';
import {connect} from 'react-redux';
import {
  deletePlayer,
  getCurrentPlayer,
  postPlayer,
  resetCurrentPlayer,
  updatePlayer
} from '../../../../store/actions/playerActions';
import {getPlayerCurrentReselect} from '../../../../store/selectors/player';

const PostPlayer = React.memo((
    {match: {params: {id}},
      postPlayer, updatePlayer, deletePlayer, current,
      getCurrentPlayer, resetCurrentPlayer }
) => {
  useEffect(() => {
    if (id) {
      getCurrentPlayer(id);
    } else {
      resetCurrentPlayer();
    }
  }, [getCurrentPlayer, resetCurrentPlayer, id]);

  const onSubmit = formData => {
    if (!id) {
      postPlayer(formData);
    } else {
      updatePlayer(id, formData);
    }
  };

  const DeleteButton = () => {
    if (!id) return null;
    return (
        <span
            className="btn btn-sm btn-outline-danger w-100 mt-4"
            onClick={() => deletePlayer(id)}>Удалить</span>
    )
  };

  const title = id ? 'Редактирование игрока': 'Новый игрок';

  return (
      <div className="post-player-page col-md-6 m-auto">
        <h1>{title}</h1>

        <PostPlayerForm
            initialValues={current}
            onSubmit={onSubmit} id={id} player={current}/>

        <DeleteButton/>
      </div>
  );
});

const mapStateToProps = (state) => ({
  current: getPlayerCurrentReselect(state)
});

export default connect(mapStateToProps, {postPlayer, updatePlayer, deletePlayer, getCurrentPlayer, resetCurrentPlayer})(PostPlayer);
