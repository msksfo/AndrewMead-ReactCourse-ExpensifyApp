//! file extension must be .test.js
//* when jest scrapes the project for test files, it is looking for files ending in .test.js

//* (yarn test -- --watch) in the command line to keep jest watching and running

const add = (a, b) => a + b;
const generateGreeting = name => `Hello ${name}!`;

//* global variables that jest provides allow us to construct the test cases
// the variable 'test' (a function) lets us set up a test case
// it takes two parameters, a string, and a function
// 1. the string says what the code being tested should do
// 2. an arrow function, in which we write the test cases for our code
test('should add two numbers', () => {
    const result = add(3, 4);

    //* this is the assertion
    // it's provided by the jest library for checking if two things are the same
    // 1. pass the value in, that we want to make an assertion about
    // 2. tack on the method toBe()
    expect(result).toBe(7);
});

test('should return a greeting with the passed in name', () => {
    const result = generateGreeting('Alex');

    expect(result).toBe('Hello Alex!');
});
