import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

class ControlWrapper extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        children: PropTypes.any.isRequired,
        controlId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        var window = Dimensions.get('window');
        this.state = {
            pan: new Animated.ValueXY(),
            _value: { x: 0, y: 0 }
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (evt, gestureState) => {
                this.state.pan.flattenOffset();
                var middleX = window.width / 2;
                var middleY = window.height / 2;
                var positionX = middleX + this.state._value.x;
                var positionY = middleY + this.state._value.y;
                this.props.onChange(this.props.controlId, positionX, positionY);
            }
        });
    }

    componentWillMount() {
        this.state.pan.addListener((c) => {
            this.state._value = c;
        });
    }

    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }

    positionCss() {
        let window = Dimensions.get('window');
        return {
            zIndex: 999,
            position: 'absolute',
            top: window.height / 2,
            left: window.width / 2,
        }
    }

    render() {
        return (
            <Animated.View style={this.positionCss()}
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout()]} >
                <View style={styles.main}>
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#000000',
    },
    container: {
        flex: 1
    }
});

export default ControlWrapper;