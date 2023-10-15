import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    checkFrstCalendOpen: true
}

export const checkFrstCalendOpenSlice = createSlice({
    name: 'checkFrstCalendOpen',
    initialState,
    reducers: {
        setCheckFrstCalendOpen: (state, action) => {
            state.checkFrstCalendOpen = action.payload
        }
    }
})


export const {setCheckFrstCalendOpen} = checkFrstCalendOpenSlice.actions
export default checkFrstCalendOpenSlice.reducer