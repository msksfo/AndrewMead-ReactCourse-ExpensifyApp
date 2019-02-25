// this is where i will connect to the firebase database
// then other files in the project can use the connection by importing what     i have here

//* step 1. grab everything from firebase
import * as firebase from 'firebase';

//* step 2. get the config object
// this config object is basically, my password
const config = {
    apiKey: 'AIzaSyDtDDgr4JAT6eVQ0LotelIslHf1zKAhYjk',
    authDomain: 'expensify-32ef9.firebaseapp.com',
    databaseURL: 'https://expensify-32ef9.firebaseio.com',
    projectId: 'expensify-32ef9',
    storageBucket: 'expensify-32ef9.appspot.com',
    messagingSenderId: '339989609717',
};

//* step 3. use the initializeApp method to initialize firebase to work with the application who's config i provided
firebase.initializeApp(config);

//* firebase.database() gets the database related features of the firebase module
// as opposed to authentication features -> firebase.auth(), etc

//* ref() is short for reference.
// it gives us a reference to a specific part of our database
// with no arguments passed in, the reference will be to the root of the        database

//* set() can be called on a reference
// it allows us to set the value for that reference
// set can take any data type. doesn't have to be an object
//! set will overwrite what you had before if you don't pass something into     ref
// firebase creates a promise. .set() returns that promise

// break it out into a function for readability
const database = firebase.database();

//* write data to firebase
/*
database
    .ref()
    .set({
        name: 'Cirrus the cat',
        age: 2,
        job: {
            title: 'pet',
            humans: 'Alex & Tia',
        },
        superCute: true,
        isCrazy: 'sometimes',
        location: {
            city: 'San Mateo',
            country: 'USA',
        },
    })
    .then(() => console.log('data is saved'))
    .catch(err => {
        console.log('it failed', err);
    });
 */

//* removing date from the database with the remove method, also called on the references
// you can alternately remove with .set(null), by passing in null
//database.ref('age').set(null);
// .remove() is more explicit, so you should prefer .remove() over .set()

//* use .update({}) to update an entire object. you MUST pass in an object
// this changes the name on the root reference. it will not overwrite the other properties
//! nested objects will be overwritten unless you wrap the property in '', (see location)
//* do this: 'location/city: 'SF' not this: location: {city: 'SF'}

/*
database.ref().update({
    name: 'Cirrusthekat',
    isCrazy: null,
    'job/title': 'beloved pet',
});
*/

/*
database
    .ref('location/country')
    .remove()
    .then(() => {
        console.log('data was removed');
    })
    .catch(err => {
        console.log('problem: ', err);
    });

 */

/*
//* only change the age property by passing 'age' into .ref() and the new value into .set
// only the age value changed because we called .ref() with a specific location in the database
database.ref('age').set(2.5);

// change nested data
database.ref('location/city').set('Meowville');

const attributes = {
    likes: ['eating', 'playing', 'sleeping'],
    dislikes: ['discipline', 'sharing'],
};

//* add nested data
database
    .ref('attributes')
    .set(attributes)
    .then(() => console.log('my attributes were set'))
    .catch(err => {
        console.log('the promise was rejected');
    });
*/

//* read data from firebase ONCE
// 1. get a reference to the root of the database with .ref()
// 2. to read it just a single time, call .once(), passing in the event type, which is 'value'
// 3. .once() returns a promise. so we can use the returned data however we please
// 4. .ref() will return the entire root object
// 5. optionally pass something into .ref('location/city') or .ref('name')
/*
database
    .ref()
    .once('value')
    .then(snapshot => {
        //* realworld->  right here is where we would dispatch an action to the redux store. the store changes, and the components update themselves

        const val = snapshot.val(); // .val() returns the data we requested
        console.log(val);
    })
    .catch(err => {
        console.log('error fetching data', err);
    });
 */

//* have the server notify us of changes with .on(), listening for the          'value' event
// get the value back from the database initially, and every time it changes
// we need to pass a callback function into .on()
// (  .on() returns the callback function )
// the callback function gets called with snapshot
// and then we do something with that snapshot data
// (we use a callback instead of promises, because a promise only runs once)
/*
database
    .ref()
    // listen repeatedly for the 'value' event
    .on(
        'value',
        snapshot => {
            console.log(snapshot.val());
        },
        err => {
            console.log('error with fetching data', err);
        }
    );
*/

/* 

* alternate way of organizing this (save the whole thing to a variable), which makes it easier to unsubscribe later
// now i can unsubscribe from just this one listener by using database.ref().off('value', onValueChange)
const onValueChange = database.ref().on('value', (snapshot), => {
    console.log(snapshot.val())
}, (err) => {
        console.log('error with fetching data', err)
    })

*/

