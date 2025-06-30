import { configureStore } from '@reduxjs/toolkit';
import myReducer from './reducer';

export default configureStore({
    reducer: { storeReducer: myReducer },
});
