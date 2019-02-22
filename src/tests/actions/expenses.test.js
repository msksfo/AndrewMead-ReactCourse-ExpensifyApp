import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent',
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String),
        },
    });
});

// test when no user input provided
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
