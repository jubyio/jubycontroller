import { AppNavigator } from '../navigators/AppNavigator';

let initialNavState = AppNavigator.router.getStateForAction('Gamepads');

const nav= (state = initialNavState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}
export default nav;