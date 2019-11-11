import React, {useEffect} from 'react';
import {AppState} from '../../../../store/store';
import {getPlaydayReselect} from '../../../../store/selectors/playday';
import IPlayday from '../../../../types/interface/IPlayday';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getPlayday, updatePlayday} from '../../../../store/actions/playday';
import Spinner from '../../../Spinner';
import Team from '../../../Team/Team';
import PlaydayEditForm from './PlaydayEditForm';

interface Props {
  current: IPlayday | null
  match: any
  getPlayday: (id: string) => void
  updatePlayday: (id: string, data: any, history: any) => void
  size?: number,
  history: any
}

const PlaydayEditContainer: React.FC<Props> = (
    {
      current, getPlayday, updatePlayday,
      match: {params: {id}},
      history
    }
) => {

  useEffect(() => {
    getPlayday(id)
  }, [getPlayday, id]);

  if (!current) return <Spinner/>;

  const teamList = current.teams.map((team, idx) => (
          <div className="col-md-4 mt-3 mt-md-0" key={idx}>
            <Team players={team} title={`Команда ${idx + 1}`}/>
          </div>
      )
  );

  const onSubmit = (formData: any) => {
    updatePlayday(current._id, Object.values(formData), history)
  };

  return (
      <div className={`playday-edit-container`}>
        <h1>{current.name}</h1>

        <PlaydayEditForm
            onSubmit={onSubmit}
            current={current}
        />

        <div className={'row'}>
          {teamList}
        </div>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  current: getPlaydayReselect(state)
});


export default compose(
    connect(mapStateToProps, {getPlayday, updatePlayday})
)(PlaydayEditContainer);
