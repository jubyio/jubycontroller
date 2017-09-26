import { addButton, addStick } from '../actions'
import { Gamepad } from '../components/gamepad';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    commands: state.commands
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddButton: (button) => {
      dispatch(addButton(button))
    },
    onAddStick: (stick) => {
        dispatch(addStick(stick))
      },
  }
}

const GamepadManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gamepad)

export default GamepadManager;

