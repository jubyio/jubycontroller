import { SAVE_GAMEPAD, DELETE_GAMEPAD } from '../constants';
import update from 'immutability-helper';
import * as uuid from 'uuid/v4';
import { REHYDRATE } from 'redux-persist/constants'

const domain = (state = { gamepads: [] }, action) => {
    switch (action.type) {
        case SAVE_GAMEPAD:
            if (!action.gamepad.id) {
                action.gamepad.id = uuid();
            }
            return update(state, { gamepads: { $push: [action.gamepad] } })
        case DELETE_GAMEPAD:
            let index = state.gamepads.findIndex(g => g.id == action.id);
            return update(state, { $splice: [[index, 1]] });
        case REHYDRATE:
            var incoming = action.payload.domain
            if (incoming) return { ...state, ...incoming }
            return state
        default:
            return state;
    }
}

export default domain