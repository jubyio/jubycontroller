
import { combineEpics } from 'redux-observable';
import { commandEpic, connectEpic, disconnectEpic } from './runtime';

const rootEpic = combineEpics(
    commandEpic,
    connectEpic,
    disconnectEpic
);

export default rootEpic;