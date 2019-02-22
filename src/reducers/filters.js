import moment from 'moment';

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    // make default start/end dates be the current month
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
};

//? why am i unable to export default filtersReducer, here in the function declaration

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' };
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate };
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate };
        default:
            return state;
    }
};

export default filtersReducer;
