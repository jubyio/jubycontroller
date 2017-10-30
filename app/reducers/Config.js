import { EDIT_GAMEPAD, ADD_CONTROL, EDIT_CONTROL, SAVE_GAMEPAD, CANCEL_GAMEPAD } from '../constants';
import update from 'immutability-helper';

const config = (state = {}, action) => {
    switch (action.type) {
        case EDIT_GAMEPAD:
            return { gamepad: action.gamepad };
        case ADD_CONTROL:
            const newState = update(state, { gamepad: { controls: { $push: [action.control] } } });
            return newState;
        case EDIT_CONTROL:
            const index = state.gamepad.controls.findIndex(control => control.id === action.control.id);
            console.log(`position du control dans le reducer: id=${action.control.id} x=${action.control.position.x} y=${action.control.position.y} scale=${action.control.scale}`);
            let toto = update(state, {
                gamepad: {
                    controls: {
                        [index]: { $set: action.control }
                    }
                }
            });
            return toto;
        case SAVE_GAMEPAD:
        case CANCEL_GAMEPAD:
            return {};
        default:
            return state;
    }
}

export default config;