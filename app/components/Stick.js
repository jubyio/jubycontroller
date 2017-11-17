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

    render() {
        return (<View style={{ width: this.props.stick.width, height: this.props.stick.height }}>
                <Slider />
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