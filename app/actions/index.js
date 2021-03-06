import {
    SAVE_GAMEPAD,
    DELETE_GAMEPAD,
    LOCK_LANDSCAPE,
    NEW_GAMEPAD,
    EDIT_GAMEPAD,
    EDIT_CONTROL,
    ADD_CONTROL,
    UNLOCK_ORIENTATION,
    SEND_COMMAND,
    VALUE_SENT,
    BUTTON_PRESSED,
    ControlTypes,
    INIT,
    CONNECTED,
    DISCONNECT,
    DISCONNECTED
    
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
export const sendCommand = (name, value) => (
    {
        type: SEND_COMMAND,
        name: name,
        value: value
    }
)

export const valueSent = (isOk) => (
    {
        type : VALUE_SENT,
        isOk
    }
)

export const connected = (isOk) => (
    {
        type: CONNECTED,
        isOk
    }
)

export const init = () => (
    {
        type: INIT
    }
)

export const disconnected = (isOk) => (
    {
        type: DISCONNECTED,
        isOk
    }
)

export const disconnect = () => (
    {
        type: DISCONNECT
    }
)


 
//Helpers
export const initGamepad = () => ({
    id: uuid(),
    name: 'Nouveau gamepad',
    controls: [],
    isNew: true
})

export const initControl = (type , window) => ({
    id: uuid(),
    type: type,
    name: null,
    label: null,
    keepValue: false,
    value: null,
    minValue: null,
    maxValue: null,
    defaultValue: null,
    orientation: 'H',
    position: {
        x: window.width / 2,
        y: window.height / 2
    },
    scale: 1,
    width: type == ControlTypes.STICK ? window.width / 5 : 50,
    height: type == ControlTypes.STICK ? window.height / 10 : 50,
    activeColor: '#ffffff',
    inactiveColor: '#d3d3d3'
})

/*
{
    "type": "STICK | BUTTON",
    "id": "guid",
    "name": "DIRECTION",
    "label": "direction",
    "keepValue": true,
    "value": 1.0,
    "minValue": 0.0,
    "maxValue": 2.0,
    "defaultValue": 0.2,
    "orientation": "V | H",
    "position" : { "x": 333, "y": 34},
    "scale": 1.0,
    "width" : 200,
    "height": 50,
    "activeColor": "red",
    "inactiveColor": "green"
}
*/