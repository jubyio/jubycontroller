
import { combineEpics } from 'redux-observable';
import { commandEpic, connectEpic } from './runtime';

const rootEpic = combineEpics(
    commandEpic,
    connectEpic
);

export default rootEpic;