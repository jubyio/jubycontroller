import React from 'react';
import { AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import { persistStore, autoRehydrate } from 'redux-persist'

const store = createStore(
  AppReducer,
  undefined,
  compose(autoRehydrate()));

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
