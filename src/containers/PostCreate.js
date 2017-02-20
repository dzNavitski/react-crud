import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createPost} from '../actions';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => {
            dispatch(createPost(post))
        }
    }
};

class PostCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: '',
            views: 0,
            likes: 0
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onViewsChange = this.onViewsChange.bind(this);
        this.onLikesChange = this.onLikesChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChange(e) {
        const postTitle = e.target.value;
        this.setState({postTitle});
    }

    onViewsChange(e) {
        const views = e.target.value;
        this.setState({views});
    }

    onLikesChange(e) {
        const likes = e.target.value;
        this.setState({likes});
    }


    onSubmit(e) {
        e.preventDefault();
        const {postTitle, views, likes} = this.state;

        this.props.createPost({
            postTitle,
            views,
            likes,
            userName: 'Test Johny 1'
        });
    }

    render() {
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
                                       placeholder="Post title"
                                       value={this.state.postTitle}
                                       onChange={this.onTitleChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="views">Views</label>
                                <input type="number"
                                       className="form-control"
                                       id="views"
                                       placeholder="Number of views"
                                       value={this.state.views}
                                       onChange={this.onViewsChange}
                                       min="0"
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="likes">Likes</label>
                                <input type="number"
                                       className="form-control"
                                       id="likes"
                                       placeholder="Number of likes"
                                       value={this.state.likes}
                                       onChange={this.onLikesChange}
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
