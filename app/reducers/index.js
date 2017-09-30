import { combineReducers } from 'redux';

import nav from './Navigation';
import persist from './Persist';
import device from './Device';

const AppReducer = combineReducers({
    nav,
    persist,
    device
});

export default AppReducer;