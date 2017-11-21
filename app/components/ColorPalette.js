import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import update from 'immutability-helper';

import { Colors } from '../utils/colors';
import { initControl } from '../actions/index';

export class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
    }

    onPress = (color) => {
        this.props.onColorChange(color.value);
    }

    hexToHue = (hex) => {
        var hex = hex.substring(1);

        var R = parseInt(hex.substring(0, 2), 16) / 255;
        var G = parseInt(hex.substring(2, 4), 16) / 255;
        var B = parseInt(hex.substring(4, 6), 16) / 255;

        let h, hue;
        const max = Math.max(R, G, B), min = Math.min(R, G, B);
        const chr = max - min;

        if (max === R) {
            hue = (((G - min) - (B - min)) / chr) * 60
        } else if (max === G) {
            hue = 120 + (((B - min) - (R - min)) / chr) * 60
        } else if (max === B) {
            hue = 240 + (((R - min) - (G - min)) / chr) * 60
        }
        return hue;
    }

    render() {
        const { initialColor } = this.props;
        return (
            <ScrollView >
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {Colors.sort((a, b) => { return this.hexToHue(a.value) - this.hexToHue(b.value) }).map((val) => {
                        return (<TouchableOpacity key={val.name} onPress={this.onPress.bind(this, val)} style={{
                            backgroundColor: val.value,
                            borderWidth: initialColor !== null && initialColor === val.value ? 1 : 0,
                            borderColor: 'rgba(0,0,0,1)',
                            width: 64,
                            height: 64,
                            zIndex: initialColor !== null && initialColor === val.value ? 1000 : 1,
                            transform: [{ scale: initialColor !== null && initialColor === val.value ? 1.5 : 1 }]
                        }}>
                        </TouchableOpacity>)
                    })}
                </View>
            </ScrollView >);
    }
}
