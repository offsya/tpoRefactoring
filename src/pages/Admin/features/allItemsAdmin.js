import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allItemsAdmin: []
}

export const allItemsAdminSlice = createSlice({
    name: 'allItemsAdmin',
    initialState,
    reducers: {
        addArray: (state, action) => {
            state.allItemsAdmin = action.payload
        },
        setallItemsAdmin: (state, action) => {
            state.allItemsAdmin.push(action.payload)
        },
        setElemQuantityIncrement: (state, action) => {
            const itemIndex = state.allItemsAdmin.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.allItemsAdmin[itemIndex].quantity = parseFloat(state.allItemsAdmin[itemIndex].quantity) ? parseFloat(state.allItemsAdmin[itemIndex].quantity) + 1 : 1;
            }
        },
        setElemQuantityDecrement: (state, action) => {
            const itemIndex = state.allItemsAdmin.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0 && action.payload.quantity > 0) {
                state.allItemsAdmin[itemIndex].quantity -= 1;
            }else{
                state.allItemsAdmin[itemIndex].quantity = 0;
            }
        },
        setElemQuantityValue: (state, action) => {
            const itemIndex = state.allItemsAdmin.findIndex(item => item.id === action.payload.elem.id);
            console.log(action.payload.value)
            if (itemIndex >= 0) {
                state.allItemsAdmin[itemIndex].quantity = action.payload.value

            }
        },
    }

})


export const {setallItemsAdmin, setElemQuantityIncrement, setElemQuantityDecrement, setElemQuantityValue} = allItemsAdminSlice.actions
export default allItemsAdminSlice.reducer