import React from 'react';
import ReactDom from 'react-dom';
import { connect, Provider } from 'react-redux';
import firebase from 'firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';

import ArithmeticSolver, { ArithmeticProblem } from './solver';
import { instance as storeInstance } from './state/store';
import { instance as actionsInstance } from './state/actions';
import { instance as reducerInstance } from './state/reducer';
import { instance as selectorsInstance } from './state/selectors';

import Root from './ui/controllers/Root';

export function init({ firebaseApiKey, firebaseId, mountElement }) {

  // initialize logger (console for demo purposes)
  const logger = console;

  // initialize firebase
  firebase.initializeApp({
    apiKey: firebaseApiKey,
    authDomain: `${firebaseId}.firebaseapp.com`,
    databaseURL: `https://${firebaseId}.firebaseio.com`,
    storageBucket: `${firebaseId}.appspot.com`
  });

  // instantiate solver
  const solver = new ArithmeticSolver();

  // initialize selectors
  const selectors = selectorsInstance({ logger });

  // initialize action creators
  const { actions, actionTypes } = actionsInstance({ logger, firebase, solver, selectors });

  // initialize reducer
  const reducer = reducerInstance({ logger, actionTypes });

  // initialize redux store
  const store = storeInstance({}, { reducer });

  // initialize root component
  const RootComponent = Root({ logger, actions, selectors });

  // render layout in provider with the two connected components injected
  ReactDom.render(
    <Provider store={store}>
      <MuiThemeProvider theme={createMuiTheme({
        palette: {
          primary: green,
          secondary: blue
        }
      })}>
        <RootComponent />
      </MuiThemeProvider>
    </Provider>,
    mountElement
  );

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(actions.authLogin(user.uid));
    } else {
      store.dispatch(actions.authLogout());
    }
  });

  firebase.auth().signInAnonymously().catch(function(error) {
    store.dispatch(actions.authFail(error.code, error.message));
  })

}
