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

type Props = {
  auth: {
    isAuth?: boolean
  }
  logoutUser: () => void
}

const AppHeader: React.FC<Props> = ({auth: {isAuth}, logoutUser}) => {

  const guestLinks = (
      <li className="nav-item">
        <NavLink to={ROUTE_LOGIN} className="nav-link">Войти</NavLink>
      </li>
  );

  const authLInks = (
      <>
        <li className="nav-item">
          <NavLink to={ROUTE_PLAYERS} className="nav-link">Игроки</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTE_NEW_PLAYER} className="nav-link">Добавить игрока</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTE_HOME} className="nav-link" onClick={() => logoutUser()}>Выход</NavLink>
        </li>
      </>
  );

  const navLinks = isAuth ? authLInks : guestLinks;

  const [showNavBar, setNavbarVisible] = useState(false);
  const onNavbarToggle = () => {
    setNavbarVisible(!showNavBar)
  };

  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="logo" className="mr-2" height="48"/>
            <span className="">Футбол в спортзале</span>
          </div>

          <Button className="navbar-toggler" onClick={onNavbarToggle}>
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className={cnames('collapse navbar-collapse', {'show': showNavBar})}>
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item">
                <NavLink to={ROUTE_GENERATOR} className="nav-link">Генератор</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={ROUTE_PLAYDAYS} className="nav-link">Результаты</NavLink>
              </li>
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
