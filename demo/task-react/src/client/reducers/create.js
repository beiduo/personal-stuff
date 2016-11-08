import * as ActionTypes from '../configures/ActionTypes';

let initialState = {
    isCreating: false,
    error: null
}

function createRequest(state) {
    return Object.assign({}, state, {
        error: null,
        isCreating: true
    });
}

function createReceive(state, action) {
    return Object.assign({}, state, {
        isCreating: false
    });
}

function createError(state, action) {
    console.error(action.error);
    return Object.assign({}, state, {
        isCreating: false,
        error: action.error.message || action.error
    });
}

function tasks(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_TASK_REQUEST:
            return createRequest(state, action);
        case ActionTypes.CREATE_TASK_RECEIVE:
            return createReceive(state, action);
        case ActionTypes.CREATE_TASK_RECEIVE:
            return createComplete(state, action);
        case ActionTypes.CREATE_TASK_ERROR:
            return createError(state, action);
        default:
            return state;
    }
}

export default tasks;