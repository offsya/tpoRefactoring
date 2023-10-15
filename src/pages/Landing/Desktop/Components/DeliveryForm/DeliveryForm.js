import React, {useState} from 'react';
import '../../../Mobile/Components/Form/DeliveryForm.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import Calend from "../Calendar/Calend";
import delHomeImg from "../../../../../assets/delHomeImg.svg"
import axios from "axios";
const tg = window.Telegram.WebApp

const DeliveryForm = ({setSeeDeliveryForm}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    console.log(allItemsCart)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    console.log(chooseOption)
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
            <div className='deliveryFormModal' onClick={(e) => e.stopPropagation()}>
                <div className='seeDeliveryText'>Standart delivery<CgClose className="closeButton" onClick={() => setSeeDeliveryForm(false)}/></div>
                <div className='deliveryFormText'><img src={delHomeImg} alt=""/>Add address</div>
                <div className="deliveryForm">
                    <div>
                        <input type="text" placeholder="street" className="deliveryFormInput"/>
                        <div className="calendDelForm">
                            <Calend/>
                        </div>
                    </div>
                    <div className="deliveryFormInputs">
                        <div className="deliveryFormInputs1">
                            <input type="text" placeholder='home' className="deliveryFormInput"/>
                            <input type="text" placeholder="floor" className="deliveryFormInput"/>
                            <input type="text" placeholder="entrance" className="deliveryFormInput"/>
                            <input type="text" placeholder="apartmens" className="deliveryFormInput"/>
                        </div>
                        {
                            compl ?

                                <div className='payButton' onClick={() => setSeeDeliveryForm(false)}>
                                    <div style={{fontSize: '20px'}}>
                                        Order accepted
                                    </div>
                                </div>
                                :

                                <div className='payButton' onClick={() => createOrder()}>
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

export default DeliveryForm;