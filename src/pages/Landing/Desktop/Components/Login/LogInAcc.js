import React, {useState} from 'react';
import './LogInAcc.scss'
import {delAllSelectedItems} from "../../../../Admin/features/allSelectedItems";
import {setValue} from "../../../../Admin/features/setAddProdAdmin";
import {Input, notification, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    setUserAcc
} from "../../../features/userAcc";
import gmailIcon from '../../../../../assets/gmailicon.svg'
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from "axios";

const LogInAcc = ({setRegModalOpen, setCurrentWindow}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userAcc = useSelector((state) => state.userAcc.userAcc)


    const acceptLogin = async () => {
        let informData =  {
            email: email,
            password: password,
        };
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
                dispatch(setUserAcc(response.data))
                await axios.post('https://tpomobi.shop/updateLastVisitContactAdmin', {data: {...response.data, lastVisit: Date.now()}}).then(function (response) {
                    console.log(response.data)
                })

                setRegModalOpen(false)
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

        <div className='LogInAcc'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='LogInAcc_NavBar'>
                <div className='LogInAcc_Logo' onClick={() => setRegModalOpen(false)} style={{zIndex: '99', top: '0px', marginTop: '0px'}}>
                    <div className='leftSLogo'><div className='logoText'>Tu Producto Online</div></div>
                </div>
            </div>
            <div className='LogInAcc_Main'>
                <span className='arrowBack' onClick={() => setRegModalOpen(false)}><BsArrowLeftShort/></span>
                <div className='LogInAcc_Main_UpperBlock' style={{marginBottom: '20px'}}>
                    <div className='LogInAcc_Text'>
                        Log in to your account
                    </div>
                    <div className='InputBox'>
                        <div className='InputTitleText'>Email</div>
                        <Input placeholder="Tpoadmin2023@gmail.com" 
                            style={{
                                width: '360px',
                                height: '40px',
                                borderRadius: '7px',
                                border: '1px solid #C1C1C1',
                                background: '#FFF'
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                    </div>
                    <div className='InputBox'>
                        <div className='InputTitleText'>Password</div>
                        <Input.Password placeholder="*************"
                            style={{
                                width: '360px',
                                height: '40px',
                                borderRadius: '7px',
                                border: '1px solid #C1C1C1',
                                background: '#FFF'
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
                    <div className="RememberMeBlock" onClick={() => setCheckBoxVisible(prev => !prev)}>
                    <span className='RememberMeBlock_Check'>
                        {checkBoxVisible && '✔'}
                    </span>
                        <div className='RememberMeBlock_Text'>
                            Remember me
                        </div>
                    </div>
                    <div className='ContinueButton' onClick={() => {acceptLogin()}}>
                        Continue
                    </div>
                </div>
                <div className='LogInAcc_Main_MiddleBlock'>
                    <span className='LineSpan'></span>
                    <div className='LineText'>Or continue through</div>
                    <span className='LineSpan'></span>

                </div>
                <div className='LogInAcc_Main_BottomBlock'>
                    <div className='ButtonGoogle'>
                        <img className='ButtonGoogleIcon' src={gmailIcon}/>
                        <span className='ButtonGoogleText'>Google</span>
                    </div>
                </div>
                <div className='RecoverPassBlock'>
                    <div className='RecoverPassBlockText'>
                        Forgot your password?
                    </div>
                    <div className='RecoverPassBlockLink'>
                        Recover password
                    </div>
                </div>
                <div className="RecoverPassBlock">
                    <div className='RecoverPassBlockText'>Don't you have an account yet?</div>
                    <div className='RecoverPassBlockLink' onClick={() => setCurrentWindow(2)}>Register</div>
                </div>
            </div>
        </div>
    );
};

export default LogInAcc;