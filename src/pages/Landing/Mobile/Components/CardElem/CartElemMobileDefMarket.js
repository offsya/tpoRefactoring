import React, {useEffect} from 'react';
import './CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setCartElemQuantityIncrement,
    setCartElemQuantityDecrement,
    deleteCartElem,
    setCartElemQuantityValue, setCartElemCurrentUnit
} from "../../../features/allCartItems";
import {
    setElemCurrentUnit,
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../features/allItems";
import {
    deleteCartElemLastOrder,
    setCartElemQuantityDecrementLastOrder,
    setCartElemQuantityIncrementLastOrder
} from "../../../features/allItemsLastOrder";
import {Select} from "antd";

const CartElemMobileDefMarket = ({elem, proMod}) => {
    const dispatch = useDispatch()
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
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
    const handleChangeCurrentUnit = (newUnit) => {
        console.log(newUnit)
        const newValue = newUnit
        if (isNaN(newValue)) {
            dispatch(setCartElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))

            dispatch(setElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };

    return (
        <div className='cardElem cardElemMobile' style={{gridTemplateColumns: "1.525fr repeat(3, 1fr)",  height: proMod && 'auto', paddingTop: proMod && '0px'}}>

            {proMod ?
                <div>
                    <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: "1.525fr repeat(3, 1fr)",  height: 'auto'}}>
                        <span className="profitProductName profitSize lastOrderNameItem profitSize-mob" style={{marginLeft: '0px'}}>{false&& <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                        <span className="profitProductMiddle profitSize profitSize-mob">{elem.marketPriceCP}€</span>
                        {
                            true ?
                                <div className='cardElemChangeDefMarketLastOrder-mobile' style={{width: '125px'}}>
                                        <FiMinus style={{fontSize: '24px'}} onClick={() => {
                                            dispatch(setCartElemQuantityDecrement(elem))
                                            dispatch(setElemQuantityDecrement(elem))
                                            console.log(elem.quantity)
                                            if (elem.quantity == 1 || parseInt(elem.quantity) == 0) {
                                                dispatch(deleteCartElem(elem))
                                            }
                                        }}/>
                                    <div className="inputUnits" style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: '200px',
                                        alignItems: 'center'
                                    }}>
                                        <input style={{
                                            borderRight: '1px solid gray',
                                            paddingRight: '5px',
                                            marginRight: "5px",
                                            textAlign: "left",
                                            width: (((elem.quantity).toString().length + 1) * 8) + "px"
                                        }} type="number" onChange={handleChange} onBlur={handleMouseLeave}
                                               value={elem.quantity}/>
                                        {
                                            Array.isArray(elem.unit) || elem.unit.includes(",") ?
                                                <div className="UnitsSetelect">
                                                    {<Select
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
                                                        value={elem?.currentUnit || OptionsList(elem)[0]}
                                                    />}
                                                </div>
                                                :
                                                <div>{elem.unit}</div>
                                        }
                                    </div>

                                    <FiPlus style={{fontSize: '24px'}} onClick={() => {
                                        dispatch(setCartElemQuantityIncrement(elem))
                                        dispatch(setElemQuantityIncrement(elem))
                                    }}/>
                                </div>
                                :
                                <span
                                    className='profitOurPrice profitSize profitSize-mob'>{elem.quantity + elem.unit}</span>

                        }
                        {
                            true &&
                            <span
                                className='profitQuantity profitSize-mob'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
                        }
                        {/*{*/}
                        {/*    changeOrder &&*/}
                        {/*    <span className='profitQuantity'>x</span>*/}
                        {/*}*/}
                    </div>
                </div>
                :
                <div>
                    <IoIosClose className='cardElemDeleteImg-mobile' onClick={() => {
                        dispatch(deleteCartElem(elem))
                        dispatch(setElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
                    }}/>
                    <div><img className='imgCardElem-mobile' src={elem.img} alt="tomato"/></div>
                    <div className="cardElemName-mobile">{elem.name}</div>
                    <div
                        className="cardElemPrice-mobile">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€
                    </div>
                    <div className='cardElemChange-mobile'>
                        <FiMinus onClick={() => {
                            dispatch(setCartElemQuantityDecrement(elem))
                            dispatch(setElemQuantityDecrement(elem))
                            console.log(elem.quantity)
                            if (elem.quantity == 1 || parseInt(elem.quantity) == 0) {
                                dispatch(deleteCartElem(elem))
                            }
                        }}/>
                        <div className="inputUnits"
                             style={{display: "flex", justifyContent: "center", width: '100px', alignItems: 'center'}}>
                            <input style={{
                                borderRight: '1px solid gray',
                                paddingRight: '5px',
                                marginRight: "5px",
                                textAlign: "left",
                                width: (((elem.quantity).toString().length + 1) * 8) + "px"
                            }} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                            {
                                Array.isArray(elem.unit) || elem.unit.includes(",") ?
                                    <div className="UnitsSetelect">
                                        {<Select
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
                    {chooseMarket == 2 && <div className="cardElemAMP-mobile"><span>AMP</span> for {worksDays.length} days</div>}
                    <div className='cardElemBottomSpace-mobile'></div>
                </div>
            }
        </div>

    );
};

export default CartElemMobileDefMarket;