import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    frstWin: false
}

export const frstWinSlice = createSlice({
    name: 'frstWin',
    initialState,
    reducers: {
        setFrstWin: (state, action) => {
            state.frstWin = action.payload
        }
    }
})


export const {setFrstWin} = frstWinSlice.actions
export default frstWinSlice.reducer