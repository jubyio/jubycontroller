import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect, } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Header, List, ListItem, Icon } from 'react-native-elements';

const GamepadList = ({ gamepads, navigation }) => {
    return (
        <List style={styles.list}>
            {
                gamepads.map((g, i) => (
                    <ListItem title={g.name} key={i}
                        onPress={() => navigation.dispatch(NavigationActions.navigate({ routeName: 'Gamepad', params: { isEdit: false, gamepad: g } }))} />
                ))
            }
        </List>
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 0,
        backgroundColor: 'white'
    }
})

const mapStateToProps = state => ({
    gamepads: state.domain.gamepads
});

GamepadList.propTypes = {
    gamepads: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {})(GamepadList)