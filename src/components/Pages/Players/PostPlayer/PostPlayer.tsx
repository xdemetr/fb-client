import React, {useEffect} from 'react';
import PostPlayerForm from './PostPlayerForm';
import {connect} from 'react-redux';
import {
  deletePlayer,
  getCurrentPlayer,
  postPlayer,
  resetCurrentPlayer,
  updatePlayer
} from '../../../../store/actions/player';
import {getPlayerCurrentReselect, getPlayerLoadingReselect} from '../../../../store/selectors/player';
import withAuthRedirect from '../../../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppState} from '../../../../store/store';
import Spinner from '../../../Spinner';

interface Props {
  history: any
  postPlayer: (formData: any, history: any) => void
  updatePlayer: (id: string, formData: any, history: any) => void
  deletePlayer: (id: string, history: any) => void
  current: any
  getCurrentPlayer: (id: string) => void
  resetCurrentPlayer: () => void
  match: any
  loading: boolean
}

const PostPlayer: React.FC<Props> = (
    {
      match: {params: {id}},
      postPlayer, updatePlayer, deletePlayer, current,
      getCurrentPlayer, resetCurrentPlayer, history, loading
    }
) => {
  useEffect(() => {
    if (id) {
      getCurrentPlayer(id);
    } else {
      resetCurrentPlayer();
    }
  }, [getCurrentPlayer, resetCurrentPlayer, id]);

  const onSubmit = (formData: any) => {
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

  if (loading) return <Spinner/>;

  return (
      <div className="post-player-page col-md-6 m-auto">
        <h1>{title}</h1>

        <PostPlayerForm
            initialValues={current}
            onSubmit={onSubmit}
        />
        <DeleteButton/>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  current: getPlayerCurrentReselect(state),
  loading: getPlayerLoadingReselect(state)
});

const mapDispatchToProps = ({
  postPlayer, updatePlayer, deletePlayer, getCurrentPlayer, resetCurrentPlayer
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(React.memo(PostPlayer));
