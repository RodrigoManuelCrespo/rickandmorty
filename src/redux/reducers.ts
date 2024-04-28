import { combineReducers } from '@reduxjs/toolkit';
import characterReducer from './slice';

const rootReducer = combineReducers({
    character: characterReducer,
});

export default rootReducer;
