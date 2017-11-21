import { ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import { CONTROL_VALUE_CHANGED, CONNECT } from '../constants';

export const commandEpic = action$ => 
    action$.ofType(CONTROL_VALUE_CHANGED)
        .mapTo({type: 'toto'});

export const connectEpic = action$ => 
    action$.ofType(CONNECT)