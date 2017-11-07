import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Slider, Button } from 'react-native-elements';

const PadButton = ({ button }) => (
    <View>
        <TouchableOpacity
        style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width: button.width,
            height: button.height,
            backgroundColor:'#f00',
            borderRadius:button.width,
            }}>
            <Text>{button.label || 'A'}</Text>
        </TouchableOpacity>
    </View>
);


const mapStateToProps = (state) =>({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    valueChange: dispatch({type: ''})
})

export default PadButton;