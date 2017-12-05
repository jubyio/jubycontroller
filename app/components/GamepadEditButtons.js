import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { saveGamepad, unlockOrientation, editControl } from '../actions';
import { StateBack } from '../constants';

// const GamepadEditButtons = ({ isInEdit, navigation, switchToEdit, gamepad, saveGamepad, unlockOrientation }) => {
class GamepadEditButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oldGamepad: this.props.gamepad
        }
    }

    renderValidateEditButton = () => {
        const { switchToEdit } = this.props;
        return (
            <View style={[styles.buttons]}>
                <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
                    name='settings' size={36} color='#61b7ed' onPress={switchToEdit} />
                <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon} name='exit-to-app' size={36} color='#d64455' onPress={() => this.goBack(StateBack.EXIT)} />
            </View>
        )
    }

    renderEditing = () => {
        return (
            <View style={[styles.buttons]}>
                <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
                    name='check' size={36} color='#66b23e' onPress={() => this.goBack(StateBack.EXITEDITING)} />
                <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon} name='close' size={36} color='#d64455' onPress={() => this.cancel() } />
            </View>
        );
    }

    cancel = () => {
        Alert.alert('Annuler',
            'Êtes-vous sur de vouloir annuler toutes vos modification?',
        [
            { text: 'Oui', onPress: () => this.goBack(StateBack.CANCEL) },
            { text: 'Non' },
        ])
    }

    goBack = (stateBack) => {
        const { switchToEdit, navigation, unlockOrientation } = this.props;
        switch (stateBack) {
            case StateBack.EXIT:
                // if (this.props.gamepad.isNew) {
                    this.props.saveGamepad(this.props.gamepad);
                // }
                navigation.goBack();
                unlockOrientation();
                break;
            case StateBack.EXITEDITING:
                switchToEdit();
                break;
            case StateBack.CANCEL:
                switchToEdit();
                if (JSON.stringify(this.state.oldGamepad) !== JSON.stringify(this.props.gamepad) && !this.props.gamepad.isNew) {
                    this.state.oldGamepad.controls.forEach(control => {
                        this.props.editControl(control);
                    })
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { isInEdit } = this.props;
        return (
            <View style={[styles.buttons]}>{
                (() => {
                    if (isInEdit) {
                        return this.renderEditing()
                    } else {
                        return this.renderValidateEditButton()
                    }
                })()
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    icon: {
        width: 40,
        height: 40,
        padding: 2
    }
})

const mapStateToProps = state => ({
    gamepad: state.config.gamepad
})

const mapDispatchToProps = dispatch => ({
    saveGamepad: (gamepad) => dispatch(saveGamepad(gamepad)),
    editControl: (control) => dispatch(editControl(control)),
    unlockOrientation: () => dispatch(unlockOrientation())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditButtons)