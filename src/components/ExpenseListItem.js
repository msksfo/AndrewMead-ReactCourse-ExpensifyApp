import React from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// import my action generator that removes an expense
import { removeExpense } from '../actions/expenses';

// also could use destructuring here -> { dispatch, description, amount, createdAt, id }
//! if using destructuring here, make sure that values are also destructured in the action generator
// exporting for testing purposes
const ExpenseListItem = props => (
    <Link className="list-item" to={`/edit/${props.id}`}>
        <div>
            <h3 className="list-item__title">{props.description}</h3>
            <span className="list-item__sub-title">
                {' '}
                {moment(props.createdAt).format('MMMM Do, YYYY')}
            </span>
        </div>

        <h3 className="list-item__data">
            {numeral(props.amount / 100).format('$0,0.00')}{' '}
        </h3>
    </Link>
);

export default ExpenseListItem;

/*
        Andrew removed this functionality from the app. When we did this, we also removed connect, because we didnt' need it anymore.

   
        <button
            onClick={() => {
                // we have access to dispatch (as a prop) inside our connected components
                // use dispatch to update the store as users interact with our app
                // pass in the action object
                // remove an expense by dispatching an action when the button is clicked

                props.dispatch(removeExpense(props.id));
            }}
        >
            Remove
        </button>

        // we don't need anything from state, so no need to pass in a function to connect
        //* after refactoring, I could have deleted the call to connect, but I left it as an example of calling connect without passing in state
        export default connect()(ExpenseListItem);

   
 */
