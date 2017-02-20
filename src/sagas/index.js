import {watchPosts} from './posts';

export default function* rootSaga() {
    yield [
        watchPosts()
    ]
}