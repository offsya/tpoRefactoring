import {configureStore} from '@reduxjs/toolkit'
import menuSlice from '../features/menuSlice'
import allItemsSlice from '../features/allItems'
import searchSlice from '../features/searchItems'
import allItemsCartSlice from "../features/allCartItems";
import allSelectedItemsSlice from "../features/allSelectedItems";



export const store = configureStore({
    reducer: {
        menu: menuSlice,
        allItems: allItemsSlice,
        search: searchSlice,
        allCartItems: allItemsCartSlice,
        allSelectedItems: allSelectedItemsSlice
    },
})