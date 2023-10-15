import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allProducts: []
}

export const allProductsSlice = createSlice({
    name: 'allProductsSlice',
    initialState,
    reducers: {
        changeOrderItems: (state, action) => {
            state.allProducts = state.allProducts.map(item => {
                if(item._id == action.payload._id){
                    item.items = [...item.items, ...action.payload.arr]
                    return item
                }else{
                    return item
                }
            });

        },
        setallProductsSlice: (state, action) => {
            const filterArray = state.allProducts.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.allProducts = [...state.allProducts, action.payload]
            }else{
                state.allProducts = state.allProducts.filter(item => item._id !== action.payload._id);
            }
        },
        setallProductsSliceOrders: (state, action) => {
            const filterArray = state.allProducts.map((elem) => elem.id);
            if(!filterArray.includes(action.payload.id)){
                state.allProducts = [...state.allProducts, action.payload]
            }else{
                state.allProducts = state.allProducts.filter(item => item.id !== action.payload.id);
            }
        },
        delallProductsSlice: (state, action) => {
                state.allProducts = []
        },
        addallProductsSlice: (state, action) => {
            console.log(action.payload.length)
            if(action.payload.length){
                state.allProducts = action.payload
            }else{
                state.allProducts = []
            }
        },
        changeStatusOne: (state, action) => {
            console.log(action.payload)
            state.allProducts = state.allProducts.map(elem => {
                if(elem._id == action.payload._id){
                    return {...elem, status: action.payload.crElem}
                }else{
                    return elem
                }
            })
        },
        changeStatusMany: (state, action) => {
                let itemsIdsArr = action.payload.allSelectedItems.map(elem => elem._id)
                state.allProducts = state.allProducts.map(elem => {
                    if(itemsIdsArr.includes(elem._id)){
                        return {...elem, status: action.payload.crElem}
                    }else{
                        return elem
                    }
                })
        },
        changeStatusOrderItemMany: (state, action) => {
            const allSelectedItemsIds = action.payload.allSelectedItems.map(elem => elem.sku)
            const allItems = action.payload.currentElem.items.map(elem => {
                if(allSelectedItemsIds.includes(elem.sku)){
                    return {...elem, status: action.payload.crElem}
                }else{
                    return elem
                }
            })
            console.log(allItems)
            state.allProducts = state.allProducts.map(elem => {
                if(elem._id == action.payload.currentElem._id){

                    return {...elem, items: allItems}
                }else{
                    return elem
                }
            })

        },
    }

})


export const {delallProductsSlice,changeStatusOrderItemMany,changeOrderItems,changeStatusOne ,changeStatusMany, setallProductsSlice, setallProductsSliceOrders, addallProductsSlice} = allProductsSlice.actions
export default allProductsSlice.reducer