import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getPlayday, getPlaydays} from '../../../store/actions/playday';
import {getPlaydayReselect, getPlaydaysLoadingReselect, getPlaydaysReselect} from '../../../store/selectors/playday';
import PlaydaysList from './PlaydaysList';
import Spinner from '../../Spinner';
import Error from '../../Error/Error';
import PlaydaysDetails from './PlaydaysDetails';
import IPlayday from '../../../types/interface/IPlayday';
import {AppState} from '../../../store/store';
import {getAuthReselect} from '../../../store/selectors/auth';

interface Props {
  getPlaydays: () => void
  getPlayday: (id: string) => void
  list: Array<{ _id: string, name: string }>
  loading: boolean
  error?: string
  current: IPlayday | null
  match: any,
  auth: {
    isAuth: boolean
  }
}

const PlaydaysContainer: React.FC<Props> = (
    {
      getPlaydays, getPlayday, list, loading,
      error, current, match: {params: {id}},
      auth: {isAuth}
    }
) => {
  useEffect(() => {
    getPlaydays();
    getPlayday(id)
  }, [getPlaydays, getPlayday, id]);

  if (loading) return <Spinner/>;

  if (error) return <Error message={error}/>;

  return (
      <div className="playdays-page">
        <h1>Результаты</h1>

        <div className="row">
          <div className="col-md-3 order-1 order-md-0 mt-4 mt-md-0">
            <PlaydaysList list={list} current={id}/>
          </div>

          <div className="col-md-9 order-0 order-md-1">
            <PlaydaysDetails playday={current} auth={isAuth}/>
          </div>
        </div>
      </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  list: getPlaydaysReselect(state),
  loading: getPlaydaysLoadingReselect(state),
  current: getPlaydayReselect(state),
  auth: getAuthReselect(state)
});

export default compose(
    connect(mapStateToProps, {getPlaydays, getPlayday})
)(React.memo(PlaydaysContainer))
