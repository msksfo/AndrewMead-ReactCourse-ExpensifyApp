//* pseodo code for how my action generators initially worked
// 1. component calls the action generator
// 2. action generator returns an object (one of the objects below, or one         of the objects in the filters file)
// 3. the component takes the that object and dispatches it
// 4. the redux store runs the reducers and it changes

//* to use firebase, we will tweak how the action generators work
// it is a little more complex because we are working with asynchronous code
// 1. component calls the action generator
// 2. action generator returns a function
// 3. the component dispatches the function(?) //! redux by default does not allow you to dispatch function. to do that we have to set up a module, a piece of redux middleware, that is going to add support for this behavior
//* redux-thunk is the module mentioned above that provides support for dispatching functions
// 4. the function runs (it has the ability to dispatch other actions and do       whatever it wants) //* this is where we will put our firebase code

//* broad overview of working with firebase & redux
// (importing firebase, then: )
// 1. use push to add something to the database
// 2. then we will dispatch an action that returns an object, and THAT will manipulate the redux store

//notes related to the project as a whole
//* initial structure example (this code is not being used!)
/*
const db = {
    expenses: {
        asdfj: {},
    },
};
*/

//* goal structure of project, example (this code is not being used!)
// when reading/writing from expenses, it will be users/userID/expenses
//! we changed this over  in lecture 168
/*
const finalDB = {
    users: {
        theUserId: {
            expenses: {
                asdfj: {},
            },
        },
    },
};
*/

import uuid from 'uuid';
import database from '../firebase/firebase';

//set up the action generator for adding an expense
// destructure the values that come from the user with default values in case        none are passed in
const addExpense = expense => ({
    type: 'ADD_EXPENSE',
    expense,
});

// this will dispatch addExpense inside the function and that is what will keep changing the store
const startAddExpense = (expenseData = {}) => {
    // this returns the thing that gets dispatched. (before, we were just returning objects)
    //* this returned function gets called internally by redux, and it is called with dispatch
    //! lecture 168 update: to allow multiple users, pass getState in, to get the userid
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        // write data to firebase
        // wait for the data to correctly sync up
        // then we use dispatch to dispatch addExpense, making sure the redux store reflects those changes
        const {
            description = '',
            noteText = '',
            amount = 0,
            createdAt = 0,
        } = expenseData;

        const expense = { description, noteText, amount, createdAt };

        // access firebase and use .push() to save the data
        // in lecture 153, we altered this to *return* databse... By returning the promise chain, we can add .then() in the test file
        return (
            database
                //! what we pass into .ref() changed in lecture 168. it used to be .ref('expenses') but we want to have multiple users each with their own expenses
                .ref(`users/${uid}/expenses`)
                .push(expense)
                .then(ref => {
                    //! dispatch the action from up above
                    // otherwise the redux store will never be updated
                    dispatch(
                        addExpense({
                            id: ref.key,
                            ...expense,
                        })
                    );
                })
        );
    };
};

// set up the action generator for removing an expense by id
// also could pass in the id as a destructured value { id }
const removeExpense = id => ({
    type: 'REMOVE_EXPENSE',
    id,
});

const startRemoveExpense = id => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                //* dispatch remove expenses
                dispatch(removeExpense(id));
            });
    };
};

// set up the action generator for editing an expense
// pass in an id, and an updates object
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                //* dispatch edit expenses
                dispatch(editExpense(id, updates));
            });
    };
};

// this will manipulate the redux store in some way
//* get the array back from firebase, and set it
const setExpenses = expenses => ({
    type: 'SET_EXPENSES',
    expenses,
});

// this is the asynchronous action. it fetches the data
const startSetExpenses = () => {
    //1. fetch all expense data once
    //2. parse the data into an array
    //3. dispatch set_expenses

    //* this first returned function is a requirement of redux-thunk. redux-thunk requires that you dispatch a function, so i need to return a function from the action generator. that funnction is then called and this is when we start manipulating the firebase data
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        //* fetch all expense data once
        return database
            .ref(`users/${uid}/expenses`)
            .once('value')
            .then(snapshot => {
                //console.log(snapshot);

                const expenses = [];

                //* parse the data (currently an object) into an array
                // this function will be called one time for each expense
                snapshot.forEach(childSnapshot => {
                    //console.log(childSnapshot.val());

                    // push the child object into the expenses array
                    //* then we have our array of objects that we can use as redux expects us to in this application
                    expenses.push({
                        // grab the id generated by firebase with .key
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    });
                });
                //console.log(expenses);
                //* dispatch set expenses
                dispatch(setExpenses(expenses));
            });
    };
};

export {
    setExpenses,
    startSetExpenses,
    addExpense,
    removeExpense,
    editExpense,
    startAddExpense,
    startRemoveExpense,
    startEditExpense,
};
