import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
    Platform,
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    Switch,
    ScrollView,
    Picker,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import Stick from './Stick';
import Gamepad from './Gamepad';
import { ADD_CONTROL, ControlTypes } from '../constants';
import { initControl, addControl, editControl } from '../actions';

import { Button, Icon, SideMenu, ButtonGroup } from 'react-native-elements';
import { ColorPalette } from './ColorPalette';

class GamepadEditor extends React.Component {
    colorProperty = null;

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isMenuOpen: false,
            isSettingOpen: false,
            gamepad: props.gamepad,
            colorControl: '#ee0000'
        };
    }

    addControl = (type) => {
        let window = Dimensions.get('window');
        let newControl = initControl(type, window);
        this.setState(update(this.state, {
            isMenuOpen: { $set: false },
            isSettingOpen: { $set: false }
        }));
        this.props.addControl(newControl);
    }

    selectedControl = (ctrl) => {
        this.setState({ control: ctrl });
    }

    togglePadsMenu = () => {
        if (this.state.isMenuOpen) {
            this.setState(update(this.state, {
                isMenuOpen: { $set: false }
            }));
        } else {
            this.setState(update(this.state, {
                isMenuOpen: { $set: true }
            }));
        }
    }

    setting = () => {
        if (this.state.isSettingOpen) {
            this.setState(update(this.state, {
                isSettingOpen: { $set: false }
            }));
        } else {
            this.setState(update(this.state, {
                isSettingOpen: { $set: true }
            }));
        }
    }

    saveControl = (property, value) => {
        var state = update(this.state, {
            control: {
                [property]: { $set: value }
            }
        });
        this.setState(state);
        this.props.editControl(state.control);
    }

    onColorChange = (color) => {
        this.setState(update(this.state, {
            colorControl: { $set: color }
        }));
    }

    setModalVisible = (visible) => {
        this.setState(update(this.state, {
            modalVisible: { $set: visible }
        }));
    }

    pressColor = (colorProperty) => {
        this.setState(update(this.state, {
            colorControl: { $set: this.state.control[colorProperty] ? this.state.control[colorProperty] : '#ee0000' },
            colorProperty: { $set: colorProperty },
            modalVisible: { $set: true }
        }));
    }

    saveColor = () => {
        var colorProperty = this.state.colorProperty;
        var colorControl = this.state.colorControl;
        var state = update(this.state, {
            $unset: ['colorControl', 'colorProperty'],
            control: {
                [colorProperty]: { $set: colorControl }
            },
            modalVisible: { $set: false }
        });
        this.setState(state);
        this.props.editControl(state.control);
    }

    saveInputNumber = (property, value) => {
        if (value) {
            return this.saveControl(property, parseInt(value, 10));
        }
        return this.saveControl(property, null);
    }

    handleButtonGroup = (index) => {
        var scale = this.state.control.scale;
        if (index === 0) {
            scale -= 0.25;
        } else if (index === 1) {
            scale += 0.25;
        }
        var state = update(this.state, {
            control: {
                scale : { $set: scale }
            },
        });
        this.setState(state);
        this.props.editControl(state.control);
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
        if (this.state.isSettingOpen) {
            const { control } = this.state;
            const minValText =  `Valeur minimun`;
            const maxValText = `Valeur maximun`;
            if (control.type === ControlTypes.BUTTON) {
                minValText = `Valeur active`;
                maxValText = `Valeur inactive`;
            }
            return (
                <View style={styles.sideMenu}>
                    <View style={[styles.controls, styles.form]}>
                        <ScrollView>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Label</Text>
                                <TextInput style={styles.input} defaultValue={control.label} underlineColorAndroid="transparent" onChange={event => this.saveControl('label', event.nativeEvent.text)} placeholder='Label' autoCapitalize='none' autoCorrect={false} />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Commande</Text>
                                <TextInput style={styles.input} defaultValue={control.name} underlineColorAndroid="transparent" onChange={event => this.saveControl('name', event.nativeEvent.text)} placeholder='Commande' autoCapitalize='none' autoCorrect={false} />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>{minValText}</Text>
                                <TextInput style={styles.input} defaultValue={control.minValue != null ? `${control.minValue}` : ''} underlineColorAndroid="transparent" onChange={event => this.saveInputNumber('minValue', event.nativeEvent.text)} placeholder={minValText} keyboardType="numeric" />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>{maxValText}</Text>
                                <TextInput style={styles.input} defaultValue={control.maxValue != null ? `${control.maxValue}` : ''} underlineColorAndroid="transparent" onChange={event => this.saveInputNumber('maxValue', event.nativeEvent.text)} placeholder={maxValText} keyboardType="numeric" />
                            </View>
                            {
                                (() => {
                                    if (control.type === ControlTypes.STICK) {
                                        return (
                                            <View style={styles.formGroup}>
                                                <Text style={styles.label}>Valeur par défault</Text>
                                                <TextInput style={styles.input} defaultValue={control.defaultValue != null ? `${control.defaultValue}` : ''} underlineColorAndroid="transparent" onChange={event => this.saveInputNumber('defaultValue', event.nativeEvent.text)} placeholder='Valeur par défault' keyboardType="numeric" />
                                            </View>
                                        );
                                    }
                                })()
                            }
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Garde la valeur</Text>
                                <Switch style={styles.input} value={control.keepValue} onValueChange={val => this.saveControl('keepValue', val)} />
                            </View>
                            {
                                (() => {
                                    if (control.type === ControlTypes.STICK) {
                                        return (
                                            <View style={styles.formGroup}>
                                                <Text style={styles.label}>Horizontal</Text>
                                                <Switch style={styles.input} value={control.orientation == 'H' ? true : false} onValueChange={val => this.saveControl('orientation', val ? 'H' : 'V')} />
                                            </View>
                                        );
                                    }
                                })()
                            }
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Couleur active</Text>
                                <TouchableHighlight style={styles.input} onPress={() => this.pressColor('activeColor')}>
                                    {
                                        (() => {
                                            if (control && control.activeColor) {
                                                return (<Text style={{ flex: 1, backgroundColor: control.activeColor, borderWidth: 1, borderColor: 'rgb(0, 0, 0)' }}></Text>);
                                            }
                                            return (<Text>Choisir une couleur</Text>);
                                        })()
                                    }
                                </TouchableHighlight>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Couleur inactive</Text>
                                <TouchableHighlight style={styles.input} onPress={() => this.pressColor('inactiveColor')}>
                                    {
                                        (() => {
                                            if (control && control.inactiveColor) {
                                                return (<Text style={{ flex: 1, backgroundColor: control.inactiveColor, borderWidth: 1, borderColor: 'rgb(0, 0, 0)' }}></Text>);
                                            }
                                            return (<Text>Choisir une couleur</Text>);
                                        })()
                                    }
                                </TouchableHighlight>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Taille</Text>
                                <ButtonGroup
                                    onPress={this.handleButtonGroup}
                                    buttons={['-', '+']}
                                    containerStyle={{ flex: 0.5, height: 30, marginLeft: 0, marginRight: 0 }}
                                />
                            </View>
                        </ScrollView>
                        {this.renderModalColorPicker()}
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

    renderModalColorPicker = () => {
        if (this.state.colorControl) {
            return (
                <Modal style={{ flex: 1, backgroundColor: 'white' }} animationType='none'
                    transparent={false} visible={this.state.modalVisible} supportedOrientations={['portrait', 'landscape']}
                    onRequestClose={() => { console.log("Modal has been closed.") }} >
                    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                            Couleur {this.state.colorProperty == 'activeColor' ? 'active' : 'inactive'}
                        </Text>
                        <View style={{ flex: 1 }}>
                            <ColorPalette initialColor={this.state.colorControl} onColorChange={this.onColorChange} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <TouchableHighlight onPress={this.saveColor}>
                                <Text style={{ color: 'black' }}>Valider</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => {
                                this.setState(update(this.state, {
                                    $unset: ['colorControl', 'colorProperty'],
                                    modalVisible: { $set: !this.state.modalVisible }
                                }));
                            }}>
                                <Text style={{ color: 'black', marginLeft: 5 }}>Annuler</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            );
        }
    }

    render = () => {
        return (
            <View style={[styles.buttons, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' }]}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'stretch' }}>
                    <Gamepad style={{ flex: 1 }} isInEditMode={true} onSelect={this.selectedControl} />
                </View>
                <Icon raised style={styles.padButton} name='videogame-asset' size={30} onPress={this.togglePadsMenu}></Icon>
                {
                    (() => {
                        if (this.state.control) {
                            return (<Icon raised style={styles.padButton} name='settings' size={30} onPress={this.setting}></Icon>)
                        }
                    })()
                }
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
        alignItems: 'center',
        paddingTop: 5
    },
    label: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        flex: 0.5,
        ...Platform.select({
            android: {
                padding: 0,
                height: 20
            }
        }),
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
    addControl: (control) => dispatch(addControl(control)),
    editControl: (control) => dispatch(editControl(control))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditor)

