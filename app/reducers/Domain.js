import { SAVE_GAMEPAD, DELETE_GAMEPAD } from '../constants';
import update from 'immutability-helper';
import * as uuid from 'uuid/v4';
import { REHYDRATE } from 'redux-persist/constants'

const domain = (state = { gamepads: [] }, action) => {
    var index;
    switch (action.type) {
        case SAVE_GAMEPAD:
            var _state = null;
            if (!action.gamepad.id) {
                action.gamepad.id = uuid();
            }
            index = state.gamepads.findIndex(g => g.id == action.gamepad.id);
            if (index >= 0) {
                _state = update(state, {
                    gamepads: {
                        [index]: {
                            $set: action.gamepad
                        }
                    }
                })
                return _state;
            } else {
                _state = update(state, { gamepads: { $push: [action.gamepad] } });
                return _state;
            }
        case DELETE_GAMEPAD:
            index = state.gamepads.findIndex(g => g.id == action.id);
            return update(state, { gamepads: { $splice: [[index, 1]] } });
        case REHYDRATE:
            var incoming = action.payload.domain
            if (incoming) return { ...state, ...incoming }
            return state;
        default:
            return state;
    }
}

export default domain