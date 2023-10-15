import React, {useState} from 'react';
import '../../../Mobile/Components/Form/DeliveryForm.scss'
import {useSelector, useDispatch} from "react-redux";
import {setCartOpenModal} from "../../../features/cartOpenModal";
import {setSeeOptions} from "../../../features/seeOptions";
import axios from "axios";
import PaymentModalWindow from "../../../Mobile/Components/Form/PaymentModalWindow"
import paymentcard from "../../../components/Options/image/paymentcard.svg"
import cashpayment from "../../../components/Options/image/cashpayment.svg"
import {setAllArrayItemsCart} from "../../../features/allCartItems";
import {setElemQuantityValue} from "../../../features/allItems";
import PhoneNumberModalWindow from "./PhoneNumberModalWindow";
const tg = window.Telegram.WebApp


const PaymentDefMarket = ({orderDesc, orderAddres}) => {
    const allItems = useSelector((state) => state.allItems.allItems)
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const [checkboxPay,setCheckbox]=useState(0);
    const [compl, setCompl] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [phoneNumberModalActive, setPhoneNumberModalActive] = useState(false);

    let buffArr = [];
    allItems.forEach(elem => {
        if(parseFloat(elem.quantity)){
            buffArr.push({...elem, quantityOrder: elem.quantity})
        }
    })
    console.log(buffArr)


    const createOrder = async () => {
        setCompl(true)


        let informData =  {
            items: buffArr,
            tg: tg.initDataUnsafe,
            date: Date.now(),
            type: tg.initDataUnsafe.user ? 'telegram' : 'browser',
            status: {},
            userAcc: userAcc,
            order: 'CP',
            paidValue: 0,
            deliveryTime: (chooseWeeks == 3 ? '11:00/14:30' : chooseWeeks == 1 ? "16:00/19:00" : 'No Info'),
            paymentType: (checkboxPay == 1 ? 'Payment at delivery' : checkboxPay == 2 ? 'Online payment' : checkboxPay == 3 ? 'Cash payment' : 'No Info'),
            deliveryDate: worksDays,
            description: orderDesc,
            address: orderAddres

        };

        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        await axios.post('https://tpomobi.shop/createOrderAdmin', {data: informData}).then(function (response) {

            allItems.forEach(elem => dispatch(setElemQuantityValue({elem, value: 0})))

            dispatch(setAllArrayItemsCart([]));

            dispatch(setSeeOptions(false))
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className='PaymentDefMarket'>
            <div className='PaymentDefMarketText'>Payment method</div>
            <div className="payAtDeliveryBlock">

                <div className='payAtDeliveryBlockButton' >Take away</div>
                <div className='payAtDeliveryBlockText'><span>

                    {(allItems.map(elem => {if(elem.quantity > 0){
                        return elem.quantity * elem.marketPriceCP
                    }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€

                </span></div>

                {/*<div className='payAtDeliveryBlockButton editButton' onClick={() => {*/}
                {/*    dispatch(setCartOpenModal(true))*/}
                {/*    dispatch(setSeeOptions(false));*/}
                {/*}}>Edit</div>*/}
            </div>
            <div className='payNowPriceText'>
                At delivery
            </div>
            <div className='payNowProductPriceBlock'>{/*{className=payNowTotalText}*/}
                Total
            </div>
            <div className='payNowProductPriceBlock'>
                <div className='payNowProductPriceText'>
                    Product price
                </div>
                <div className='payNowProductPrice'>
                    {(allItems.map(elem => {if(elem.quantity > 0){
                        return elem.quantity * elem.marketPriceCP
                    }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€
                </div>
            </div>
            <div className='payNowProductPriceBlock'>
                <div>
                    Delivery
                </div>
                <div>
                    0€
                </div>
            </div>
            <div className='payNowProductPriceBlock'>
                <div>
                    Service work
                </div>
                <div>
                    0€
                </div>
            </div>
                <div className='payNowButtonBackground'>
                    <PaymentModalWindow active={modalActive} setActive={setModalActive}>
                        <div className="paymethodMain">
                            <span>Payment method</span>
                        </div>
                        <div className="paymethod">
                            <div className="PaymentMethodRow">
                                <img className="CardIco" src={paymentcard}/>
                                <div className="PayDelevery">Payment at delivery</div>
                                <div className="CheckboxPayment" style={{background:checkboxPay==1 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 1 ? 1:0) }>{checkboxPay==1 && "✔"}</div>
                            </div>
                            <div className="PaymentMethodRow">
                                <img className="CardIco" src={paymentcard}/>
                                <div className="PayDelevery">Online payment</div>
                                <div className="CheckboxPayment" style={{background:checkboxPay==2 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 2 ? 2:0) }>{checkboxPay==2 && "✔"}</div>
                            </div>
                            <div className="PaymentMethodRow">
                            <img className="CardIco" src={cashpayment}/>
                            <div className="PayDelevery">Cash payment</div>
                            <div className="CheckboxPayment" style={{background:checkboxPay==3 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 3 ? 3:0) }>{checkboxPay==3 && "✔"}</div>
                            </div>
                        </div>
                        <div className=' PayNowNow' onClick={() => compl == false && createOrder()}>
                            {compl ? "Order accepted" : "Pay Now"}
                        </div>
                    </PaymentModalWindow>


                    {/*<PhoneNumberModalWindow active={phoneNumberModalActive} setActive={setPhoneNumberModalActive()}>*/}
                    {/*<div className="paymethodMain">*/}
                    {/*    <span>Payment method</span>*/}
                    {/*</div>*/}
                    {/*<div className="paymethod">*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={paymentcard}/>*/}
                    {/*        <div className="PayDelevery">Payment at delivery</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==1 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 1 ? 1:0) }>{checkboxPay==1 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={paymentcard}/>*/}
                    {/*        <div className="PayDelevery">Online payment</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==2 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 2 ? 2:0) }>{checkboxPay==2 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={cashpayment}/>*/}
                    {/*        <div className="PayDelevery">Cash payment</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==3 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 3 ? 3:0) }>{checkboxPay==3 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className=' PayNowNow' onClick={() => compl == false && createOrder()}>*/}
                    {/*    {compl ? "Order accepted" : "Pay Now"}*/}
                    {/*</div>*/}
                    {/*</PhoneNumberModalWindow>*/}



                    {/*<PhoneNumberModalWindow active={phoneNumberModalActive} setActive={setPhoneNumberModalActive}></PhoneNumberModalWindow>*/}

                    {/*<div className='payNowButtonBackgroundText' onClick={()=>setPhoneNumberModalActive(true)}>*/}
                    {/*    Confirm*/}
                    {/*</div>*/}


                    <div className='payNowButtonBackgroundText' onClick={()=>setModalActive(true)}>
                        Confirm
                    </div>





                    {/*<PhoneNumberModalWindow active={phoneNumberModalActive} setActive={setPhoneNumberModalActive()}>*/}
                    {/*<div className="paymethodMain">*/}
                    {/*    <span>Payment method</span>*/}
                    {/*</div>*/}
                    {/*<div className="paymethod">*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={paymentcard}/>*/}
                    {/*        <div className="PayDelevery">Payment at delivery</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==1 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 1 ? 1:0) }>{checkboxPay==1 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={paymentcard}/>*/}
                    {/*        <div className="PayDelevery">Online payment</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==2 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 2 ? 2:0) }>{checkboxPay==2 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="PaymentMethodRow">*/}
                    {/*        <assets className="CardIco" src={cashpayment}/>*/}
                    {/*        <div className="PayDelevery">Cash payment</div>*/}
                    {/*        <div className="CheckboxPayment" style={{background:checkboxPay==3 && "#5FC56E"}} onClick={() => setCheckbox(prev => prev != 3 ? 3:0) }>{checkboxPay==3 && "✔"}</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className=' PayNowNow' onClick={() => compl == false && createOrder()}>*/}
                    {/*    {compl ? "Order accepted" : "Pay Now"}*/}
                    {/*</div>*/}
                    {/*</PhoneNumberModalWindow>*/}



                    {/*<PhoneNumberModalWindow active={phoneNumberModalActive} setActive={setPhoneNumberModalActive}></PhoneNumberModalWindow>*/}

                    {/*<div className='payNowButtonBackgroundText' onClick={()=>setPhoneNumberModalActive(true)}>*/}
                    {/*    Confirm*/}
                    {/*</div>*/}


                    <div className='payNowButtonBackgroundPrice'>
                        {((allItems.map(elem => {if(elem.quantity > 0){
                            return elem.quantity * elem.marketPriceCP
                        }else{return 0}})).reduce((acc, num) => acc + num, 0)).toFixed(2) || 0}€
                    </div>
                </div>

        </div>
    );
};

export default PaymentDefMarket;