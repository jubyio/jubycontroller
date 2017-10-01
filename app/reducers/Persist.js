import { REHYDRATE } from 'redux-persist/constants'

const persist = (state = {}, action) => {
    switch (action.type) {
        case REHYDRATE:
            var incoming = action.payload.domain
            if (incoming) return { ...state, ...incoming }
            return state
        default:
            return state;
    }
}

export default persist;