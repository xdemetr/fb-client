import React from 'react';
import AppHeader from '../AppHeader';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../Auth';
import {GeneratorContainer, PlayersContainer, PostPlayer} from '../Pages';

const App = () => {
  return (
      <div className="app">
        <AppHeader/>

        <div className="container">
          <Switch>
            <Route path={`/login`} render={ () => <Login/> } />

            <Route path={`/generator`} render={ () => <GeneratorContainer/> } />
            <Route path={`/players`} render={ () => <PlayersContainer/> } />

            <Route path={"/edit-player/:id"} component={PostPlayer} />
            <Route path={`/new-player`} component={PostPlayer} />

            <Redirect from={`/`} to={`/generator`} />
          </Switch>
        </div>
      </div>
  );
};

export default App;
