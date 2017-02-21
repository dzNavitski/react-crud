import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import './App.css';

const mapStateToProps = (state) => {
    return {
        user: state.postsRoot.auth.user,
        permissions: state.postsRoot.auth.permissions
    }
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button"
                                    className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#navbar"
                                    aria-expanded="false"
                                    aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Posts App</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/posts">Posts</Link>
                                </li>
                            </ul>

                            <div className="navbar-right UserText">
                                {this.props.user}
                            </div>
                        </div>
                    </div>
                </nav>

                {this.props.children}
            </div>
        );
    }
};

export default connect(mapStateToProps, null)(App);
