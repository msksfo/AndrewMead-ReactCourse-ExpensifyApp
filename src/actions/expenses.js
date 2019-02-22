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
