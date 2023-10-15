import React, {useState} from 'react';
import './DeliveryForm.scss'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import PaymentModalWindow from "./PaymentModalWindow";
import paymentcard from "../../../components/Options/image/paymentcard.svg";
import cashpayment from "../../../components/Options/image/cashpayment.svg";
import {setElemQuantityValue} from "../../../features/allItems";
import {setAllArrayItemsCart} from "../../../features/allCartItems";
import {setSeeOptions} from "../../../features/seeOptions";
import {Input, Select, Space} from "antd";
import spainflag from "../../../components/Profile/spainflag.svg";

const tg = window.Telegram.WebApp

const { Option } = Select;

const PaymentDefMarket = ({orderDesc, orderAddres, setIsOpenCart, isOpenCart, setIsMobile, setRegModalOpen, setProfileOpen}) => {
    const allItems = useSelector((state) => state.allItems.allItems)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const [modalActive, setModalActive] = useState(false);
    const [checkboxPay,setCheckbox]=useState(0);
    const dispatch = useDispatch()

    console.log(allItemsCart)
    const userAcc = useSelector((state) => state.userAcc.userAcc)


    const [compl, setCompl] = useState(false);

    const createOrder = async () => {
        setCompl(true)
        let buffArr = [];
        allItems.forEach(elem => {
            if(parseFloat(elem.quantity)){
                buffArr.push({...elem, quantityOrder: elem.quantity})
            }
        })
        console.log(buffArr)
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

            dispatch(setSeeOptions(false));
            setRegModalOpen(true);
            setProfileOpen(true);
            setIsOpenCart(false)

        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className='PaymentDefMarket-mobile'>
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
                {false ?

                    <PaymentModalWindow active={modalActive} setActive={setModalActive}>
                        <div style={{marginTop:"10px",
                            marginLeft:"20px",
                            color: "#393939",
                            fontFamily: "Roboto",
                            fontSize: "24px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "normal",
                            letterSpacing: "2.4px"}}> Link a phone number</div>
                        <div style={{marginTop:15,
                            color: "#9D9D9D",
                            marginLeft:"20px",
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",
                            letterSpacing: "1.4px"}}>Confirm a phone number so that we can contact you</div>
                        <div style={{marginTop:"10px",
                            color: "#9D9D9D",
                            marginLeft:"20px",
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "normal",
                            letterSpacing: "1.4px"}}>Phone number</div>
                        <div style={{marginLeft:"20px", display: 'flex', flexDirection: 'row'}} className="InputAndSelect BadSpainFlag">
                            <Select
                                size="middle"
                                defaultValue={"spain"}
                                style={{
                                    marginTop : 10,
                                    width : 150,
                                    padding:0,
                                }}>
                                <Option value="spain" label="spain" size={'middle'}>
                                    <Space> <img src={spainflag} />
                                        +34
                                    </Space>
                                </Option>
                            </Select>
                            <Input
                                style={{
                                    width: '222px',
                                    height: '40px',
                                    borderRadius: '7px',
                                    border: '1px solid #C1C1C1',
                                    background: '#FFF',
                                    marginTop: '10px',
                                    borderBottomLeftRadius:'0px',
                                    borderTopLeftRadius:'0px',
                                    borderLeft:"none"
                                }}
                                placeholder="12 345 678"



                            >

                            </Input>
                        </div>
                        <div className="ConfimButtonPhoneButtonMobile">Confirm</div>
                    </PaymentModalWindow>
                    :

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
                        <div className=' PayNowNow' onClick={() => compl == false &&  createOrder()}>
                            {compl ? "Order accepted" : "Pay Now"}
                        </div>
                    </PaymentModalWindow>
                }

                <div className="ConfirmAndPriceRow">
                    <div className='payNowButtonBackgroundText' style={{alignItems:"left"}} onClick={()=>setModalActive(true)}>
                        Confirm
                    </div>


                    <div className='payNowButtonBackgroundPrice' style={{alignItems:"right"}}>
                        {((allItems.map(elem => {if(elem.quantity > 0){
                            return elem.quantity * elem.marketPriceCP
                        }else{return 0}})).reduce((acc, num) => acc + num, 0)).toFixed(2) || 0}€
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDefMarket;