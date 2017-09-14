import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Welcomee',
    headerRight: <Button title='Setting'
      onPress={() => dispatch(NavigationActions.navigate({ routeName: 'setting' }))}
    />,
  });
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default Home;