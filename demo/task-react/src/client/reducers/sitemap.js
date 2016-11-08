import { NAVIGATION } from '../configures/ActionTypes';
import SITEMAP from '../configures/SiteMap';


function sitemap(state = SITEMAP, action) {
	switch (action.type) {
		case NAVIGATION:
			return Object.assign({}, state, {path: action.payload.pathname});
		default:
			return state;
	}
}

export default sitemap;