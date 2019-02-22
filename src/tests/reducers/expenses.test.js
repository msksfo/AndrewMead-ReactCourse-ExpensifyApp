import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

// make sure the default state gets set to an empty array
test('should set default state', () => {
    // dispatch @@INIT
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add an expense', () => {
    const newExpense = {
        id: 4,
        description: 'coffee',
        note: '',
        amount: 450,
        createdAt: 2000,
    };

    const action = { type: 'ADD_EXPENSE', expense: newExpense };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense with a valid id', () => {
    const updates = {
        amount: 190,
    };

    const action = { type: 'EDIT_EXPENSE', id: expenses[0].id, updates };

    const state = expensesReducer(expenses, action);

    const overwrittenExpense = {
        ...expenses[0],
        ...updates,
    };

    expect(state).toEqual([overwrittenExpense, ...expenses.slice(1)]);

    //! Andrew's solution is below
    // expect(state[0].amount).toBe(updates.amount);
});

test('should not edit an expense if id not found', () => {
    const updates = {
        description: 'something else',
    };

    const action = { type: 'EDIT_EXPENSE', id: '2', updates };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses]);
});
