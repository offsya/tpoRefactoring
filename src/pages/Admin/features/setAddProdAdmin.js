import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    setAddProduct: 2,
}

export const setAddProductSlice = createSlice({
    name: 'setAddProduct',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.setAddProduct = action.payload
        },
    }
})


export const {setValue} = setAddProductSlice.actions
export default setAddProductSlice.reducer