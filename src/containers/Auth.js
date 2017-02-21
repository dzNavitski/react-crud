import React, {Component} from 'react';
import {connect} from 'react-redux';
import { replace } from 'react-router-redux';

const mapStateToProps = (state) => {
    return {
        user: state.postsRoot.auth.user,
        permissions: state.postsRoot.auth.permissions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        forwardTo: (url) => {
            dispatch(replace(url));
        }
    }
};

const Authorization = (WrappedComponent, routePermissions = []) => {
    class WithAuthorization extends Component {
        hasPermissions(routePermissions, permissions) {
            if (routePermissions) {
                return routePermissions.every(permission => permissions.includes(permission));
            }

            return true;
        }

        constructor(props) {
            super(props);
        }

        componentWillMount() {
            const {user, permissions} = this.props;

            if (user) {
                if (!this.hasPermissions(routePermissions, permissions)) {
                    this.props.forwardTo('/nopermissions');
                }
            } else {
                this.props.forwardTo('/login');
            }
        }

        render() {
            const {user, permissions} = this.props;
            const canShow = user && this.hasPermissions(routePermissions, permissions);
            const localPermissions = {routePermissions};

            if (canShow) {
                return <WrappedComponent {...this.props} {...localPermissions} />
            } else {
                return null;
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
};

export default Authorization;
