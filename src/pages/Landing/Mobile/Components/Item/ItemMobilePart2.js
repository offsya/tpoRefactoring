import React, {useState} from 'react';
import './ItemsCard.scss'
import {HiPlus} from 'react-icons/hi'
import {useDispatch, useSelector} from "react-redux";
import {setAllItemsCart} from "../../../features/allCartItems";
import {setFavoriteItems} from "../../../features/FavoriteItems";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

const ItemMobile = ({elem, setCurrentUpperElem, setUpperInfoOpen}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const [changer, setChanger] = useState(16);
    const nameHandler = () => {
        return elem.name.length > changer ? elem.name.slice(0,changer) + '...' : elem.name
    }
    return (
        <div className="itemCard-mobile-part2" style={{width: changer == 16 && '90%'}} onClick={() => {setUpperInfoOpen(true); setCurrentUpperElem(elem)}}>
            <div className="imgCardBackground-part2"><img className='imgCard-part2' src={elem.img} alt="tomato"/></div>
            <div className='itemInfo'>
                <div className='priceCard-part2'>
                    <div className='marketPrice'>
                        <div className='middlePriceCurrent-part2'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}€</div>
                        <div className='nameCard-part2' style={{maxWidth: changer == 16 ? '90%' : '60px'}}>{nameHandler()}</div>
                    </div>
                </div>
                <span className='middlePriceCurrentKg-part2'>{elem.unit}</span>

                <div className={`buttonMore-part2 ${allItemsCart.find((items) => items._id === elem._id) ? 'flip-part2' : 'flipBack-part2'}`} onClick={(e) => {e.stopPropagation(); dispatch(setAllItemsCart({...elem, quantity: elem.minQt}))}}><HiPlus className={`buttonMoreIcon ${allItemsCart.find((items) => items._id === elem._id) ? 'flip' : 'flipBack'}`}/></div>

                {/*<div className='favoriteIcon' onClick={() => {*/}
                {/*    dispatch(setFavoriteItems(elem))*/}
                {/*}}>*/}
                {/*    {*/}
                {/*        favoriteItems.find((items) => items._id === elem._id) ?*/}
                {/*            <AiFillHeart/>*/}
                {/*            :*/}
                {/*            <AiOutlineHeart/>*/}
                {/*    }*/}

                {/*</div>*/}
            </div>
        </div>
    );
};

export default ItemMobile;