import { Observable } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';

import { push } from 'react-router-redux';

import * as ActionTypes from '../configures/ActionTypes';
import * as actions from '../actions';
import { TASK } from '../configures/api';

export function create(action$) {
    return action$.ofType(ActionTypes.CREATE_TASK_REQUEST)
        .switchMap(action => {
            return ajax({
                url: TASK,
                method: 'POST',
                body: action.data,
                responseType: 'json'
            })
                .map(res => res.response || res)
                .map(res => {
                    console.log(res);
                    if (res.error) {
                        Observable.throwError(new Error(res.error));
                    } else if (res.results) {
                        return res.results;
                    } else {
                        Observable.throwError(new Error('invalid response'));
                    }
                })
                .map(actions.createReceive)
                .mapTo(push('/todo'))
                .catch(error =>  Observable.of(actions.createError(error)));
        });
}