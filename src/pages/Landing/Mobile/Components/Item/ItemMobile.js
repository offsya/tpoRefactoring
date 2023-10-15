import React from 'react';
import './ItemsCard.scss'
import {HiPlus} from 'react-icons/hi'
import {useDispatch, useSelector} from "react-redux";
import {setAllItemsCart} from "../../../features/allCartItems";
import {setFavoriteItems} from "../../../features/FavoriteItems";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

const ItemMobile = ({elem}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    return (
        <div className="itemCard-mobile">
            <div className="imgCardBackground"><img className='imgCard' src={elem.img} alt="tomato"/></div>
            <div className='itemInfo'>
                <div className='priceCard'>
                    <div className='marketPrice'>
                        <div className='nameCard'>{elem.name}</div>
                        <div className='middlePrice'></div>
                        <div className='middlePriceCurrent'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}<span className='middlePriceCurrentKg'>€/{elem.unit}</span></div>
                    </div>
                    <div className={`buttonMore ${allItemsCart.find((items) => items._id === elem._id) ? 'flip' : 'flipBack'}`} onClick={() => {dispatch(setAllItemsCart({...elem, quantity: elem.minQt}))}}><HiPlus className="buttonMoreIcon"/></div>
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
        </div>
    );
};

export default ItemMobile;