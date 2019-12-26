import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import logo from './logo.svg';
import cnames from 'classnames';
import {
  ROUTE_GENERATOR,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEW_PLAYER,
  ROUTE_PLAYDAYS,
  ROUTE_PLAYERS
} from '../../const/Routes';
import {getAuthReselect} from '../../store/selectors/auth';
import {logoutUser} from '../../store/actions/auth';
import {AppState} from '../../store/store';
import Button from '../general/Button/Button';
import {
  TXT_ADD_PLAYER,
  TXT_GENERATOR,
  TXT_LOGIN,
  TXT_LOGOUT,
  TXT_PLAYERS,
  TXT_RESULTS,
  TXT_SITENAME
} from '../../const/Vars';

type Props = {
  auth: {
    isAuth?: boolean
  }
  logoutUser: () => void
}


const AppHeader: React.FC<Props> = ({auth: {isAuth}, logoutUser}) => {
  const links = [
    {
      link: ROUTE_GENERATOR, label: TXT_GENERATOR, access: 'all'
    },
    {
      link: ROUTE_PLAYDAYS, label: TXT_RESULTS, access: 'all'
    },
    {
      link: ROUTE_PLAYERS, label: TXT_PLAYERS, access: 'all'
    },
    {
      link: ROUTE_NEW_PLAYER, label: TXT_ADD_PLAYER, access: 'auth'
    },
    {
      link: ROUTE_LOGIN, label: TXT_LOGIN, access: 'guest'
    },
    {
      link: ROUTE_HOME, label: TXT_LOGOUT, access: 'auth', action: () => logoutUser()
    }
  ];

  const guestLinks = links.filter(el => (el.access === 'guest' || el.access === 'all')).map(link => {
    return (
        <li className="nav-item">
          <NavLink to={link.link} className="nav-link">{link.label}</NavLink>
        </li>
    )
  });

  const authLinks = links.filter(el => (el.access === 'auth' || el.access === 'all')).map(link => {
    return (
        <li className="nav-item">
          <NavLink to={link.link} className="nav-link" onClick={link.action}>{link.label}</NavLink>
        </li>
    )
  });

  const navLinks = isAuth ? authLinks : guestLinks;

  const [showNavBar, setNavbarVisible] = useState(false);
  const onNavbarToggle = () => {
    setNavbarVisible(!showNavBar)
  };

  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="logo" className="mr-2" height="48"/>
            <span>{TXT_SITENAME}</span>
          </div>

          <Button className="navbar-toggler" onClick={onNavbarToggle}>
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className={cnames('collapse navbar-collapse', {'show': showNavBar})}>
            <ul className="navbar-nav ml-md-auto">
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state)
});

export default connect(mapStateToProps, {logoutUser})(AppHeader);
