import React, {useState} from 'react';
import '../../../Mobile/Components/ModalWindow/ModalWindow.scss'
import '../../../Mobile/Components/RegAndLogin/Reg.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import SignIn from "./SignIn.js";
import Registration from "./Registration";
import CreateAcc from "./CreateAcc";

const RegModal = ({setRegModalOpen, setProfileOpen}) => {
    const [signInOpen, setSignInOpen] = useState(true);
    const [regOpen, setRegInOpen] = useState(false);
    const [createOpen, setCreateInOpen] = useState(false);
    return (
        <div className='modal' onClick={() => setRegModalOpen(false)}>
            <div className='regElemBackground' onClick={(e) => e.stopPropagation()}>
                {signInOpen && <div className='blockTitle'>Sign in</div>}
                {regOpen && <div className='blockTitle'>Registration</div>}
                {createOpen && <div className='blockTitle'>Create an account</div>}
                <CgClose className="closeButtonReg" onClick={() => {setRegModalOpen(false); setSignInOpen(false); setRegInOpen(false); setCreateInOpen(false)}}/>
                {signInOpen && <SignIn setRegModalOpen={setRegModalOpen} setProfileOpen={setProfileOpen} setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}
                {regOpen && <Registration setRegModalOpen={setRegModalOpen} setProfileOpen={setProfileOpen} setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}
                {createOpen && <CreateAcc setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}
            </div>

        </div>
    );
};

export default RegModal;