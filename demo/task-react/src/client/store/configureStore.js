import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);
const loggerMiddleware = createLogger();

export default function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(
                epicMiddleware,
                loggerMiddleware,
                routerMiddleware(browserHistory)
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    return store;
}