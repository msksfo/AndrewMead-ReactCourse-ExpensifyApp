import React from 'react';
import { connect } from 'react-redux';
import {
    setTextFilter,
    sortByAmount,
    sortByDate,
    setStartDate,
    setEndDate,
} from '../actions/filters';
import { DateRangePicker } from 'react-dates';

// create a basic presentational component
//* the goal is to get the old value from the store, because we need to make sure the input always matches up with the text value on the redux store, so if that value changes via a dispatch call,  we want to read that value and use it here
// 1. connect ExpenseListFilters to the store

export class ExpenseListFilters extends React.Component {
    // set up state to track the focus for the date picker
    // it will either be null or a string
    state = {
        calendarFocused: null,
    };

    //* this function is called by the react dates library.
    // it's called with an object, containing a start date and end date
    onDatesChange = ({ startDate, endDate }) => {
        // dispatch the correct actions to get the filters to change
        //this.props.dispatch(setStartDate(startDate));
        //this.props.dispatch(setEndDate(endDate));

        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = calendarFocused => {
        this.setState(() => ({ calendarFocused }));
    };

    onTextChange = e => {
        // we have access to dispatch (as a prop) inside our connected components
        // use dispatch to update the store as we type
        // pass in the action object
        //this.props.dispatch(setTextFilter(e.target.value))

        this.props.setTextFilter(e.target.value);
    };

    onSortChange = e => {
        return e.target.value === 'date'
            ? this.props.sortByDate()
            : this.props.sortByAmount();
    };

    render() {
        return (
            <div>
                {/* provide an onChange handler so real time changes are dispatched from the component to the store */}
                <input
                    type="text"
                    //! use value and onChange so the component will be a controlled component
                    value={this.props.filters.text}
                    onChange={this.onTextChange}

                    /* this was refactored to not be an inline function
                    onChange={e => {
                        // we have access to dispatch (as a prop) inside our connected components
                        // use dispatch to update the store as we type
                        // pass in the action object
                        this.props.dispatch(setTextFilter(e.target.value));
                    }}
                    */
                />

                <select
                    //! add value here so that the select will be a controlled component!!!
                    //* it works without it, but in that case the DOM would be the single source of truth, rather than react, which is not what we want.
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>

                {/* allow user to pick the  range of dates they want to see  expenses for. the date range picker from moment.js takes five props (mando), two of which depend on state, so we will make this a class based component */}
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: state.filters,
    };
};

// since dispatch is set up here, I will remove it up above in the method definitions
const mapDispatchToProps = dispatch => {
    return {
        setTextFilter: text => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        setStartDate: startDate => dispatch(setStartDate(startDate)),
        setEndDate: endDate => dispatch(setEndDate(endDate)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpenseListFilters);
