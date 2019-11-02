import React from 'react';
import AppHeader from '../AppHeader';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../Auth';
import {GeneratorContainer} from '../Pages';
import withSuspense from '../../hoc/withSuspense';
import {
  ROUTE_EDIT_PLAYER,
  ROUTE_GENERATOR,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEW_PLAYER,
  ROUTE_PLAYDAYS,
  ROUTE_PLAYERS
} from '../../const/Routes';

const PlayersContainer = React.lazy((): any => import('../Pages/Players/PlayersContainer'));
const PostPlayer = React.lazy((): any => import('../Pages/Players/PostPlayer/PostPlayer'));
const PlaydaysContainer = React.lazy((): any => import('../Pages/Playdays/PlaydaysContainer'));

const App: React.FC<{}> = () => {
  return (
      <div className="app">
        <AppHeader/>

        <div className="container">
          <Switch>
            <Route path={ROUTE_LOGIN} render={() => <Login/>}/>

            <Route path={ROUTE_GENERATOR} render={() => <GeneratorContainer/>}/>
            <Route path={ROUTE_PLAYERS} render={withSuspense(PlayersContainer)}/>
            <Route path={`${ROUTE_PLAYDAYS}:id?`} render={withSuspense(PlaydaysContainer)}/>

            <Route path={`${ROUTE_EDIT_PLAYER}:id`} render={withSuspense(PostPlayer)}/>
            <Route path={ROUTE_NEW_PLAYER} render={withSuspense(PostPlayer)}/>

            <Redirect from={ROUTE_HOME} to={ROUTE_GENERATOR}/>
          </Switch>
        </div>
      </div>
  );
};

export default App;
