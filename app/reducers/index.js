import { combineReducers } from 'redux';

import nav from './Navigation';
import persist from './Persist';

const AppReducer = combineReducers({
    nav,
    persist
});

export default AppReducer;