//* unsubscribe from being notified of all changes with .off()
//database.ref().off();
//* unsubscribe from a specific listener ->
// database.ref().off('value', referenceToFunctionVariableName)

// lecture 148 challenge -> setup a subscription
/*
const onValueChange = database.ref().on(
    'value',
    snapshot => {
        const result = snapshot.val();
        console.log(
            `${result.name} is a ${result.job.title} in ${result.location.city}`
        );
    },
    err => {
        console.log('there was an error fetching the data', err);
    }
);
*/

//* lecture 149 working with arrays in firebase

//* firebase will store array items as objects

const notes = [
    {
        id: '12',
        body: 'this is my note',
        title: 'note 1',
    },
    {
        id: '13',
        body: 'this is my second note',
        title: 'note 2',
    },
];

//* firebase will store array items as objects
//! so in the end, i will have an object of objects { {}, {}, {}, {} }
/*
const firebaseNotes = {
    // the property of firebaseNotes is an object we call 'notes'
    notes: {
        // the keys on the 'notes' object will be the id's (which will be generated for us), and it's value will be an object with the properties
        asddklim: {
            // this is now our array stuff
            title: 'note 1',
            body: 'this is my note'
        },
        tyuiee: {
            title: 'note 2',
            body: 'this is my second note'
        }
    }
}
*/

//database.ref('notes').set(notes);

//* when we use .push(), firebase will automatically create a new property on our reference. then it takes what we pass into push() and sets it as the value
// so if i want a list of objects, i pass an object into .push()
/*
database.ref('notes').push({
    title: 'Courses to study',
    body: 'vue',
});
*/

//* access a specific note ('notes/whatever') in the notes object, by passing it into .ref(), and update it with .update({})
/*
database
    .ref('notes/-LZVmrIOPMdaFS7vaycQ')
    .update({ body: 'do something else' });
database.ref('notes/-LZVmrIOPMdaFS7vaycQ').remove();
*/

//* lecture 149 challenge
// set up three expenses with three items, description, note, amount, createdAt
// ( any data type can be passed into .push() )
/*
database.ref('expenses').push({
    description: 'rent',
    amount: 1000,
    note: 'we gotta move',
    createdAt: 0,
});

database.ref('expenses').push({
    description: 'coffee',
    amount: 5.25,
    note: 'delicious',
    createdAt: 5,
});

database.ref('expenses').push({
    description: 'movie',
    amount: 18.5,
    note: 'movies are expensive',
    createdAt: 3,
});
*/

//* lecture 150 fetching and working with the array-like data from firebase
//! redux expects an array! so we must figure out how to manipulate the firebase data to fit our needs

// read the data off of the 'expense' ref
/*
database
    .ref('expenses')
    .once('value')
    // snapshot is the entire expense data object
    // using snapshot.forEach() will give us the individual child data objects
    .then(snapshot => {
        const expenses = [];

        // this function will be called one time for each expense
        snapshot.forEach(childSnapshot => {
            //console.log(childSnapshot.val());

            // push the child object into the expenses array
            //* then we have our array of objects that we can use as redux expects us to in this application
            expenses.push({
                // grab the id generated by firebase with .key
                id: childSnapshot.key,
                ...childSnapshot.val(),
            });
        });

        // this output is what we need to integrate firebase with our expensify application
        console.log(expenses);
    });
*/

//* lecture 150 challenge
/*
// set up a subscription to expenses with .on()
// pass in the success handler as the second option to .on()
database.ref('expenses').on('value', snapshot => {
    const expenses = [];
    snapshot.forEach(childSnapshot => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
        });
    });
    console.log(expenses);
});
*/

//* subscribers
//! child_removed event is fired when one of our expenses is deleted
// this subscriber is listening to expenses for every time a child (an expense) is removed
database.ref('expenses').on('child_removed', snapshot => {
    // get the id  & value of the expense that was removed
    console.log(snapshot.key, snapshot.val());
});

//! child_changed event fires when one of the children (an expense) changes
database.ref('expenses').on('child_changed', snapshot => {
    console.log(snapshot.key, snapshot.val());
});

//! child_added event is fired when a child is added ( an expense is added)
//* weird quirk, this will fire once for data that is already present at that location (that ref), then will fire again if/when a child is added
database.ref('expenses').on('child_added', snapshot => {
    console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').push({
    description: 'blah blah 2',
    amount: 280000,
    note: '',
    createdAt: 1090,
});

// save the data to firebase, THEN dispatch a redux action
// this will make sure the data is saved and stored in the redux store
// do this in the expenses actions, by:
// (importing firebase, then: )
// 1. use push
// 2. attach .then callback
// 3. in the callback, dispatch the action
// 4. redirect
