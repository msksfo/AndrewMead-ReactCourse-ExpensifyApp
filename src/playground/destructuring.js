/* ================== OBJECT DESTRUCTURING ======================= */

// destructuring is pulling object properties out into their own variables
const person = {
    name: 'Tia',
    age: 48,
    location: {
        city: 'San Mateo',
        temp: 50,
    },
};

// * Simple Object Destructuring
// i only want name and age, so I create the consts, and set their value from what the person object holds

// this line
// 1. const { name, age } = person;

// is equivalent to these two lines:
// 1. const name = person.name;
// 2. const age = person.age;

// * destructuring with default Values
// use a default value in case there is no name property on the person object
const { name = 'Anonymous', age } = person;
console.log(`with desgructuring: ${name} is ${age}.`);
console.log(`without destructuring: ${person.name} is ${person.age}.`);

// * destructuring while renaming the local variable
// I can also rename my local variable
const { city, temp: temperature } = person.location;
console.log(`with destructuring: It is ${temperature} degrees in ${city}`);
console.log(
    `without destructuring: It is ${person.location.temp} degrees in ${
        person.location.city
    }`
);

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: { name: 'Penguin' },
};

const { name: publisherName = 'Self-Published' } = book.publisher;
console.log(publisherName);

/* ================== ARRAY DESTRUCTURING ======================= */
const address = [
    '1299 south juniper street',
    'philly',
    'pennsylvania',
    '12345',
];
// this is a mess!
console.log(`you are in ${address[1]} ${address[2]}`);

// this is an ORDERED list of variable names
const [street, myCity, state, zip] = address;
console.log(`you are in ${myCity}, ${state}`);

// to skip some items:
// use a comma to skip items in the beginning
// to skip items at the end, just omit it(them)
const [, , theState] = address;
console.log(`You are in ${theState}`);

// use a default value when none exists
const [, , , myZip, country = 'Maldives'] = address;
console.log(`i live in ${country} with zip code ${myZip}`);

const item = ['Coffee (iced)', '$2.00', '$3.50', '$2.75'];
const [drink, , price] = item;
console.log(`A medium ${drink} costs ${price}`);
