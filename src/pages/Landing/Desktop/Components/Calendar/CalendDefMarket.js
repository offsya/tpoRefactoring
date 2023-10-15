import React from 'react';
import '../../../Mobile/Components/Form/DeliveryForm.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import Calend from "./Calend";
import delHomeImg from "../../../../../assets/delHomeImg.svg"
import CalendModal from "./CalendModal";
import CalendDef from "./CalendDef";

const CalendDefMarket = ({setSeeDeliveryForm, setOrderDesc, setOrderAddress}) => {
    return (
        <div className='CalendDefMarket'>
            <div className='CalendDefMarketBackground' onClick={(e) => e.stopPropagation()}>
                <div className='CalendDefMarketText'>Standart delivery</div>
                <div className='deliveryFormText'><img src={delHomeImg} alt=""/>Add address</div>
                <div className="deliveryForm-mobile">
                    <div>
                        <input type="text" placeholder="address"  onChange={(e) => setOrderAddress(e.target.value)} className="deliveryFormInput-mobile"/>
                    </div>
                    <div>
                        <input type="text" placeholder="comment" onChange={(e) => setOrderDesc(e.target.value)} className="deliveryFormInput-mobile comment"/>
                    </div>
                    <div className="deliveryFormInputs-mobile">

                        <div className="calendDelForm">
                            <CalendDef setOrderDesc={setOrderDesc} setOrderAddress={setOrderAddress}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CalendDefMarket;