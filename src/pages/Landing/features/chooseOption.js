import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chooseOption: 3
}

export const chooseOptionSlice = createSlice({
    name: 'chooseOption',
    initialState,
    reducers: {
        setChooseOption: (state, action) => {
            state.chooseOption = action.payload
        }
    }
})


export const {setChooseOption} = chooseOptionSlice.actions
export default chooseOptionSlice.reducer