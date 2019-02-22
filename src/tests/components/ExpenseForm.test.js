import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form correctly with expense data', () => {
    //! <ExpenseForm {...expenses[1]} DOES NOT WORK because ->
    //! ExpenseForm requires an expense prop (the whole object). The jsx above doesn't pass an expense prop in! Instead, it passes in several props, each names after a different expense property

    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);

    expect(wrapper).toMatchSnapshot();
});

/*
    -see lecture 121, question by JR. Adam explains more about the difference between expenses={expenses[1]} vs expenses={expenses} vs {...expenses[1]}

    -Andrew also explains more in the question by Lily

    1. ExpenseList expects and array, so we pass in the whole array ->
       <ExpenseList expenses={expenses} />

    2. ExpenseListItem expects the props from one expense, so we destructure      the object to pass in the individual expense property values -> 
       <ExpenseListItem {...expenses[1]} /> 

    3. ExpenseFrom expects an expense prop OBJECT, so we pass in the whole        object, NOT the destructured properties -> 
       <ExpenseForm expense={expenses[1]} />
*/

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);

    // (optional) add a snapshot before creating the error, to make sure that we have no error to begin with
    expect(wrapper).toMatchSnapshot();

    //* find the form, and simulate a submit
    // simulate is called with the event (a string) and any submission arguments -> we need to define and pass the 'e' argument (faking it), otherwise we'll get a type error, because of  e.preventDefault() in the ExpenseForm
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
    });

    //* now fetch the state off of wrapper, and make sure it's not an empty string (there should be an error, because we submitted with invalid data!)
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    // make a snapshot to make sure that after the error state changes, the error renders correctly
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    // 1. render the expense form
    // 2. change the input (by submitting the change event)
    // 3. make an assertion checking that the description was set

    const value = 'new description';

    const wrapper = shallow(<ExpenseForm />);

    // .find() will find all the inputs
    // we only care about the first one, for the description field -> use the at() method to pass in the index of the input you want
    //* we need e.target.value, so pass in an object and define it
    wrapper
        .find('input')
        .at(0)
        .simulate('change', {
            target: { value },
        });

    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'new note something something';

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').simulate('change', {
        target: { value },
    });

    expect(wrapper.state('noteText')).toBe(value);
});

test('should set amount if input is valid', () => {
    //! this value needs to be a string, because the value in the real app is a string. On that string, we use .match(), which can only be used on strings
    const value = '23.50';

    const wrapper = shallow(<ExpenseForm />);
    wrapper
        .find('input')
        .at(1)
        .simulate('change', {
            target: { value },
        });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if input is invalid', () => {
    const value = '23.5022';

    const wrapper = shallow(<ExpenseForm />);
    wrapper
        .find('input')
        .at(1)
        .simulate('change', {
            target: { value },
        });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    // the goal of spies is to create fake functions. they are created by jest, and we make assertions about them

    // this returns the new spy. we just save it on a variable
    const onSubmitSpy = jest.fn();

    //* example usage below
    // onSubmitSpy('Tia', 'San Mateo');
    // expect(onSubmitSpy).toHaveBeenCalledWith('Tia', 'San Mateo');

    // render the expense form with an expense, and the onSubmit function (because the real component calls onSubmit)
    const wrapper = shallow(
        <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
    );

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
    });

    expect(wrapper.state('error')).toBe('');

    // make sure the submission was called with the correct object
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        noteText: expenses[0].noteText,
        createdAt: expenses[0].createdAt,
    });
});

test('should set new date on date change', () => {
    // pass a moment instance into createdAt, and we expect that it gets set on the state

    // create a variable for the moment instance that will be passed into the function called on .prop()
    const now = moment();

    const wrapper = shallow(<ExpenseForm />);

    // trigger the prop from the child component
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    // make an assertion checking that the date was set
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendarFocused on focus change', () => {
    const focused = true;

    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('SingleDatePicker').prop('onFocusChange')({
        focused,
    });

    // make an assertion checking that the calendar focus changed
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
