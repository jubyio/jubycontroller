import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, StyleSheet, View } from 'react-native';

import { Icon } from 'react-native-elements';

const ControlWrapper = ({ onChange, children }) => {
    console.info(children);
    return (
    <View style={styles.main}>
        <View>
            <Icon name='zoom-out-map' size={20}></Icon>
        </View>
        <View style={styles.container}>
            {children}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    move: {
        alignSelf: 'flex-start'
    },
    container: {
        marginLeft: 10
    }
});

ControlWrapper.propTypes = {
    onChange: PropTypes.func.isRequired,
    children: PropTypes.any
}

export default ControlWrapper