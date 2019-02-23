const getTotalExpenses = expenseArr => {
    // if there are no expenses, return zero, otherwise:
    // 1. map over the expense array to get all expense amounts
    // 2. reduce the above array into one amount

    return expenseArr.length === 0
        ? 0
        : expenseArr.map(value => value.amount).reduce((a, b) => a + b);
};

export default getTotalExpenses;
