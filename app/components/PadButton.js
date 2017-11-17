import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { Slider, Button } from 'react-native-elements';

class PadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.button);
        return (
            <View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: this.props.button.width,
                        height: this.props.button.height,
                        backgroundColor: '#f00',
                        borderRadius: this.props.button.width,
                    }}>
                    <Text>{this.props.button.label || 'A'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    valueChange: dispatch({ type: '' })
})

export default connect(mapStateToProps, mapDispatchToProps)(PadButton);