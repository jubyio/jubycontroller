import { SAVE_GAMEPAD, DELETE_GAMEPAD, LOCK_LANDSCAPE, UNLOCK_ORIENTATION } from '../constants';
import uuid from 'uuid/v4';

//Domaine
export const saveGamepad = (gamepad) => {
    return {
        type: SAVE_GAMEPAD,
        gamepad
    }
}

export const deleteGamepad = (id) => {
    return {
        type: DELETE_GAMEPAD,
        id
    }
}

//Device
export const lockToLandscape = () => (
    { type: LOCK_LANDSCAPE }
)

export const unlockOrientation = () => (
    { type: UNLOCK_ORIENTATION }
)

//Helpers
export const initGamepad = () => ({
    id: uuid(),
    name: 'Nouveau gamepad',
    controls: []
})

export const initControl = (type, window) => ({
    id: uuid(),
    type: type,
    position: { 
        x: window.width / 2, 
        y: window.height / 2 
    }
})