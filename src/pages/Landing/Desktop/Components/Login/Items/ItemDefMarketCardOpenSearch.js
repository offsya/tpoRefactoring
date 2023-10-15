import React, {useEffect, useMemo} from 'react';
import '../../../../Mobile/Components/Item/ItemsCard.scss'
import {HiPlus} from 'react-icons/hi'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityDecrement,
    setCartElemQuantityIncrement,
    setCartElemQuantityValue
} from "../../../../features/allCartItems";
import {
    setFavoriteItems, deleteFavoriteItems
} from "../../../../features/FavoriteItems";
import {
    setAllItems,
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../../features/allItems";

import {
    setallItemsLastOrder,
    setCartElemQuantityDecrementLastOrder,
    setCartElemQuantityIncrementLastOrder,
    setCartElemQuantityValueLastOrder,
    deleteCartElemLastOrder
} from "../../../../features/allItemsLastOrder";



import {FiMinus, FiPlus} from "react-icons/fi";
import {AiOutlineStar} from "react-icons/ai";

const ItemDefMarketLastOrderSearch = ({elem}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const allItemsLastOrder = useSelector((state) => state.allItemsLastOrder.allItemsLastOrder)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

    let qwe = () => {
        let qt;
        allItemsCart.forEach((item) => {
            if(item._id == elem._id)
            {
                console.log(item.quantity);
                qt = parseFloat(item.quantity)
            }
        })
        return qt;
    }

    const handleChange = (event, elem) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }



    };


    const handleMouseLeave = (event, elem) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }

        if(chooseMarket == 2){
            if(parseFloat(elem.quantity) < parseFloat(elem.minQt) * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1)){
                dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem, chooseWeeks: chooseWeeks}))
            }
        }
    }


    return (
        <div className="itemCardLastOrder">
            <div className="imgCardBackgroundLastOrder"><img className='imgCard' src={elem.img} alt="tomato"/></div>
            <div className='itemInfoLastOrder'>
                <div className='priceCardLastOrder'>
                    <div className='marketPriceLastOrder'>
                        <div className='nameCardLastOrder'>{elem.name}</div>
                        <div className='middlePriceLastOrder'>
                            { !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) ? "" : "Insert quantity"}
                        </div>
                        {
                            !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) ?
                            <div className='middlePriceCurrent'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}<span
                            className='middlePriceCurrentKg'>€/{elem.unit}</span></div>
                                :
                                <div className='cardElemChangeDefMarket lastOrderInputChange'>
                                    <FiMinus onClick={() => {
                                        if(chooseMarket == 2) {
                                            if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                                                dispatch(setCartElemQuantityDecrement(elem))
                                            }
                                        }
                                        if(chooseMarket == 1){
                                            dispatch(setCartElemQuantityDecrement(elem))
                                            dispatch(setElemQuantityDecrement(elem))
                                            if(elem.quantity == 1 || parseInt(elem.quantity) == 0){
                                                dispatch(deleteCartElem(elem))
                                            }
                                        }

                                        dispatch(setCartElemQuantityDecrementLastOrder(elem))
                                        if(qwe() <= 1){
                                            dispatch(deleteCartElemLastOrder(elem))
                                        }
                                    }}/>
                                    <div>
                                        <input type="number" onChange={(e) => handleChange(e, elem)} onBlur={(e) => handleMouseLeave(e, elem)} value={elem.quantity}/>
                                    </div>
                                    <FiPlus onClick={() => {
                                        if(chooseMarket == 2) {
                                            dispatch(setCartElemQuantityIncrement(elem))
                                        }
                                        if(chooseMarket == 1) {
                                            dispatch(setCartElemQuantityIncrement(elem))
                                            dispatch(setElemQuantityIncrement(elem))
                                        }
                                        }}/>
                                </div>

                        }
                        </div>
                </div>
                {
                    !allItemsCart.find((items) => {
                        return (items._id === elem._id)
                    }) &&
                    <div
                        className={`buttonMoreLastOrder ${allItemsCart.find((items) => items._id === elem._id) ? 'flip' : 'flipBack'}`}
                        onClick={() => {



                            if(true){
                                dispatch(setAllItemsCart(elem))
                                dispatch(setCartElemQuantityValue({value: 1, elem: elem, chooseWeeks: chooseWeeks}))
                                dispatch(setElemQuantityValue({value: 1, elem: elem, chooseWeeks: chooseWeeks}))
                            }

                            if(chooseMarket == 2){
                                if(parseFloat(elem.quantity) < parseFloat(elem.minQt) * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1)){
                                    dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem, chooseWeeks: chooseWeeks}))
                                }
                            }


                        }}><HiPlus className="buttonMoreIcon"/></div>
                }
            </div>
            <div className='favoriteIcon' onClick={() => {
                dispatch(setFavoriteItems(elem))
            }}>
                {
                    favoriteItems.find((items) => items._id === elem._id) ?
                        <AiFillHeart/>
                        :
                        <AiOutlineHeart/>
                }

            </div>
        </div>
    );
};

export default ItemDefMarketLastOrderSearch;