import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { connect } from 'react-redux';

import { ADD_STICK } from '../constants';

import { Button, Icon, SideMenu } from 'react-native-elements'


const GamepadEditor = ({ gamepad }) => {
    return (
        <View style={[styles.buttons, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' }]}>
            <Icon style={styles.padButton} name='videogame-asset' size={30}></Icon>
            <Icon style={styles.padButton} name='settings' size={30}></Icon>
        </View>
    )
};

const styles = {
    buttons: {
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    padButton: {
        width: 40,
        height: 40,
        padding: 0,
        borderWidth: 0,
        paddingHorizontal: 3,
        justifyContent: 'center'
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

