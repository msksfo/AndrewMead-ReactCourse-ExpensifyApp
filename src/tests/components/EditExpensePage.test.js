import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

//* set up the spies and the test component once globally, instead of duplicating it in every single test
//* start each test case with a fresh version of the variables
let editExpense, removeExpense, history, wrapper;
beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
            expense={expenses[2]}
        />
    );
});

test('should render edit expense page correctly', () => {
    // take the snapshot
    expect(wrapper).toMatchSnapshot();
});

test('should handle editing an expense', () => {
    // call the function that gets passed into expense form, with the data it expects, one expense object
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removing an expense', () => {
    // find the remove button and simulate clicking it
    wrapper.find('button').simulate('click');

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
