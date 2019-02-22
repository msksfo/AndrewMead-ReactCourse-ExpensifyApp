import { createStore } from 'redux';

// * CREATING THE REDUX STORE
// * 1. createStore is a function that we call ONCE, to set the store up.
// * 2. It expects one argument to be passed in,  a function
// * 3. The first argument to the passed in function is state. We set it up as a          default object (in case there is no current state, what do you want to            start off with )
// * 4. The second argument passed in is the action. (No default needed)
// ! A. refactored by extracting the passed in function and saving it as the reducer
// ! B. pass the reducer into the createStore method

// * KEY ATTRIBUTES OF REDUCERS
// 1. they are pure functions (don't rely on anythng from outside their scope and       don't change anything outside their own scope)
// 2. never change state or action! state and action will be passed in. don't           mutate these values! return a new object that represents the new state

const countReducer = (state = { count: 0 }, action) => {
    // better practice is to use switch statement here (rather than if/else)
    switch (action.type) {
        case 'INCREMENT':
            // after implementing the action generator, we no longer need this
            //const incrementBy =
            //typeof action.incrementBy === 'number' ? action.incrementBy : 1;

            return {
                count: state.count + action.incrementBy,
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy,
            };
        case 'RESET':
            return {
                count: 0,
            };
        case 'SET':
            return {
                count: action.count,
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

// * WATCH FOR CHANGES TO THE STORE
//  this method lets us watch for changes to the store
//  - pass a function as first argument. this function will be called every             single time the store changes
// * use this method if you need to do something whenever the state changes
// ! calling subscribe creates the subscription. The subscribe function returns another funtion that lets you unsubscribe when its called
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// * ACTIONS:
// - actions allow us to change the redux store values
// - 1. an action is an object that gets sent to the store
// - 2. this object describes the type of action we want to take (increment, decrement, etc)
// - 3. send the object to the store with store.dispatch({type: 'THETYPE'})
// - 4. whenever an action is dispatched, the callback to createStore is called!
store.dispatch({
    // type HAS TO BE provided,
    type: 'INCREMENT',
    // additional properties may be provided to pass along dynamic information. the store can then use that information to calculate the new state
    incrementBy: 5,
});

// here, I use the function returned by subscribe() to unsubscribe
// unsubscribe();

// * ACTION GENERATORS
// action generators are functions that return action objects
// create a handler for the argument passed in ->  payload = {}
// - ** we know that payload is an object, so we can destructure to {incrementBy}
// - we can now further destructure by a using default value for incrementBy
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy,
});

// destructure the argument that gets passed in. if it doesn't exist, pass in an object that will essentially be this: {decrementBy: 1}
const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy,
});

const setCount = ({ count }) => ({
    type: 'SET',
    count,
});

const resetCount = () => ({
    type: 'RESET',
});

//  USE the action generator to dispatch an action to the store
// using an action generator just reduces the chance for errors due to typos and other silly errors
store.dispatch(incrementCount());

//  pass in an object with the custom data you need
store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 20981 }));
store.dispatch(resetCount());

/* //! steps in destructuring the action generator
 1. const incrementCount = (payload = {}) => ({
        type: 'INCREMENT',
        incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
    });

 2. const incrementCount = ({ incrementBy }= {}) => ({
        type: 'INCREMENT',
        incrementBy: typeof incrementBy === 'number' ? incrementBy : 1,
    });

 3. const incrementCount = ({ incrementBy = 1}) => ({
        type: 'INCREMENT',
        incrementBy: incrementBy
    });

 4. const incrementCount = ({ incrementBy = 1}) => ({
        type: 'INCREMENT',
        incrementBy
    });
*/
