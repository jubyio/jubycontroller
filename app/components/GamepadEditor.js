import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    Switch,
    Modal,
    ScrollView,
    Picker
} from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import Stick from './Stick';
import Gamepad from './Gamepad';
import { ADD_CONTROL, ControlTypes } from '../constants';
import { initControl, addControl, editControl } from '../actions';

import { Button, Icon, SideMenu } from 'react-native-elements'
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker'

class GamepadEditor extends React.Component {
    control = null;
    colorProperty = null;

    constructor(props) {
        super(props);
        this.state = { modalVisible: false, isMenuOpen: false, gamepad: props.gamepad };
    }

    addControl = (type) => {
        let window = Dimensions.get('window');
        let newControl = initControl(type, window);
        this.setState(update(this.state, {
            isMenuOpen: { $set: false },
        }));
        this.props.addControl(newControl);
    }

    selectedControl = (ctrl) => {
        this.control = ctrl;
    }

    togglePadsMenu = () => {
        if (this.state.isMenuOpen) {
            this.setState({ isMenuOpen: false });
        } else {
            this.setState({ isMenuOpen: true });
        }
    }

    setting = () => {
        if (this.state.isSettingOpen) {
            this.setState({ isSettingOpen: false });
        } else {
            this.setState({ isSettingOpen: true });
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

    renderSetting = () => {
        var keepValue = false;
        const options = [];
        options.push({ value: 'H', label: 'Horizontal' });
        options.push({ value: 'V', label: 'Vertical' });
        if (this.state.isSettingOpen) {
            return (
                <View style={styles.sideMenu}>
                    <View style={[styles.controls, styles.form]}>
                        <ScrollView>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Nom</Text>
                                <TextInput style={styles.input} placeholder='Nom' autoCapitalize='none' autoCorrect={false} ref={input => this.control.name = input} />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Valeur minimun</Text>
                                <TextInput style={styles.input} placeholder='Valeur minimun' ref={input => this.control.minValue = input} keyboardType="numeric" />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Valeur maximun</Text>
                                <TextInput style={styles.input} placeholder='Valeur maximun' ref={input => this.control.maxValue = input} keyboardType="numeric" />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Valeur par défault</Text>
                                <TextInput style={styles.input} placeholder='Valeur par défault' ref={input => this.control.defaultValue = input} keyboardType="numeric" />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Garde la valeur</Text>
                                <Switch style={styles.input} value={this.control.keepValue} onValueChange={(val) => { this.control.keepValue = val }} />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Orientation</Text>
                                <Picker style={styles.input} mode='dropdown' selectedValue={this.control.orientation} onValueChange={(itemValue, itemIndex) => this.control.orientation = `${itemValue}`}>
                                    {options.map((item, index) => {
                                        return (< Picker.Item label={item.label} value={item.value} key={item.value} />);
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Couleur active</Text>
                                <TouchableHighlight style={styles.input} onPress={() => {
                                    this.colorProperty = 'activeColor';
                                    this.setModalVisible(true)
                                }}>
                                    {this.control && this.control.activeColor ? <Text>{this.control.activeColor}</Text> : <Text>Choisir une couleur</Text>}
                                </TouchableHighlight>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Couleur inactive</Text>
                                <TouchableHighlight style={styles.input} onPress={() => {
                                    this.colorProperty = 'inactiveColor';
                                    this.setModalVisible(true)
                                }}>
                                    {this.control && this.control.inactiveColor ? <Text>{this.control.inactiveColor}</Text> : <Text>Choisir une couleur</Text>}
                                </TouchableHighlight>
                            </View>
                            {this.renderModelaColorPicker()}
                        </ScrollView>
                    </View>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={this.setting}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        return null;
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderModelaColorPicker = () => {
        var color = null;
        return (
            <Modal animationType='slide' transparent={false} visible={this.state.modalVisible} onRequestClose={() => { alert('Modal has been closed.') }} >
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>
                        Couleur {this.colorProperty}
                    </Text>
                    <ColorPicker style={{ flex: 1 }} color={this.control[this.colorProperty] ? toHsv(this.control[this.colorProperty]) : toHsv('red')}
                        onColorSelected={c => { color = c; }} hideSliders={true}/>
                    <View >
                        <TouchableHighlight onPress={() => {
                            this.control[this.colorProperty] = fromHsv(color);
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                            <Text>Valider</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                            <Text>Annuler</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={[styles.buttons, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' }]}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'stretch' }}>
                    <Gamepad style={{ flex: 1 }} isInEditMode={true} onSelect={this.selectedControl} />
                </View>
                <Icon raised style={styles.padButton} name='videogame-asset' size={30} onPress={this.togglePadsMenu}></Icon>
                <Icon raised style={styles.padButton} name='settings' size={30} onPress={this.setting}></Icon>
                {this.renderPadsMenu()}
                {this.renderSetting()}
            </View>
        );
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
    form: {
        width: 300,
        alignItems: 'stretch',
    },
    formGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    label: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        flex: 0.5
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

