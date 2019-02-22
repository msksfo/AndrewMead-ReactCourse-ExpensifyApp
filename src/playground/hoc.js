// a higher order component (HOC) is a react component that renders another component

// the goal and advantages of a higher order component are
// 1. to reuse code
// 2. render hijacking
// 3. prop manipulation
// 4. abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// create a regular function that will be called with the one we want to wrap
const withAdminWarning = WrappedComponent => {
    // return a new stateless functional component
    // the returned component is the higher order component
    return props => (
        <div>
            {props.isAdmin && <p>this is private info. please dont share</p>}
            {/* use object spread to pass down all key/value pairs as props */}
            <WrappedComponent {...props} />
        </div>
    );
};

// save it to a variable. now it's a component
const AdminInfo = withAdminWarning(Info);

// this is the regular function that returns the higher order component
const requireAuthentication = WrappedComponent => {
    // return the HOC. it just returns some jsx with conditional logic
    // the logic checks if user is logged in. if so, show the wrapped component, otherwise tell them to login
    return props => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>please login to view the stuff</p>
            )}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

/*
ReactDOM.render(
    <AdminInfo info={'im fucking tired!!!'} isAdmin={true} />,
    document.getElementById('app')
);
*/

ReactDOM.render(
    <AuthInfo info={'im fucking tired!!!'} isAuthenticated={true} />,
    document.getElementById('app')
);
