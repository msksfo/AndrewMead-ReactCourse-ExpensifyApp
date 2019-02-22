import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// *combineReducers will allow us to create multiple small functions (reducers) and then combine them together
// actions we need -> add expense, remove expense, edit expense, set text filter, sort by date, sort by amount, set start date, set end date
// not possible to use one reducer for all those actions. so...
// we will create 2 reducers. one for expenses. one for the filters

// set up the action generator for adding an expense
// destructure the values that come from the user with default values in case        none are passed in
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt,
    },
});

// set up the action generator for removing an expense by id
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

// set up the action generator for editing an expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

const expensesReducerDefaultState = [];

// pass in the default state, an empty array. and pass in the action
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // add the expense to the array of expenses
            // return state.concat(action.expense) -> with es6 array spread ->
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(value => value.id !== action.id);

        //* the above return statement destructured ->
        // return state.filter({ id } => id !== action.id)

        case 'EDIT_EXPENSE':
            return state.map(value => {
                return value.id === action.id
                    ? { ...value, ...action.updates }
                    : value;
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

// set up the action generator for changing a text based search
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
});

// set up the action generator for changing the sortBy to amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// set up the action generator for changing the sortBy to date
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// set up the action generator for changing the sortBy to a start date
// we don't have to set up default parameter because undefined is the default anyway
const setStartDate = startDate => ({
    type: 'SET_START_DATE',
    startDate,
});

// set up the action generator for changing the sortBy to an end date
const setEndDate = endDate => ({
    type: 'SET_END_DATE',
    endDate,
});

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    // the state will be transformed by one of these actions
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            // take whatever the state was and only change it (overwrite it) according to this one action. return
            // * so the old state and the new action are combined to make up the new state. then we return this new state
            return { ...state, text: action.text };
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' };
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate };
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate };
        default:
            return state;
    }
};

//* get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // get a subset of all the expenses
    return expenses
        .filter(value => {
            const startDateMatch =
                typeof startDate !== 'number' || value.createdAt >= startDate;
            const endDateMatch =
                typeof endDate !== 'number' || value.createdAt <= endDate;

            // filter for expenses.description has the text variable string inside it
            // hint: use .includes() and convert both strings to lower case
            const textMatch = value.description
                .toLowerCase()
                .includes(text.toLowerCase());

            // add the expense to the filtered array if ALL three of these are true
            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                // the bigger number is the more recently created
                return a.createdAt > b.createdAt ? -1 : 1;
            } else if (sortBy === 'amount') {
                // put most expensive expenses first
                return a.amount > b.amount ? -1 : 1;
            }
        });
};

//* create the redux store, passing in combineReducers as a function
// the store holds the state for the app
const store = createStore(
    // combineReducers takes in an argument -> an object
    // object key is the root state name, value is the reducer that will manage it
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// dispatch the action by passing in the action generator
//! the dispatched action will be dispatched to both reducers, but you don't need to add a case for both reducers. only add a case for the reducer that needs to do something with the data when the action is dispatched
const expenseOne = store.dispatch(
    addExpense({ description: 'rent', amount: 10000, createdAt: -21000 })
);

// add multiple expenses by adding multiple dispatch calls
//* save it to a variable if you need the return object value
const expenseTwo = store.dispatch(
    addExpense({ description: 'coffee', amount: 300, createdAt: -1000 })
);

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// edit an expense by passing in the id, and the updates object
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 800 }));

// set the filter to text based search
//store.dispatch(setTextFilter('coffee'));

// set the filter to sort by amount
store.dispatch(sortByAmount());

//set the filter to sort by date
store.dispatch(sortByDate());

//set the filter to sort by a start date
//store.dispatch(setStartDate(0));

//set the filter to sort by a start date
//store.dispatch(setEndDate(999));

// make sure the undefined value works when nothing is passed in
//store.dispatch(setStartDate());

const demoState = {
    expenses: [
        {
            id: '123',
            description: 'car',
            note: 'this was final payment for the car loan',
            amount: 54500, // sticking with cents eliminates rounding errors
            createdAt: 0, // this will be a timestamp
        },
    ],
    filters: {
        text: 'rent', // search for the text directly
        sortBy: 'date', // date or amount
        startDate: undefined,
        endDate: undefined,
    },
};

//! the organized file structure for the expensity app:
//folders inside the src folder
//* 1. actions
/*
        files inside actions folder
        1. expenses.js will store the action generators for expenses: addExpense,    removeExpense, editExpense

        2. filters.js will store the action generators for filters: setTextFilter,   sortByDate, sortByAmount, setStartDate, setEndDate
    */
//* 2. reducers
/*
        files inside the reducers folder
        1. expenses.js will be for the expenses reducer. it contains the default     state value and the reducer
        2. filters.js will be for the filters reducer. it contains the defualt       state value and the reducer
    */

//* 3. selectors
/* 
        files inside the selectors folder
        1. expenses.js contains the function that handles all the filtering for      the expenses. which expenses will be visible, filtered by (text,          sortbBy, etc) 
        
    */
//* 4. store
/*
        files inside the store folder
        1. configureStore.js sets up the store configuration
     */
