import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//*  use the connect function in the individual components where you need to dispatch actions or read from the store. this connects your component to the redux store

//* when you connect a component to the redux store, it's reactive. which means that as the store changes, the component gets rerendered with the new values

// this is being exported so that we can test it
export const ExpenseList = props => (
    <div>
        {props.expenses.length === 0 ? (
            <p>no expenses</p>
        ) : (
            props.expenses.map(value => (
                <ExpenseListItem
                    key={value.id}
                    id={value.id}
                    description={value.description}
                    amount={value.amount}
                    createdAt={value.createdAt}
                />
            ))
        )}
    </div>
);

//! STEPS TO CONNECT A COMPONENT TO THE REDUX STORE
// a) import { connect } from 'react-redux'
// 1. create a const for the higher order component by calling connect()
// 2. connect() returns a function, not a higher order component
// 3. to get the HOC, we need to call the function that connect returns, passing        in our component ->
// 4. connect()(ourComponent)
// 5. pass a function into connect that says what information from the store we         want our component to be able to access connect(()=> {})(ourComponent)
// 6. the argument to the anonymous function above is state. the information            returned is an object of key/value pairs usually from state, but we can           also add our own -> connect((state) => {name: 'harry'})(ourComponent)

//* export default connect()() is more common practice than const blahblah = connect()()
export default connect(state => {
    // what information from the store do we want our component to be able to access. the information will be returned as an object of key/value pairs

    return {
        // add a new property, like name
        name: 'cirrus',

        // or use the ones from state, like expenses and filters
        //expenses: state.expenses,
        //filters: state.filters,

        //* refactored to use the return value (the filtered sorted array) of getVisibleExpenses function, which was a default export, so here we imported it as selectExpenses

        expenses: selectExpenses(state.expenses, state.filters),
    };
})(ExpenseList);

//export default ConnectedExpenseList;

//* it is common practice to extract the function passed to connect() to it's own variable, const mapStateToProps, as follows:
/* 
    -named this way because it maps the store state to component props

    const mapStateToProps = (state) => {
        return {
            name: 'cirrus',
            expenses: state.expenses,
        };
    }

    - then connect becomes connect(mapStateToProps)(ourComponent)
    ! in summary, call connect, define the things we want to get off of the store, define the component we want to create the connected version of
    * the end result is a new component with the props from the store
*/
