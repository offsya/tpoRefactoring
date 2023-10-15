import React, {useState} from 'react';
import '../../../Mobile/Components/RegAndLogin/Reg.scss'
import { BsCheck } from 'react-icons/bs';
import telegramIcon from '../../../../../assets/telegramIcon.svg'
import whatsappIcon from '../../../../../assets/whatsappIcon.svg'
import gmailIcon from '../../../../../assets/gmailicon.svg'

const SignIn = () => {
    const [check, setCheck] = useState(false);
    return (
        <div className="mainRegBlock">
           <div className='blockEmail'>
               <div>Name</div>
               <input type="text" placeholder="Filling example: Daniel García"/>
           </div>
            <div className='blockEmail'>
                <div>Password</div>
            <input type="password" placeholder="Use at least 8 characters"/>
            </div>
            <div className='blockEmail'>
                <div>Your company name</div>
                <input type="text" placeholder='Filling example:TPO'/>
            </div>
            <div className="blockRemember">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Remember me</div>
            </div>
            <div className="blockRemember">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Physical person</div>
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Legal person</div>
            </div>
            <div className="buttonSignIn">
                Continue
            </div>
        </div>
    );
};

export default SignIn;