import { addButton, addStick } from '../actions'
import { GamepadScreen } from '../components/GamepadScreen';
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
)(GamepadScreen)

export default GamepadManager;

