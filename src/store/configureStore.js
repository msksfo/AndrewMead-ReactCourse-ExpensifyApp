import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

// if we are using redux devtools, make sure it's correctly set up, otherwise don't worry about it
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
        composeEnhancers(applyMiddleware(thunk))
        // add the line below redux dev tools chrome extension
        //window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};
