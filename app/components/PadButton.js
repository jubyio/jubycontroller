import React from 'react';
import { View } from 'react-native';

import { Slider, Button } from 'react-native-elements';

const PadButton = ({ button }) => (
    <View>
        <Button/>
    </View>
);


const mapStateToProps = (state) =>({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    valueChange: dispatch({type: ''})
})

export default PadButton;