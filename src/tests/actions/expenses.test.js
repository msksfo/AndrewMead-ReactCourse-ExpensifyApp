import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startAddExpense,
    startEditExpense,
    addExpense,
    removeExpense,
    editExpense,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// create the configuration so the test cases will all create the same mock store
const createMockStore = configureMockStore([thunk]);

// write some data to the firebase test database before each test
// but don't allow the test case to run until the data has been written to firebase
beforeEach(done => {
    const expensesData = {};
    // loop over the expenses array and add an expense to the expensesData object for each expense in the expenses array (from the expenses fixtures file)

    // destructure the values
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expensesData[id] = { description, amount, note, createdAt };
    });

    database
        .ref('expenses')
        .set(expensesData)
        .then(() => {
            done();
        });
});

test('should setup remove expense action object', () => {
    // make a variable to store the returned action object
    const action = removeExpense('123abc');

    // assert something about the action, with toEqual, a good method to compare two objects
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc',
    });
});

test('should setup edit expense action object', () => {
    // make the call to editExpense()
    const action = editExpense('223344', { amount: 550 });

    // make the assertion
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '223344',
        updates: { amount: 550 },
    });
});

// test for user input values
test('should setup add expense action object with provided values', () => {
    /*
    - tweaking at lecture 153, because we need an id for firebase?
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent',
    };
    */
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2],
        /*
        expense: {
            ...expenseData,
            id: expect.any(String),
        },
        */
    });
});

//* at lecture 153, we add two new test cases for the asynchronous action              generators
// by passing 'done' into the callback, we are telling jest that we are testing an asynchronous function
// we need to call done() after our assertion
test('should add expense to database and store', done => {
    // create a mock redux store for testing purposes with module redux-mock-store
    // what do we care about?
    // 1. that the database was successfully updated, and
    // 2. that the correct action was dispatched

    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        noteText: 'this one works',
        createdAt: 1000,
    };

    //* wait for firebase call to finish, THEN make the assertions
    // do this by promise chaining .then()
    // inside the callback to .then(), make some assertions expecting that the data should have been saved to firebase, and the action should have been dispatched
    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData,
                },
            });

            // now fetch the data from firebase (by id) and make sure the data was stored and stored in the right location
            //* by adding return, i am returning a promise
            return database
                .ref(`expenses/${actions[0].expense.id}`)
                .once('value');

            //* now this then() is the success handler for the above returned promise
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(expenseData);

            // calling done() forces jest to wait until this moment in time
            done();
        });
});

test('should add expense with defaults to database and store', done => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        noteText: '',
        amount: 0,
        createdAt: 0,
    };

    //* wait for firebase call to finish, THEN make the assertions
    // do this by promise chaining .then()
    // inside the callback to .then(), make some assertions expecting that the data should have been saved to firebase, and the action should have been dispatched
    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults,
                },
            });

            // now fetch the data from firebase (by id) and make sure the data was stored and stored in the right location
            //* by adding return, i am returning a promise
            return database
                .ref(`expenses/${actions[0].expense.id}`)
                .once('value');

            //* now this then() is the success handler for the above returned promise
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(expenseDefaults);

            // calling done() forces jest to wait until this moment in time
            done();
        });
});

test('should setup set expense action object with data', () => {
    // pass in the expenses from the fixtures data
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses,
    });
});

test('should fetch the expenses from firebase', done => {
    const store = createMockStore({});

    store
        .dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses,
            });

            done();
        })
        .catch(err => {
            done();
        });
});

test('should remove expenses from firebase', done => {
    const store = createMockStore({});
    const id = expenses[2].id;

    store
        .dispatch(startRemoveExpense(id))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id,
            });

            return database.ref(`expenses/${id}`).once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
});

test('should edit an expense from firebase', done => {
    const store = createMockStore({});
    const id = expenses[1].id;
    const updates = {
        amount: 21045,
    };

    store
        .dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates,
            });

            return database.ref(`expenses/${id}`).once('value');
        })
        .then(snapshot => {
            expect(snapshot.val().amount).toBe(updates.amount);
            done();
        });
});

// test when no user input provided
/*
- this action generator is no longer responsible for this. (lecture 153) commented out for reference

test('should setup add expense action object with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String),
        },
    });
});
*/
