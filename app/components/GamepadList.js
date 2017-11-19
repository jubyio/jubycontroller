import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { editGamepad } from '../actions';

class GamepadList extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<List style={styles.list}>
            {
                this.props.gamepads.map((gamepad, i) => (
                    <ListItem title={gamepad.name} key={i} containerStyle={{ backgroundColor: this.props.selectedGamepad && this.props.selectedGamepad.id === gamepad.id ? '#cccccc' : 'white'}}
                        onLongPress={() => {
                            this.props.onSelected(gamepad);
                        }}
                        onPress={() => {
                            this.props.editGamepad(gamepad);
                            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Gamepad', params: { isInEdit: false, gamepad: gamepad } }))
                        }}
                    />
                ))
            }
        </List>);
    }
}

GamepadList.propTypes = {
    gamepads: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    list: {
        margin: 0,
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => ({
    gamepads: state.domain.gamepads,
});

const mapDispatchToProps = dispatch => ({
    editGamepad: (gamepad) => dispatch(editGamepad(gamepad))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamepadList)