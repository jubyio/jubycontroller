import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import * as net from 'react-native-tcp';

import { HC_URL } from '../constants';

// import { Slider } from 'react-native-elements';

import { sendCommand, editControl } from '../actions';

var Buffer = require('buffer').Buffer;


class Stick extends React.Component {
    value = null;
    constructor(props) {
        super(props);
        this.value = this.props.stick.defaultValue;
        this.sendOnChange$ = new Subject();
    }

    componentDidMount() {
        this.subscription = this.sendOnChange$
            .debounceTime(100)
            .subscribe(value => {
                this.sendCommand(this.props.stick.name, value.toFixed(0));
                console.log(`value to send: ${value.toFixed(0)} for command: ${this.props.stick.name}`);
            });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    onChange = (value) => {
        console.log(`value : ${value}`)
        this.sendOnChange$.next(value);
        //this.props.sendCommand(this.props.stick.name, value.toFixed(0))

    }

    onReleaseTouch = () => {
        if (!this.props.stick.keepValue) {
            this.value = this.props.stick.defaultValue;
            this._slider.setNativeProps({ value: this.props.stick.defaultValue });
            this.sendOnChange$.next(this.props.stick.defaultValue);
        }
    }

    render() {
        const { stick } = this.props;
        const height = stick.label ? stick.height + 20 : stick.height;
        return (<View style={{ width: stick.width, height: height }}>
            <Slider ref={slider => this._slider = slider} thumbTintColor={stick.activeColor} onValueChange={this.onChange} onSlidingComplete={this.onReleaseTouch}
                value={this.value} minimumValue={stick.minValue && stick.maxValue ? stick.minValue : 0}
                maximumValue={stick.maxValue && stick.minValue ? stick.maxValue : 1}
                disabled={this.props.isInEditMode} />
            <Text style={{ flex: 1, textAlign: 'center' }}>{stick.label}</Text>
        </View>);
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
}

Stick.propTypes = {
    id: PropTypes.string.isRequired,
    isInEditMode: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    stick: state.config.gamepad.controls.find(c => c.id === ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
    //sendCommand: (name, value) => dispatch(sendCommand(name, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Stick);

/* model de stick
{
    id: 'guid'
    type: 'stick',
    position:{
        x:0,
        Y:0
    }
    command:'ACCELER'
}
*/