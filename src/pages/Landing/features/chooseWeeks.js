import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chooseWeeks: 3
}

export const chooseWeeksSlice = createSlice({
    name: 'chooseWeeks',
    initialState,
    reducers: {
        setChooseWeeks: (state, action) => {
            state.chooseWeeks = action.payload
        }
    }
})


export const {setChooseWeeks} = chooseWeeksSlice.actions
export default chooseWeeksSlice.reducer