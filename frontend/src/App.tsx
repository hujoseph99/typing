import React from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
  Redirect
} from 'react-router-dom';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { theme } from './theme';
import { MainMenu } from './features/main_menu/MainMenu';
import { RaceField } from './features/race-text-field/RaceField';
import { LoginPage } from './features/auth/LoginPage';

const App = (): JSX.Element => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/practice'>
            <RaceField />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/'>
            <MainMenu />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
};

export default App;
