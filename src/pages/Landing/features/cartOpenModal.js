import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cartOpenModal: false
}

export const cartOpenModalSlice = createSlice({
    name: 'cartOpenModal',
    initialState,
    reducers: {
        setCartOpenModal: (state, action) => {
            state.cartOpenModal = action.payload
        }
    }
})


export const {setCartOpenModal} = cartOpenModalSlice.actions
export default cartOpenModalSlice.reducer