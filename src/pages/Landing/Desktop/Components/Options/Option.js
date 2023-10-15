import React, {useEffect} from 'react';
import '../../../Mobile/Components/OptionBar/OptionsBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {setChooseOption} from "../../../features/chooseOption";

import {setAllItemsCart} from "../../../features/allCartItems";

const Option = ({name, setSeeModal, setSeeDeliveryForm, setCurrentOption}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const dispatch = useDispatch();
    return (
        <div className="options">
            { name == "Pick-up from Mercabarna" ?
                    <div className="optionName1">{name}</div>
                :
                    <div className="optionName2">{name}</div>
            }
            { name == "Smart delivery" ?
                <div>
                    <div className="optionMiddleSmart">Average Market Price <b>{(allItemsCart.map(elem => elem.quantity * elem.marketPriceCP)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</b></div>
                    <div className="optionHowItWork">How it work?</div>
                    <div className="optionMiddleChoose">choose delivery days and get better price</div>
                    <div className="optionGetAnswer">Get Answer</div>
                </div>
                :
                <div>
                    <div className="optionTotal">Total</div>
                    <div className="optionMiddle">Average Market Price <b>{(allItemsCart.map(elem => elem.quantity * elem.marketPriceCP)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</b></div>
                    <div className="optionProfit" onClick={() => {setSeeModal(true); name == "Pick-up from Mercabarna" ? dispatch(setChooseOption(1)) : dispatch(setChooseOption(2))}}>See your economy</div>
                    {
                        name == "Pick-up from Mercabarna" ?
                            <div className="optionPayButtons" onClick={() => name == "Pick-up from Mercabarna" ? dispatch(setChooseOption(1)) : dispatch(setChooseOption(2))}>
                                <div className="optionPayNowButton" onClick={() => setSeeDeliveryForm(true)}>Pay Now <br/><span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPrice * elem.MB / 100) + (elem.quantity * elem.ourPrice))).reduce((acc, num) => acc + num, 0)).toFixed(2) || 0}€</span></div>
                                <div className="optionPayDeliveryButton" onClick={() => setSeeDeliveryForm(true)}>At place <br/><span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPrice * elem.MB / 100) + (elem.quantity * elem.ourPrice))).reduce((acc, num) => acc + num, 0)*1.05).toFixed(2) || 0}€</span></div>
                            </div>
                            :
                            <div className="optionPayButtons" onClick={() => name == "Pick-up from Mercabarna" ? dispatch(setChooseOption(1)) : dispatch(setChooseOption(2))}>
                                <div className="optionPayNowButton" onClick={() => setSeeDeliveryForm(true)}>Pay Now <br/><span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.DP / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 5)).toFixed(2) || 0}€</span></div>
                                <div className="optionPayDeliveryButton" onClick={() => setSeeDeliveryForm(true)}>At delivery <br/><span>{((allItemsCart.map(elem => (elem.quantity * elem.ourPriceCP * elem.DP / 100) + (elem.quantity * elem.ourPriceCP))).reduce((acc, num) => acc + num, 5)*1.05).toFixed(2) || 0}€</span></div>
                            </div>
                    }
                </div>
            }

        </div>
    );
};

export default Option;