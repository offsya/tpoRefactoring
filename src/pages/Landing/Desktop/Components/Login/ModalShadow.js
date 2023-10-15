import React, {useState} from 'react';
import '../../../Mobile/Components/ModalWindow/ModalWindow.scss'
import '../../../Mobile/Components/RegAndLogin/Reg.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import LogInAcc from "./LogInAcc";
import RegAcc from "./RegAcc";
import FinalAcc from "./FinalAcc";


const ModalShadow = ({setRegModalOpen, setProfileOpen}) => {
    const [signInOpen, setSignInOpen] = useState(true);
    const [regOpen, setRegInOpen] = useState(false);
    const [createOpen, setCreateInOpen] = useState(false);
    const [currentWindow, setCurrentWindow] = useState(1)
    return (
        <div className='modal' style={{borderRadius: '0px', background: "rgba(163, 163, 163, 0.70)"}} onClick={() => setRegModalOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                {currentWindow == 1 && <LogInAcc setRegModalOpen={setRegModalOpen} setCurrentWindow={setCurrentWindow}/>}
                {currentWindow == 2 && <RegAcc setRegModalOpen={setRegModalOpen} setCurrentWindow={setCurrentWindow}/>}
                {currentWindow == 3 && <FinalAcc setRegModalOpen={setRegModalOpen} setCurrentWindow={setCurrentWindow}/>}


            </div>
        </div>
    );
};

export default ModalShadow;