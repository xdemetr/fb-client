import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/actions/authActions';
import logo from './logo.svg';

const AppHeader = ({auth: {isAuth}, logoutUser}) => {

  const guestLinks = (
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">Войти</NavLink>
      </li>
  );

  const authLInks = (
      <>
        <li className="nav-item">
          <NavLink to="/players" className="nav-link">Игроки</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/new-player" className="nav-link">Добавить игрока</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" onClick={() => logoutUser()}>Выход</NavLink>
        </li>
      </>
  );

  const navLinks = isAuth ? authLInks : guestLinks;

  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="logo" className="mr-2" height="48" />
            <span className="">Футбол в спортзале</span>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/generator" className="nav-link">Генератор</NavLink>
            </li>
            {navLinks}
          </ul>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(AppHeader);
