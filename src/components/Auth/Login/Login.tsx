import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getAuthReselect} from '../../../store/selectors/auth';
import {loginUser} from '../../../store/actions/auth';
import {AppState} from '../../../store/store';
import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import {TXT_PAGE_LOGIN} from '../../../const/Vars';

type Props = {
  auth: {
    isAuth: boolean
    error?: string
    loading: boolean
  }
  loginUser: (formData: { email: string, password: string }) => void
}

const Login: React.FC<Props> = ({loginUser, auth: {isAuth, error, loading}}) => {

  const onSubmit = (formData: { email: string, password: string }) => {
    loginUser(formData);
  };

  if (loading) {
    return <Spinner/>;
  }

  if (isAuth) {
    return <Redirect to="/"/>
  }

  return (
      <div className="login-page">
        <div className="col-md-6 m-auto">
          <h1>{TXT_PAGE_LOGIN}</h1>

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
