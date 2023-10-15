import { createSlice } from '@reduxjs/toolkit'
// import tomato from '../../../assets/tomato.svg'
// import corn from '../../../assets/corn.svg'
// import chili from '../../../assets/chili.svg'
// import avocado from '../../../assets/avocado.svg'
// import lime from '../../../assets/lime.svg'
// import limon from '../../../assets/limon.svg'
// import juice from '../../../assets/juice.svg'
// import green from '../../../assets/green.svg'
// import yellow from '../../../assets/yellow.svg'
// import { mainApi } from './../../services/mainApi'

const initialState = {
  allItems: [],
}

export const allItemsSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {
    addAllItems: (state, action) => {
      state.allItems = action.payload
    },
    setAllItems: (state, action) => {
      state.allItems.push(action.payload)
    },
    setElemQuantityIncrement: (state, action) => {
      const itemIndex = state.allItems.findIndex((item) => item._id === action.payload._id)
      if (itemIndex >= 0) {
        state.allItems[itemIndex].quantity = parseFloat(state.allItems[itemIndex].quantity) ? parseFloat(state.allItems[itemIndex].quantity) + 1 : 1
      }
    },
    setElemQuantityDecrement: (state, action) => {
      const itemIndex = state.allItems.findIndex((item) => item._id === action.payload._id)
      if (itemIndex >= 0 && action.payload.quantity > 0) {
        state.allItems[itemIndex].quantity -= 1
      } else {
        state.allItems[itemIndex].quantity = 0
      }
    },
    setElemQuantityValue: (state, action) => {
      const itemIndex = state.allItems.findIndex((item) => item._id === action.payload.elem._id)
      console.log(action.payload.value)
      if (itemIndex >= 0) {
        state.allItems[itemIndex].quantity = action.payload.value
      }
    },
    setElemCurrentUnit: (state, action) => {
      const itemIndex = state.allItems.findIndex((item) => item._id === action.payload.elem._id)
      console.log(itemIndex)
      if (itemIndex >= 0) {
        state.allItems[itemIndex].currentUnit = action.payload.value
      }
    },
  },
})

export const { addAllItems, setAllItems, setElemCurrentUnit, setElemQuantityIncrement, setElemQuantityDecrement, setElemQuantityValue } =
  allItemsSlice.actions
export default allItemsSlice.reducer
