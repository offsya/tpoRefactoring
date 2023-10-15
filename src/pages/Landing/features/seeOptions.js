import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    seeOptions: false
}

export const seeOptionsSlice = createSlice({
    name: 'seeOptions',
    initialState,
    reducers: {
        setSeeOptions: (state, action) => {
            state.seeOptions = action.payload
        }
    }
})


export const {setSeeOptions} = seeOptionsSlice.actions
export default seeOptionsSlice.reducer