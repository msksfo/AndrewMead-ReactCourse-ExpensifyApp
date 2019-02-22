import filtersReducer from '../../reducers/filters';
import moment from 'moment';

// make sure all default values are set up correctly when the redux store first kicks off

test('should set up default filter values', () => {
    //* set up the call to the reducer, passing in an empty state value, and the action object with type @@INIT (this comes from redux)
    const state = filtersReducer(undefined, { type: '@@INIT"' });

    // this should be equal to the default state
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        // we need moment to get start of month/ end of month vales
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    });
});

test('should set sort by to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(state.sortBy).toBe('amount');
});

test('should set sort by to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount',
    };

    const action = { type: 'SORT_BY_DATE' };

    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'this is my test text';

    const action = { type: 'SET_TEXT_FILTER', text };

    const state = filtersReducer(undefined, action);

    // the new value on state should be whatever was passed into the action object
    expect(state.text).toBe(text);
});

test('should set start date filter', () => {
    const startDate = moment().startOf('month');

    const action = { type: 'SET_START_DATE', startDate };

    const state = filtersReducer(undefined, action);

    // use toEqual because we are comparing 2 objects
    expect(state.startDate).toEqual(startDate);
});

test('should set end date filter', () => {
    const endDate = moment().endOf('month');

    const action = { type: 'SET_END_DATE', endDate };

    const state = filtersReducer(undefined, action);

    // use toEqual because we are comparing 2 objects
    expect(state.endDate).toEqual(endDate);
});
