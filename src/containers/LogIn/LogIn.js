import React, {Component} from 'react';
import {connect} from 'react-redux';

import {logIn} from '../../store/Auth/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (user) => {
            dispatch(logIn(user))
        }
    }
};

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            paswword: ''
        };

        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUserNameChange(e) {
        const userName = e.target.value;
        this.setState({userName});
    }

    onPasswordChange(e) {
        const password = e.target.value;
        this.setState({password});
    }

    onSubmit(e) {
        e.preventDefault();
        const {userName, password} = this.state;

        this.props.logIn({
            userName,
            password
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="LogInForm" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">User name</label>
                                <input type="text"
                                       className="form-control"
                                       id="userName"
                                       placeholder="User name"
                                       onChange={this.onUserNameChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Password"
                                       onChange={this.onPasswordChange}
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

export default connect(null, mapDispatchToProps)(LogIn);
