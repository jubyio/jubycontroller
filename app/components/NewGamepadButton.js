import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation';

const NewGamePadButton = ({createNewgamePad}) => (
    <Button icon={{ icon: 'add-circle-outline', color: '#fff', fontSize: 15 }} onPress={createNewgamePad}></Button>
)

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createNewgamePad: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Gamepad' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGamePadButton);

