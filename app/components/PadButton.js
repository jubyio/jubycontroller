import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import update from 'immutability-helper';
import { connect } from 'react-redux';

import * as net from 'react-native-tcp';
import { HC_URL } from '../constants';

var Buffer = require('buffer').Buffer;

class PadButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            button: this.props.button
        }
    }

    onPress = () => {
        const { button, isActive } = this.state;
        let value = button.value || button.defaultValue;
        if (value === button.maxValue && !button.keepValue) {
            value = button.minValue;
        } else if (value === button.minValue && !button.keepValue) {
            value = button.maxValue;
        }
        this.setState(update(this.state, {
            isActive: { $set: button.keepValue ? true : !isActive },
            button: {
                value: { $set: value }
            }
        }));
        this.sendCommand(button.name, value.toFixed(0));
        console.log(`value to send: ${value} for command: ${button.name}`);
    }

    sendCommand = (name, value) => {
        var client = net.createConnection(9999, HC_URL);
        client.on('connect', () => {
            console.log('===== connected ======');
        });
        client.on('data', (data) => {
            if (data != 'ok') { console.log('====== OK ======')}
            client.destroy();
        });
        client.on('error', (error) => {
            console.log(`====== ERROR COMMUNICATION:  ${error} ======`)
        })

        client.write(Buffer.from(`${name}:${value}`, 'utf8'));
    }

    render() {
        const { button, isActive } = this.state;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onPress()}
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: button.width,
                        height: button.height,
                        backgroundColor: isActive ? button.activeColor : button.inactiveColor,
                        borderRadius: button.width,
                    }}>
                    <Text>{button.label || ''}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

PadButton.propTypes = {
    id: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    button: state.config.gamepad.controls.find(c => c.id === ownProps.id)    
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // valueChange: dispatch({ type: '' })
})

export default connect(mapStateToProps, mapDispatchToProps)(PadButton);