import {createSlice} from "@reduxjs/toolkit";
import chili from "../components/images/chili.svg";
import avocado from "../components/images/avocado.svg";
import limon from "../components/images/limon.svg";
import lime from "../components/images/lime.svg";
import juice from "../components/images/juice.svg";


const initialState = {
    allItemsLastOrder: [
        {
            id: 3,
            quantity: 5,
            img: chili,
            name: 'Pimiento Chile',
            sku: 'BGuiROJtarr100gr',
            marketPrice: 20,
            ourPrice: 8,
            MB: 30,
            DP: 100,
            SDP: 80,
            skuProveedor: 'tmtt',
            unit: 'tara',
            minQt: 5,
        },
        {
            id: 4,
            quantity: 3,
            img: avocado,
            name: 'Aguacate',
            sku: 'AAGHkg',
            marketPrice: 7.75,
            ourPrice: 3.5,
            MB: 30,
            DP: 100,
            SDP: 75,
            skuProveedor: 'tmtt',
            unit: 'caja',
            minQt: 8,
        },
        {
            id: 5,
            quantity: 2,
            img: limon,
            name: 'Limon Mesa',
            sku: 'BLEMEkg',
            marketPrice: 2.05,
            ourPrice: 0.8,
            MB: 30,
            DP: 100,
            SDP: 75,
            skuProveedor: 'tmtt',
            unit: 'kg',
            minQt: 7,
        },
        {
            id: 6,
            quantity: 4,
            img: lime,
            name: 'Lima Cat 1 (Verde)',
            sku: 'LimaCat1KG',
            marketPrice: 5.5,
            ourPrice: 2.7,
            MB: 30,
            DP: 100,
            SDP: 75,
            skuProveedor: 'tmtt',
            unit: 'caja',
            minQt: 9,
        },
        {
            id: 7,
            quantity: 1,
            img: juice,
            name: 'Limon para Zumo Cat2',
            sku: 'BLEZUKG',
            marketPrice: 1.2,
            ourPrice: 0.6,
            MB: 30,
            DP: 100,
            SDP: 75,
            skuProveedor: 'tmtt',
            unit: 'kg',
            minQt: 7,
        },
    ]
}

export const allItemsLastOrderSlice = createSlice({
    name: 'allItemsLastOrder',
    initialState,
    reducers: {
        setallItemsLastOrder: (state, action) => {
            const filterArray = state.allItemsLastOrder.map((elem) => elem.id);
            if(!filterArray.includes(action.payload.id)){
                state.allItemsLastOrder = [...state.allItemsLastOrder, action.payload]
            }else{
                state.allItemsLastOrder = state.allItemsLastOrder.filter(item => item.id !== action.payload.id);
            }

        },
        setCartElemQuantityIncrementLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity = parseFloat(state.allItemsLastOrder[itemIndex].quantity) ? parseFloat(state.allItemsLastOrder[itemIndex].quantity) + 1 : 1;
            }
        },
        setCartElemQuantityDecrementLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity -= 1;
            }
        },
        setCartElemQuantityValueLastOrder: (state, action) => {
            const itemIndex = state.allItemsLastOrder.findIndex(item => item.id === action.payload.elem.id);
            console.log(action.payload.value)
            if (itemIndex >= 0) {
                state.allItemsLastOrder[itemIndex].quantity = action.payload.value
            }
        },
        deleteCartElemLastOrder: (state, action) => {
            state.allItemsLastOrder = state.allItemsLastOrder.filter(item => item.id !== action.payload.id);
        },
    }
})


export const {setallItemsLastOrder, setCartElemQuantityDecrementLastOrder, setCartElemQuantityIncrementLastOrder, setCartElemQuantityValueLastOrder, deleteCartElemLastOrder} = allItemsLastOrderSlice.actions
export default allItemsLastOrderSlice.reducer