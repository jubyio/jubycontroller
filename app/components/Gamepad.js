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
            selectedRef: null
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
                    borderColor: '#000000'
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
        const newTouches = getTouches(event);
        if (newTouches.length !== initialTouches.length) {
            this.initialTouches = newTouches;
        } else {
            if (isMultiTouch(event)) {
                var style = this.onPinch(event, refControl);
                refControl.setNativeProps({
                    style: { transform: [{ scale: style }] }
                });
                console.log(`onMoveEnd: ${style}`);
            }
        }
        refControl.setNativeProps({
            style: { left: this.prevLeft + gestureState.dx, top: this.prevTop + gestureState.dy }
        });
    }

    onMoveEnd = (event, gestureState) => {
        if (!this.state.selected) {
            return;
        }
        let refControl = this.refs[this.state.selected];
        const { style } = refControl.props;
        console.log(`onMoveEnd: ${style[0].transform[0].scale}`);
        let selectedControl = this.props.gamepad.controls.find(c => c.id == this.state.selected)
        this.props.editControl(update(selectedControl, {
            position: {
                $merge: {
                    x: selectedControl.position.x + gestureState.dx,
                    y: selectedControl.position.y + gestureState.dy
                }
            },
            scale: { $set: style[0].transform[0].scale }
        }
        ));
        this.setState({ selected: null });
    }

    onPinch = (event, refControl) => {
        const { style } = refControl.props;
        const currentDistance = distance(getTouches(event));
        const initialDistance = distance(this.initialTouches);
        const increasedDistance = initialDistance - currentDistance;
        // const diffDistance = this.prevDistance - increasedDistance;
        // this.pinchStyles = { transform: [] };
        // this.pinchStyles.transform.push({
        // scale: Math.min(Math.max(getScale(event, style, diffDistance), this.minScale), this.maxScale),
        // });
        this.prevDistance = increasedDistance;
        const scale = Math.min(Math.max(getScale(event, style[0], increasedDistance), this.minScale), this.maxScale);
        return scale;
        //this.updateStyles(refControl);
    }

    // updateStyles = (refControl) => {
    //     const { style } = refControl.props;
    //     const styles = {
    //         ...style[0],
    //         ...this.pinchStyles,
    //     };
    //     this.updateNativeStyles(refControl, styles);
    //     // this.setState({ styles });
    // }

    // updateNativeStyles = (refControl, styles) => {
    //     if (refControl) {
    //         console.log(`updateNativeStyles: ${styles.transform[0].scale}`);
    //         refControl.setNativeProps({
    //             style: { transform: [{ scale: styles.transform[0].scale }] }
    //         });
    //     }
    // }

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
        return (<View style={{ flex: 1 }} {...this.panResponder.panHandlers}>
            {this.props.gamepad.controls.map((control) => {
                return (
                    <View ref={control.id} key={control.id} style={[{ position: 'absolute', top: control.position.y, left: control.position.x, transform: [{ scale: control.scale }] }]}>
                        {this.renderControl(control)}
                    </View>
                )
            })}
            {/* <Stick style={{position: 'absolute', top: 150, left: 150}}/> */}
        </View>);
    };
}

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