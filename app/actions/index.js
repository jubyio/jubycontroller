import {
    SAVE_GAMEPAD,
    DELETE_GAMEPAD,
    LOCK_LANDSCAPE,
    NEW_GAMEPAD,
    EDIT_GAMEPAD,
    EDIT_CONTROL,
    ADD_CONTROL,
    UNLOCK_ORIENTATION,
    STICK_VALUE_CHANGED,
    BUTTON_PRESSED,
    ControlTypes
} from '../constants';
import uuid from 'uuid/v4';

//Config
export const editGamepad = (gamepad) => {
    return {
        type: EDIT_GAMEPAD,
        gamepad
    }
}

export const addControl = (control) => {
    return {
        type: ADD_CONTROL,
        control
    };
}

export const editControl = (control) => {
    return {
        type: EDIT_CONTROL,
        control
    };
}


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

//Runtime
export const controlValueChanged = (control) => (
    {
        type: STICK_VALUE_CHANGED,
        control
    }
)

//Helpers
export const initGamepad = () => ({
    id: uuid(),
    name: 'Nouveau gamepad',
    controls: []
})

export const initControl = (type , window) => ({
    id: uuid(),
    type: type,
    position: {
        x: window.width / 2,
        y: window.height / 2
    },
    scale: 1,
    width: type == ControlTypes.STICK ? window.width / 5 : 50,
    height: type == ControlTypes.STICK ? window.height / 10 : 50

})