import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

//console.log(now.format('MMM Do, YYYY'));

// this contains all the form fields and logic to get the form to work
export default class ExpenseForm extends React.Component {
    // use local component state to track the changes to these form inputs. only when the user submits the form will we send it off to redux. redux will figure out what to do (add a new expense, or edit the existing expense)

    //! WHY DO WE USE A CONSTRUCTOR FUNCTION HERE?
    //! we need to look at the props (for our ternary conditions). so we need to use a constructor function, and define the state there. then we can pass the props up to super
    constructor(props) {
        super(props);

        // *we only want to use defaults for the first 4 values if they are CREATING an expense. if they are EDITING an expense, we need to know what their value were so we can populate the form fields with that information.

        this.state = {
            description: props.expense ? props.expense.description : '',
            noteText: props.expense ? props.expense.noteText : '',
            amount: props.expense
                ? (props.expense.amount / 100).toString()
                : '',
            createdAt: props.expense
                ? moment(props.expense.createdAt)
                : moment(),
            calendarFocused: false,
            error: '',
        };
    }

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onAmountChange = e => {
        const amount = e.target.value;
        // ensure that the number comes in a specific format, with regex

        // myRegex makes sure the value starts with a number ^\d
        // force usage of at least one number ^\d{1,}
        // optionally allow for one (only one!) decimal point  ^\d*(\.)?
        // allow only 2 numbers after the decimal point ^\d*(\.\d{0,2})?
        // make sure the regex ends with 2 numbers after the decimal point (if /when present) ^\d*(\.\d{0,2})?$

        const myRegex = /^\d{1,}(\.\d{0,2})?$/;

        // if there is no amount, OR the amount provided is a match
        if (!amount || amount.match(myRegex)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = createdAt => {
        // call this function if a date was picked
        // if it was cleared, it will be called with nothing
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    //?  I dont really understand this function. Review Andrew's explanation in section 11, lecture 106 or read docs
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onNoteChange = e => {
        //! trying to access e.target.value inside the callback to setState will not work!

        //* always make a variable for this (e.target.value)
        // the other option would be to use e.persist()
        const noteText = e.target.value;
        this.setState(() => ({ noteText }));
    };

    onSubmit = e => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            // set error state equal to 'please provide amount and description'
            this.setState(() => ({
                error: 'please provide amount and description',
            }));
        } else {
            // clear the error
            this.setState(() => ({ error: '' }));

            // submit the form
            this.props.onSubmit({
                description: this.state.description,
                // turn the string into a decimal number, and multiply by 100 to get dollars from our cents
                amount: parseFloat(this.state.amount, 10) * 100,
                // parse this to get the timestamp
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        // adding value makes it a read only input. to make it dynamic as the user types, add the onChange handler
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        placeholder="Description"
                        autoFocus
                    />

                    <input
                        type="text"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        placeholder="Amount"
                    />

                    <SingleDatePicker
                        //*the first 4 properties are mandatory
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        // make all days available, even dates in the past
                        isOutsideRange={() => false}
                    />

                    <textarea
                        placeholder="Add a note for your stupid fucking expense (fucking optional)"
                        value={this.state.noteText}
                        onChange={this.onNoteChange}
                    />

                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}
