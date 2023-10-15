import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    calendOpen: false
}

export const calendOpenSlice = createSlice({
    name: 'calendOpen',
    initialState,
    reducers: {
        setCalendOpen: (state, action) => {
            state.calendOpen = action.payload
        }
    }
})


export const {setCalendOpen} = calendOpenSlice.actions
export default calendOpenSlice.reducer