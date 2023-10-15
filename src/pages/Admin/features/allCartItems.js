import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allItemsCart: []
}

export const allItemsCartSlice = createSlice({
    name: 'allItemsCart',
    initialState,
    reducers: {
        setAllArrayItemsCart: (state, action) => {
            state.allItemsCart = action.payload

        },
        setAllItemsCart: (state, action) => {
            const filterArray = state.allItemsCart.map((elem) => elem.id);
            if(!filterArray.includes(action.payload.id)){
                state.allItemsCart = [...state.allItemsCart, action.payload]
            }else{
                state.allItemsCart = state.allItemsCart.filter(item => item.id !== action.payload.id);
            }

        },
        setCartElemQuantityIncrement: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.allItemsCart[itemIndex].quantity = parseFloat(state.allItemsCart[itemIndex].quantity) ? parseFloat(state.allItemsCart[itemIndex].quantity) + 1 : 1;
            }
        },
        setCartElemQuantityDecrement: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0 && action.payload.quantity >= 1) {
                state.allItemsCart[itemIndex].quantity -= 1;
            }else{
                state.allItemsCart[itemIndex].quantity = 0;
            }
        },
        setCartElemQuantityValue: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item.id === action.payload.elem.id);
            console.log(action.payload.value)
            if (itemIndex >= 0) {
                state.allItemsCart[itemIndex].quantity = action.payload.value
            }
        },
        deleteCartElem: (state, action) => {
            state.allItemsCart = state.allItemsCart.filter(item => item.id !== action.payload.id);
        },
    }
})


export const {setAllItemsCart, setCartElemQuantityDecrement, setCartElemQuantityIncrement, setCartElemQuantityValue, deleteCartElem, setAllArrayItemsCart} = allItemsCartSlice.actions
export default allItemsCartSlice.reducer