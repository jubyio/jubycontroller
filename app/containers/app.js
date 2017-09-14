import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomeScreen from '../components/home';
import AppReducer from '../reducers';
import AppWithNavigationState from '../navigators/appNavigator';

export default class App extends React.Component {
  store = createStore(AppReducer);
  
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}