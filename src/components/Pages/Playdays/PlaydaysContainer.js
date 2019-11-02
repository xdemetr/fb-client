import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getPlayday, getPlaydays} from '../../../store/actions/playdayActions';
import {getPlaydayReselect, getPlaydaysLoadingReselect, getPlaydaysReselect} from '../../../store/selectors/playday';
import PlaydaysList from './PlaydaysList';
import Spinner from '../../Spinner';
import Error from '../../Error/Error';
import PlaydaysDetails from './PlaydaysDetails';

const PlaydaysContainer = ({getPlaydays, getPlayday, list, loading, error, current, match: {params: {id}}}) => {
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
            <PlaydaysDetails playday={current}/>
          </div>
        </div>

      </div>
  )
};

const mapStateToProps = (state) => ({
  list: getPlaydaysReselect(state),
  loading: getPlaydaysLoadingReselect(state),
  current: getPlaydayReselect(state)
});

export default compose(
    connect(mapStateToProps, {getPlaydays, getPlayday})
)(React.memo(PlaydaysContainer))
