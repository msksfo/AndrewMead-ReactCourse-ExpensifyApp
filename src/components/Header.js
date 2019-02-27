import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    // react NavLink is better suited for navigation links
    <header>
        <h1>Expensify</h1>
        <NavLink exact to="/" activeClassName="is-active">
            Dashboard
        </NavLink>
        <NavLink to="/create" activeClassName="is-active">
            Create Expense
        </NavLink>

        {/* the logging out action will be defined in actions/auth */}
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout()),
});

export default connect(
    undefined,
    mapDispatchToProps
)(Header);
