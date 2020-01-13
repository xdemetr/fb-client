import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from 'store/actions/player';
import { getPlayerCurrentReselect, getPlayerLoadingReselect } from 'store/selectors/player';
import { AppState } from 'store/store';

import Spinner from 'components/Spinner';
import PostPlayerForm from './PostPlayerForm';

import { TXT_DELETE, TXT_PAGE_ADD_PLAYER, TXT_PAGE_EDIT_PLAYER } from 'const/Vars';
import withAuthRedirect from 'hoc/withAuthRedirect';

interface IProps {
  history: any;
  postPlayer: (formData: any, history: any) => void;
  updatePlayer: (id: string, formData: any, history: any) => void;
  deletePlayer: (id: string, history: any) => void;
  current: any;
  getCurrentPlayer: (id: string) => void;
  resetCurrentPlayer: () => void;
  match: any;
  loading?: boolean;
}

const PostPlayer: React.FC<IProps> = (
  {
    match: { params: { id } },
    postPlayer, updatePlayer, deletePlayer, current,
    getCurrentPlayer, resetCurrentPlayer, history, loading,
  },
) => {
  useEffect(
    () => {
      if (id) {
        getCurrentPlayer(id);
      } else {
        resetCurrentPlayer();
      }
    },
    [getCurrentPlayer, resetCurrentPlayer, id]);

  const onSubmit = (formData: any) => {
    if (!id) {
      postPlayer(formData, history);
    } else {
      updatePlayer(id, formData, history);
    }
  };

  const DeleteButton = () => {
    if (!id) {
      return null;
    }
    return (
      <span
        className="btn btn-sm btn-outline-danger w-100 mt-4"
        onClick={() => deletePlayer(id, history)}
      >
        {TXT_DELETE}
      </span>
    );
  };

  const title = id ? TXT_PAGE_EDIT_PLAYER : TXT_PAGE_ADD_PLAYER;

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="post-player-page col-md-6 m-auto">
      <h1>{title}</h1>

      <PostPlayerForm
        onSubmit={onSubmit}
        current={current}
      />
      <DeleteButton/>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  current: getPlayerCurrentReselect(state),
  loading: getPlayerLoadingReselect(state),
});

const mapDispatchToProps = ({
  deletePlayer: actions.deletePlayer,
  getCurrentPlayer: actions.getCurrentPlayer,
  postPlayer: actions.postPlayer,
  resetCurrentPlayer: actions.resetCurrentPlayer,
  updatePlayer: actions.updatePlayer,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(React.memo(PostPlayer));
