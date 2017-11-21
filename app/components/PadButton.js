import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import update from 'immutability-helper';
import { connect } from 'react-redux';

class PadButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            button: this.props.button
        }
    }

    onPress = () => {
        const { button, isActive } = this.state;
        let value = button.value || button.defaultValue;
        if (value === button.maxValue) {
            value = button.minValue;
        } else if (value === button.minValue) {
            value = button.maxValue;
        }
        var state = update(this.state, {
            isActive: { $set: !isActive },
            button: {
                value: { $set: value }
            }
        });
        this.setState(state);
        console.log(`value to send: ${value} for command: ${button.name}`);
    }

    render() {
        const { button, isActive } = this.state;
        return (
            <View>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: button.width,
                        height: button.height,
                        backgroundColor: isActive ? button.activeColor : button.inactiveColor,
                        borderRadius: button.width,
                    }}>
                    <Text>{button.label || 'A'}</Text>
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