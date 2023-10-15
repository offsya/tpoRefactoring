import React, {useEffect, useState} from 'react';
import "./ProfileMobile.scss"
import {Input} from "antd";
import { Radio, Select, Space } from 'antd';
import spainflag from "../../../../components/Profile/spainflag.svg"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUserAcc} from "../../../../features/userAcc";
const { Option } = Select;
const ProfileMobile = ( setProfileOpen,setPersonalDataMobile,setOrdersMobile) => {
    const dispatch=useDispatch()
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const [nameState, setNameState] = useState(userAcc.name)
    const [emailState, setEmailState] = useState(userAcc.email)
    const [phoneState, setPhoneState] = useState(Array.isArray(userAcc.phone) ? userAcc.phone[0]:userAcc.phone)
    const [adressState, setAdressState] = useState(userAcc.billAddress.address)
    const [tradeNameState, setTradeNameState] = useState(userAcc.tradeName)
    const [phoneCode, setPhoneCode]=useState(phoneState.startsWith("34") ? "34" : "375" )
    const [newPhoneNumber, setNewPhoneNumber]=useState()



    const SelectPhoneNumberChange = (value) => {
        console.log(`selected ${value}`);
        setPhoneCode(value)
    };

    const allContacts = useSelector((state) => state.allContacts.allContacts)

    const updateProd = () => {
        // const formData = new FormData();
        //console.log(userAcc)
        let informData =  {
            id: userAcc._id,
            img: userAcc.img,
            name: nameState,
            tradeName: tradeNameState,
            tags: userAcc.tags,
            phone:  phoneCode+newPhoneNumber,
            email: emailState,
            type: userAcc.type,
            iban: userAcc.iban,
            code: userAcc.code,
            enabled: userAcc.enabled,
            swift: userAcc.swift,
            nif: userAcc.nif,
            cif: userAcc.cif,
            solvencia: userAcc.solvencia,
            dificilidad: userAcc.dificilidad,
            extraPedidos: userAcc.extraPedidos,
            billAddress: {address: adressState, city: userAcc.billAddress.city, postalCode: userAcc.billAddress.postalCode},
            rate: userAcc.rate
        };

        console.log(informData )
        console.log(userAcc )
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://tpomobi.shop/updateContactAdmin', {data: informData}).then(async function(response) {
            dispatch(setUserAcc(informData))
            console.log(userAcc )

        })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const current = useMemo(() => {
    //     return allContacts.find(el => el.phone[0] == userAcc.email)
    // }, [userAcc, allContacts])
    // console.log(current)

    console.log(phoneState)
    useEffect(() => {
        if (phoneState.startsWith("375")){
            console.log(phoneState)
            setPhoneCode("375")
            setNewPhoneNumber( phoneState.slice(3))
        }
        else if(phoneState.startsWith("34")) {
            setPhoneCode("34")
            setNewPhoneNumber(phoneState.slice(2))
        }
        else{
            setPhoneCode("34")
        }
    }, []);

    return (
        <div className="PersonalData-mobile">
            <div className="PersonalDataText">
                <span className="TextPersonaldata">Personal data</span>
            </div>


            <div className="inputBlockPDmobile">
                <div className="inputTextPDmobile">
                    Name
                </div>
                <Input
                       style={{
                           width: '100%',
                           height: '43px',
                           borderRadius: '7px',
                           border: '1px solid #C1C1C1',
                           background: '#FFF',
                           marginTop: '10px'
                       }}
                       placeholder="Pablo Garcia"
                       value={nameState}
                       onChange={(e)=> setNameState(e.target.value)}
                       type="text" placeholder="Filling example: Daniel García"

                />

            </div>
            <div className="inputBlockPDmobile">
                <div className="inputTextPDmobile">
                    Phone number
                </div>
                <div className="PhoneNumber-mobile">
                    <Select
                        size="middle"
                        onChange={SelectPhoneNumberChange}
                        defaultValue={phoneCode}
                        style={{

                            marginTop : 10,
                            width : 200,
                            padding:0,
                        }}>
                        <Option value="34" label="spain">
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


                           value={newPhoneNumber} onChange={(e)=> setNewPhoneNumber(e.target.value)} type="text"

                    >

                    </Input>
                </div>
            </div>
            <div className="inputBlockPDmobile">
                <div className="inputTextPDmobile">
                    Email
                </div>
                <Input
                       style={{
                           width: '100%',
                           height: '43px',
                           borderRadius: '7px',
                           border: '1px solid #C1C1C1',
                           background: '#FFF',
                           marginTop: '10px'
                       }}
                       placeholder="example@gmail.com"
                       value={emailState} onChange={(e)=> setEmailState(e.target.value)} type="text"
                />
            </div>

            <div className="inputBlockPDmobile">
                <div className="inputTextPDmobile">
                    Address
                </div>
                <Input
                       style={{
                           width: '100%',
                           height: '43px',
                           borderRadius: '7px',
                           border: '1px solid #C1C1C1',
                           background: '#FFF',
                           marginTop: '10px'
                       }}
                       placeholder="Spain, Madrid"
                       value={adressState} onChange={(e)=> setAdressState(e.target.value)}
                />
            </div>
            <div className="inputBlockPDmobile">
                <div className="inputTextPDmobile">
                    Some Code
                </div>
                <Input
                    style={{
                        width: '100%',
                        height: '43px',
                        borderRadius: '7px',
                        border: '1px solid #C1C1C1',
                        background: '#FFF',
                        marginTop: '10px'
                    }}
                    placeholder="Code"
                    disabled={true}
                    value={tradeNameState} onChange={(e)=> setTradeNameState(e.target.value)}
                />

            </div>
            <div className="PersonalDataSave" onClick={()=> updateProd()} >
                Save
            </div>
        </div>
    );
};

export default ProfileMobile;