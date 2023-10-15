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
            const filterArray = state.allItemsCart.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                if(action.payload.quantity == 0){
                    state.allItemsCart = [...state.allItemsCart, {...action.payload, quantity: 1}]
                }else{
                    state.allItemsCart = [...state.allItemsCart, action.payload]
                }
            }else{
                state.allItemsCart = state.allItemsCart.filter(item => item._id !== action.payload._id);
            }

        },
        setCartElemQuantityIncrement: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.allItemsCart[itemIndex].quantity = parseFloat(state.allItemsCart[itemIndex].quantity) ? parseFloat(state.allItemsCart[itemIndex].quantity) + 1 : 1;
            }
        },
        setCartElemQuantityDecrement: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0 && action.payload.quantity >= 1) {
                state.allItemsCart[itemIndex].quantity = parseFloat(state.allItemsCart[itemIndex].quantity) ? parseFloat(state.allItemsCart[itemIndex].quantity) - 1 : 0;

                // state.allItemsCart[itemIndex].quantity -= 1;
            }else{
                state.allItemsCart[itemIndex].quantity = 0;
            }
        },
        setCartElemQuantityValue: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item._id === action.payload.elem._id);
            console.log(itemIndex)
            if (itemIndex >= 0) {
                state.allItemsCart[itemIndex].quantity = action.payload.value
            }
        },
        setCartElemCurrentUnit: (state, action) => {
            const itemIndex = state.allItemsCart.findIndex(item => item._id === action.payload.elem._id);
            console.log(itemIndex)
            if (itemIndex >= 0) {
                state.allItemsCart[itemIndex].currentUnit = action.payload.value
            }
        },
        deleteCartElem: (state, action) => {

            state.allItemsCart = state.allItemsCart.filter(item => item._id !== action.payload._id);
        },
    }
})


export const {setAllItemsCart, setCartElemQuantityDecrement, setCartElemCurrentUnit,setCartElemQuantityIncrement, setCartElemQuantityValue, deleteCartElem, setAllArrayItemsCart} = allItemsCartSlice.actions
export default allItemsCartSlice.reducer