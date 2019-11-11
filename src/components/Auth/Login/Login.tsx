import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getAuthReselect} from '../../../store/selectors/auth';
import {loginUser} from '../../../store/actions/auth';
import {AppState} from '../../../store/store';
import Error from '../../Error/Error';

interface Props {
  auth: {
    isAuth: boolean,
    error?: string
  }
  loginUser: (formData: any) => void
}

const Login: React.FC<Props> = ({loginUser, auth: {isAuth, error}}) => {

  const onSubmit = (formData: any) => {
    loginUser(formData);
  };

  if (isAuth) {
    return <Redirect to="/"/>
  }

  return (
      <div className="login-page">
        <div className="col-md-6 m-auto">
          <h1>Войти</h1>

          <Error message={error}/>
          <LoginForm onSubmit={onSubmit}/>
        </div>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state)
});

export default connect(mapStateToProps, {loginUser})(React.memo(Login));
