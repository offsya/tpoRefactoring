import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openColorPicker: false,
}

export const openColorPickerSlice = createSlice({
    name: 'openColorPicker',
    initialState,
    reducers: {
        setOpenColorPicker: (state, action) => {
            state.openColorPicker = action.payload
        },
    }
})


export const {setOpenColorPicker} = openColorPickerSlice.actions
export default openColorPickerSlice.reducer