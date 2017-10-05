import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import Stick from './Stick';
import Gamepad from './Gamepad';
import { ADD_CONTROL, ControlTypes } from '../constants';
import { initControl } from '../actions';

import { Button, Icon, SideMenu } from 'react-native-elements'

class GamepadEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isMenuOpen: false, gamepad: props.gamepad };
    }

    addControl = (type) => {
        let window = Dimensions.get('window');
        let _state = update(this.state, {
            isMenuOpen: { $set: false },
            gamepad: { controls: { $push: [initControl(type, window)] } }
        });
        this.setState(_state);
        this.props.onChange(_state.gamepad);
    }

    togglePadsMenu = () => {
        if (this.state.isMenuOpen) {
            this.setState({ isMenuOpen: false });
        } else {
            this.setState({ isMenuOpen: true });
        }
    }

    renderPadsMenu = () => {
        if (this.state.isMenuOpen) {
            return (
                <View style={styles.menu}>
                    <Icon name='tune' onPress={() => this.addControl(ControlTypes.STICK)} size={35} />
                    <Icon name='radio-button-unchecked' onPress={() => this.addControl(ControlTypes.BUTTON)} size={35} />
                </View>)
        }
        return null;
    }

    onChange = (gamepad) => {
        let _state = update(this.state, {
            gamepad: { $set: gamepad.gamepad }
        });
        this.setState(_state);
        this.props.onChange(_state.gamepad);
    }

    render() {
        return (
            <View style={[styles.buttons, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' }]}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'stretch' }}>
                    <Gamepad style={{ flex: 1, backgroundColor: 'red' }} gamepad={this.state.gamepad} isInEditMode={true} onChange={this.onChange} />
                </View>
                {/* <Gamepad style={[styles.gamepad, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'blue' }]} gamepad={this.state.gamepad}/> */}
                <Icon raised style={styles.padButton} name='videogame-asset' size={30} onPress={this.togglePadsMenu}></Icon>
                <Icon raised style={styles.padButton} name='settings' size={30}></Icon>
                {this.renderPadsMenu()}
            </View>
        )
    }
};

const styles = StyleSheet.create({
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
    },
    menu: {
        position: 'absolute',
        top: 40,
        right: 0,
        height: 100,
        width: 100,
        backgroundColor: 'white',
        padding: 5
    },
    gamepad: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 200,
        width: 200,
        backgroundColor: 'purple'
    }
})

GamepadEditor.propTypes = {
    gamepad: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditor)

