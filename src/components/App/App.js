import React from 'react';
import AppHeader from '../AppHeader';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../Auth';
import {GeneratorContainer} from '../Pages';
import withSuspense from '../../hoc/withSuspense';

const PlayersContainer = React.lazy(() => import('../Pages/Players/PlayersContainer'));
const PostPlayer = React.lazy(() => import('../Pages/Players/PostPlayer/PostPlayer'));

const App = () => {
  return (
      <div className="app">
        <AppHeader/>

        <div className="container">
          <Switch>
            <Route path={`/login`} render={ () => <Login/> } />

            <Route path={`/generator`} render={ () => <GeneratorContainer/> } />
            <Route path={`/players`} render={withSuspense(PlayersContainer)} />

            <Route path={"/edit-player/:id"} render={withSuspense(PostPlayer)} />
            <Route path={`/new-player`} render={withSuspense(PostPlayer)} />

            <Redirect from={`/`} to={`/generator`} />
          </Switch>
        </div>
      </div>
  );
};

export default App;
