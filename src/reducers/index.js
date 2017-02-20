import { combineReducers } from 'redux';
import postsFilter from './posts-filter';
import posts from './posts';

const postsRoot = combineReducers({
    postsFilter,
    posts
});

export default postsRoot;