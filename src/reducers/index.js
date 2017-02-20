import { combineReducers } from 'redux';
import auth from './auth';
import postsFilter from './posts-filter';
import posts from './posts';

const postsRoot = combineReducers({
    auth,
    postsFilter,
    posts
});

export default postsRoot;