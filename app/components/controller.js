import React from 'react';
import { Text, View } from "react-native";

export default class Controller extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return <Text>Settings Page!</Text>;
  }
}