import { ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { SEND_COMMAND, INIT, DISCONNECT } from '../constants';
import {sendCommand, init, close} from '../utils/mqttRedux';
import { connected, valueSent, disconnected } from '../actions';


export const commandEpic = action$ =>
    action$.ofType(SEND_COMMAND)
        .mergeMap(action => sendCommand(action.name, action.value))
        .do(isOk => console.log(`in send command: ${isOk}`))
        .map(isOk => valueSent(isOk));

export const connectEpic = action$ =>
    action$.ofType(INIT)
        .mergeMap(() => init())
        .mapTo(connected())

export const disconnectEpic = actions$ =>
    actions$.ofType(DISCONNECT)
        .mergeMap(() => close())
        .mapTo(disconnected())
