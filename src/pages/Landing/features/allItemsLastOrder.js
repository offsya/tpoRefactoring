import {createSlice} from "@reduxjs/toolkit";
import chili from "../../../assets/chili.svg";
import avocado from "../../../assets/avocado.svg";
import limon from "../../../assets/limon.svg";
import lime from "../../../assets/lime.svg";
import juice from "../../../assets/juice.svg";


const initialState = {
    allItemsLastOrder: []
}

export const allItemsLastOrderSlice = createSlice({
    name: 'allItemsLastOrder',
    initialState,
    reducers: {
        setallItemsLastOrder: (state, action) => {
            const filterArray = state.allItemsLastOrder.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.allItemsLastOrder = [...state.allItemsLastOrder, action.payload]
            }else{
                state.allItemsLastOrder = state.allItemsLastOrder.filter(item => item._id !== action.payload._id);
            }

        },
        setCartElemQuantityIncrementLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity = parseFloat(state.allItemsLastOrder[itemIndex].quantity) ? parseFloat(state.allItemsLastOrder[itemIndex].quantity) + 1 : 1;
            }
        },
        setCartElemQuantityDecrementLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity -= 1;
            }
        },
        setCartElemQuantityValueLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item._id === action.payload.elem._id);
            console.log(action.payload.value)
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity = action.payload.value
            }
        },
        deleteCartElemLastOrder: (state, action) => {
            state.allItemsLastOrder = state.allItemsLastOrder.filter(item => item._id !== action.payload._id);
        },
    }
})


export const {setallItemsLastOrder, setCartElemQuantityDecrementLastOrder, setCartElemQuantityIncrementLastOrder, setCartElemQuantityValueLastOrder, deleteCartElemLastOrder} = allItemsLastOrderSlice.actions
export default allItemsLastOrderSlice.reducer