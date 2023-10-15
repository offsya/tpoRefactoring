import React from 'react'
import './ModalWindow.scss'
import { CgClose } from 'react-icons/cg'
import CartElem from '../../../Desktop/Components/Carts/CartElem/CartElem'
import ProfitElem from '../../../Desktop/Components/Modals/ProfitElem'

import { FiMinus, FiPlus } from 'react-icons/fi'
import { setCartElemQuantityDecrement, setCartElemQuantityIncrement } from '../../../features/allCartItems'
import { deleteCartElem, setAllItemsCart, setCartElemQuantityValue } from '../../../features/allCartItems'

import { setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue } from '../../../features/allItems'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../../../Desktop/Components/Login/Items/Item'
import ItemDefMarket from '../../../Desktop/Components/Login/Items/ItemDefMarket'
import UpdatedItemDefMarket from '../../../Desktop/Components/Login/Items/UpdatedItems/UpdatedItemDefMarket'

const FavoriteElemModal = ({ setFavoriteElemModal, currentOption }) => {
  // const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
  // const allItems = useSelector((state) => state.allItems.allItems)
  // const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
  const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
  const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
  // const dispatch = useDispatch()
  return (
    <div className='modal' onClick={() => setFavoriteElemModal(false)}>
      <div className='profitModal' onClick={(e) => e.stopPropagation()}>
        <div className='seeProfitText'>
          My favorite's <CgClose className='closeButton' onClick={() => setFavoriteElemModal(false)} />
        </div>
        <div className='itemsCardFavoriteElem'>
          {
            //   parseInt(elem.enabled) &&
            favoriteItems.map((elem) => {
              return chooseMarket == 1 ? elem.enabled && <UpdatedItemDefMarket elem={elem} /> : <Item elem={elem} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default FavoriteElemModal
