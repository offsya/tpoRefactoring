import React, {useState} from 'react';
import './Reg.scss'
import SignIn from "../../../Desktop/Components/Auth/SignIn";
import SearchBarMobile from "../SeacrhBar/SearchBarMobile";
import OptionsSearchBar from "../../../Desktop/Components/Search/OptionsSearchBar";
import {setSeeOptions} from "../../../features/seeOptions";
import {BsArrowLeft, BsFillHandbagFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import SignInMobile from "./SignInMobile";
import RegistrationMobile from "./RegistrationMobile";
import CreateAccMobile from "./CreateAccMobile";

const RegMobile = ({ setIsMobile, isOpenCart, setIsOpenCart, setRegModalOpen, setProfileOpen}) => {
    const [signInOpen, setSignInOpen] = useState(true);
    const [regOpen, setRegInOpen] = useState(false);
    const [createOpen, setCreateInOpen] = useState(false);
    const dispatch = useDispatch()
    return (
        <div className='reg-mobile'>
            <div className='regContent-mobile'>
                <div className="iconsAndSearch-mobile">

                    <div className="optionsBack-mobile" onClick={() => {setRegModalOpen(false); setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false)); setSignInOpen(false); setRegInOpen(false); setCreateInOpen(false)}}><BsArrowLeft className="optionsBackArrow-mobile"/>Back</div>
                    <div className="logoAndText-mobile logoAndTextCartIsOpen-mobile" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}>
                        <div className="logo-mobile"></div>
                        <div className="logoText-mobile">Tu Producto Online</div>
                    </div>
                </div>
                {signInOpen && <SignInMobile setRegModalOpen={setRegModalOpen} setProfileOpen={setProfileOpen} setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}
                {regOpen && <RegistrationMobile setRegModalOpen={setRegModalOpen} setProfileOpen={setProfileOpen} setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}
                {/*{createOpen && <CreateAccMobile setCreateInOpen={setCreateInOpen} setRegInOpen={setRegInOpen} setSignInOpen={setSignInOpen}/>}*/}
            </div>
        </div>
    );
};

export default RegMobile;