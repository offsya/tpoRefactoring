import React, {useEffect, useMemo, useState} from 'react';
import '../BodyComponents/ProfileBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {Input, Select, Space} from "antd";
import spainflag from "../../../components/Profile/spainflag.svg";
import axios from "axios";
import {updateContact} from "../../../../Admin/features/allContacts";
import {setUserAcc} from "../../../features/userAcc";

const { Option } = Select;


const PersonalDataProfile = () => {

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
        <div className='PersonalDataProfile'>
            <div className='titleText'>Personal data</div>
            <div className="UserPhotoAndName">
                <div className="UserPhoto">

                </div>
                <div className="UserNameText">
                    <div className="firstName">
                        <span>{userAcc.name}</span>
                    </div>
                    <div className="UserIdProfile">
                        <span>ID: {userAcc._id}</span>
                    </div>
                </div>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Name
                </div>
                <input value={nameState} onChange={(e)=> setNameState(e.target.value)} type="text" placeholder="Filling example: Daniel García"/>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Phone number
                </div>
                <div className="PhoneNumber">
                <Select
                    size="middle"
                    onChange={SelectPhoneNumberChange}
                    defaultValue={phoneCode}

                    style={{
                        marginTop : 5,
                        width : 150,
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
                <input value={newPhoneNumber} onChange={(e)=> setNewPhoneNumber(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Email
                </div>
                <input value={emailState} onChange={(e)=> setEmailState(e.target.value)} type="text"    />
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Address
                </div>
                <input type="text" value={adressState} onChange={(e)=> setAdressState(e.target.value)} placeholder="Filling example: Daniel García"/>
            </div>
            <div className="inputBlock">
                <div className="inputText">
                    Some code
                </div>
                <input type="text" disabled={true} value={tradeNameState} onChange={(e)=> setTradeNameState(e.target.value)}/>
            </div>
            <div className='buttonBlock' onClick={()=> updateProd()}>
                <div>
                    Save
                </div>
            </div>
        </div>
    );
};

export default PersonalDataProfile;