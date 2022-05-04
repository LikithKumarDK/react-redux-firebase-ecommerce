import React from 'react';
import { Switch, Route } from 'react-router-dom';

// LAYOUTS
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// PAGES
import Homepage from './pages/Homepage'
import Registartion from './pages/Registration';

import './default.scss'

function App() {
  return (
    <div className="App">
      <React.Suspense>
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route exact path="/registration" render={() => (
            <MainLayout>
              <Registartion />
            </MainLayout>
          )} />
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
