import React from 'react';
import { TouchableHighlight } from 'react-native';

import { Colors } from '../utils/colors';

export class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        console.log()
    }

    render() {
        return Colors.map((item, i) => {
            console.log(item);
            return (
                <TouchableHighlight onPress={this.onPress.bind(this, item)} style={{
                }}>

                </TouchableHighlight>)
        })
    }

}
