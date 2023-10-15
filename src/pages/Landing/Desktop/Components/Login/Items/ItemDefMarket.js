import React, {useEffect, useMemo, useState} from 'react';
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

import {FiMinus, FiPlus} from "react-icons/fi";
import {AiOutlineStar} from "react-icons/ai";
import {Checkbox, Select} from "antd";
import {allContactsSlice} from "../../../../../Admin/features/allContacts";
import ItemInfoModalWindow from "../../../../Mobile/Components/ItemInfoModal/ItemInfoModalWindow";

const ItemDefMarket = ({elem, setUpperInfoOpen, setCurrentUpperElem}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const [modalInfoActive, setModalInfoActive] = useState(false);

    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const [checkBoxChecker, setCheckBoxChecker] = useState(false);
    const unitsArray = useMemo(() => {
        return(
            allItems.map(elem => {
                return elem.unit
            })
        )

    }, [allItems]);
    let unitSet= new Set(unitsArray)



    let options=[]
    const UnitArrayFromSet = Array.from(unitSet)
    for (let i = 0; i < UnitArrayFromSet.length; i++) {
        options.push({
            value: UnitArrayFromSet[i],
            label: UnitArrayFromSet[i],
        });
    }
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };


    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
    }
    return (
        <div className="itemCard" >
            <ItemInfoModalWindow active={modalInfoActive} setActive={setModalInfoActive}/>
            <div className="topRowImgFavoritePC">
                <div className="unitsInCirclePC" >
                    <span>1kg</span>

                </div>
                <div className="imgCardBackgroundPC">
                    <img className='imgCardPC' src={elem.img} alt="tomato"/>
                </div>
                <div className="rightSideFavAndStockPC">
                    <div className='favoriteIconV2PC' onClick={(e) => {
                        dispatch(setFavoriteItems(elem))
                        e.stopPropagation()
                        console.log(elem)
                    }}>
                        {

                            favoriteItems.find((items) => items._id === elem._id) ?
                                <AiFillHeart/>
                                :
                                <AiOutlineHeart/>
                        }

                    </div>
                    <div className="stockOutOfStockPC" onClick={(e)=>{
                        setModalInfoActive(true);
                        e.stopPropagation();
                    }} >
                        <span style={{marginTop:"-10px"}}>✓</span>
                        <span>stock</span>
                    </div>
                </div>
            </div>
            <div className='itemInfo'>
                <div className='priceCard'>
                    <div className='marketPrice'>
                        <div className='nameCard' onClick={() => {setUpperInfoOpen(true); setCurrentUpperElem(elem)}}>{elem.name.length>17? elem.name.replace(/(\d).*/,"..."):elem.name}</div>
                        <div className='middlePrice'>
                            { !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) }

                        </div>


                        {
                            !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) ?
                            <div className='middlePriceCurrent'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}€/<span
                            className='middlePriceCurrentKg'>{elem.unit}</span></div>
                                :
                                <div className='cardElemChangeDefMarket' onClick={(e) => e.stopPropagation()}>
                                    <FiMinus onClick={(e) => {

                                            dispatch(setCartElemQuantityDecrement(elem))
                                            dispatch(setElemQuantityDecrement(elem))
                                            if(parseInt(elem.quantity) <= 1){
                                                dispatch(deleteCartElem(elem))
                                            }
                                    }}/>
                                    <div className="inputUnits" style={{display:"flex",justifyContent:!checkBoxChecker? "center": "end"}} >
                                        <input style={{marginRight:!checkBoxChecker ? "5px" : "0px",textAlign:!checkBoxChecker ? "right" : "center",width:(((elem.quantity).toString().length+1)*8)+"px"}} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                                    {!allItemsCart.find((items) => {
                                        return (items._id === elem._id)
                                    })? " "
                                        :
                                        <div className="UnitsSetelect">{!checkBoxChecker && <Select
                                            defaultValue={elem.unit}
                                            style={{
                                                 padding:0,
                                                width: 78,
                                            }}
                                            onChange={handleChange}
                                            options={options}
                                        />}</div>
                                    }
                                    </div>
                                    <FiPlus onClick={() => {
                                        dispatch(setCartElemQuantityIncrement(elem))
                                        dispatch(setElemQuantityIncrement(elem))
                                    }}/>

                                </div>

                        }

                        </div>
                    {
                        !allItemsCart.find((items) => {
                           return (items._id === elem._id)
                        }) &&
                        <div
                        className={`buttonMore ${allItemsCart.find((items) => items._id === elem._id) ? 'flip' : 'flipBack'}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(setAllItemsCart(elem))
                            dispatch(setElemQuantityValue({value: 1, elem: elem, chooseWeeks: chooseWeeks}))
                        }}><HiPlus className="buttonMoreIcon"/></div>
                    }
                </div>
            </div>

        </div>
    );
};

export default ItemDefMarket;