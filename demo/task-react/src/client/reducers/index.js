import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sitemap from './sitemap';
import tasks from './tasks';
import create from './create';

const rootReducer = combineReducers({
	tasks,
	sitemap,
	create,
	routing: routerReducer
});

export default rootReducer;