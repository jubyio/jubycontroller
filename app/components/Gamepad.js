import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import update from 'immutability-helper';

import Stick from './Stick'
import PadButton from './PadButton';
import ControlWrapper from './ControlWrapper';
import { ControlTypes } from '../constants';
import { saveGamepad } from '../actions';

class Gamepad extends React.Component {//= ({ gamepad, isInEditMode = false }) => {

    constructor(props) {
        super(props);
        this.state = { gamepad: props.gamepad }
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
        this.setState(update(this.state, { 
            gamepad: {
                controls: {
                    $set: nextProps.gamepad.controls
                }
            }
        }));
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
                <ControlWrapper onChange={this.onChange} controlId={control.id}>
                    {this.renderControl(control)}
                </ControlWrapper>
            )
        } else {
            return this.renderControl(control);
        }
    }

    onChange = (controlId, x, y) => {
        let index = this.state.gamepad.controls.findIndex(control => control.id === controlId);
        this.setState(update(this.state, {
            gamepad: {
                controls: {
                    [index]: { position: { $set: { x: x, y: y } } }
                }
            }
        }));
        this.props.onChange(this.state.gamepad);
    };

    render() {
        return (<View style={{ flex: 1 }}>
            {this.state.gamepad.controls.map((control) => {
                return (
                    <View key={control.id} style={[{ position: 'absolute' }]}>
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
    isInEditMode: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Gamepad);