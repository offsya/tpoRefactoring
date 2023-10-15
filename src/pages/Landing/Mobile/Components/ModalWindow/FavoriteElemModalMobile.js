import React from 'react';
import './ModalWindow.scss'
import { CgClose } from 'react-icons/cg';
import CartElem from "../../../Desktop/Components/Carts/CartElem/CartElem";
import ProfitElem from "../../../Desktop/Components/Modals/ProfitElem";

import {FiMinus, FiPlus} from "react-icons/fi";
import {setCartElemQuantityDecrement, setCartElemQuantityIncrement} from "../../../features/allCartItems";
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityValue
} from "../../../features/allCartItems";

import {
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../features/allItems";
import {useDispatch, useSelector} from "react-redux";
import Item from "../../../Desktop/Components/Login/Items/Item";
import ItemDefMarket from "../../../Desktop/Components/Login/Items/ItemDefMarket";
import ItemMobileDefMarketV2 from "../Item/ItemMobileDefMarketV2";
import UpdatedItemMobile from "../UpdatedItems/UpdatedItemMobile";


const FavoriteElemModalMobile = ({setFavoriteElemModal, currentOption}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const dispatch = useDispatch()
    return (
        <div className='modalFavorite' onClick={() => setFavoriteElemModal(false)}>
            <div className='profitModal' onClick={(e) => e.stopPropagation()}>
                <div className='seeProfitText'>My favorite's <CgClose className="closeButton" onClick={() => setFavoriteElemModal(false)}/></div>
                <div className='itemsCardFavoriteElem itemsCardFavoriteElem-mobile'>
                    {
                        favoriteItems.map(elem => {
                            return chooseMarket == 1 ?
                                <UpdatedItemMobile elem={elem}/>
                                :
                                <Item elem={elem}/>
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default FavoriteElemModalMobile;