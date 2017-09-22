import { AppNavigator } from '../navigators/appNavigator';

let initialNavState = AppNavigator.router.getStateForAction('Home');

const navigation = (state = initialNavState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}
export default navigation;