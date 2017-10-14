import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Icon } from 'react-native-elements';
import { LOCK_LANDSCAPE, ADD_GAMEPAD } from '../constants';

import GamepadList from './GamepadList';

import { initGamepad, editGamepad, deleteGamepad } from '../actions';

class GamepadsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Gamepads'
  });

  constructor(props) {
    super(props);
    this.state = { selectedGamepad: null };
  }

  onSelected = (gamepad) => {
    this.setState({ selectedGamepad: gamepad });
  }

  cleanSelectedGamepad = () => {
    this.setState({ selectedGamepad: null });
  }

  deleteGamepad = () => {
    this.props.deleteGamepad(this.state.selectedGamepad);
    this.setState({ selectedGamepad: null });
  }

  renderHeader = () => {
    if (this.state.selectedGamepad) {
      return (
        <Header
          backgroundColor="#5a83ce"
          leftComponent={
            <Icon style={styles.leftButton} name='arrow-back' size={30} color="#fff" onPress={this.cleanSelectedGamepad}></Icon>
          }
          centerComponent={{ text: this.state.selectedGamepad.name, style: { color: '#fff', fontSize: 18 } }}
          rightComponent={
            <Icon style={styles.rightButton} name='delete' size={30} color='#fff' onPress={this.deleteGamepad}></Icon>
          } />
      )
    } else {
      return (
        <Header
          backgroundColor="#5a83ce"
          centerComponent={{ text: 'GAMEPADS', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={
            <Icon style={styles.rightButton} name='add-circle-outline' size={30} color='#fff' onPress={this.createNewGamepad}></Icon>
          }
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.main}>
        {this.renderHeader()}
        <GamepadList navigation={this.props.navigation} style={styles.list} onSelected={this.onSelected} />
      </View>
    );
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  createNewGamepad = () => {
    const newGamepad = initGamepad();
    this.props.navigation.dispatch(editGamepad(newGamepad));
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Gamepad', params: { isInEdit: true, gamepad: newGamepad } }))
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
    flex: 1,
    backgroundColor: 'yellow'
  },
  leftButton: {
    alignSelf: 'flex-start',
    padding: 0,
    marginTop: 0,
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  deleteGamepad: (gamepad) => dispatch(deleteGamepad(gamepad.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamepadsScreen)