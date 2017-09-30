import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import {connect} from 'react-redux';

import { ADD_STICK } from '../constants';

import { Button } from 'react-native-elements'


const GamepadEditor = ({ gamepad }) => (
    <View style={{flex: 1, backgroundColor: 'green'}}>
        <Button backgroundColor="#80f442" style={styles.padButton} icon={{name: 'videogame-asset', size: 35}}></Button>
    </View>
);

const styles = {
    padButton: {
        position: 'absolute',
        top: 0,
        right: 0
    }
}

GamepadEditor.propTypes = {
    gamepad: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    gamepad: state.nav.currentGamepad
});

const mapDispatchToProps = dispatch => ({
    addStick: dispatch({ type: ADD_STICK })
});

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditor)

