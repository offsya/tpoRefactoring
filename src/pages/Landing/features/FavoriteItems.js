import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    favoriteItems: []
}

export const favoriteItemsSlice = createSlice({
    name: 'favoriteItems',
    initialState,
    reducers: {
        setFavoriteItems: (state, action) => {
            const filterArray = state.favoriteItems.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.favoriteItems = [...state.favoriteItems, action.payload]
            }else{
                state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload._id);
            }

        },
        deleteFavoriteItems: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload._id);
        },
    }
})


export const {setFavoriteItems, deleteFavoriteItems} = favoriteItemsSlice.actions
export default favoriteItemsSlice.reducer