import React from 'react';

import AppHeader from 'components/AppHeader';
import { Login } from 'components/Auth';
import GeneratorContainer from 'components/Pages/Generator/GeneratorContainer';
import PlaydayEditContainer from 'components/Pages/Playdays/Edit/PlaydayEditContainer';

import { Redirect, Route, Switch } from 'react-router-dom';

import {
  ROUTE_EDIT_PLAYDAY,
  ROUTE_EDIT_PLAYER,
  ROUTE_GENERATOR,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEW_PLAYER,
  ROUTE_PLAYDAYS,
  ROUTE_PLAYERS,
} from 'const/Routes';

import withSuspense from 'hoc/withSuspense';

const PLAYERS_CONTAINER = React.lazy((): any => import('../Pages/Players/PlayersContainer'));
const PLAYER_VIEW = React.lazy((): any => import('../Pages/Players/View/PlayerView'));
const POST_PLAYER = React.lazy((): any => import('../Pages/Players/PostPlayer/PostPlayer'));
const PLAYDAYS_CONTAINER = React.lazy((): any => import('../Pages/Playdays/PlaydaysContainer'));
const App: React.FC<{}> = () => {
  return (
    <div className="app">
      <AppHeader/>

      <div className="container">
        <Switch>
          <Route path={ROUTE_LOGIN} component={Login}/>

          <Route path={ROUTE_GENERATOR} component={GeneratorContainer}/>
          <Route path={ROUTE_PLAYERS} exact={true} component={withSuspense(PLAYERS_CONTAINER)}/>
          <Route path={`${ROUTE_PLAYERS}:handle?`} component={withSuspense(PLAYER_VIEW)}/>
          <Route path={`${ROUTE_PLAYDAYS}:id?`} component={withSuspense(PLAYDAYS_CONTAINER)}/>
          <Route path={`${ROUTE_EDIT_PLAYDAY}:id?`} component={withSuspense(PlaydayEditContainer)}/>

          <Route path={`${ROUTE_EDIT_PLAYER}:id`} component={withSuspense(POST_PLAYER)}/>
          <Route path={ROUTE_NEW_PLAYER} component={withSuspense(POST_PLAYER)}/>

          <Redirect from={ROUTE_HOME} to={ROUTE_GENERATOR}/>
        </Switch>
      </div>
    </div>
  );
};

export default App;
