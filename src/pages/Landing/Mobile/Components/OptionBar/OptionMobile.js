import React from 'react';
import './OptionsBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCartElemQuantityDecrement} from "../../../features/allCartItems";
import {setChooseOption} from "../../../features/chooseOption";

const Option = ({name, setSeeModal, setSeeDeliveryForm}) => {
    const dispatch = useDispatch();
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    return (
        <div className="options-mobile">
            <div className="optionName1-mobile">{name}</div>
            { name == "Smart delivery" ?
                <div>
                    <div className="optionMiddleSmart-mobile">Average Market Price <b>{(allItemsCart.map(elem => elem.quantity * elem.marketPriceCP)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</b></div>
                    <div className="optionHowItWork-mobile">How it work?</div>
                    <div className="optionMiddleChoose-mobile">choose delivery days and get better price</div>
                    <div className="optionGetAnswer-mobile">Get Answer</div>
                </div>
                :
                <div>
                    <div className="optionTotal-mobile">Total</div>
                    <div className="optionMiddle-mobile">Average Market Price <b>{(allItemsCart.map(elem => elem.quantity * elem.marketPriceCP)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</b></div>
                    <div className="optionProfit-mobile" onClick={() => setSeeModal(true)}>See your economy</div>

                    {
                        name == "Pick-up from Mercabarna" ?
                            <div className="optionPayButtons-mobile" onClick={() => name == "Pick-up from Mercabarna" ? dispatch(setChooseOption(1)) : dispatch(setChooseOption(2))}>
                                <div className="optionPayNowButton" onClick={() => setSeeDeliveryForm(true)}>Pay
                                    Now <br/> <span>{(allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.MB / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 0).toFixed(2)|| 0}€</span></div>
                                <div className="optionPayDeliveryButton" onClick={() => setSeeDeliveryForm(true)}>At
                                    delivery <span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.MB / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 0)).toFixed(2)  || 0}€</span></div>
                            </div>
                            :
                            <div className="optionPayButtons-mobile" onClick={() => name == "Pick-up from Mercabarna" ? dispatch(setChooseOption(1)) : dispatch(setChooseOption(2))}>
                                <div className="optionPayNowButton" onClick={() => setSeeDeliveryForm(true)}>Pay
                                    Now <span>{(allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.DP / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</span></div>
                                <div className="optionPayDeliveryButton" onClick={() => setSeeDeliveryForm(true)}>At
                                    delivery <span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.DP / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 0)).toFixed(2) || 0}€</span></div>
                            </div>
                    }
                </div>
            }

        </div>
    );
};

export default Option;