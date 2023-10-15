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

const Registration = ({setCreateInOpen, setRegInOpen, setSignInOpen, setRegModalOpen, setProfileOpen}) => {
    const [check, setCheck] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [numberPhone, setNumberPhone] = useState('')
    const [selectNumberPhoneCode, setSelectNumberPhoneCode] = useState({flag: spainflag, value: '34', label: 'spain'})

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const dispatch = useDispatch();
    const userAcc = useSelector((state) => state.userAcc.userAcc)


    const createAcc = async () => {
        if(password == repeatPassword && repeatPassword != '' && password != ''){
            let informData =  {
                img: '',
                name: '',
                tradeName: '',
                tags: [],
                phone: selectNumberPhoneCode.value + numberPhone,
                phoneNumberPhoneCountry: selectNumberPhoneCode.label,
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

            console.log(informData)
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
        <div className="mainRegBlock">
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className="welcomText">Welcome to Tu Producto Online</div>
            <div className="iconsReg">
                <a href='https://t.me/Botonbcn' target='_blank' className="icons"><img src={telegramIcon} alt=""/></a>
                <a href='https://wa.me/+34642868541' target='_blank' className="icons"><img src={whatsappIcon} alt=""/></a>
                <a className="icons"><img src={gmailIcon} alt=""/></a>
            </div>
            <div className='continueText'>
                or continue through
            </div>
            <div className="inputBlockSignInPC">
                <div className="inputTextSignInPC">
                    Phone number
                </div>
                <div className="PhoneNumberSignInPC">
                    <Select
                        size="middle"
                        onChange={(value, option) => setSelectNumberPhoneCode(option)}
                        defaultValue={'34'}
                        style={{
                            marginTop : 5,
                            width : 150,
                            padding:0,
                        }}>
                        {
                            [{flag: spainflag, value: '34', label: 'spain'}, {flag: spainflag, value: '375', label: 'bel'}].map((el) =>
                                {
                                    return(
                                        <Select.Option label={el.label} value={el.value}>
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
                           }}
                           onChange={(e) => {
                               console.log(selectNumberPhoneCode)
                               setNumberPhone(e.target.value)
                           }}
                           value={numberPhone}
                    />
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
            <div className='blockEmail'>
                <div>Repeat Password</div>
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
                                    setRepeatPassword(e.target.value)
                                }}
                                value={repeatPassword}

                />
            </div>
            <div className='alredyHaveAcc'>
                <div className='alredyText'>Already have an account?</div>
                <div className='signInText' onClick={() => {setSignInOpen(true); setRegInOpen(false); setCreateInOpen(false)}}>Sign In</div>
            </div>
            <div className="buttonSignIn" style={{marginBottom: '25px'}} onClick={() => {createAcc();}}>
                Continue
            </div>

        </div>
    );
};

export default Registration;