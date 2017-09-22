import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Button } from 'react-native-elements';

class Gamepads extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Gamepads',
    headerRight: <Button title='Ajouter'
    />,
  });

  // onPress={() => navigation.navigate('Gamepad')}
  render() {
    return <View>
      <Header
        backgroundColor="#5a83ce"
        centerComponent={{ text: 'GAMEPAD', style: { color: '#fff', fontSize: 18} }}
        rightComponent={<rightButton/>}
      />
      <List>

      </List>
    </View>;
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
}

const rightButton = ({}) => {
  return(
    <Button icon={{ icon: 'add-circle-outline', color: '#fff', fontSize: 18 }} onPress={()=> {onAddGamepad({})}}></Button>
  )
}

export default Gamepads;