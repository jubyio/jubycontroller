import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { saveGamepad, unlockOrientation } from '../actions';
import { StateBack } from '../constants';

const GamepadEditButtons = ({ isInEdit, navigation, switchToEdit, gamepad, saveGamepad, unlockOrientation }) => {

    renderValidateEditButton = () => {
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
                <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon} name='close' size={36} color='#d64455' onPress={() => this.goBack(StateBack.CANCEL)} />
            </View>
        );
    }

    goBack = (stateBack) => {
        switch (stateBack) {
            case StateBack.EXIT:
                navigation.goBack();
                unlockOrientation();
                break;
            case StateBack.EXITEDITING:
                switchToEdit();
            case StateBack.CANCEL:
                switchToEdit();
                break;
            default:
                break;
        }
    }

    return (
        <View style={[styles.buttons]}>{
            (() => {
                if (isInEdit) {
                    return renderEditing()
                } else {
                    return renderValidateEditButton()
                }
            })()
        }
        </View>
    )
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
    unlockOrientation: () => dispatch(unlockOrientation())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditButtons)