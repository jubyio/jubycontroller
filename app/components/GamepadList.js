import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

import { editGamepad } from '../actions';

const GamepadList = ({ gamepads, navigation, editGamepad, onSelected }) => (
    <List style={styles.list}>
        {
            gamepads.map((gamepad, i) => (
                <ListItem title={gamepad.name} key={i}
                    onLongPress={() => {
                        onSelected(gamepad);
                    }}
                    onPress={() => {
                        editGamepad(gamepad);
                        navigation.dispatch(NavigationActions.navigate({ routeName: 'Gamepad', params: { isInEdit: false, gamepad: gamepad } }))
                    }}
                />
            ))
        }
    </List>
)

const styles = StyleSheet.create({
    list: {
        margin: 0,
        backgroundColor: 'white'
    }
})

const mapStateToProps = state => ({
    gamepads: state.domain.gamepads,
});

const mapDispatchToProps = dispatch => ({
    editGamepad: (gamepad) => dispatch(editGamepad(gamepad))
})

GamepadList.propTypes = {
    gamepads: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(GamepadList)