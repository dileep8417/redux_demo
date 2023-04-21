const redux = require('redux');
const immer = require('immer');
const reduxLogger = require('redux-logger');
// Middleware to log state changes
const logger = reduxLogger.createLogger();
// Method to update the immutable state easily
const produce = immer.produce;

// State data
const studentsState = {
    names: []
}
const teachersState = {
    names: []
}

// Action constants
const ADD_STUDENT_NAME = 'ADD_STUDENT_NAME';
const ADD_TEACHER_NAME = 'ADD_TEACHER_NAME';

// Action Creators
const addStudentName = (name) => {
    return {
        type: ADD_STUDENT_NAME,
        payload: name
    }
}
const addTeacherName = (name) => {
    return {
        type: ADD_TEACHER_NAME,
        payload: name
    }
}

// Reducers
const Studentreducer = (state = studentsState, action) => {
    switch(action.type) {
        case ADD_STUDENT_NAME:
            return {
                ...state,
                names: [...state.names, action.payload]
            }
        default:
            return state;
    }
}
const teacherReducer = (state = teachersState, action) => {
    switch (action.type) {
        case ADD_TEACHER_NAME:
            return produce(state, (draft) => {
                draft.names.push(action.payload)
            });
        default:
            return state
    }
}
const rootReducer = redux.combineReducers({
    students: Studentreducer,
    teachers: teacherReducer
});

// Store
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));
const actions = redux.bindActionCreators({ addStudentName, addTeacherName }, store.dispatch);

actions.addStudentName('Dileep');
actions.addStudentName('Ram');
actions.addStudentName('Sam');
actions.addTeacherName('Rajesh');
