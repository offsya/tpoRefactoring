import { configureStore } from '@reduxjs/toolkit'
import allSelectedItemsSlice from '../pages/Admin/features/allSelectedItems'
import searchItemsAdminSlice from '../pages/Admin/features/searchItemsAdmin'
import allChooseColumnSlice from '../pages/Admin/features/allChooseColumn'
import allOrdersSlice from '../pages/Admin/features/allOrders'
import allContactsSlice from '../pages/Admin/features/allContacts'
import allFavoritCategorySlice from '../pages/Admin/features/allFavoritCategory'

import allStatusSlice from '../pages/Admin/features/allStatus'
import allProductsSlice from '../pages/Admin/features/allProducts'

import allChooseColumnOrdersSlice from '../pages/Admin/features/allChooseColumnOrders'
import setAddProdAdminSlice from '../pages/Admin/features/setAddProdAdmin'

import menuSlice from '../pages/Landing/features/menuSlice'
import allItemsSlice from '../pages/Landing/features/allItems'
import searchSlice from '../pages/Landing/features/searchItems'
import allItemsCartSlice from '../pages/Landing/features/allCartItems'
import seeOptionsSlice from '../pages/Landing/features/seeOptions'
import chooseWeeksSlice from '../pages/Landing/features/chooseWeeks'
import currentLangSlice from '../pages/Landing/features/currentLang'
import worksDaysSlice from '../pages/Landing/features/chooseWorksDays'
import frstWinSlice from '../pages/Landing/features/frstWin'
import chooseMarketSlice from '../pages/Landing/features/chooseMarket'
import calendOpenSlice from '../pages/Landing/features/calendOpen'
import checkFrstCalendOpenSlice from '../pages/Landing/features/checkFrstCalendOpen'
import chooseOptionSlice from '../pages/Landing/features/chooseOption'
import favoriteItemsSlice from '../pages/Landing/features/FavoriteItems'
import allItemsLastOrderSlice from '../pages/Landing/features/allItemsLastOrder'
import cartOpenModalSlice from '../pages/Landing/features/cartOpenModal'
import allContacts from '../pages/Admin/features/allContacts'
import setAddContactOrUpdateSlice from '../pages/Admin/features/addContactOrUpdate'
import userAccSlice from '../pages/Landing/features/userAcc'
import filterOpenSideMenuSlice from '../pages/Landing/features/filtersOpenSideMenu'
import { mainApi } from '../pages/services/mainApi'

const combineReducers = {
  menu: menuSlice,
  allItems: allItemsSlice,
  search: searchSlice,
  allCartItems: allItemsCartSlice,
  seeOptions: seeOptionsSlice,
  chooseWeeks: chooseWeeksSlice,
  currentLang: currentLangSlice,
  worksDay: worksDaysSlice,
  frstWin: frstWinSlice,
  calendOpen: calendOpenSlice,
  checkFrstCalendOpen: checkFrstCalendOpenSlice,
  chooseOption: chooseOptionSlice,
  chooseMarket: chooseMarketSlice,
  favoriteItems: favoriteItemsSlice,
  allItemsLastOrder: allItemsLastOrderSlice,
  cartOpenModal: cartOpenModalSlice,
  allSelectedItems: allSelectedItemsSlice,
  searchItemsAdmin: searchItemsAdminSlice,
  allChooseColumn: allChooseColumnSlice,
  allChooseColumnOrders: allChooseColumnOrdersSlice,
  allStatus: allStatusSlice,
  setAddProduct: setAddProdAdminSlice,
  allOrders: allOrdersSlice,
  allProducts: allProductsSlice,
  allContacts: allContactsSlice,
  allFavoritCategory: allFavoritCategorySlice,
  setAddContactOrUpdate: setAddContactOrUpdateSlice,
  userAcc: userAccSlice,
  filterOpenSideMenu: filterOpenSideMenuSlice,
  [mainApi.reducerPath]: mainApi.reducer,
}

export const store = configureStore({
  reducer: combineReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
})
