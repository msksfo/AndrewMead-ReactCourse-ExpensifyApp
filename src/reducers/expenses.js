const expensesReducerDefaultState = [];

// pass in the default state, an empty array. and pass in the action
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // add the expense to the array of expenses
            // return state.concat(action.expense) -> with es6 array spread ->
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(value => value.id !== action.id);

        //* the above return statement destructured ->
        // return state.filter({ id } => id !== action.id)

        case 'EDIT_EXPENSE':
            return state.map(value => {
                return value.id === action.id
                    ? { ...value, ...action.updates }
                    : value;
            });

        case 'SET_EXPENSES':
            // we don't care what is in state, or what the previous expenses were
            // we just want to set the expenses array completely
            return action.expenses;

        default:
            return state;
    }
};

export default expensesReducer;
