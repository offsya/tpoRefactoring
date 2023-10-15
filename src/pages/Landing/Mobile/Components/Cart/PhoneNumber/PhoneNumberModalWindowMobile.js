import React, {useState} from 'react';
import "./PhoneNumberModalWindowMobile.scss"
import {Input, Select, Space} from "antd";
import spainflag from "../../../../components/Profile/spainflag.svg";
import axios from "axios";
import {updateContact} from "../../../../../Admin/features/allContacts";
import userAcc, {setUserAcc} from "../../../../features/userAcc";
import {useDispatch, useSelector} from "react-redux";
const tg = window.Telegram.WebApp


const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const PhoneNumberModalWindowMobile = ({setAddPhoneNumber}) => {
    const [numberPhone, setNumberPhone] = useState('')
    const [selectNumberPhoneCode, setSelectNumberPhoneCode] = useState({flag: spainflag, value: '34', label: 'spain'})
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const dispatch = useDispatch()
    console.log(selectNumberPhoneCode.value + numberPhone)
    // const updateProd = () => {
    //     // const formData = new FormData();
    //     let informData =  {
    //         id: userAcc._id,
    //         assets: userAcc.assets,
    //         name: userAcc.name,
    //         tradeName: userAcc.tradeName,
    //         tags: userAcc.tags,
    //         phone: selectNumberPhoneCode.value + numberPhone,
    //         email: userAcc.email,
    //         type: userAcc.type,
    //         iban: userAcc.iban,
    //         code: userAcc.code,
    //         enabled: userAcc.enabled,
    //         swift: userAcc.swift,
    //         nif: userAcc.nif,
    //         cif: userAcc.cif,
    //         solvencia: userAcc.solvencia,
    //         dificilidad: userAcc.dificilidad,
    //         extraPedidos: userAcc.extraPedidos,
    //         billAddress: userAcc.billAddress,
    //         rate: userAcc.rate,
    //         lastVisit: Date.now()
    //     };
    //
    //     console.log(informData)
    //     // formData.append('customFile', file);
    //     // formData.append('informData', JSON.stringify(informData))
    //     axios.post('https://tpomobi.shop/updateContactAdmin', {data: informData}).then(async function(response) {
    //         console.log(response.data)
    //         dispatch(updateContact(informData))
    //         setAddPhoneNumber(false)
    //
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }



    const createAcc = async () => {
        let informData =  {
            img: '',
            name: tg.initDataUnsafe.user.first_name,
            tradeName: tg.initDataUnsafe.user.username,
            tags: [],
            phone: selectNumberPhoneCode.value + numberPhone,
            password: tg.initDataUnsafe.user.id,
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
            platform: 'telegram',
            lastVisit: Date.now(),
        };

        console.log(informData)

        dispatch(updateContact(informData))
        setAddPhoneNumber(false)
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://tpomobi.shop/createContactAdmin', {data: informData}).then(async function(response) {
            dispatch(setUserAcc({...informData, _id: response.data.insertedId}))

            console.log(response.data)
            // setProfileOpen(true)

        })



            .catch(function (error) {
                console.log(error);
            });



    }

    return (
        <div className={true ? "PhoneNumberModalWindowMobile active" : "PhoneNumberModalWindowMobile"} onClick={() => setAddPhoneNumber(false)}>
            <div onClick={e=> e.stopPropagation()}  style={{background: 'whitesmoke', borderRadius: '7px', padding: '0px 20px 0px 20px'}} className={true ? "PhoneNumberModalWindow_contentMobile active" :"PhoneNumberModalWindow_contentMobile"}>
                <div style={{marginTop:19,
                    color: "#393939",
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    letterSpacing: "2.4px"}}> Link phone number</div>
                <div style={{marginTop:15,
                    color: "#9D9D9D",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    letterSpacing: "1.4px"}}>Confirm a phone number so that we can contact you</div>
                <div style={{marginTop:"20px",
                    color: "#9D9D9D",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    letterSpacing: "1.4px"}}>Phone number</div>
                <div className="InputAndSelectMobile">
                    <div className="PhoneNumberSignInPC" style={{display: 'flex'}}>
                        <Select
                            size="middle"
                            onChange={(value, option) => setSelectNumberPhoneCode(option)}
                            defaultValue={'34'}
                            style={{
                                marginTop : 5,
                                width : 150,
                                padding:0,
                                marginRight: "-5px"
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
                                   marginTop: '5px'
                               }}
                               onChange={(e) => {
                                   console.log(selectNumberPhoneCode)
                                   setNumberPhone(e.target.value)
                               }}
                               value={numberPhone}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="InputAndSelectMobile">

                    <div className="seeOptionsCard-mobile" style={{margin: '10px'}} onClick={() => createAcc()}>Confirm</div>
                </div>


            </div>
        </div>
    );
};

export default PhoneNumberModalWindowMobile;