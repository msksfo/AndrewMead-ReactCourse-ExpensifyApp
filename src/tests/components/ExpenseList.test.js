import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

//* when testing react components, we want to test the unconnected version, because we want to be able to provide a set of dynamic props
//! so, our props will not come from the store. we will provide them directly

test('should render ExpenseList with expenses', () => {
    //* render the component with the dummy data by:
    // 1. make variable 'wrapper by calling shallow()
    // 2. into the shallow call, we pass in the component we want to render,         ExpenseList
    // 3. ExpenseList expects one prop (which we called 'expenses') to be             passed in
    // 4. set the expenses prop equal to the array of dummy data, expenses

    const wrapper = shallow(<ExpenseList expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);

    expect(wrapper).toMatchSnapshot();
});
