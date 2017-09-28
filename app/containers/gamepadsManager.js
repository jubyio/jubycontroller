import { addGamepad } from '../actions'
import { GamepadsScreen } from '../components/GamepadsScreen';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    gamepads: state.gamepads,
    ...props.navigation.state.params
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
)(GamepadsScreen)

export default GamepadsManager;

