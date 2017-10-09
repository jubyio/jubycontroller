import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, PanResponder } from 'react-native';
import update from 'immutability-helper';

import Stick from './Stick'
import PadButton from './PadButton';
import { ControlTypes } from '../constants';
import { saveGamepad, editControl } from '../actions';

class Gamepad extends React.Component {//= ({ gamepad, isInEditMode = false }) => {

    constructor(props) {
        super(props);
        this.prevLeft = 0;
        this.prevTop = 0;
        this.state = { selected: null, selectedRef: null};
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => his.props.isInEditMode,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>  this.props.isInEditMode,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.props.isInEditMode,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.props.isInEditMode,
            onPanResponderGrant: (evt, gestureState) => {
                const { pageX, pageY } = evt.nativeEvent;
                let clickedControl = this.findTouchedControl(pageX, pageY);
                if(clickedControl){
                    let refControl = this.refs[clickedControl.id];
                    this.setState({ selected: clickedControl.id, selectedRef: refControl});
                    refControl.setNativeProps({
                        style:{
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            borderColor: '#000000',
                        }
                    })
                    this.prevLeft = clickedControl.position.x;
                    this.prevTop = clickedControl.position.y;
                }else{
                    if(this.state.selectedRef){
                        this.state.selectedRef.setNativeProps({
                            style:{
                                borderWidth:0
                            }
                        })
                    }
                    this.setState({ selected: null, selectedRef: null});
                }
                
                
            },
            onPanResponderMove: (evt, gestureState) => {
                if(!this.state.selected){
                    return;
                }
                let refControl = this.refs[this.state.selected];
                refControl.setNativeProps({
                    style:{left: this.prevLeft + gestureState.dx, top: this.prevTop + gestureState.dy}
                })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(!this.state.selected){
                    return;
                }
                let refControl = this.refs[this.state.selected];
                let selectedControl = this.props.gamepad.controls.find(c => c.id == this.state.selected)
                this.props.editControl(update(selectedControl, 
                    { position: 
                        { $merge: 
                            { x: selectedControl.position.x + gestureState.dx, 
                                y: selectedControl.position.y + gestureState.dy }
                            }
                        }
                    )
                );
                this.setState({selected: null});
            }
        });
    }

    renderControl = (control) => {
        if (control.type == ControlTypes.STICK) {
            return (
                <Stick id={control.id} />)
        } else {
            return (<PadButton button={control} />)
        }
    }

    renderWrapperControl = (control) => {
        if (this.props.isInEditMode) {
            return (
                <ControlWrapper id={control.id}>
                    {this.renderControl(control)}
                </ControlWrapper>
            )
        } else {
            return this.renderControl(control);
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
                    <View ref={control.id} key={control.id} style={[{position:'absolute', top:control.position.y, left:control.position.x }]}>
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