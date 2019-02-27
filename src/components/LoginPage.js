import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div>
        {/* when someone clicks the button, call the start login prop. //* startLogin is a function living in actions/auth.js  */}
        <button onClick={startLogin}>Login</button>
    </div>
);

const mapDispatchToProps = dispatch => ({
    startLogin: () => dispatch(startLogin()),
});

export default connect(
    undefined,
    mapDispatchToProps
)(LoginPage);
