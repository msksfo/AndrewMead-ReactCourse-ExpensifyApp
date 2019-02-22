import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // get a subset of all the expenses
    return expenses
        .filter(value => {
            const createdAtMoment = moment(value.createdAt);

            const startDateMatch = startDate
                ? startDate.isSameOrBefore(createdAtMoment, 'day')
                : true;

            const endDateMatch = endDate
                ? endDate.isSameOrAfter(createdAtMoment, 'day')
                : true;

            // filter for expenses.description has the text variable string inside it
            // hint: use .includes() and convert both strings to lower case
            const textMatch = value.description
                .toLowerCase()
                .includes(text.toLowerCase());

            // add the expense to the filtered array if ALL three of these are true
            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                // the bigger number is the more recently created
                return a.createdAt > b.createdAt ? -1 : 1;
            } else if (sortBy === 'amount') {
                // put most expensive expenses first
                return a.amount > b.amount ? -1 : 1;
            }
        });
};

export default getVisibleExpenses;
