import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../store/actions/playday';
import { getAuthReselect } from '../../../store/selectors/auth';
import { getPlaydayReselect, getPlaydaysLoadingReselect, getPlaydaysReselect } from '../../../store/selectors/playday';
import { AppState } from '../../../store/store';

import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import PlaydaysDetails from './PlaydaysDetails';
import PlaydaysList from './PlaydaysList';

import { TXT_RESULTS } from '../../../const/Vars';
import IPlayday from '../../../types/interface/IPlayday';
import IPlaydayList from '../../../types/interface/IPlaydayList';

interface IProps {
  getPlaydays: () => void;
  getPlayday: (id: string) => void;
  list: IPlaydayList[];
  loading: boolean;
  error?: string;
  current: IPlayday | null;
  match: {
    params: {
      id: string | '';
    },
  };
  auth: {
    isAuth: boolean;
  };
}

const PlaydaysContainer: React.FC<IProps> = (
  {
    getPlaydays, getPlayday, list, loading,
    error, current, match: { params: { id } },
    auth: { isAuth },
  },
) => {
  useEffect(
    () => {
      getPlaydays();
      if (id) {
        getPlayday(id);
      }
    },
    [getPlaydays, getPlayday, id]);

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <Error message={error}/>;
  }

  return (
    <div className="playdays-page">
      <h1>{TXT_RESULTS}</h1>

      <div className="row">
        <div className="col-md-3 order-1 order-md-0 mt-4 mt-md-0">
          <PlaydaysList list={list} current={id}/>
        </div>

        <div className="col-md-9 order-0 order-md-1">
          <PlaydaysDetails playday={current} auth={isAuth}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state),
  current: getPlaydayReselect(state),
  list: getPlaydaysReselect(state),
  loading: getPlaydaysLoadingReselect(state),
});

const mapDispatchToProps = {
  getPlayday: actions.getPlayday,
  getPlaydays: actions.getPlaydays,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(React.memo(PlaydaysContainer));
