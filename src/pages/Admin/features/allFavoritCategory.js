import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allFavoritCategory: []
}

export const allFavoritCategorySlice = createSlice({
    name: 'allFavoritCategory',
    initialState,
    reducers: {
        setArr: (state, action) => {
            state.allFavoritCategory = action.payload
        },
        addItem: (state, action) => {
            state.allFavoritCategory = [...state.allFavoritCategory, action.payload]
        },
    }
})


export const {addItem, setArr} = allFavoritCategorySlice.actions
export default allFavoritCategorySlice.reducer