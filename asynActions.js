const redux = require('redux');
const reduxThunk = require('redux-thunk');
const axios = require('axios');

// To hadle async actions
const thunkMiddleware = reduxThunk.default;

const initialState = {
    users: [],
    loading: false,
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequst = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEDED,
        paylod: users
    }
}
const fetchUsersFail = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        paylod: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEDED:
            return {
                ...state,
                loading: false,
                users: action.paylod
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.paylod
            }
    }
}

// Asynchronous action creator function
const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersRequst);
        let response;
        try {
            response = await axios('https://jsonplaceholder.typicode.com/users');
        } catch (err) {
            response = [];
        }

        if (response.data) {
            dispatch(fetchUsersSuccess(response.data.map(user => user.id)))
        } else {
            dispatch(fetchUsersFail('Something went wrong'));
        }
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
