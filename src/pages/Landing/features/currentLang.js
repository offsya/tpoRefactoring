import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentLang: "CAT"
}

export const currentLangSlice = createSlice({
    name: 'currentLang',
    initialState,
    reducers: {
        currentLang: (state, action) => {
            state.currentLang = action.payload
        }
    }
})


export const {currentLang} = currentLangSlice.actions
export default currentLangSlice.reducer