import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import Stick from './Stick'
import Button from './PadButton';
import { ControlTypes } from '../constants';

const Gamepad = ({ gamepad, isInEditMode = false }) => (
    <View style={{ flex: 1}}>
        {gamepad.controls.map((control) => {
            if (control.type == ControlTypes.STICK) {
                return(<Stick key={control.id} stick={control} style={[styles.control, {top: control.position.y, left: control.position.x}]}/>)
            } else {
                return(<Button key={control.id}  stick={control} style={[styles.control, {top: control.position.y, left: control.position.x}]}/>)
            }
        })}
        {/* <Stick style={{position: 'absolute', top: 150, left: 150}}/> */}
    </View>
);

const styles = StyleSheet.create({
    control:{
        position: 'absolute'
    }
});

Gamepad.propTypes = {
    gamepad: PropTypes.object.isRequired,
    isInEditMode: PropTypes.bool
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Gamepad);