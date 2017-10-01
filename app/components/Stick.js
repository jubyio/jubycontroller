import React from 'react';
import { View } from 'react-native';

import { Slider } from 'react-native-elements';

const Stick = ({ stick }) => (
    <View style={{width:50, height:20}}>
        <Slider/>
    </View>
);


const mapStateToProps = (state) =>({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    valueChange: dispatch({type: ''})
})

export default Stick;

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