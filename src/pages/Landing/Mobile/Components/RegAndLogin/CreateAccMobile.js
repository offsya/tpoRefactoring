import React, {useState} from 'react';
import './Reg.scss'
import {CgClose} from "react-icons/cg";
import {BsCheck} from "react-icons/bs";
import telegramIcon from "../../../../../assets/telegramMobile.svg";
import whatsappIcon from "../../../../../assets/whatsappMobile.svg";
import gmailIcon from "../../../../../assets/gmailMobile.svg";


const SignInMobile = () => {
    const [check, setCheck] = useState(false);
    return (
        <div className='signIn-mobile'>
            <div className='titleBlock'>
                <div className='titleText'>Create an account</div>
                {/*<CgClose className='closeButton'/>*/}
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Name
                </div>
                <input type="text" placeholder="Filling example: Daniel García"/>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Password
                </div>
                <input type="password" placeholder="Use at least 8 characters"/>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Your company name
                </div>
                <input type="text" placeholder="Filling example:TPO"/>
            </div>
            <div className="blockRememberMobile createAccBlockMobile">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Remember me</div>
            </div>
            <div className="blockRememberMobile createAccBlockMobile">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Physical person</div>
            </div>
            <div className="blockRememberMobile createAccBlockMobile">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Legal person</div>
            </div>

            <div className="buttonSignIn">
                Continue
            </div>

        </div>
    );
};

export default SignInMobile;