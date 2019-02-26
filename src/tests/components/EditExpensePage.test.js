import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

//* set up the spies and the test component once globally, instead of duplicating it in every single test
//* start each test case with a fresh version of the variables
let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[2]}
        />
    );
});

test('should render edit expense page correctly', () => {
    // take the snapshot
    expect(wrapper).toMatchSnapshot();
});

test('should handle start edit an expense', () => {
    // call the function that gets passed into expense form, with the data it expects, one expense object
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(
        expenses[2].id,
        expenses[2]
    );
});

test('should handle start remove expense', () => {
    // find the remove button and simulate clicking it
    wrapper.find('button').simulate('click');

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2].id);
});
