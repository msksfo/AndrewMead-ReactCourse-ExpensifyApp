import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const action = { type: 'LOGIN', uid: 'abc5' };

    // call the reducer with the state and with the action we are trying to dispatch
    const state = authReducer({}, action);

    expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
    const action = { type: 'LOGOUT' };

    const state = authReducer({ uid: 'blahblah' }, action);

    expect(state).toEqual({});
});
