import React, {useState} from 'react';
import '../../../Mobile/Components/RegAndLogin/Reg.scss'
import { BsCheck } from 'react-icons/bs';
import telegramIcon from '../../../../../assets/telegramIcon.svg'
import whatsappIcon from '../../../../../assets/whatsappIcon.svg'
import gmailIcon from '../../../../../assets/gmailicon.svg'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUserAcc} from "../../../features/userAcc";
import {Input, notification, Select, Space} from "antd";
import spainflag from "../../../components/Profile/spainflag.svg";
const { Option } = Select;



const SignIn = ({setCreateInOpen, setRegInOpen, setSignInOpen, setProfileOpen, setRegModalOpen}) => {
    const [check, setCheck] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [numberPhone, setNumberPhone] = useState('')
    const [selectValue, setSelectValue] = useState("34")
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const handleChange = (value) => {
        setSelectValue(value)
    };

    const acceptLogin = async () => {
        let informData =  {
            phone: selectValue+ numberPhone,
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
        <div className="mainRegBlock">
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            {/*<div className='blockEmail'>*/}
            {/*    <div>Email</div>*/}
            {/*    <Input placeholder="name@company.com"*/}
            {/*           style={{*/}
            {/*               width: '372px',*/}
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

            <div className="inputBlockSignInPC">
                <div className="inputTextSignInPC">
                    Phone number
                </div>
                <div className="PhoneNumberSignInPC">


                    <Select
                        size="middle"
                        onChange={handleChange}
                        defaultValue={'34'}
                        style={{
                            marginTop : 10,
                            width : 150,
                            padding:0,
                        }}>
                        {
                            [{flag: spainflag, value: '34', country: 'spain'}, {flag: spainflag, value: '375', country: 'bel'}].map((el) =>
                                {
                                    return(
                                <Select.Option value={el.value}>
                                    <Space>
                                        <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                            <img src={el.flag} style={{marginRight: '5px'}}/>
                                            +{el.value}
                                        </div>
                                    </Space>
                                </Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                    <Input placeholder="xx-xxx-xxx"
                           style={{
                               width: '100%',
                               height: '43px',
                               border: '1px solid #C1C1C1',
                               borderLeft: "none",
                               borderRadius: "0px 7px 7px 0px",
                               background: '#FFF',
                               marginTop: '10px'
                           }}
                           onChange={(e) => {
                               setNumberPhone(e.target.value)
                           }}
                           value={numberPhone}
                    />
                    {/*<input type="text"/>*/}
                </div>
            </div>
            <div className='blockEmail'>
                <div>Password</div>
                <Input.Password placeholder="*************"
                                style={{
                                    width: '372px',
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
            <div className="blockRemember">
                <div className="rememberText"><span onClick={() => setCheck((prev) => !prev)}><BsCheck style={{opacity: check ? '1': '0'}}/></span>Remember me</div>
                <div className="forgotText">Forgot your password?</div>
            </div>
            <div className="buttonSignIn" onClick={() => {setRegModalOpen(true); acceptLogin();}}>
                Log in
            </div>
            <div className='continueText'>
                or continue through
            </div>
            <div className="iconsReg">
                <a href='https://t.me/Botonbcn' target='_blank' className="icons"><img src={telegramIcon} alt=""/></a>
                <a href='https://wa.me/+34642868541' target='_blank' className="icons"><img src={whatsappIcon} alt=""/></a>
                <a className="icons"><img src={gmailIcon} alt=""/></a>
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

export default SignIn;