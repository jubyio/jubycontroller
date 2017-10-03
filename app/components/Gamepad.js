import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import Stick from './Stick'
import PadButton from './PadButton';
import ControlWrapper from './ControlWrapper';
import { ControlTypes } from '../constants';

class Gamepad extends React.Component {//= ({ gamepad, isInEditMode = false }) => {

    constructor(props) {
        super(props);
    }

    renderControl = (control) => {
        if (control.type == ControlTypes.STICK) {
            return (
                <Stick stick={control} />)
        } else {
            return (<PadButton button={control} />)
        }
    }

    renderWrapperControl = (control) => {
        if (this.props.isInEditMode) {
            return (
                <ControlWrapper onChange={this.onChange}>
                    {this.renderControl(control)}
                </ControlWrapper>
            )
        } else {
            return this.renderControl(control);
        }
    }

    onChange = () => {

    };

    render() {
        return (<View style={{ flex: 1 }}>
            {this.props.gamepad.controls.map((control) => {
                return (
                    <View key={control.id} style={[{ position: 'absolute', top: control.position.y, left: control.position.x }]}>
                        {this.renderWrapperControl(control)}
                    </View>
                )
            })}
            {/* <Stick style={{position: 'absolute', top: 150, left: 150}}/> */}
        </View>);
    };
}


const styles = StyleSheet.create({
    control: {
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