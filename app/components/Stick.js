import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { editControl } from '../actions';

const Stick = ({ id, stick }) => (
    <View style={{ width: stick.width, height: stick.height }}>
        <Slider />
    </View>
);

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