// set up the action generator for changing a text based search
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
});

// set up the action generator for changing the sortBy to amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// set up the action generator for changing the sortBy to date
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// set up the action generator for changing the sortBy to a start date
// we don't have to set up default parameter because undefined is the default anyway
const setStartDate = startDate => ({
    type: 'SET_START_DATE',
    startDate,
});

// set up the action generator for changing the sortBy to an end date
const setEndDate = endDate => ({
    type: 'SET_END_DATE',
    endDate,
});

export { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate };
