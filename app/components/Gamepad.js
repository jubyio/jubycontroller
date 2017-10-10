import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, PanResponder } from 'react-native';
import update from 'immutability-helper';

import Stick from './Stick'
import PadButton from './PadButton';
import { ControlTypes } from '../constants';
import { saveGamepad, editControl } from '../actions';

import { getTouches, getScale, isMultiTouch } from '../utils/events';
import { distance } from '../utils/math';

class Gamepad extends React.Component {//= ({ gamepad, isInEditMode = false }) => {

    constructor(props) {
        super(props);
        this.prevLeft = 0;
        this.prevTop = 0;
        this.minScale = 0.33;
        this.maxScale = 2;
        this.state = {
            selected: null, 
            selectedRef: null, 
            styles: {
                transform: [
                    { scale: 1 }
                ],
            }
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => this.props.isInEditMode,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => this.props.isInEditMode,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.props.isInEditMode,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.props.isInEditMode,
            onPanResponderGrant: this.onMoveStart,
            onPanResponderMove: this.onMove,
            onPanResponderRelease: this.onMoveEnd
        });
    }

    onMoveStart = (event) => {
        const { pageX, pageY } = event.nativeEvent;

        this.prevDistance = 0;
        this.pinchStyles = {};

        this.initialTouches = getTouches(event);
        let clickedControl = this.findTouchedControl(pageX, pageY);

        if (clickedControl) {
            let refControl = this.refs[clickedControl.id];
            this.setState({ selected: clickedControl.id, selectedRef: refControl });
            refControl.setNativeProps({
                style: {
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: '#000000',
                }
            })
            this.prevLeft = clickedControl.position.x;
            this.prevTop = clickedControl.position.y;
        } else {
            if (this.state.selectedRef) {
                this.state.selectedRef.setNativeProps({
                    style: {
                        borderWidth: 0
                    }
                })
            }
            this.setState({ selected: null, selectedRef: null });
        }
    }

    onMove = (event, gestureState) => {
        const { initialTouches } = this;

        if (!this.state.selected) {
            return;
        }
        let refControl = this.refs[this.state.selected];
        refControl.setNativeProps({
            style: { left: this.prevLeft + gestureState.dx, top: this.prevTop + gestureState.dy }
        });

        const newTouches = getTouches(event);
        if (newTouches.length !== initialTouches.length) {
            this.initialTouches = newTouches;
        } else {
            this.onPinch(event);
        }

        this.updateStyles();
    }

    onMoveEnd = (event, gestureState) => {
        if (!this.state.selected) {
            return;
        }
        let refControl = this.refs[this.state.selected];
        let selectedControl = this.props.gamepad.controls.find(c => c.id == this.state.selected)
        this.props.editControl(update(selectedControl, {
            position: {
                $merge: {
                    x: selectedControl.position.x + gestureState.dx,
                    y: selectedControl.position.y + gestureState.dy
                }
            }
        }
        ));
        this.setState({ selected: null });
    }

    onPinch = (event) => {
        const { styles } = this.state;
        if (isMultiTouch(event)) {
            const currentDistance = distance(getTouches(event));
            const initialDistance = distance(this.initialTouches);
            const increasedDistance = currentDistance - initialDistance;
            const diffDistance = this.prevDistance - increasedDistance;
            this.pinchStyles = { transform: [] };
            this.pinchStyles.transform.push({
                scale: Math.min(Math.max(getScale(event, styles, diffDistance), this.minScale), this.maxScale),
            });
            this.prevDistance = increasedDistance;
        }

    }

    updateStyles = () => {
        const styles = {
            ...this.state.styles,
            ...this.pinchStyles,
        };
        this.updateNativeStyles(styles);
        this.setState({ styles });
    }

    updateNativeStyles = (styles) => {
        if (this.view) {
            this.view.setNativeProps({ styles });
        }
    }


    renderControl = (control) => {
        if (control.type == ControlTypes.STICK) {
            return (
                <Stick id={control.id} />)
        } else {
            return (<PadButton button={control} />)
        }
    }

    findTouchedControl = (x, y) => {
        let control = this.props.gamepad.controls.find(c =>
            x >= c.position.x && x <= c.position.x + c.width && y >= c.position.y && y <= c.position.y + c.height
        )
        return control;
    }


    render() {
        const { styles } = this.state;
        return (<View style={{ flex: 1 }} {...this.panResponder.panHandlers}>
            {this.props.gamepad.controls.map((control) => {
                return (
                    <View ref={control.id} key={control.id} style={[styles, { position: 'absolute', top: control.position.y, left: control.position.x }]}>
                        {this.renderControl(control)}
                    </View>
                )
            })}
            {/* <Stick style={{position: 'absolute', top: 150, left: 150}}/> */}
        </View>);
    };
}
//, top: control.position.y, left: control.position.x,

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
    gamepad: state.config.gamepad
})

const mapDispatchToProps = (dispatch) => ({
    editControl: (control) => dispatch(editControl(control))
})

export default connect(mapStateToProps, mapDispatchToProps)(Gamepad);