import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

// const initialState = {
//   contacts: [],
//   filter: '',
// };
// const contactsReducer = (state = initialState, action) => {
//   return state;
// };
