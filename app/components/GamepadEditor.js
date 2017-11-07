import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { View, StyleSheet, TouchableHighlight, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import Stick from './Stick';
import Gamepad from './Gamepad';
import { ADD_CONTROL, ControlTypes } from '../constants';
import { initControl, addControl, editControl } from '../actions';

import { Button, Icon, SideMenu } from 'react-native-elements'

class GamepadEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isMenuOpen: false, gamepad: props.gamepad };
    }

    addControl = (type) => {
        let window = Dimensions.get('window');
        let newControl = initControl(type, window);
        this.setState(update(this.state, {
            isMenuOpen: { $set: false },
        }));
        this.props.addControl(newControl);
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
                <View style={styles.sideMenu}>
                    <View style={styles.controls}>
                        <Icon style={styles.item} name='tune' onPress={() => this.addControl(ControlTypes.STICK)} size={35} />
                        <Icon style={styles.item} name='radio-button-checked' onPress={() => this.addControl(ControlTypes.BUTTON)} size={35} />
                    </View>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={this.togglePadsMenu}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>)
        }
        return null;
    }

    render() {
        return (
            <View style={[styles.buttons, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' }]}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'stretch' }}>
                    <Gamepad style={{ flex: 1 }} isInEditMode={true} />
                </View>
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
    sideMenu: {
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    controls: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 200,
        backgroundColor: 'white',
        padding: 10,
        zIndex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    item: {
        height: 50
    },
    gamepad: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 200,
        width: 200,
        backgroundColor: 'purple'
    },
    overlay: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'gray',
        opacity: 0.75
    }
})

GamepadEditor.propTypes = {
    gamepad: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    gamepad: state.config.gamepad
});

const mapDispatchToProps = dispatch => ({
    addControl: (control) => dispatch(addControl(control))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditor)

