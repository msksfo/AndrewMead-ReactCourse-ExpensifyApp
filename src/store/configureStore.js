import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// export an anonymous function that returns the store
export default () => {
    //* create the redux store, passing in combineReducers as a function
    const store = createStore(
        // combineReducers takes in an argument -> an object
        // object key is the root state name, value is the reducer that will manage it
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
        }),
        // add the line below redux dev tools chrome extension
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};
