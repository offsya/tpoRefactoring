import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allItems: []
}

export const allItemsSlice = createSlice({
    name: 'allItems',
    initialState,
    reducers: {
        setAllItems: (state, action) => {
            state.allItems.push(action.payload)
        },
        setElemQuantityIncrement: (state, action) => {
            const itemIndex = state.allItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.allItems[itemIndex].quantity = parseFloat(state.allItems[itemIndex].quantity) ? parseFloat(state.allItems[itemIndex].quantity) + 1 : 1;
            }
        },
        setElemQuantityDecrement: (state, action) => {
            const itemIndex = state.allItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0 && action.payload.quantity > 0) {
                state.allItems[itemIndex].quantity -= 1;
            }else{
                state.allItems[itemIndex].quantity = 0;
            }
        },
        setElemQuantityValue: (state, action) => {
            const itemIndex = state.allItems.findIndex(item => item.id === action.payload.elem.id);
            console.log(action.payload.value)
            if (itemIndex >= 0) {
                state.allItems[itemIndex].quantity = action.payload.value

            }
        },
    }

})


export const {setAllItems, setElemQuantityIncrement, setElemQuantityDecrement, setElemQuantityValue} = allItemsSlice.actions
export default allItemsSlice.reducer