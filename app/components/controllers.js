import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';

class Controllers extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Contrôleurs',
    headerRight: <Button title='Ajouter'
      onPress={() => navigation.navigate('Controller') }
    />,
  });
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
  componentDidMount() {
    StatusBar.setHidden(true);
 }
}

export default Controllers;