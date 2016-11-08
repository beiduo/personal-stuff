import { combineEpics } from 'redux-observable';
import { fetch, del, complete, restart, edit } from './tasks';
import { create } from './create';

export default combineEpics(
    fetch,
    del,
    complete,
    restart,
    edit,
    create
);