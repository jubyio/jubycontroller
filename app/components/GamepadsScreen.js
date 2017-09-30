import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Button } from 'react-native-elements';
import { LOCK_LANDSCAPE } from '../constants';

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
            <Button style={styles.rightButton} backgroundColor="red" icon={{ name: 'add-circle-outline', size: 32, color: '#fff' }}
              onPress={this.createNewGamepad}></Button>
          }
        />
        <List style={styles.list}></List>
      </View>
    );
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  createNewGamepad = () => {
    this.props.navigation.dispatch({ type: 'NewGamepad' });
    this.props.navigation.dispatch({ type: LOCK_LANDSCAPE });
  }
}



const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  list: {
    flex: 1,
    marginTop: 70,
    backgroundColor: 'yellow'
  },
  rightButton: {
    alignSelf: 'flex-end',
    padding: 0,
    marginTop: 10,
    bottom: 0
  },
  header: {
    bottom: 0,
    paddingRight: 0
  }
});

export default GamepadsScreen;


/*< */