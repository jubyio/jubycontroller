import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { editControl } from '../actions';

class Stick extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: props.stick.defaultValue
        }
    }
    //= ({ id, stick }) => {

    onReleaseTouch = () => {
        if (!this.props.keepValue) {
            this.setState({...this.state, value: props.stick.defaultValue})
        }
    }

    render() {
        return (
            <View style={{ width: stick.width, height: stick.height }} >
                <Slider value={this.state.value} onSlidingComplete={() => onReleaseTouch} />
            </View>)
    }

}

Stick.propTypes = {
    id: PropTypes.string.isRequired,
    stick: PropTypes.object.isRequired,
    sendValue: PropTypes.func.isRequired
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