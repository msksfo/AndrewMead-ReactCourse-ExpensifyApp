import React from 'react';
import getVisibleExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';

//* could have destructured off of the props object like this:
// const ExpenseSummary = ({ expenseCount, expenseTotal}) => {}
export const ExpensesSummary = props => {
    const expenseWord = props.expenses.length === 1 ? 'expense' : 'expenses';
    const formattedExpenseTotal = numeral(
        getTotalExpenses(props.expenses) / 100
    ).format('$0,0.00');

    return (
        <div>
            <h3>
                Viewing {props.expenses.length} {expenseWord} totalling{' '}
                {formattedExpenseTotal}
            </h3>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters),
    };

    //* could also have done it this way:
    /*
        const visibleExpenses = getVisibleExpenses(state.expenses, state.filters

        return {
            expenseCount: visibleExpenses.length,
            expensesTotal: getTotalExpenses(visibleExpenses)
        }
    */
};

export default connect(mapStateToProps)(ExpensesSummary);
