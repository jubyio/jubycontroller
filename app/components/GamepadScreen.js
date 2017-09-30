import React from 'react';
import { Text, View, Dimensions } from "react-native";
import { Button, Icon } from 'react-native-elements';
import GamepadEditor from './GamepadEditor';

class GamepadScreen extends React.Component {
  static navigationOptions = {
    title: 'Gamepad'

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.main}>
        <GamepadEditor style={[styles.editor]} />
        <View style={styles.buttons}>
          <Icon containerStyle={{backgroundColor:'#61b7ed'}} style={styles.icon} name='check' size={30} color='#66b23e' onPress={() => this.props.navigation.dispatch({ type: 'Cancel' })}/>
          <Icon containerStyle={{backgroundColor:'#61b7ed'}} style={styles.icon} name='close' size={30} color='#d64455' onPress={() => this.props.navigation.dispatch({ type: 'Cancel' })}/>
        </View>
      </View>

    )
  }

  goBack = (save) => {
    if (save) {
      this.props.navigation.dispatch({ type: 'Save' })
    } else {
      this.props.navigation.dispatch({ type: 'Cancel' })
    }
  }
}

const styles = {
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    margin:0,
    backgroundColor: 'yellow'
  },
  icon: {
    width:40,
    height:40
  },
  iconContainer:{
    backgroundColor:'#61b7ed'
  }
}

export default GamepadScreen;