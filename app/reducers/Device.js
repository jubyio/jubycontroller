import Orientation from 'react-native-orientation';
import {LOCK_LANDSCAPE, UNLOCK_ORIENTATION} from '../constants';

let orientation = 'unlock';
const device = (state = {orientation}, action) => {
    switch(action.type){
        case LOCK_LANDSCAPE:
            Orientation.lockToLandscape();
            return {...state, orientation: 'lock landscape'}
        case UNLOCK_ORIENTATION:
            Orientation.unlockAllOrientations();
            return {...state, orientation: 'unlock'}
        default :
            return state;
    }
}

export default device;