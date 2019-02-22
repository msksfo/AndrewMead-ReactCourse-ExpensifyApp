import moment from 'moment';

// make an array of expenses to serve as test data for whenever we need a dummy array of expenses
const expenses = [
    {
        id: 1,
        description: 'candy',
        note: '',
        amount: 195,
        createdAt: 0,
    },
    {
        id: 2,
        description: 'rent',
        note: '',
        amount: 109500,
        //! use the .subtract() & valueOf methods to get an integer representing a moment in time, 4 days ago
        createdAt: moment(0)
            .subtract(4, 'days')
            .valueOf(),
    },
    {
        id: 3,
        description: 'credit card',
        note: '',
        amount: 4500,
        //! use the .add() & valueOf methods to get an integer representing a moment in time, 4 days in the future
        createdAt: moment(0)
            .add(4, 'days')
            .valueOf(),
    },
];

export default expenses;
