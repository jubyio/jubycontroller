import { addGamepad } from '../actions'
import { Gamepads } from '../components/gamepads';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    gamepads: state.gamepads
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddGamepad: (gamepad) => {
      dispatch(addGamepad(gamepad))
    }
  }
}

const GamepadsManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gamepads)

export default GamepadsManager;

