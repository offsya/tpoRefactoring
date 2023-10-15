import React, {useState} from 'react';
import '../../../Mobile/Components/OptionBar/OptionsBar.scss'
import Option from "./Option";
import ProfitModal from "../Modals/ProfitModal";
import {useSelector} from "react-redux";
import DeliveryForm from "../DeliveryForm/DeliveryForm";

const OptionsBar = () => {
    const [seeModal, setSeeModal] = useState(false);
    const [seeDeliveryForm, setSeeDeliveryForm] = useState(false);
    const [currentOption, setCurrentOption] = useState(0);
    return (
        <div className='seeOptionsBar'>
            <div className="optionsTitle">
                Options
            </div>
            <div className="optionsBackground">
                <Option setCurrentOption={setCurrentOption} name={"Pick-up from Mercabarna"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                <Option setCurrentOption={setCurrentOption} name={"Standart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
                <Option setCurrentOption={setCurrentOption} name={"Smart delivery"} setSeeModal={setSeeModal} setSeeDeliveryForm={setSeeDeliveryForm}/>
            </div>
            {seeModal && <ProfitModal currentOption={currentOption} setSeeModal={setSeeModal}/>}
            {seeDeliveryForm && <DeliveryForm currentOption={currentOption} setSeeDeliveryForm={setSeeDeliveryForm}/>}
        </div>
    );
};

export default OptionsBar;