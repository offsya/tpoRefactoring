import React, {useState} from 'react';
import "./RegistationMobile.scss"
import {CgClose} from "react-icons/cg";
import {BsCheck} from "react-icons/bs";
import telegramIcon from "../../../../../assets/telegramMobile.svg";
import whatsappIcon from "../../../../../assets/whatsappMobile.svg";
import gmailIcon from "../../../../../assets/gmailMobile.svg";
import whatsappicon from "../../../../../assets/whatsappIcon.svg";
import cicon from "../../../../../assets/C.svg";
import webicon from "../../../../../assets/WebIcon.svg";
import oapple from "../../../../../assets/OApple.svg";
import insticon from "../../../../../assets/insticon.svg";
import tgicon from "../../../../../assets/telegramIcon.svg";
import choco from "../../../../../assets/chocoicon.svg";
import {Input, notification, Select, Space} from "antd";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setUserAcc} from "../../../features/userAcc";
import spainflag from "../../../components/Profile/spainflag.svg";

const { Option } = Select;



const SignInMobile = ({ setSignInOpen, setRegInOpen, setCreateInOpen, setProfileOpen, setRegModalOpen}) => {
    const [check, setCheck] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [numberPhone, setNumberPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const dispatch = useDispatch();

    const [selectNumberPhoneCode, setSelectNumberPhoneCode] = useState('34')
    const handleChange = (value) => {
        setSelectNumberPhoneCode(value)
    };

    const createAcc = async () => {
        if(password == repeatPassword && repeatPassword != '' && password != ''){
            let informData =  {
                img: '',
                name: '',
                tradeName: '',
                tags: [],
                phone: selectNumberPhoneCode + numberPhone,
                password: password,
                email: '',
                type: 'user',
                iban: [],
                code: '',
                enabled: true,
                swift: [],
                nif: [],
                cif: [],
                solvencia: false,
                dificilidad: false,
                extraPedidos: false,
                billAddress: {address: '', city: '', postalCode: ''},
                rate: 0,
                lastVisit: Date.now(),
                platform: 'browser'
            };

            console.log(informData["phone"])
            // formData.append('customFile', file);
            // formData.append('informData', JSON.stringify(informData))
            axios.post('https://tpomobi.shop/createContactAdmin', {data: informData}).then(async function(response) {
                dispatch(setUserAcc({...informData, _id: response.data.insertedId}))
                console.log(response.data)
                setSignInOpen(false); setRegInOpen(false); setCreateInOpen(false); setRegModalOpen(false); setProfileOpen(true)

            })

                .catch(function (error) {
                    console.log(error);
                });
        }else{
            api.warning({
                message: `Passwords not the same.`,
                placement: 'top',
            });
        }


    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
            message: `Not Found.`,
            placement,
        });
    };

    return (
        <div className='signIn-mobileRM'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='titleBlockRM'>
                <div className='titleText'>Registration</div>
                {/*<CgClose className='closeButton'/>*/}
            </div>
            <div className="welcomTextRM">Welcome to Tu Producto Online</div>
            <div className="iconsRegRM">
                <a href='' target='_blank'><img src={gmailIcon} alt=""/></a>
                <a href='https://wa.me/+34642868541' target='_blank'><img src={whatsappicon} alt=""/></a>
                <a href='' target='_blank'> <img src={cicon} alt=""/></a>
                <a href='' target='_blank'> <img src={webicon} alt=""/></a>
                <a href='' target='_blank'> <img src={oapple} alt=""/></a>
                <a href='' target='_blank'> <img src={insticon} alt=""/></a>
                <a href='https://t.me/Botonbcn' target='_blank'><img src={tgicon} alt=""/></a>
                <a href='' target='_blank'> <img src={choco} alt=""/></a>

            </div>
            <div className='continueTextRM'>
                or continue through
            </div>
            <div className="inputBlockRM">
                <div className="inputTextSignInMobileRM">
                    Phone number
                </div>
                <div className="PhoneNumberSignIn-mobileRM">
                    <Select
                        size="middle"
                        onChange={handleChange}
                        defaultValue={"34"}
                        style={{
                            marginTop : 10,
                            width : 150,
                            padding:0,
                        }}>
                        <Option value="34" label="Spain">
                            <Space>
                                <img src={spainflag} />
                                +34
                            </Space>
                        </Option>
                        <Option value="375" label="bel">
                            <Space>
                                <img src={spainflag} />
                                +375
                            </Space>
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
                <div className="inputBlockRM">
                    <div className="inputTextRM">
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

                <div className="inputBlockRM">
                    <div className="inputTextRM">
                        Repeat password
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
                                        setRepeatPassword(e.target.value)
                                    }}
                                    value={repeatPassword}

                    />                </div>
            </div>
            <div className="blockRememberMobileRM">
                <div className="rememberTextRM">Already have an account?</div>
                <div className="forgotTextRM" onClick={() => {setSignInOpen(true); setRegInOpen(false); setCreateInOpen(false)}}>Sign in</div>
            </div>
            <div className="buttonSignInRM"  onClick={() => {createAcc(); setRegModalOpen(false); setSignInOpen(false); setRegInOpen(false); setCreateInOpen(false)}}>
                Continue
            </div>
        </div>
    );
};

export default SignInMobile;