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
    const allItemsLastOrder = useSelector((state) => state.allItemsLastOrder.allItemsLastOrder)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValueLastOrder({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };

    let qwe = () => {
        let qt;
        allItemsLastOrder.forEach((item) => {
            if(item._id == elem._id)
            {
                console.log(item.quantity);
                qt = parseFloat(item.quantity)
            }
        })
        return qt;
    }


    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValueLastOrder({value: qwe(), elem: elem, chooseWeeks: chooseWeeks}))
        }
    }
    return (
        <div className={`itemCardLastOrder ${window.innerWidth < 900 && 'itemCardLastOrder-mobile'}`}>
            <div className="imgCardBackgroundLastOrder"><img className='imgCard' src={elem.img} alt="tomato"/></div>
            <div className='itemInfoLastOrder'>
                <div className='priceCardLastOrder'>
                    <div className={`marketPriceLastOrder ${ !allItemsLastOrder.find((items) => {
                        return (items._id === elem._id)
                    }) && "marketPriceLastOrderTrue"}`}>
                        <div className='nameCardLastOrder'>{elem.name}</div>
                        <div className='middlePriceLastOrder'>
                            { !allItemsLastOrder.find((items) => {
                                return (items._id === elem._id)
                            }) ? "" : "Insert quantity"}
                        </div>
                        {
                            !allItemsLastOrder.find((items) => {
                                return (items._id === elem._id)
                            }) ?
                            <div className='middlePriceCurrent'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}<span
                            className='middlePriceCurrentKg'>€/{elem.unit}</span></div>
                                :
                                <div className='cardElemChangeDefMarket lastOrderInputChange'>
                                    <FiMinus onClick={() => {
                                            dispatch(setCartElemQuantityDecrementLastOrder(elem))
                                            if(qwe() <= 1){
                                                dispatch(deleteCartElemLastOrder(elem))
                                            }
                                    }}/>
                                    <div>
                                        <input type="number" onChange={handleChange} onBlur={handleMouseLeave} value={qwe()}/></div>
                                    <FiPlus onClick={() => {
                                        dispatch(setCartElemQuantityIncrementLastOrder(elem))
                                    }}/>
                                </div>

                        }
                        </div>
                </div>
                {
                    !allItemsLastOrder.find((items) => {
                        return (items._id === elem._id)
                    }) &&
                    <div
                        className={`buttonMoreLastOrder ${allItemsLastOrder.find((items) => items._id === elem._id) ? 'flip' : 'flipBack'} ${window.innerWidth < 900 && 'buttonMoreLastOrder-mobile'}`}
                        onClick={() => {
                            dispatch(setallItemsLastOrder(elem))
                            dispatch(setCartElemQuantityValueLastOrder({value: 1, elem: elem, chooseWeeks: chooseWeeks}))
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