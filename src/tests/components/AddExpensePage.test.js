import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

//* set up the spies and the test component once globally, instead of duplicating it in every single test
//* start each test case with a fresh version of the variables
let addExpense, history, wrapper;
beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <AddExpensePage addExpense={addExpense} history={history} />
    );
});

test('should render add expense page correctly', () => {
    // take the snapshot
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    // call the function that gets passed into expense form, with the data it expects, one expense object
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
