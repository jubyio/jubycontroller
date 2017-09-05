var initState = {}

export function Reduce(state = initState, action = {}) {
    switch (action.type) {
        case 1:
            return {
                ...state
            };

        default:
            return state;

    }
}