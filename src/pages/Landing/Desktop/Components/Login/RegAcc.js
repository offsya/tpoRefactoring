import React, {useState} from 'react';
import './LogInAcc.scss'
import {delAllSelectedItems} from "../../../../Admin/features/allSelectedItems";
import {setValue} from "../../../../Admin/features/setAddProdAdmin";
import {
    setUserAcc
} from "../../../features/userAcc";
import {Input, notification, Space} from 'antd';
import gmailIcon from '../../../../../assets/gmailicon.svg'
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from "axios";
import {useDispatch} from "react-redux";
import {createContact} from "../../../../Admin/features/allContacts";

const LogInAcc = ({setRegModalOpen, setCurrentWindow}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const dispatch = useDispatch();

    const createAcc = async () => {
        let informData =  {
            email: email,
            password: password,
        };
        if(password == repeatPassword && repeatPassword != '' && password != ''){

            await axios.post('https://tpomobi.shop/createAcc', {data: informData}).then(function (response) {
                if(typeof(response.data) == 'string'){
                    api.warning({
                        message: `Email is used.`,
                        placement: 'top',
                    });
                }else {
                    console.log(response.data)
                    dispatch(setUserAcc({_id: response.data.insertedId, email: email, password: password}))

                    let informData =  {
                        img: '',
                        name: email,
                        tradeName: email,
                        tags: [],
                        phone: '',
                        email: email,
                        type: 'client',
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
                        idAcc: response.data.insertedId
                    };

                    console.log(informData)
                    // formData.append('customFile', file);
                    // formData.append('informData', JSON.stringify(informData))
                    axios.post('https://tpomobi.shop/createContactAdmin', {data: informData}).then(async function(response) {


                    })

                        .catch(function (error) {
                            console.log(error);
                        });




                    setCurrentWindow(3)
                }
            })
                .catch(function (error) {
                    console.log(error);
                    api.warning({
                        message: `Something error`,
                        placement: 'top',
                    });
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
                <span className='arrowBack' onClick={() => setCurrentWindow(1)}><BsArrowLeftShort/></span>
                <div className='LogInAcc_Main_UpperBlock'  style={{marginBottom: '10px'}}>
                    <div className='LogInAcc_Text' style={{marginBottom: '20px'}}>
                        Welcome to TPO Admin
                    </div>
                    <div className='LogInAcc_Main_BottomBlock'>
                        <div className='ButtonGoogle' style={{width: '360px', marginTop: '0px', marginBottom: '30px'}}>
                            <img className='ButtonGoogleIcon' src={gmailIcon}/>
                            <span className='ButtonGoogleText'>Continue through “Google”</span>
                        </div>
                    </div>
                    <div className='LogInAcc_Main_MiddleBlock' style={{width: '360px', marginBottom: '20px'}}>
                        <span className='LineSpan' style={{width: '160px'}}></span>
                        <div className='LineText'>Or</div>
                        <span className='LineSpan' style={{width: '160px'}}></span>

                    </div>
                    <div className='InputBox'>
                        <div className='InputTitleText'>Email</div>
                        <Input placeholder="Tpoadmin2023@gmail.com" style={{
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
                    <div className='InputBox'>
                        <div className='InputTitleText'>Repeat Password</div>
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
                            setRepeatPassword(e.target.value)
                        }}
                        value={repeatPassword}

                        />
                    </div>
                    <div className='ContinueButton'  onClick={() => {createAcc();}}>
                        Continue
                    </div>
                </div>
                <div className='RecoverPassBlock'>
                    <div className='RecoverPassBlockText'>
                        Have an account?
                    </div>
                    <div className='RecoverPassBlockLink'  onClick={() => setCurrentWindow(1)}>
                        Log In
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInAcc;