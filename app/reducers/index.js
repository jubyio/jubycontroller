import { combineReducers } from 'redux';

import nav from './Navigation';
import device from './Device';
import domain from './Domain';
import runtime from './Runtime';
import config from './Config';

const AppReducer = combineReducers({
    nav,
    device,
    domain,
    config,
    runtime
});

export default AppReducer;