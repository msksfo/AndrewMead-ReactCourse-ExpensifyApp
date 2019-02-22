import React from 'react';
import { shallow } from 'enzyme';
//import expenses from '../fixtures/expenses';
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list filters with alt data correctly', () => {
    // we need to change the props to test the alt filters
    // do this with setProps()

    wrapper.setProps({
        filters: altFilters,
    });

    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'coffee';

    // ensure that the correct prop got called
    wrapper.find('input').simulate('change', {
        // pass down e.target.value by doing this
        target: { value },
    });

    // we expect that setTextFIlter was called with the value
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';

    wrapper.setProps({
        filters: altFilters,
    });

    // simulate a change on select
    wrapper.find('select').simulate('change', {
        // pass down the event object
        target: { value },
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount';

    // simulate a change on select
    wrapper.find('select').simulate('change', {
        // pass down the event object
        target: { value },
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(3, 'years');
    const endDate = moment(0).subtract(3, 'years');

    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate,
        endDate,
    });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    // in the actual app, it can be null, startDate, or endDate
    const calendarFocused = 'endDate';

    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

    // make an assertion checking that the calendar focus changed
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
