import { Observable } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../configures/ActionTypes';
import * as actions from '../actions';
import { LIST, TASK } from '../configures/api';

export function fetch(action$) {
    return action$.ofType(ActionTypes.FETCH_TASK_REQUEST)
        .switchMap(action => {
            return ajax.getJSON(LIST)
                .map(res => {
                    if (res.error) {
                        throw new Error(res.error);
                    } else if (res.results) {
                        return res.results;
                    } else {
                        throw new Error('invalid response');
                    }
                })
                .map(actions.fetchReceive)
                .catch(error =>  Observable.of({
                    type: ActionTypes.FETCH_TASK_ERROR,
                    error: error
                }));
        });
}

export function del(action$) {
    return action$.ofType(ActionTypes.DELETE_TASK_REQUEST)
        .switchMap(action => {
            return ajax({
                url: TASK + '/' + action.id,
                method: 'DELETE',
                responseType: 'json'
            })
                .map(res => res.response)
                .map(res => {
                    console.log(res);
                    if (res.error) {
                        throw new Error(res.error);
                    }
                })
                .map(actions.deleteReceive.bind(null, action.id))
                .catch(error =>  Observable.of(actions.taskSetError(action.id, error)));
        });
}

export function complete(action$) {
    return action$.ofType(ActionTypes.COMPLETE_TASK_REQUEST)
        .switchMap(action => {
            return ajax({
                url: TASK + '/' + action.id,
                method: 'PUT',
                responseType: 'json',
                body: {
                    completed: true
                }
            })
                .map(res => res.response)
                .map(res => {
                    if (res.error) {
                        throw new Error(res.error);
                    } else if (res.results) {
                        return res.results;
                    } else {
                        throw new Error('invalid response');
                    }
                })
                .map(actions.taskReceive)
                .catch(error =>  Observable.of(actions.taskSetError(action.id, error)));
        });
}

export function restart(action$) {
    return action$.ofType(ActionTypes.RESTART_TASK_REQUEST)
        .switchMap(action => {
            return ajax({
                url: TASK + '/' + action.id,
                method: 'PUT',
                responseType: 'json',
                body: {
                    completed: false
                }
            })
                .map(res => res.response)
                .map(res => {
                    if (res.error) {
                        throw new Error(res.error);
                    } else if (res.results) {
                        return res.results;
                    } else {
                        throw new Error('invalid response');
                    }
                })
                .map(actions.taskReceive)
                .catch(error =>  Observable.of(actions.taskSetError(action.id, error)));
        });
}

export function edit(action$) {
    return action$.ofType(ActionTypes.EDIT_TASK_REQUEST)
        .switchMap(action => {
            return ajax({
                url: TASK + '/' + action.id,
                method: 'PUT',
                responseType: 'json',
                body: {
                    task: action.value
                }
            })
                .map(res => res.response)
                .map(res => {
                    if (res.error) {
                        throw new Error(res.error);
                    } else if (res.results) {
                        return res.results;
                    } else {
                        throw new Error('invalid response');
                    }
                })
                .map(actions.taskReceive)
                .catch(error =>  Observable.of(actions.taskSetError(action.id, error)));
        });
}