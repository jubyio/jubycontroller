import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { editControl } from '../actions';

class Stick extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (value) => {
        console.log(`value to send: ${value} for command: ${this.props.stick.name}`);
    }

    render() {
        const { stick } = this.props;
        return (<View style={{ width: stick.width, height: stick.height }}>
            <Slider thumbStyle={{ backgroundColor: stick.activeColor }} onValueChange={this.onChange}
                value={stick.defaultValue} minimumValue={stick.minValue && stick.maxValue ? stick.minValue : 0}
                maximumValue={stick.maxValue && stick.minValue ? stick.maxValue : 1} />
        </View>);
    }
}

Stick.propTypes = {
    id: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    stick: state.config.gamepad.controls.find(c => c.id === ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
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