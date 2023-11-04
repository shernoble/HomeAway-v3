import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const formSlice = createSlice({
    name: 'form',
    initialState:initialCounterState,
    reducers: {
        increment(state) {
        state.counter++;
        },
        decrement(state) {
        state.counter--;
        },
        increase(state, action) {
        state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
        state.showCounter = !state.showCounter;
        }
    }
});

export const formActions = formSlice.actions;

export default formSlice.reducer;