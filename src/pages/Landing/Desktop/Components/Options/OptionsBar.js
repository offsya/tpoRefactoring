import React, {useState} from 'react';
import '../../../Mobile/Components/OptionBar/OptionsBar.scss'
import Option from "./Option";
import ProfitModal from "../Modals/ProfitModal";
import {useSelector} from "react-redux";
import DeliveryForm from "../DeliveryForm/DeliveryForm";
import CalendDefMarket from "../Calendar/CalendDefMarket";
import PaymentDefMarket from "./PaymentDefMarket";
import PhoneNumberModalWindowMobile from "../../../Mobile/Components/Cart/PhoneNumber/PhoneNumberModalWindowMobile";
const tg = window.Telegram.WebApp
const OptionsBar = () => {
    const [seeModal, setSeeModal] = useState(false);
    const [seeDeliveryForm, setSeeDeliveryForm] = useState(false);
    const [currentOption, setCurrentOption] = useState(0);
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const userAcc = useSelector((state) => state.userAcc.userAcc)

    const [orderAddress, setOrderAddress] = useState('')
    const [orderDesc, setOrderDesc] = useState('')
    return (
        <div className='seeOptionsBar'>
            {
                chooseMarket == 2 &&
                <div className="optionsTitle">
                    Options
                </div>
            }
            {
                chooseMarket == 2 ?
                    <div className="optionsBackground">
                        <Option setCurrentOption={setCurrentOption} name={"Pick-up from Mercabarna"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                        <Option setCurrentOption={setCurrentOption} name={"Standart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                        <Option setCurrentOption={setCurrentOption} name={"Smart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                    </div>
                    :
                    <div className="optionsBackground">
                        <CalendDefMarket setOrderAddress={setOrderAddress} setOrderDesc={setOrderDesc}/>
                        <PaymentDefMarket orderAddres={orderAddress} orderDesc={orderDesc}/>
                    </div>
            }
            {seeModal && <ProfitModal currentOption={currentOption} setSeeModal={setSeeModal}/>}
            {seeDeliveryForm && <DeliveryForm currentOption={currentOption} setSeeDeliveryForm={setSeeDeliveryForm}/>}
        </div>
    );
};

export default OptionsBar;