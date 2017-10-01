import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Icon } from 'react-native-elements';
import { LOCK_LANDSCAPE, ADD_GAMEPAD } from '../constants';

import GamepadList from './GamepadList';

import { initGamepad, lockToLandscape } from '../actions';

class GamepadsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Gamepads'
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <Header
          backgroundColor="#5a83ce"
          centerComponent={{ text: 'GAMEPADS', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={
            <Icon style={styles.rightButton} name='add-circle-outline' size={30} color='#fff'
              onPress={this.createNewGamepad}></Icon>
          }
        />
        <GamepadList navigation={this.props.navigation} style={styles.list} />
      </View>
    );
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  createNewGamepad = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Gamepad', params: { isInEdit: true, gamepad: initGamepad()} }))
    this.props.navigation.dispatch(lockToLandscape());
  }
}



const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 70
  },
  list: {
    flex:1,
    backgroundColor: 'yellow'
  },
  rightButton: {
    alignSelf: 'flex-end',
    padding: 0,
    marginTop: 0,
  },
  header: {
    bottom: 0,
    paddingRight: 0
  }
});

export default GamepadsScreen;


/*< */