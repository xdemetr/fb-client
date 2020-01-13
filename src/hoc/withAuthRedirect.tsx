import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAuthReselect } from 'store/selectors/auth';
import { AppState } from 'store/store';

const withAuthRedirect = (Component: any) => {
  class RedirectComponent extends React.Component<{ auth: { isAuth: boolean } }> {

    public render() {
      const { isAuth } = this.props.auth;

      if (!isAuth) {
        return <Redirect to={'/login'}/>;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: AppState) => ({
    auth: getAuthReselect(state),
  });

  return connect(mapStateToProps, {})(RedirectComponent);
};

export default withAuthRedirect;
