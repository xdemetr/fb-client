import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {loginUser} from '../../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {getAuth} from '../../../store/selectors/auth';

const Login = ({loginUser, auth: {isAuth}}) => {

  const onSubmit = formData => {
    loginUser(formData);
  };

  if (isAuth) {
    return <Redirect to="/" />
  }

  return (
      <div className="login-page">
        <div className="col-md-6 m-auto">
          <h1>Войти</h1>
          <LoginForm onSubmit={onSubmit}/>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps, {loginUser})(Login);
