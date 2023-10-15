import React, {useMemo, useState} from 'react';
import './UpdatedItemMobile.scss'
import {HiPlus} from 'react-icons/hi'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCartElem,
    setAllItemsCart, setCartElemCurrentUnit,
    setCartElemQuantityDecrement, setCartElemQuantityIncrement,
    setCartElemQuantityValue
} from "../../../features/allCartItems";
import {
    setElemCurrentUnit,
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../features/allItems";
import {FiMinus, FiPlus} from "react-icons/fi";
import {setFavoriteItems} from "../../../features/FavoriteItems";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {Select} from "antd";
import ItemInfoModalWindow from "../ItemInfoModal/ItemInfoModalWindow";
import imager from "../../../../../assets/Notification.svg";

const UpdatedItemMobile = ({elem, setCurrentUpperElem, setUpperInfoOpen}) => {
    const dispatch = useDispatch()
    const allItems = useSelector((state) => state.allItems.allItems)

    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const [checkBoxChecker, setCheckBoxChecker] = useState(false);
    const [modalInfoActive, setModalInfoActive] = useState(false);
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };
    const OptionsList = (elem)=>{
        let options=[]

        if(Array.isArray(elem.unit)){
            console.log(elem.unit)
            for (let i = 0; i < elem.unit.length; i++) {
                console.log(elem.unit[i])
                options.push({
                    value: elem.unit[i],
                    label: elem.unit[i],
                });
            }
            console.log(options)
            return options
        }else{
            for (let i = 0; i < elem.unit.split(",").length; i++) {
                options.push({
                    value: elem.unit.split(",")[i],
                    label: elem.unit.split(",")[i],
                });
            }
            console.log(options)
            return options
        }
    }

    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
    }
    const handleChangeCurrentUnit = (newUnit) => {
        console.log(newUnit)
        const newValue = newUnit
        if (isNaN(newValue)) {
            dispatch(setCartElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))

            dispatch(setElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };


    return (
        <div className="UpdatedItemCard-mobile" >
            <ItemInfoModalWindow active={modalInfoActive} setActive={setModalInfoActive}/>
            <div className="UpdatedTopRowImgFavoriteMobile">
                {false && <div className="UpdatedSpoSignMobile"><span>SPO</span></div>}

                <div className='UpdatedFavoriteIconV2Mobile' onClick={(e) => {
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

            <div className="UpdatedImgCardBackgroundMobile">
                <img className='UpdatedImgCardMobile' src={elem.img} alt="tomato"/>
            </div>
            <div className='UpdatedItemInfoMobile'>
                <div className="UpdatedNameCardMobile" onClick={() => {setUpperInfoOpen(true); setCurrentUpperElem(elem)}}>
                    {elem?.name && elem.name.length>15? <div>{elem.name.slice(0, 15)}<span style={{color:"#5FC56E"}}> more...</span></div> :<div>{elem.name} <span style={{color:"#5FC56E"}}> more...</span></div> }

                </div>
            </div>
            <div className="UpdatedOtherInfoMobile" style={{paddingLeft: '5px'}} onClick={(e)=>{
                setModalInfoActive(true);
                e.stopPropagation();
            }}>
                {elem.weight && <div className="UpdatedProductUnitMobile"><span>{elem.weight + '' + elem.LtKg}</span></div>}

                {(elem.stock == '1' && !elem.dias) && <div className="UpdatedStockOrNotMobile"><span>Stock ✔</span></div>}
                {(elem.stock == '0' && !elem.dias) && <div className="UpdatedStockOrNotMobile"  style={{background: '#F5F4F2', border: '1px solid #FF725E'}}><span style={{color: '#FF725E'}}>Stock ×</span></div>}

                {(elem.dias) && <div className="UpdatedDaysLeftMobile"><span>{elem.dias} days</span></div>}
                {(elem.stock == '2' || elem?.stock == undefined && !elem.dias) && <div className="UpdatedTBCMobile"><span>TBC</span></div>}

            </div>
            <div className="UpdatedPriceAndButtonMobile">
                {

                    !allItemsCart.find((items) => {
                        return (items._id === elem._id)
                    }) ?
                        <div className="UpdatedMiddlePriceCurrentMobile">{parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.00}€/<span
                            className='UpdatedMiddlePriceCurrentKgMobile'>{Array.isArray(elem?.unit) ? elem?.unit[0] : elem.unit}</span>
                        </div>
                        :
                        <div className='UpdatedCardElemChangeDefMarketMobile' onClick={(e) => e.stopPropagation()}>
                            <FiMinus onClick={(e) => {

                                dispatch(setCartElemQuantityDecrement(elem))
                                dispatch(setElemQuantityDecrement(elem))
                                if(parseInt(elem.quantity) <= 1){
                                    dispatch(deleteCartElem(elem))
                                }
                            }}/>
                            <div className="inputUnits" style={{display:"flex",justifyContent:!checkBoxChecker? "center": "end", width: '100px'}} >
                                <input style={{borderRight: "1px solid grey", marginRight:!checkBoxChecker ? "5px" : "0px",textAlign:!checkBoxChecker ? "left" : "center",width:(((elem.quantity).toString().length+1)*8 + 5)+"px"}} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                                {!allItemsCart.find((items) => {
                                    return (items._id === elem._id)
                                })? " "
                                    :Array.isArray(elem.unit) || elem.unit.includes(",") ?

                                        <div className="UnitsSetelect" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            {!checkBoxChecker && <Select
                                                style={{
                                                    margin: '0px',
                                                    padding: '0px',
                                                    paddingLeft: '10px',
                                                    width: 65,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                                onChange={(newUnit) => handleChangeCurrentUnit(newUnit)}
                                                options={OptionsList(elem)}
                                                value={elem?.currentUnit || OptionsList(elem)[0] }
                                            />}
                                        </div>
                                        :
                                        <div>{elem.unit}</div>
                                }
                            </div>
                            <FiPlus onClick={() => {
                                dispatch(setCartElemQuantityIncrement(elem))
                                dispatch(setElemQuantityIncrement(elem))
                            }}/>

                        </div>

                }
                {
                    !allItemsCart.find((items) => {
                        return (items._id === elem._id)
                    }) &&
                    <div
                        className={`UpdatedButtonMore ${allItemsCart.find((items) => items._id === elem._id) || (elem.stock == 0) ? 'flip' : 'flipBack'}`}
                        style={{fontSize: '22px', borderRadius: '40px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}
                        onClick={(e) => {
                            e.stopPropagation()
                            if(elem.stock != '0') {
                                dispatch(setAllItemsCart(elem))
                                dispatch(setElemQuantityValue({value: 1, elem: elem, chooseWeeks: chooseWeeks}))
                            }
                        }}>{(elem.stock != '0') ? <HiPlus className="buttonMoreIconMobile"/> : <img style={{width: '16px', height: '20px'}} src={imager} alt=""/>}</div>

                }
            </div>
        </div>
    );
};

export default UpdatedItemMobile;