import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, PanResponder } from 'react-native';
import update from 'immutability-helper';

import Stick from './Stick'
import PadButton from './PadButton';
import { ControlTypes } from '../constants';
import { editControl, init } from '../actions';

import { getTouches, getScale, isMultiTouch } from '../utils/events';
import { distance } from '../utils/math';

class Gamepad extends React.Component {//= ({ gamepad, isInEditMode = false }) => {
    constructor(props) {
        super(props);
        this.prevLeft = 0;
        this.prevTop = 0;
        this.minScale = 0.75;
        this.maxScale = 1.25;
        this.currentScale = 0;
        this.state = {
            selected: null,
            selectedRef: null,
        };
        this.props.init();
    }

    componentWillMount() {
        if (this.props.isInEditMode) {
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
    }

    onMoveStart = (event) => {
        const { pageX, pageY } = event.nativeEvent;

        this.prevDistance = 0;
        this.pinchStyles = {};

        this.initialTouches = getTouches(event);
        let clickedControl = this.findTouchedControl(pageX, pageY);

        if (clickedControl && this.state.selectedRef && this.state.selected !== clickedControl.id) {
            this.unSelected();
        }
        if (clickedControl) {
            let refControl = this.refs[clickedControl.id];
            const { style } = refControl.props;
            this.setState({ selected: clickedControl.id, selectedRef: refControl });
            refControl.setNativeProps({
                style: {
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: '#000000'
                }
            });
            this.props.onSelect(clickedControl);

            this.currentScale = style[0].transform[0].scale;
            this.prevLeft = clickedControl.position.x;
            this.prevTop = clickedControl.position.y;
        } else {
            this.unSelected();
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
        } /*else {
            if (isMultiTouch(event)) {
                this.onPinch(event, refControl);
            }
        }*/
        refControl.setNativeProps({
            style: { left: this.prevLeft + gestureState.dx, top: this.prevTop + gestureState.dy }
        });
    }

    onPinch = (event, refControl) => {
        const { style } = refControl.props;
        const currentDistance = distance(getTouches(event));
        const initialDistance = distance(this.initialTouches);
        const increasedDistance = initialDistance - currentDistance;
        this.prevDistance = increasedDistance;
        const scale = Math.min(Math.max(getScale(event, style[0], increasedDistance), this.minScale), this.maxScale);
        refControl.setNativeProps({
            style: { transform: [{ scale: scale }] }
        });
        this.currentScale = scale;
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
            },
            scale: { $set: this.currentScale }
        }
        ));
        this.setState({ selected: null });
    }

    unSelected = () => {
        if (this.state.selectedRef) {
            this.state.selectedRef.setNativeProps({
                style: {
                    borderWidth: 0
                }
            })
        }
        this.setState({ selected: null, selectedRef: null });
        this.props.onSelect(null);
    }

    renderControl = (control) => {
        if (control.type == ControlTypes.STICK) {
            return (<Stick id={control.id} isInEditMode={this.props.isInEditMode} />)
        } else {
            return (<PadButton id={control.id} />)
        }
    }

    findTouchedControl = (x, y) => {
        let control = this.props.gamepad.controls.find(c =>
            x >= c.position.x && x <= c.position.x + c.width && y >= c.position.y && y <= c.position.y + c.height
        )
        return control;
    }

    renderContols = () => {
        return (
            this.props.gamepad.controls.map((control) => {
                return (
                    <View ref={control.id} key={control.id} style={[{
                        position: 'absolute',
                        top: control.position.y,
                        left: control.position.x,
                        transform: [
                            { scale: control.scale == null ? 1 : control.scale },
                            { rotate: control.orientation == 'H' ? '0deg' : '270deg' }
                        ]
                    }]}>
                        {this.renderControl(control)}
                    </View>
                )
            })
        );
    }

    render() {
        var style = { flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#a8a4a7' };
        if (this.props.isInEditMode) {
            return (<View style={style} {...this.panResponder.panHandlers}>
                {this.renderContols()}
            </View>);
        } else {
            return (<View style={style}>
                {this.renderContols()}
            </View>);
        }
    };
}

Gamepad.propTypes = {
    gamepad: PropTypes.object.isRequired,
    isInEditMode: PropTypes.bool,
    onSelect: PropTypes.func
}

const mapStateToProps = (state) => ({
    gamepad: state.config.gamepad
})

const mapDispatchToProps = (dispatch) => ({
    editControl: (control) => dispatch(editControl(control)),
    init: () => dispatch(init())
})

export default connect(mapStateToProps, mapDispatchToProps)(Gamepad);