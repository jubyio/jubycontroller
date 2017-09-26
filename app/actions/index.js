import { ADD_GAMEPAD, ADD_BUTTON, ADD_STICK } from '../constants';

export const addGamepad = (gamepad) => {
    return {
        type : ADD_GAMEPAD,
        gamepad
    }
}

export const addButton = (button) => {
    return {
        type : ADD_BUTTON,
        button
    }
}

export const addStick = (stick) => {
    return {
        type : ADD_STICK,
        stick
    }
}