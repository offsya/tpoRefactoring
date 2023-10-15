import React, {useState} from 'react';
import './Reg.scss'
import {CgClose} from "react-icons/cg";
import {BsCheck} from "react-icons/bs";
import gmailIcon from '../../../../../assets/gmailicon.svg'
import cicon from '../../../../../assets/C.svg'
import webicon from '../../../../../assets/WebIcon.svg'
import oapple from '../../../../../assets/OApple.svg'
import insticon from '../../../../../assets/insticon.svg'
import tgicon from '../../../../../assets/telegramIcon.svg'
import choco from '../../../../../assets/chocoicon.svg'
import whatsappicon from '../../../../../assets/whatsappIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUserAcc} from "../../../features/userAcc";
import {Input, notification, Select, Space} from "antd";
import spainflag from "../../../components/Profile/spainflag.svg";


const { Option } = Select;


const SignInMobile = ({ setCreateInOpen, setRegInOpen, setSignInOpen, setRegModalOpen, setProfileOpen}) => {
    const [check, setCheck] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [selectValue, setSelectValue] = useState("34")
    const [numberPhone, setNumberPhone] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const handleChange = (value) => {
        setSelectValue(value)
    };

    const acceptLogin = async () => {
        let informData =  {
            phone: selectValue + numberPhone,
            password: password,
        };
        console.log(informData["phone"])
        await axios.post('https://tpomobi.shop/acceptLoginAcc', {data: informData}).then(async function (response) {
            console.log(typeof(response.data))

            if(typeof(response.data) == 'string'){
                api.warning({
                    message: `Not Found.`,
                    placement: 'top',
                });
            }else{
                api.success({
                    message: `Welcome.`,
                    placement: 'top',
                });
                localStorage.setItem('userAccPassword', response.data.password)
                localStorage.setItem('userAccNumberPhone', response.data.phone)
                localStorage.setItem('userAccRemember', check)
                dispatch(setUserAcc(response.data))
                await axios.post('https://tpomobi.shop/updateLastVisitContactAdmin', {data: {...response.data, lastVisit: Date.now()}}).then(function (response) {
                    console.log(response.data)
                })

                setRegModalOpen(false)
                setProfileOpen(true)
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
            message: `Not Found.`,
            placement,
        });
    };

    return (
        <div className='signIn-mobile'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='titleBlock'>
                <div className='titleText'>Log In</div>
                {/*<CgClose className='closeButton'/>*/}
            </div>
            {/*<div className="inputBlock">*/}
            {/*    <div className="inputText">*/}
            {/*        Email*/}
            {/*    </div>*/}
            {/*    <Input placeholder="name@company.com"*/}
            {/*           style={{*/}
            {/*               width: '283.4px',*/}
            {/*               height: '43px',*/}
            {/*               borderRadius: '7px',*/}
            {/*               border: '1px solid #C1C1C1',*/}
            {/*               background: '#FFF',*/}
            {/*               marginTop: '10px'*/}
            {/*           }}*/}
            {/*           onChange={(e) => {*/}
            {/*               setEmail(e.target.value)*/}
            {/*           }}*/}
            {/*           value={email}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="inputBlockSignInMobile">
                <div className="inputTextSignInMobile">
                    Phone number
                </div>
                <div className="PhoneNumberSignIn-mobile">
                    <Select
                        size="middle"
                        onChange={handleChange}
                        defaultValue={"spain"}
                        style={{
                            marginTop : 10,
                            width : 150,
                            padding:0,
                        }}>
                        <Option value="spain" label="spain" size={'middle'}>
                                <img src={spainflag} />
                                +34
                        </Option>
                        <Option value="bel" label="bel" size={'middle'}>
                            <img src={spainflag} />
                            +375
                        </Option>
                    </Select>
                    <Input
                        style={{
                            width: '100%',
                            height: '43px',
                            borderRadius: '7px',
                            border: '1px solid #C1C1C1',
                            background: '#FFF',
                            marginTop: '10px',
                            borderBottomLeftRadius:'0px',
                            borderTopLeftRadius:'0px',
                            borderLeft:"none"
                        }}
                        placeholder="12 345 678"
                        onChange={(e) => {
                            setNumberPhone(e.target.value)
                        }}
                        value={numberPhone}
                    />

                </div>
            </div>

            <div className="inputBlock">

                <div className="inputText">
                    Password
                </div>
                <Input.Password placeholder="*************"
                                style={{
                                    width: '100%',
                                    height: '43px',
                                    borderRadius: '7px',
                                    border: '1px solid #C1C1C1',
                                    background: '#FFF',
                                    marginTop: '10px'

                                }}
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}

                />
            </div>
            <div className="blockRememberMobile">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Remember me</div>
                <div className="forgotText">Forgot your<br/> password?</div>
            </div>
            <div className="buttonSignIn" onClick={() => {setRegModalOpen(true); acceptLogin();}}>
                Log in
            </div>
            <div className='continueText'>
                or continue through
            </div>
            <div className="iconsReg">
                <a href='' target='_blank'><img src={gmailIcon} alt=""/></a>
                <a href='https://wa.me/+34642868541' target='_blank'><img src={whatsappicon} alt=""/></a>
                <a href='' target='_blank'> <img src={cicon} alt=""/></a>
                <a href='' target='_blank'> <img src={webicon} alt=""/></a>
                <a href='' target='_blank'> <img src={oapple} alt=""/></a>
                <a href='' target='_blank'> <img src={insticon} alt=""/></a>
                <a href='https://t.me/Botonbcn' target='_blank'><img src={tgicon} alt=""/></a>
                <a href='' target='_blank'> <img src={choco} alt=""/></a>
            </div>
            <div className='bottomButton'>
                <div className='regButton' onClick={() => {setSignInOpen(false); setRegInOpen(true); setCreateInOpen(false)}}>
                    Register
                </div>
                <div className="infoText">
                    After registering on the site, you will be able to track the status of orders, personal account and other features.
                </div>
            </div>
        </div>
    );
};

export default SignInMobile;