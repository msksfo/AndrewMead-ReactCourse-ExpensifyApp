// require the original moment library, not the mocked one
// so, the mocked library becomes a sort of wrapper around the real one
const moment = require.requireActual('moment');

// define what we want the mocked moment to look like
// the real app will use the real moment library, our tests will use the mock
//* this will be the function we call inside the mocked moment library

// pass in a default parameter for timestamp equal to 0, so if we need the current point in time(for testing) it will be 0
export default (timestamp = 0) => {
    return moment(timestamp);
};
