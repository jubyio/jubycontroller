import React from 'react';
import { AsyncStorage } from 'react-native'
import { createEpicMiddleware } from 'redux-observable';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  AppReducer,
  undefined,
  compose(
    applyMiddleware(epicMiddleware),
    autoRehydrate()));

persistStore(store, { storage: AsyncStorage });

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
