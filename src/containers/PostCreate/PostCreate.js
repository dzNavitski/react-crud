import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createPost, fetchPost, setEditPost, clearEditPost} from '../../store/Posts/actions';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        editPost: state.posts.edit
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => {
            dispatch(createPost(post))
        },
        fetchPost: (id) => {
            dispatch(fetchPost(id))
        },
        clearEditPost: () => {
            dispatch(clearEditPost());
        }
    }
};

class PostCreate extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.router.params;
        id ? this.props.fetchPost(id) : this.props.clearEditPost();
    }

    onFieldChange = (e) => {
        const {editPost, setEditPost} = this.props;
        const {name ,value} = e.target;

        return setEditPost(Object.assign({}, editPost, {[name]: value}));
    };


    onSubmit = (e) => {
        e.preventDefault();
        const {postTitle, views, likes} = this.props.editPost;
        const {user} = this.props;

        this.props.createPost({
            postTitle,
            views,
            likes,
            userName: user
        });
    };

    render() {
        const {editPost} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-primary Margin-bottom-m" role="button" to="/posts">Back to posts</Link>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="postTitle">Post title</label>
                                <input type="text"
                                       className="form-control"
                                       id="postTitle"
                                       name="postTitle"
                                       placeholder="Post title"
                                       value={editPost.postTitle}
                                       onChange={this.onFieldChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="views">Views</label>
                                <input type="number"
                                       className="form-control"
                                       id="views"
                                       name="views"
                                       placeholder="Number of views"
                                       value={editPost.views}
                                       onChange={this.onFieldChange}
                                       min="0"
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="likes">Likes</label>
                                <input type="number"
                                       className="form-control"
                                       id="likes"
                                       name="likes"
                                       placeholder="Number of likes"
                                       value={editPost.likes}
                                       onChange={this.onFieldChange}
                                       min="0"
                                       required/>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
