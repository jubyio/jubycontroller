import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
import update from 'immutability-helper';

// const firstAction = AppNavigator.router.getActionForPathAndParams('Gamepads');
// const initNavState = AppNavigator.router.getStateForAction(firstAction);
const initNavState = AppNavigator.router.getStateForAction('Gamepads');
const nav = (state = initNavState, action) => {
    let nextState;
    switch (action.type) {
        case 'NewGamepad':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Gamepad' })
                , { ...state, currentGamepad: {name: 'New gamepad'} })
            break;
        case 'Cancel':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Gamepads' })
                , update(state, { $unset: ['currentGamepad'] }))
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}
export default nav;