import { combineReducers } from 'redux';

import { AppNavigator } from '../navigators/appNavigator';

var initialNavState = AppNavigator.router.getStateForAction('Home');

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'home':
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const AppReducer = combineReducers({
    nav
  });
  
  export default AppReducer;