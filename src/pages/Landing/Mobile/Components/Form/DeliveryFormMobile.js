import React, {useState} from 'react';
import './DeliveryForm.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import Calend from "../../../Desktop/Components/Calendar/Calend";
import delHomeImg from "../../../../../assets/delHomeImg.svg"
import axios from "axios";
const tg = window.Telegram.WebApp


const DeliveryFormMobile = ({setSeeDeliveryForm}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    console.log(allItemsCart)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)

    const [compl, setCompl] = useState(false);

    const createOrder = async () => {
        setCompl(true)
        let buffArr = allItemsCart.map(elem => {return {...elem, quantityOrder: elem.quantity}})

        setTimeout(() => setSeeDeliveryForm(false), 3000)
        let informData =  {
            items: buffArr,
            tg: tg.initDataUnsafe,
            date: Date.now(),
            type: tg.initDataUnsafe.user ? 'telegram' : 'browser',
            status: {},
            order: chooseOption == 0 ? 'CP' : chooseOption == 1 ? 'P' : 'DP',
            paidValue: 0

        };

            // formData.append('customFile', file);
            // formData.append('informData', JSON.stringify(informData))
            await axios.post('https://tpomobi.shop/createOrderAdmin', {data: informData}).then(function (response) {

            })
                .catch(function (error) {
                    console.log(error);
                });
    }

    return (
        <div className='modal' onClick={() => setSeeDeliveryForm(false)}>
            <div className='deliveryFormModal-mobile' onClick={(e) => e.stopPropagation()}>
                <div className='seeDeliveryText-mobile'>Choose Date<CgClose className="closeButton" onClick={() => setSeeDeliveryForm(false)}/></div>
                <div className='deliveryFormText'><img src={delHomeImg} alt=""/>Add address</div>
                <div className="deliveryForm-mobile">
                    <div>
                        <input type="text" placeholder="address" className="deliveryFormInput-mobile"/>
                    </div>
                    <div className="deliveryFormInputs-mobile">
                        <div className="deliveryFormInputs1">
                        </div>
                        <div className="calendDelForm">
                            <Calend/>
                        </div>

                        {
                            compl ?

                                <div className='payButton-mobile' onClick={() => setSeeDeliveryForm(false)}>
                                    <div>
                                        Order accepted
                                    </div>
                                </div>
                                :

                                <div className='payButton-mobile' onClick={() => createOrder()}>
                                    <div>
                                        Pay
                                    </div>
                                </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeliveryFormMobile;