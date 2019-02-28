import React from 'react';
import { Link } from 'react-router-dom';
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
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">
                    Viewing <span>{props.expenses.length}</span> {expenseWord}{' '}
                    totalling <span>{formattedExpenseTotal}</span>
                </h2>

                <div className="page-header__actions">
                    <Link className="button" to="/create">
                        Add Expense
                    </Link>
                </div>
            </div>
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
