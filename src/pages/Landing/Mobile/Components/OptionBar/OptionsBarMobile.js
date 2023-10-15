import React, {useState} from 'react';
import './OptionsBar.scss'
import ProfitModal from "../../../Desktop/Components/Modals/ProfitModal";
import OptionMobile from "./OptionMobile";
import DeliveryFormMobile from "../Form/DeliveryFormMobile";
import ProfitModalMobile from "../ModalWindow/ProfitModalMobile";
import {useSelector} from "react-redux";
import CalendDefMarket from "../../../Desktop/Components/Calendar/CalendDefMarket";
import PaymentDefMarket from "../../../Desktop/Components/Options/PaymentDefMarket";
import CalendDefMarketMobile from "../Form/CalendDefMarketMobile";
import PaymentDefMarketMobile from "../Form/PaymentDefMarketMobile";

const OptionsBarMobile = ({setIsOpenCart, isOpenCart, setIsMobile, setRegModalOpen, setProfileOpen}) => {
    const [seeModal, setSeeModal] = useState(false);
    const [seeDeliveryForm, setSeeDeliveryForm] = useState(false);
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const [continuePayment, setContinuePayment] = useState(true)
    const [orderAddress, setOrderAddress] = useState('')
    const [orderDesc, setOrderDesc] = useState('')
    return (
        <div className='seeOptionsBar-mobile'>
            {
                chooseMarket == 2 ?
                    <div className="optionsBackground-mobile">
                        <OptionMobile name={"Pick-up from Mercabarna"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                        <OptionMobile name={"Standart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                        <OptionMobile name={"Smart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                    </div>
                    :
                    <div className="optionsBackground-mobile">
                        {continuePayment ?
                        <CalendDefMarketMobile setContinuePayment={setContinuePayment} setOrderAddress={setOrderAddress} setOrderDesc={setOrderDesc}/>
                            :
                        <PaymentDefMarketMobile setRegModalOpen={setRegModalOpen} setIsMobile={setIsMobile}  isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} setProfileOpen={setProfileOpen} orderAddres={orderAddress} orderDesc={orderDesc}/>
                        }
                    </div>
            }
            {seeModal && <ProfitModalMobile setSeeModal={setSeeModal}/>}
            {seeDeliveryForm && <DeliveryFormMobile setSeeDeliveryForm={setSeeDeliveryForm}/>}
        </div>
    );
};

export default OptionsBarMobile;