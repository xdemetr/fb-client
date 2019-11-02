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
import withAuthRedirect from '../../../../hoc/withAuthRedirect';
import {compose} from 'redux';

const PostPlayer = React.memo((
    {
      match: {params: {id}},
      postPlayer, updatePlayer, deletePlayer, current,
      getCurrentPlayer, resetCurrentPlayer, history
    }
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
      postPlayer(formData, history);
    } else {
      updatePlayer(id, formData, history);
    }
  };

  const DeleteButton = () => {
    if (!id) return null;
    return (
        <span
            className="btn btn-sm btn-outline-danger w-100 mt-4"
            onClick={() => deletePlayer(id, history)}>Удалить</span>
    )
  };

  const title = id ? 'Редактирование игрока' : 'Новый игрок';

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

const mapDispatchToProps = ({
  postPlayer, updatePlayer, deletePlayer, getCurrentPlayer, resetCurrentPlayer
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(PostPlayer);
