'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Navigator,
  Text,
  StatusBar,
} from 'react-native';
import { Router, Route, Scene, Animations, TabBar } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
const RouterWithRedux = connect()(Router);

import Splash from './splash';

class RootRouter extends Component {
  constructor(props) {
    super(props);

  }

  renderScene(route, navigator) {
    var { state, actions } = this.props;
    var routeId = route.id;
    
    if (routeId === 'Splash') {
      return (
        <Splash
          {...this.props}
          navigator={navigator} />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <Navigator
          style={{ flex: 1 }}
          initialRoute={{ id: 'Splash', name: 'Splash' }}
          renderScene={this.renderScene.bind(this)}
        /></View>
    );
  }

}

export default connect(state => ({
  state: state.SnapChat
}),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(RootRouter);