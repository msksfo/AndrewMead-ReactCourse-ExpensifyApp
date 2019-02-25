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

import uuid from 'uuid';

//set up the action generator for adding an expense
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
// also could pass in the id as a destructured value { id }
const removeExpense = id => ({
    type: 'REMOVE_EXPENSE',
    id,
});

// set up the action generator for editing an expense
// pass in an id, and an updates object
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

export { addExpense, removeExpense, editExpense };
