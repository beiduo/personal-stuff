import * as ActionTypes from '../configures/ActionTypes';

let initialState = {
    isFetching: false,
    error: null,
    lastUpdated: null,
    items: []
}

function fetchRequest(state) {
    return Object.assign({}, state, {
        error: null,
        isFetching: true
    });
}

function fetchReceive(state, action) {
    return Object.assign({}, state, {
        isFetching: false,
        items: action.data
    })
}

function fetchError(state, action) {
    console.error(action.error);
    return Object.assign({}, state, {
        isFetching: false,
        error: action.error.message || action.error
    })
}

function deleteRequest(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.isUpdating = true;
            task.error = false;
        }
    });
    return obj;
}

function deleteReceive(state, action) {
    let obj = Object.assign({}, state, {
        items: state.items.filter(task => task._id !== action.id)
    });
    return obj;
}

function completeRequest(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.isUpdating = true;
            task.error = false;
        }
    });
    return obj;
}

function restartRequest(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.isUpdating = true;
            task.error = false;
        }
    });
    return obj;
}

function editRequest(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.isUpdating = true;
            task.error = false;
        }
    });
    return obj;
}

function taskReceive(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task) => {
        if (task._id === action.res._id) {
            task.completed = (action.res.completed === 'true' ? true : false);
            task.updated = action.res.updated;
            task.task = action.res.task;
        }
    });
    return obj;
}

function taskClearError(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.error = false;
        }
    });
    return obj;
}

function taskSetError(state, action) {
    let obj = Object.assign({}, state);
    obj.items.map((task, i) => {
        if (task._id === action.id) {
            task.error = action.error.message || action.error;
            task.isUpdating = false;
        }
    });
    return obj;
}

function tasks(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_TASK_REQUEST:
            return fetchRequest(state, action);
        case ActionTypes.FETCH_TASK_RECEIVE:
            return fetchReceive(state, action);
        case ActionTypes.FETCH_TASK_ERROR:
            return fetchError(state, action);
        case ActionTypes.TASK_SET_ERROR:
            return taskSetError(state, action);
        case ActionTypes.TASK_CLEAR_ERROR:
            return taskClearError(state, action);
        case ActionTypes.DELETE_TASK_REQUEST:
            return deleteRequest(state, action);
        case ActionTypes.DELETE_TASK_RECEIVE:
            return deleteReceive(state, action);
        case ActionTypes.COMPLETE_TASK_REQUEST:
            return completeRequest(state, action);
        case ActionTypes.RESTART_TASK_REQUEST:
            return restartRequest(state, action);
        case ActionTypes.EDIT_TASK_REQUEST:
            return editRequest(state, action);
        case ActionTypes.TASK_RECEIVE:
            return taskReceive(state, action);
        default:
            return state;
    }
}

export default tasks;