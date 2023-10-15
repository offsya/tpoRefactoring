import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    setAddContactOrUpdate: '',
}

export const setAddContactOrUpdateSlice = createSlice({
    name: 'setAddContactOrUpdate',
    initialState,
    reducers: {
        stateCreateOrUpdate: (state, action) => {
            state.setAddContactOrUpdate = action.payload
        },
    }
})


export const {stateCreateOrUpdate} = setAddContactOrUpdateSlice.actions
export default setAddContactOrUpdateSlice.reducer