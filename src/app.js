// 3 steps to using npm modules. 1. install, 2. import, 3. use
// yarn add packageName@packageNumber

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

// make the store
const store = configureStore();

/*
    - commenting out because this will happen by interacting with the           application, but leaving here as example to study
    
    - log everything that happens to the store
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
*/

/*
    - commented out because we will use firebase as database.
    - leaving examples here to study 

store.dispatch(
    addExpense({ description: 'dinner', amount: 2500, createdAt: 1000 })
);
store.dispatch(
    addExpense({ description: 'water bill', amount: 40600, createdAt: 5000 })
);
store.dispatch(setTextFilter());

store.dispatch(
    addExpense({ description: 'rent', amount: 100600, createdAt: 0 })
);

*/

//* 1. the Provider component allows us to provide the store to all of the components that make up the application. this means that we do not have to manually pass the store around. instead, any components that want to access the store can just do so

//* 2. use the connect function in the individual components where you need to dispatch actions or read from the store. this connects your component to the redux store

const jsx = (
    //* pass in a single prop to provider -> the store to share with the rest of the application
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
