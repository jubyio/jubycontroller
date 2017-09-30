import React from 'react';
import { Text, View, Dimensions } from "react-native";
import { Button } from 'react-native-elements';
import GamepadEditor from './GamepadEditor';

class GamepadScreen extends React.Component {
  static navigationOptions = {
    title: 'Gamepad'

  };

  constructor(props) {
    super(props);
  }

  render() {
    var { height, width } = Dimensions.get('window');
    return (

      <View style={styles.main}>
        <GamepadEditor style={[styles.editor, { height: height, width: width }]} />
        <View style={styles.buttons}>
          <Button backgroundColor="#b6bab4" icon={{ name: 'check', size: 30, color: '#66b23e', buttonStyle: styles.icon }}
            onPress={() => this.props.navigation.dispatch({ type: 'Cancel' })}></Button>
          <Button backgroundColor="#d1493c" icon={{ name: 'close', size: 30, color: '#66b23e' }}
            onPress={() => this.props.navigation.dispatch({ type: 'Cancel' })}></Button>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'blue'
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
    backgroundColor: 'yellow'
  },
  icon: {
    margin: 0
  }
}

export default GamepadScreen;