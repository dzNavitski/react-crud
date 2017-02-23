import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {changePostsPage, changePostsSort, initPosts} from '../../store/Posts/actions';
import Table from '../../components/Table/Table';

const mapStateToProps = (state) => {
    return {
        paging: state.posts.filter.paging,
        sort: state.posts.filter.sort,
        posts: state.posts.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageChange: (paging) => {
            dispatch(changePostsPage(paging))
        },
        onSortChange: (sort) => {
            dispatch(changePostsSort(sort))
        },
        initPosts: () => {
            dispatch(initPosts())
        }
    }
};

const columns = [{
    title: 'Id',
    dataIndex: 'id',
    sortable: true
}, {
    title: 'User name',
    dataIndex: 'userName',
    sortable: true
}, {
    title: 'Post title',
    dataIndex: 'postTitle',
    sortable: true,
    render: (attrs, content) => (<th {...attrs}><div className="text-danger"> {content} </div></th>)
}, {
    title: 'Views',
    dataIndex: 'views',
    sortable: true
}, {
    title: 'Likes',
    dataIndex: 'likes',
    sortable: true
}, {
    title: 'Created at',
    dataIndex: 'createdAt',
    sortable: true
}];

class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initPosts();
    }

    render() {
        const {sort, paging, onPageChange, onSortChange, posts} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-primary Margin-bottom-m" role="button" to="/create">Create new post</Link>

                        <Table dataSource={posts.data}
                               columns={columns}
                               sort={sort}
                               paging={paging}
                               total={posts.total}
                               onPageChange={onPageChange}
                               onSortChange={onSortChange}></Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
