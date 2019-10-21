import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAuth} from '../store/selectors/auth';

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {

    render() {
      const {isAuth} = this.props.auth;

      if (!isAuth) return <Redirect to={`/login`}/>;

      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    auth: getAuth(state)
  });

  return connect(mapStateToProps, null)(RedirectComponent);
};

export default withAuthRedirect;
