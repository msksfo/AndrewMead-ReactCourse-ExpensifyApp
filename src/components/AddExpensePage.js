import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// export this (unconnected) so we can test it
export class AddExpensePage extends React.Component {
    onSubmit = expense => {
        // dispatch the action to the redux store by calling connect
        //props.dispatch(addExpense(expense));

        //* the above code was refactored to this after adding in mapDispatchToProps, which we did for testing purposes
        this.props.startAddExpense(expense);

        // force a redirect to the dashboard page when user submits
        // pass in the path to the page you want to go to
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    // return an object with props. these props call dispatch
    return {
        startAddExpense: expense => dispatch(startAddExpense(expense)),
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(AddExpensePage);

/* 
     this was the original code: export default connect()(AddExpensePage);

    -because addExpense is a function we imported in, it is difficult to test (unlike if it were passed in as a prop). but connect gives us a work around. 

    so we will refactor the export to
    1.  export default connect(undefined, mapDispatchToProps)(AddExpensePage)

    2. note: we also changed the code inside the arrow function passed to onSubmit from this:  //props.dispatch(addExpense(expense))
                to this:  //props.onSubmit(expense)

    3. we changed it over to a class based component, to avoid inline functions

    the functionality is the same! it was only changed so we could test with jest



*/
