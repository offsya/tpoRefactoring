import React, {useEffect, useState} from 'react';
import './LogInAcc.scss'
import {delAllSelectedItems} from "../../../../Admin/features/allSelectedItems";
import {setValue} from "../../../../Admin/features/setAddProdAdmin";
import { Input } from 'antd';
import {useDispatch, useSelector} from "react-redux";

import gmailIcon from '../../../../../assets/gmailicon.svg'
import telegram from '../../../components/Login/images/telegram.svg'
import instagram from '../../../components/Login/images/instagram.svg'
import concentio from '../../../components/Login/images/concentio.svg'
import www from '../../../components/Login/images/www.svg'
import choco from '../../../components/Login/images/choco.svg'
import apple from '../../../components/Login/images/apple.svg'
import whatsapp from '../../../components/Login/images/whatsapp.svg'


import znakIcon from '../../../components/Login/znak.svg'

import { BsArrowLeftShort } from 'react-icons/bs';
import { Select } from 'antd';
import axios from "axios";
import allContacts, {addallContacts} from "../../../../Admin/features/allContacts";

const FinalAcc = ({setRegModalOpen, setCurrentWindow}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false);
    const [checkSkipVisible, setCheckSkipVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [allContacts, setAllContacts] = useState([]);
    const onChange = (value) => {
        setInputValue(value)
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };


    useEffect(() => {
        axios.get('https://tpomobi.shop/getContactsAdmin').then((resp) => {
            console.log(resp.data)
            setAllContacts(resp.data)
        });
    }, [])



    return (
        <div className='FinalAcc'>
            <div className='FinalAcc_Box'>

                <div className='FinalAcc_Text'>
                    Final steps to activate your account
                </div>
                <div className='FinalAcc_1Step'>
                    1st step
                </div>


                <div className='FinalAcc_Location_Text'>
                    Choose location of your restaurant
                </div>

                <div className='SelectBox'>
                    <Select
                        style={{marginTop: '10px', width: '400px', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                        showSearch
                        size={'large'}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={allContacts.map(el => {return {value: el.billAddress.address, label: el.billAddress.address}})}
                        value={inputValue}
                    />
                </div>


                <div className='FinalAcc_1Step'>
                    2nd step
                </div>
                <div className='FinalAcc_Location_Text'>
                    Your restaurant code for the next orders
                </div>
                <div className="InputBlock">
                    <Input placeholder="CTR" style={{width: '400px',  height: '40px'}}/>
                </div>
                <div className="RememberMeBlock" onClick={() => setCheckBoxVisible(prev => !prev)}>
                    <span className='RememberMeBlock_Check'>
                        {checkBoxVisible && '✔'}
                    </span>
                    <div className='RememberMeBlock_Text'>
                        Remember this code for all platforms
                    </div>
                </div>
                <div className='ManyService'>
                    <img src={whatsapp} alt=""/>
                    <img src={choco} alt=""/>
                    <img src={concentio} alt=""/>
                    <img src={apple} alt=""/>
                    <img src={telegram} alt=""/>
                    <img src={instagram} alt=""/>
                    <img src={www} alt=""/>

                </div>
                <div className='ContinueButton' onClick={() => setRegModalOpen(false)}>
                    Apply my code
                </div>
                <div className='FinalAcc_1Step_Skip' onClick={() => setCheckSkipVisible(true)}>
                    skip this step
                </div>
            </div>
            {checkSkipVisible &&
                <div className='FinalAcc_Skip'>
                    <div className='modal' style={{borderRadius: '0px', background: "rgba(163, 163, 163, 0.70)"}} onClick={() => setCheckSkipVisible(false)}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <div className='skip_warn'>
                                <div className='skip_warn_Icon'>
                                    <img src={znakIcon} alt=""/>
                                </div>
                                <div className='skip_warn_Text'>
                                    Without the identification of your restaurant all your orders allowed
                                    <b>only for the immediate payment on the delivery</b>
                                </div>
                                <div className='skip_warn_Button' onClick={() => setCheckSkipVisible(false)}>
                                    Yep, I'll pay on 🚚
                                </div>
                                <div className='skip_warn_Check'>
                                    <div className="RememberMeBlock" style={{width: 'auto'}} onClick={() => setCheckBoxVisible(prev => !prev)}>
                                        <span className='RememberMeBlock_Check'>
                                            {checkBoxVisible && '✔'}
                                        </span>
                                        <div className='RememberMeBlock_Text' style={{color: '#06C0B0', alignItems: 'center', alignContent: 'center'}}>
                                            No, please identify me
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default FinalAcc;