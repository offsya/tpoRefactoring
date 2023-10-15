import React from 'react';
import './DeliveryForm.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import Calend from "../../../Desktop/Components/Calendar/Calend";
import delHomeImg from "../../../../../assets/delHomeImg.svg"
import CalendModal from "../../../Desktop/Components/Calendar/CalendModal";
import CalendDef from "../../../Desktop/Components/Calendar/CalendDef";

const CalendDefMarketMobile = ({setContinuePayment, setOrderDesc, setOrderAddress}) => {

    return (
        <div className='CalendDefMarket-mobile'>
            <div className='CalendDefMarketBackground-mobile' onClick={(e) => e.stopPropagation()}>
                <div className='CalendDefMarketText'>Standart delivery</div>
                <div className='deliveryFormText'><img src={delHomeImg} alt=""/>Add address</div>
                <div className="deliveryForm-mobile">
                    <div>
                        <input type="text" placeholder="address" onChange={(e) => setOrderAddress(e.target.value)} className="deliveryFormInput-mobile"/>
                    </div>
                    <div>
                        <input type="text" placeholder="comment" onChange={(e) => setOrderDesc(e.target.value)} className="deliveryFormInput-mobile comment"/>
                    </div>
                    <div className="deliveryFormInputs-mobile">
                        <div className="calendDelForm">
                            <Calend/>
                        </div>
                    </div>

                    <div className='continueButton' onClick={() => setContinuePayment(false)}>
                        Continue
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CalendDefMarketMobile;