import { combineReducers } from 'redux';

import nav from './Navigation';
import device from './Device';
import domain from './Domain';
import runtime from './Runtime';

const AppReducer = combineReducers({
    nav,
    //persist,
    device,
    domain,
    runtime
});

export default AppReducer;