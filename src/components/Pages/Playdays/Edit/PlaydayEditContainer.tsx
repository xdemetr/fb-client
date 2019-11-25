import React, {useEffect} from 'react';
import {AppState} from '../../../../store/store';
import {getPlaydayReselect} from '../../../../store/selectors/playday';
import IPlayday from '../../../../types/interface/IPlayday';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getPlayday, updatePlayday} from '../../../../store/actions/playday';
import Spinner from '../../../Spinner/Spinner';
import Team from '../../../Team/Team';
import PlaydayEditForm from './PlaydayEditForm';

type Props = {
  current: IPlayday | null
  match: any
  getPlayday: (id: string) => void
  updatePlayday: (id: string, name: string, data: any, history: any) => void
  size?: number
  history: any
}

type PropsFormData = {
  id: string
  name: string
  res1: number
  res2: number
  res3?: number
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

  const {_id: currentId, name} = current;

  const teamList = current.teams.map((team, idx) => (
          <div className="col-md-4 mt-3 mt-md-0" key={idx}>
            <Team players={team} title={`Команда ${idx + 1}`} color={idx}/>
          </div>
      )
  );

  const onSubmit = (formData: PropsFormData) => {
    updatePlayday(currentId, name, Object.values(formData), history)
  };

  return (
      <div className={`playday-edit-container`}>
        <h1>{name}</h1>

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
