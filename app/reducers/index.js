import { combineReducers } from 'redux';

import { navigation } from './navigation';
import { persist } from './persist';

const AppReducer = combineReducers({
    navigation,
    persist
});

export default AppReducer;