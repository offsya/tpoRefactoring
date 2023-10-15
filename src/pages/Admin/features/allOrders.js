import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";


const initialState = {
    allOrders: []
}

export const allOrdersSlice = createSlice({
    name: 'allOrders',
    initialState,
    reducers: {
        changeOrderItems: (state, action) => {
            state.allOrders = state.allOrders.map(item => {
                if(item._id == action.payload._id){
                    item.items = [...item.items, ...action.payload.arr]
                    return item
                }else{
                    return item
                }
            });

        },
        setAllOrders: (state, action) => {
            const filterArray = state.allOrders.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.allOrders = [...state.allOrders, action.payload]
            }else{
                state.allOrders = state.allOrders.filter(item => item._id !== action.payload._id);
            }
        },
        setAllOrdersOrders: (state, action) => {
            const filterArray = state.allOrders.map((elem) => elem.id);
            if(!filterArray.includes(action.payload.id)){
                state.allOrders = [...state.allOrders, action.payload]
            }else{
                state.allOrders = state.allOrders.filter(item => item.id !== action.payload.id);
            }
        },
        delAllOrders: (state, action) => {
                state.allOrders = []
        },
        addAllOrders: (state, action) => {
            if(action.payload){
                state.allOrders = action.payload
            }else{
                state.allOrders = []
            }
        },
        changeStatusOne: (state, action) => {
            console.log(action.payload)
            state.allOrders = state.allOrders.map(elem => {
                if(elem._id == action.payload._id){
                    return {...elem, status: action.payload.crElem}
                }else{
                    return elem
                }
            })
        },
        changeStatusMany: (state, action) => {
                let itemsIdsArr = action.payload.allSelectedItems.map(elem => elem._id)
                state.allOrders = state.allOrders.map(elem => {
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
            state.allOrders = state.allOrders.map(elem => {
                if(elem._id == action.payload.currentElem._id){

                    return {...elem, items: allItems}
                }else{
                    return elem
                }
            })

        },
        changeOrderElem: (state, action) => {
            state.allOrders = state.allOrders.map(elem => {
                if(elem._id == action.payload.currentElem._id){
                    return {...elem, items: action.payload.editArr}

                }else{
                    return elem
                }
            })
        },
        changeOrderElemParcial: (state, action) => {
            state.allOrders = state.allOrders.map(elem => {
                if(elem._id == action.payload.currentElem._id){
                    return {...elem, paidValue: action.payload.paidValue}
                }else{
                    return elem
                }
            })
        },
    }

})


export const {changeOrderElem, changeOrderElemParcial, delAllOrders,changeStatusOrderItemMany,changeOrderItems,changeStatusOne ,changeStatusMany, setAllOrders, setAllOrdersOrders, addAllOrders} = allOrdersSlice.actions
export default allOrdersSlice.reducer