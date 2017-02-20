import {watchPosts} from './posts';
import {watchAuth} from './auth';

export default function* rootSaga() {
    yield [
        watchAuth(),
        watchPosts()
    ]
}