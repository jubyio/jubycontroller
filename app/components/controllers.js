import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

class Controllers extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Contrôleur',
    headerRight: <Button title='Ajouter'
      onPress={() => navigation.navigate('Setting') }
    />,
  });
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

export default Controllers;