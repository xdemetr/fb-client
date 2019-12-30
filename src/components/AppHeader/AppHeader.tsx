import React, { useState } from 'react';
import * as actions from '../../store/actions/auth';

import cnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAuthReselect } from '../../store/selectors/auth';
import { AppState } from '../../store/store';

import Button from '../general/Button/Button';
import logo from './logo.svg';

import {
  ROUTE_GENERATOR,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEW_PLAYER,
  ROUTE_PLAYDAYS,
  ROUTE_PLAYERS,
} from '../../const/Routes';
import {
  TXT_ADD_PLAYER,
  TXT_GENERATOR,
  TXT_LOGIN,
  TXT_LOGOUT,
  TXT_PLAYERS,
  TXT_RESULTS,
  TXT_SITENAME,
} from '../../const/Vars';

interface IProps {
  auth: {
    isAuth?: boolean;
  };
  logoutUser: () => void;
}

const AppHeader: React.FC<IProps> = ({ auth: { isAuth }, logoutUser }) => {
  const links = [
    {
      access: 'all', label: TXT_GENERATOR, link: ROUTE_GENERATOR,
    },
    {
      access: 'all', label: TXT_RESULTS, link: ROUTE_PLAYDAYS,
    },
    {
      access: 'all', label: TXT_PLAYERS, link: ROUTE_PLAYERS,
    },
    {
      access: 'auth', label: TXT_ADD_PLAYER, link: ROUTE_NEW_PLAYER,
    },
    {
      access: 'guest', label: TXT_LOGIN, link: ROUTE_LOGIN,
    },
    {
      access: 'auth', action: () => logoutUser(), label: TXT_LOGOUT, link: ROUTE_HOME,
    },
  ];

  const guestLinks = links
    .filter(el => (el.access === 'guest' || el.access === 'all'))
    .map((link: any, idx: number) => {
      return (
        <li className="nav-item" key={idx}>
          <NavLink to={link.link} className="nav-link">{link.label}</NavLink>
        </li>
      );
    });

  const authLinks = links
    .filter(el => (el.access === 'auth' || el.access === 'all'))
    .map((link: any, idx: number) => {
      return (
        <li className="nav-item" key={idx}>
          <NavLink
            to={link.link}
            className="nav-link"
            onClick={link.action}
          >{link.label}
          </NavLink>
        </li>
      );
    });

  const navLinks = isAuth ? authLinks : guestLinks;

  const [showNavBar, setNavbarVisible] = useState(false);
  const onNavbarToggle = () => {
    setNavbarVisible(!showNavBar);
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" className="mr-2" height="48"/>
          <span>{TXT_SITENAME}</span>
        </div>

        <Button className="navbar-toggler" onClick={onNavbarToggle}>
          <span className="navbar-toggler-icon">&nbsp;</span>
        </Button>

        <div className={cnames('collapse navbar-collapse', { show: showNavBar })}>
          <ul className="navbar-nav ml-md-auto">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuthReselect(state),
});

export default connect(
  mapStateToProps,
  { logoutUser: actions.logoutUser },
)(AppHeader);
