import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { sendCommand } from '../actions';

import { Slider } from 'react-native-elements';

import { editControl } from '../actions';

class Stick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.stick.defaultValue
        }
    }

    onChange = (value) => {
        this.setState(update(this.state, {
            value: { $set: value}
        }));
        this.props.sendCommand(this.props.stick.name, value)
        console.log(`value to send: ${value} for command: ${this.props.stick.name}`);
    }

    onReleaseTouch = () => {
        if (this.props.stick.keepValue) {
            this.setState({...this.state, value: this.props.stick.defaultValue});
        }
    }

    render() {
        const { stick } = this.props;
        return (<View style={{ width: stick.width, height: stick.height + 20 }}>
            <Slider thumbStyle={{ backgroundColor: stick.activeColor }} onValueChange={this.onChange} onSlidingComplete={this.onReleaseTouch}
                value={this.state.value} minimumValue={stick.minValue && stick.maxValue ? stick.minValue : 0}
                maximumValue={stick.maxValue && stick.minValue ? stick.maxValue : 1} />
            <Text style={{ flex: 1, textAlign: 'center' }}>{stick.label}</Text>
        </View>);
    }
}

Stick.propTypes = {
    id: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    stick: state.config.gamepad.controls.find(c => c.id === ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
    sendCommand: (name, value) => dispatch(sendCommand(name, value))
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