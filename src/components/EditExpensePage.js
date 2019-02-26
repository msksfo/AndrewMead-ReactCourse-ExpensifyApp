import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

// import my action generators for removing/editing expenses
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.startEditExpense(this.props.expense.id, expense);

        // history.push() navigates the user programatically, after some code has run. Link is an anchor tag, so nothing happens unless it is clicked
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveExpense(this.props.expense.id);

        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <ExpenseForm
                    // pass the expense object down (it was returned from  mapStateToProps), so that when the create expense page comes up, the field will be populated with the data that previously existed, so the user can edit it
                    expense={this.props.expense}
                    // dispatch the action to edit the expense
                    // redirect to the dashboard page
                    onSubmit={this.onSubmit}
                />

                <button
                    onClick={this.onRemove}
                    // we have access to dispatch (as a prop) inside our connected components
                    // use dispatch to update the store as users interact with our app
                    // pass in the action object
                    // remove an expense by dispatching an action when the button is clicke
                >
                    Remove
                </button>
            </div>
        );
    }
}

//* 1. react router (the Link that led us here) renders the higher order component
//* 2. the hoc passes the props through and allows us to add some new ones

const mapStateToProps = (state, props) => {
    //* render one new prop
    // use the passed in props to search through the expenses array
    return {
        expense: state.expenses.find(
            value => value.id === props.match.params.id
        ),
    };

    //! now the actual expense we are trying to edit comes back to us, so up above we can render an instance of Expense form, passing in this specific expense as a prop
};

//? why is props being passed in? i dont see that it's being used...
const mapDispatchToProps = (dispatch, props) => {
    return {
        // take the data that comes in, -----> pass it down
        startEditExpense: (id, expense) =>
            dispatch(startEditExpense(id, expense)),
        startRemoveExpense: data => dispatch(startRemoveExpense(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExpensePage);
