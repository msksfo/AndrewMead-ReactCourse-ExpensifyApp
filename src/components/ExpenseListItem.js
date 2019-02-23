import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// import my action generator that removes an expense
import { removeExpense } from '../actions/expenses';

// also could use destructuring here -> { dispatch, description, amount, createdAt, id }
//! if using destructuring here, make sure that values are also destructured in the action generator
// exporting for testing purposes
export const ExpenseListItem = props => (
    <div>
        <h3>
            <Link to={`/edit/${props.id}`}>{props.description}</Link>
        </h3>

        <p>
            {numeral(props.amount / 100).format('$0,0.00')} ~{' '}
            {moment(props.createdAt).format('MMMM Do, YYYY')}
        </p>

        {/* Andrew removed this functionality from his app. I left it for better understanding the process along the way. if i remove it, i should also remove connect, because I wouldn't need it anymore */}
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
    </div>
);

// we don't need anything from state, so no need to pass in a function to connect
//* after refactoring, I could have deleted the call to connect, but I left it as an example of calling connect without passing in state
export default connect()(ExpenseListItem);
