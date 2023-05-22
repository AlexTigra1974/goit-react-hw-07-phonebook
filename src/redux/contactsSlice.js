import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fetchContacts, addContact, deleteContact } from './operations';
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};
const handleFulfilledFetch = (state, action) => {
  state.items = action.payload;
};
const handleFulfilledAdd = (state, action) => {
  state.items.push(action.payload);
};
const handleFulfilledDelete = (state, action) => {
  state.items = state.items.filter(contact => contact.id !== action.payload.id);
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const contactsArr = [fetchContacts, addContact, deleteContact];
const createContacts = type => contactsArr.map(el => el[type]);
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      // .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilledFetch)
      // .addCase(fetchContacts.rejected, handleRejected)
      // .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      // .addCase(addContact.rejected, handleRejected)
      // .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      // .addCase(deleteContact.rejected, handleRejected)
      .addMatcher(isAnyOf(...createContacts(PENDING)), handlePending)
      .addMatcher(isAnyOf(...createContacts(FULFILLED)), handleFulfilled)
      .addMatcher(isAnyOf(...createContacts(REJECTED)), handleRejected);
  },
});
export const contactsReducer = contactsSlice.reducer;

// addContact: (state, action) => {
//   state.push(action.payload);
// },

// deleteContact(state, action) {
//   return state.filter(contact => contact.id !== action.payload);

// const index = state.contacts.findIndex(
//   contact => contact.id !== action.payload
// );
// state.contacts.splice(index, 1);

// extraReducers: {
//   [fetchContacts.pending]: handlePending,
//   [fetchContacts.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.items = action.payload;
//   },
//   [fetchContacts.rejected]: handleRejected,
//   [addContact.pending]: handlePending,
//   [addContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.items.push(action.payload);
//   },
//   [addContact.rejected]: handleRejected,
//   [deleteContact.pending]: handlePending,
//   [deleteContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     const index = state.items.findIndex(
//       contact => contact.id !== action.payload
//     );
//     state.items.splice(index, 1);
//   },
//   [deleteContact.rejected]: handleRejected,
// },

// fetchContacts(state) {},
// contacts/fetchAll

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;
