import React, {useMemo, useState} from 'react';
import './ItemsCard.scss'
import {HiPlus} from 'react-icons/hi'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityDecrement, setCartElemQuantityIncrement,
    setCartElemQuantityValue
} from "../../../features/allCartItems";
import {setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue} from "../../../features/allItems";
import {FiMinus, FiPlus} from "react-icons/fi";
import {setFavoriteItems} from "../../../features/FavoriteItems";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {Select} from "antd";

const ItemMobileDefMarket = ({elem, setCurrentUpperElem, setUpperInfoOpen}) => {
    const dispatch = useDispatch()
    const allItems = useSelector((state) => state.allItems.allItems)
    
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const [checkBoxChecker, setCheckBoxChecker] = useState(false);
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };
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

    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
    }

    return (
        <div className="itemCard-mobile" onClick={() => {setUpperInfoOpen(true); setCurrentUpperElem(elem)}}>
            <div className="imgCardBackground"><img className='imgCard' src={elem.img} alt="tomato"/></div>
            <div className='itemInfo'>
                <div className='priceCard'>
                    <div className='marketPrice'>
                        <div className='nameCard'>{elem.name}</div>
                        <div className='middlePrice'>
                            { !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) ? " " : <div><div className='middlePrice'>Order in units</div><div className="RememberMeBlock checkbox_units" onClick={(e) =>{ setCheckBoxChecker(prev => !prev)

                                e.stopPropagation()}}>
                            <span className='RememberMeBlock_Check checkbox_icon' >
                                {checkBoxChecker && '✔'}
                            </span>
                            </div></div> }
                        </div>
                        {
                            !allItemsCart.find((items) => {
                                return (items._id === elem._id)
                            }) ?
                                <div className='middlePriceCurrent'>{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}<span
                                    className='middlePriceCurrentKg'>€/{elem.unit}</span></div>
                                :
                                <div className='cardElemChangeDefMarket' onClick={(e) => e.stopPropagation()}>
                                    <FiMinus onClick={() => {
                                        dispatch(setCartElemQuantityDecrement(elem))
                                        dispatch(setElemQuantityDecrement(elem))
                                        if(parseInt(elem.quantity) <= 1){
                                            dispatch(deleteCartElem(elem))
                                        }
                                    }}/>
                                    <div className="inputUnits" >
                                        <input style={{marginRight:checkBoxChecker ? "5px" : "0px",textAlign:checkBoxChecker ? "right" : "center",width:(((elem.quantity).toString().length+1)*8)+"px"}} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                                        {!allItemsCart.find((items) => {
                                            return (items._id === elem._id)
                                        }) ? " "
                                            :
                                            <div className="UnitsSetelect">{checkBoxChecker && <Select
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
                <div className='favoriteIcon' onClick={(e) => {
                    dispatch(setFavoriteItems(elem))
                    e.stopPropagation()

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

export default ItemMobileDefMarket;