// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
import {createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers( {
    form: formReducer,
})

const store = createStore(rootReducer);
export default store;