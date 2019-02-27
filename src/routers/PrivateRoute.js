import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    // render the component if we are authenticated, and redirect us to the login page otherwise
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

const mapStateToProps = state => ({
    // figure out if the user is logged in or not
    //* if there is a user id, we are authenticated. if uid is undefined, we are not authenticated

    isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
