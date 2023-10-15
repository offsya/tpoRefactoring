import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentMenuButton: 1
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setCurrentMenuButton: (state, action) => {
            state.currentMenuButton = action.payload
        },
    }
})


export const {setCurrentMenuButton} = menuSlice.actions
export default menuSlice.reducer