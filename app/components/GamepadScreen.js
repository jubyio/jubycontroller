import React from 'react';
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { Button, Icon } from 'react-native-elements';

import GamepadEditor from './GamepadEditor';
import Gamepad from './Gamepad';

import { SAVE_GAMEPAD, CANCEL_GAMEPAD } from '../constants';
import { saveGamepad } from '../actions';

class GamepadScreen extends React.Component {
  static navigationOptions = {
    title: 'Gamepad'

  };

  constructor(props) {
    super(props);
    this.state = { isInEdit: props.navigation.state.params.isInEdit }
    this.gamepad = props.navigation.state.params.gamepad;
  }

  switchToEdit = () => {
    this.setState({ isInEdit: true });
  }

  renderValidateEditButton = () => {
    if (this.state.isInEdit) {
      return <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
        name='check' size={36} color='#66b23e' onPress={() => this.goBack(true)} />
    } else {
      return <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
        name='setting' size={36} color='#61b7ed' onPress={this.switchToEdit} />
    }
  }

  renderEditor = () => {
    if (this.state.isInEdit) {
      return (<GamepadEditor style={[styles.editor]} gamepad={this.gamepad} />);
    } else {
      return (<Gamepad style={[styles.editor]} gamepad={this.gamepad} />);
    }
  }

  render() {
    return (

      <View style={styles.main}>
        {this.renderEditor()}
        <View style={[styles.buttons]}>
          {this.renderValidateEditButton()}
          <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon} name='close' size={36} color='#d64455' onPress={() => this.goBack(false)} />
        </View>
      </View>

    )
  }

  goBack = (save) => {
    if (save) {
      this.props.navigation.dispatch(saveGamepad(this.gamepad))
    }
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    margin: 0
  },
  editor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor: 'yellow'
  },
  icon: {
    width: 40,
    height: 40,
    padding: 2
  },
  iconContainer: {
    backgroundColor: '#61b7ed'
  }
})

export default GamepadScreen;