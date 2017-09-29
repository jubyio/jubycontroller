import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Button } from 'react-native-elements';
import NewGamepadButton from './NewGamepadButton';

class GamepadsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Gamepads',
    headerRight: <Button title='Ajouter'
    />,
  });

  // onPress={() => navigation.navigate('Gamepad')}
  render() {
    return (
      <View style={styles.main}>
        <Header
          backgroundColor="#5a83ce"
          centerComponent={{ text: 'GAMEPADS', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={<NewGamepadButton/>}
        />
        <Text>Liste des controllers</Text>
      </View>
    );
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    height: 50
  }
});



export default GamepadsScreen;