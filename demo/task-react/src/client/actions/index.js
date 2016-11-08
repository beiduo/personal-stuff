import * as ActionTypes from '../configures/ActionTypes';

export function fetchRequest() {
    return {
        type: ActionTypes.FETCH_TASK_REQUEST
    }
}

export function fetchReceive(data) {
    return {
        type: ActionTypes.FETCH_TASK_RECEIVE,
        data
    }
}

export function createRequest(data) {
    return {
        type: ActionTypes.CREATE_TASK_REQUEST,
        data
    }
}

export function createReceive(res) {
    return {
        type: ActionTypes.CREATE_TASK_RECEIVE,
        res
    }
}

export function createError(error) {
    return {
        type: ActionTypes.CREATE_TASK_ERROR,
        error
    }
}

export function taskSetError(id, error) {
    return {
        type: ActionTypes.TASK_SET_ERROR,
        id,
        error
    }
}

export function taskClearError(id) {
    return {
        type: ActionTypes.TASK_CLEAR_ERROR,
        id
    }
}

export function deleteRequest(id) {
    return {
        type: ActionTypes.DELETE_TASK_REQUEST,
        id
    }
}

export function deleteReceive(id) {
    return {
        type: ActionTypes.DELETE_TASK_RECEIVE,
        id
    }
}

export function completeRequest(id) {
    return {
        type: ActionTypes.COMPLETE_TASK_REQUEST,
        id
    }
}

export function restartRequest(id) {
    return {
        type: ActionTypes.RESTART_TASK_REQUEST,
        id
    }
}

export function editRequest(id, value) {
    return {
        type: ActionTypes.EDIT_TASK_REQUEST,
        id,
        value
    }
}

export function taskReceive(res) {
    return {
        type: ActionTypes.TASK_RECEIVE,
        res
    }
}

export function navigation(route) {
    return {
        type: ActionTypes.NAVIGATION,
        path: route
    }
}