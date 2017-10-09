import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { saveGamepad, unlockOrientation } from '../actions';

const GamepadEditButtons = ({isInEdit, navigation, switchToEdit, gamepad, saveGamepad, unlockOrientation }) => {

    renderValidateEditButton = () => {
        if (isInEdit) {
            return <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
                name='check' size={36} color='#66b23e' onPress={() => this.goBack(true)} />
        } else {
            return <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon}
                name='setting' size={36} color='#61b7ed' onPress={switchToEdit} />
        }
    }

    goBack = (save) => {
        if (save) {
          saveGamepad(gamepad);
        }
        navigation.goBack();
        unlockOrientation();
    }

    return (
        <View style={[styles.buttons]}>
            {renderValidateEditButton()}
            <Icon containerStyle={{ backgroundColor: '#61b7ed' }} style={styles.icon} name='close' size={36} color='#d64455' onPress={() => this.goBack(false)} />
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
    unlockOrientation : () => dispatch(unlockOrientation())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamepadEditButtons)