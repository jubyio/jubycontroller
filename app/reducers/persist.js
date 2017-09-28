import { REHYDRATE } from 'redux-persist/constants'

const persist = (state = [], action) => {
    switch (action.type) {
        case REHYDRATE:
            var incoming = action.payload.myReducer
            if (incoming) return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) }
            return state
        default:
            return state;
    }
}

export default persist;