import React, {useEffect, useMemo, useState} from 'react';
import '../ChangeCatalogItem/CatalogItem.scss'
import axios from "axios";
import noImg from '../../../../../../assets/av.svg'
import arrowImage from "./images/arrow.svg";
import moveStockImage from "./images/Move Stock.svg";
import prosImage from "./images/prose.svg";
import eurImage from "./images/€.svg";
import {BsPlus} from "react-icons/bs";
import {CgClose} from "react-icons/cg";
import TAX from "./images/TAX.png";
import {setValue} from "../../../../features/setAddProdAdmin";
import {useDispatch} from "react-redux";
import {setallProductsSlice} from "../../../../features/allProducts";
import {notification, Space, Select, Input} from "antd";
import OrdersComponent from "../OrdersComponent";
import OrderContainer from "../TableContainer/OrderContainer";
import OrdersComponentContact from "../OrdersComponentContact";
const { TextArea } = Input;






const ChangeContact = ({allProducts, setAllProducts, currentElem}) => {

    const [currentFileImage, setCurrentFileImage] = useState(currentElem.img)
    const dispatch = useDispatch();
    console.log(currentFileImage)

    const [spanSwitcher, setSpanSwitcher] = useState(true)
    const [calcSwitcher, setCalcSwitcher] = useState(true)

    const [prodName, setProdName] = useState(currentElem.name)
    const [enabled, setEnabled] = useState(currentElem.enabled);
    const [tradeName, setTradeName] = useState(currentElem.tradeName)
    const [emailContact, setEmailContact] = useState(currentElem.email)
    const [contactType, setContactType] = useState(currentElem.type)


    const [marketPrice, setMarketPrice] = useState(currentElem.marketPrice)
    const [entryPrice, setEntryPrice] = useState(currentElem.ourPrice)
    const [profit, setProfit] = useState(parseFloat(currentElem.marketPrice)-parseFloat(currentElem.ourPrice))
    const [margent, setMargent] = useState(currentElem.MB)
    const [IVA, setIVA] = useState(currentElem.IVA)

    const [marketPriceDP, setMarketPriceDP] = useState(currentElem.marketPriceDP)
    const [entryPriceDP, setEntryPriceDP] = useState(currentElem.ourPriceDP)
    const [profitDP, setProfitDP] = useState(0)
    const [margentDP, setMargentDP] = useState(currentElem.DP)
    const [IVADP, setIVADP] = useState(currentElem.IVADP)

    const [marketPriceSDP, setMarketPriceSDP] = useState(currentElem.marketPriceSDP)
    const [entryPriceSDP, setEntryPriceSDP] = useState(currentElem.ourPriceSDP)
    const [profitSDP, setProfitSDP] = useState(0)
    const [margentSDP, setMargentSDP] = useState(currentElem.SDP)
    const [IVASDP, setIVASDP] = useState(currentElem.IVASDP)


    const [marketPriceCP, setMarketPriceCP] = useState(currentElem.marketPriceCP)
    const [entryPriceCP, setEntryPriceCP] = useState(currentElem.ourPriceCP)
    const [profitCP, setProfitCP] = useState(0)
    const [margentCP, setMargentCP] = useState(currentElem.CP)
    const [IVACP, setIVACP] = useState(currentElem.IVACP)


    const [tags, setTags] = useState((currentElem.tags).join())
    const [IBAN, setIBAN] = useState(currentElem.iban)
    const [SWIFT, setSWIFT] = useState(currentElem.swift)
    const [address, setAddress] = useState(currentElem?.billAddress?.address)

    const [phone, setPhone] = useState(currentElem.phone)
    const [code, setCode] = useState(currentElem.code)
    const [city, setCity] = useState(currentElem?.billAddress?.city)
    const [postalCode, setPostalCode] = useState(currentElem?.billAddress?.postalCode)
    const changeIVAHandler = (e) => {
        setIVA(e.target.value)
        if(parseFloat(IVADP) == parseFloat(IVA) ||  parseFloat(IVADP) == 0 || IVADP == '')
        setIVADP(e.target.value);

        if(parseFloat(IVASDP) == parseFloat(IVA) ||  parseFloat(IVASDP) == 0 || IVASDP == '')
        setIVASDP(e.target.value);

        if(parseFloat(IVACP) == parseFloat(IVA) ||  parseFloat(IVACP) == 0 || IVACP == '')
        setIVACP(e.target.value);
    }

    const changeEntryPriceHandler = (e) => {
        setEntryPrice(e.target.value)
        if(parseFloat(entryPriceDP) == parseFloat(entryPrice) ||  parseFloat(entryPriceDP) == 0 || entryPriceDP == '')
            setEntryPriceDP(e.target.value);

        if(parseFloat(entryPriceSDP) == parseFloat(entryPrice) ||  parseFloat(entryPriceSDP) == 0 || entryPriceSDP == '')
            setEntryPriceSDP(e.target.value);

        if(parseFloat(entryPriceCP) == parseFloat(entryPrice) ||  parseFloat(entryPriceCP) == 0 || entryPriceCP == '')
            setEntryPriceCP(e.target.value);
    }

    const deleteProd = () => {
        axios.post('https://tpomobi.shop/deleteProductAdmin', {_id: currentElem._id}).then(function (response) {
            dispatch(setValue(2))

        })
            .catch(function (error) {
                console.log(error);
        });
    }

    const copyProd = () => {
        // const formData = new FormData();

        let informData =  {
            id: allProducts.length + 1,
            quantity: 0,
            quantityOrder: 0,
            img: '',
            name: prodName,
            tradeName: tradeName,
            marketPrice: spanSwitcher ? currentPrice : marketPrice,
            marketPriceDP: spanSwitcher ? currentPriceDP : marketPriceDP,
            marketPriceSDP: spanSwitcher ? currentPriceSDP : marketPriceSDP,
            marketPriceCP: spanSwitcher ? currentPriceCP : marketPriceCP,
            ourPrice: entryPrice,
            ourPriceDP: entryPriceDP,
            ourPriceSDP: entryPriceSDP,
            ourPriceCP: entryPriceCP,
            MB: parseFloat(spanSwitcher ? margent : currentMargent),
            DP: parseFloat(spanSwitcher ? margentDP : currentMargentDP),
            SDP: parseFloat(spanSwitcher ? margentSDP : currentMargentSDP),
            CP: parseFloat(spanSwitcher ? margentCP : currentMargentCP),
            tags: tags,
            phone: phone,
            email: emailContact,
            type: contactType,
            iban: IBAN,
            code: code,
            IVA: IVA,
            IVADP: IVADP,
            IVASDP: IVASDP,
            IVACP: IVACP,
            enabled: enabled,
            status: currentElem.status,
            swift: SWIFT,
            billAddress: {address: address, city: city, postalCode: postalCode}

        };
        console.log(informData)
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://localhost:2222/createContactAdmin', {data: informData}).then(function (response) {
            dispatch(setValue(2))
            // dispatch(setallProductsSlice({...informData, "_id": response.data.insertedId}))
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    const enableHandler = () => {
        setEnabled((prev) => !prev)
    }
    const updateProd = () => {
        // const formData = new FormData();

        let informData =  {
            id: 1,
            quantity: 0,
            quantityOrder: 0,
            img: currentFileImage,
            name: prodName,
            tradeName: tradeName,
            marketPrice: spanSwitcher ? currentPrice : marketPrice,
            marketPriceDP: spanSwitcher ? currentPriceDP : marketPriceDP,
            marketPriceSDP: spanSwitcher ? currentPriceSDP : marketPriceSDP,
            marketPriceCP: spanSwitcher ? currentPriceCP : marketPriceCP,
            ourPrice: entryPrice,
            ourPriceDP: entryPriceDP,
            ourPriceSDP: entryPriceSDP,
            ourPriceCP: entryPriceCP,
            MB: parseFloat(spanSwitcher ? margent : currentMargent),
            DP: parseFloat(spanSwitcher ? margentDP : currentMargentDP),
            SDP: parseFloat(spanSwitcher ? margentSDP : currentMargentSDP),
            CP: parseFloat(spanSwitcher ? margentCP : currentMargentCP),
            tags: tags,
            phone: phone,
            email: emailContact,
            type: contactType,
            iban: IBAN,
            code: code,
            IVA: IVA,
            IVADP: IVADP,
            IVASDP: IVASDP,
            IVACP: IVACP,
            enabled: enabled,
            swift: SWIFT,
            billAddress: {address: address, city: city, postalCode: postalCode}
        };
        console.log(informData)
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('http://localhost:2222/updateContactAdmin', {data: informData, _id: currentElem._id}).then(async function(response) {
            await openNotification('top');
        })
            .catch(function (error) {
                console.log(error);
        });
    }

    const changeName = (e) => {
        setProdName(e.target.value)
        console.log(prodName)
    }

    const [openModal, setOpenModal] = useState(false)


    const currentPrice = useMemo(() => {
        let price = (parseFloat(entryPrice) + parseFloat(entryPrice) * parseFloat(margent)/100) + (parseFloat(entryPrice) + parseFloat(entryPrice) * parseFloat(margent)/100)*parseFloat(IVA)/100;
        return price.toFixed(2);
    }, [entryPrice, margent, IVA])
    const currentProfit = useMemo(() => {
        let profit = (parseFloat(currentPrice) - parseFloat(entryPrice)) * (1 - parseFloat(IVA) / 100)
        return profit.toFixed(2);
    }, [entryPrice, margent, currentPrice])
    const currentMargentProfit = useMemo(() => {
        let withoutIVA = parseFloat(IVA) != 0 ? parseFloat(marketPrice) - parseFloat((parseFloat(marketPrice) * (parseFloat(IVA) / 100)).toFixed(2)) : parseFloat(marketPrice)
        let margentProfit = ( withoutIVA - parseFloat(entryPrice));
        return margentProfit.toFixed(2);
    }, [entryPrice, marketPrice, IVA])
    const currentMargent = useMemo(() => {
        let withoutIVA = parseFloat(IVA) != 0 ? parseFloat(marketPrice) - parseFloat((parseFloat(marketPrice) * (parseFloat(IVA) / 100)).toFixed(2)) : parseFloat(marketPrice)
        let margentProfit = ( withoutIVA - parseFloat(entryPrice));
        let margent = parseFloat(margentProfit) / parseFloat(entryPrice) * 100
        return margent.toFixed(2);
    }, [entryPrice, marketPrice, IVA])



    const currentPriceDP = useMemo(() => {
        let price = (parseFloat(entryPriceDP) + parseFloat(entryPriceDP) * parseFloat(margentDP)/100) + (parseFloat(entryPriceDP) + parseFloat(entryPriceDP) * parseFloat(margentDP)/100)*parseFloat(IVADP)/100;
        return price.toFixed(2);
    }, [entryPriceDP, margentDP, IVADP])
    const currentProfitDP = useMemo(() => {
        let profit = (parseFloat(currentPriceDP) - parseFloat(entryPriceDP)) * (1 - parseFloat(IVADP) / 100)
        return profit.toFixed(2);
    }, [entryPriceDP, margentDP, currentPriceDP])
    const currentMargentDPProfit = useMemo(() => {
        let withoutIVADP = parseFloat(IVADP) != 0 ? parseFloat(marketPriceDP) - parseFloat((parseFloat(marketPriceDP) * (parseFloat(IVADP) / 100)).toFixed(2)) : parseFloat(marketPriceDP)
        let margentDPProfit = ( withoutIVADP - parseFloat(entryPriceDP));
        return margentDPProfit.toFixed(2);
    }, [entryPriceDP, marketPriceDP, IVADP])
    const currentMargentDP = useMemo(() => {
        let withoutIVADP = parseFloat(IVADP) != 0 ? parseFloat(marketPriceDP) - parseFloat((parseFloat(marketPriceDP) * (parseFloat(IVADP) / 100)).toFixed(2)) : parseFloat(marketPriceDP)
        let margentDPProfit = ( withoutIVADP - parseFloat(entryPriceDP));
        let margentDP = parseFloat(margentDPProfit) / parseFloat(entryPriceDP) * 100
        return margentDP.toFixed(2);
    }, [entryPriceDP, marketPriceDP, IVADP])




    const currentPriceSDP = useMemo(() => {
        let price = (parseFloat(entryPriceSDP) + parseFloat(entryPriceSDP) * parseFloat(margentSDP)/100) + (parseFloat(entryPriceSDP) + parseFloat(entryPriceSDP) * parseFloat(margentSDP)/100)*parseFloat(IVASDP)/100;
        return price.toFixed(2);
    }, [entryPriceSDP, margentSDP, IVASDP])
    const currentProfitSDP = useMemo(() => {
        let profit = (parseFloat(currentPriceSDP) - parseFloat(entryPriceSDP)) * (1 - parseFloat(IVASDP) / 100)
        return profit.toFixed(2);
    }, [entryPriceSDP, margentSDP, currentPriceSDP])
    const currentMargentSDPProfit = useMemo(() => {
        let withoutIVASDP = parseFloat(IVASDP) != 0 ? parseFloat(marketPriceSDP) - parseFloat((parseFloat(marketPriceSDP) * (parseFloat(IVASDP) / 100)).toFixed(2)) : parseFloat(marketPriceSDP)
        let margentSDPProfit = ( withoutIVASDP - parseFloat(entryPriceSDP));
        return margentSDPProfit.toFixed(2);
    }, [entryPriceSDP, marketPriceSDP, IVASDP])
    const currentMargentSDP = useMemo(() => {
        let withoutIVASDP = parseFloat(IVASDP) != 0 ? parseFloat(marketPriceSDP) - parseFloat((parseFloat(marketPriceSDP) * (parseFloat(IVASDP) / 100)).toFixed(2)) : parseFloat(marketPriceSDP)
        let margentSDPProfit = ( withoutIVASDP - parseFloat(entryPriceSDP));
        let margentSDP = parseFloat(margentSDPProfit) / parseFloat(entryPriceSDP) * 100
        return margentSDP.toFixed(2);
    }, [entryPriceSDP, marketPriceSDP, IVASDP])


    const currentPriceCP = useMemo(() => {
        let price = (parseFloat(entryPriceCP) + parseFloat(entryPriceCP) * parseFloat(margentCP)/100) + (parseFloat(entryPriceCP) + parseFloat(entryPriceCP) * parseFloat(margentCP)/100)*parseFloat(IVACP)/100;
        return price.toFixed(2);
    }, [entryPriceCP, margentCP, IVACP])
    const currentProfitCP = useMemo(() => {
        let profit = (parseFloat(currentPriceCP) - parseFloat(entryPriceCP)) * (1 - parseFloat(IVACP) / 100)
        return profit.toFixed(2);
    }, [entryPriceCP, margentCP, currentPriceCP])
    const currentMargentCPProfit = useMemo(() => {
        let withoutIVACP = parseFloat(IVACP) != 0 ? parseFloat(marketPriceCP) - parseFloat((parseFloat(marketPriceCP) * (parseFloat(IVACP) / 100)).toFixed(2)) : parseFloat(marketPriceCP)
        let margentCPProfit = ( withoutIVACP - parseFloat(entryPriceCP));
        return margentCPProfit.toFixed(2);
    }, [entryPriceCP, marketPriceCP, IVACP])
    const currentMargentCP = useMemo(() => {
        let withoutIVACP = parseFloat(IVACP) != 0 ? parseFloat(marketPriceCP) - parseFloat((parseFloat(marketPriceCP) * (parseFloat(IVACP) / 100)).toFixed(2)) : parseFloat(marketPriceCP)
        let margentCPProfit = ( withoutIVACP - parseFloat(entryPriceCP));
        let margentCP = parseFloat(margentCPProfit) / parseFloat(entryPriceCP) * 100
        return margentCP.toFixed(2);
    }, [entryPriceCP, marketPriceCP, IVACP])

    const uploadImage = (file, currentElem) => {
        const formData = new FormData();
        formData.append('sampleFile', file)
        formData.append('currentElemId', currentElem._id)
        axios.post('https://tpomobi.shop/uploadPhoto', formData,{
        }).then((res) => {
            setCurrentFileImage(res.data)
        })

    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
            message: `Save Completed.`,
            placement,
        });
    };

    const [options, setOptions] = useState([{value: 1, label: 'client'}, {value: 2, label: 'supplier'}])

    return (
        <div className='tableMainClass'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='textPlusSwitcher'>
                <div className='topicText'>Contacts - Change Contact</div>

                {/*<div className='switchElemsLanding'>*/}
                {/*    <span onClick={() => setCalcSwitcher(true)} style={{background: calcSwitcher && '#06C0B0',  color: calcSwitcher && '#FFFFFF'}}>Standart</span>*/}
                {/*    <span onClick={() => setCalcSwitcher(false)} style={{background: !calcSwitcher && '#06C0B0',  color: !calcSwitcher && '#FFFFFF'}}>Сalculator</span>*/}
                {/*</div>*/}
            </div>

            <div className='addProductContainer'>
                <div className='addProductLeft'>
                    <div className='addProductLeftTop'>
                        <div className='addProductLeftTopImg'>
                            <img src={currentFileImage || noImg} alt=""/>
                            <input type="file" onChange={(e) => uploadImage(e.target.files[0], currentElem)}/>
                        </div>
                        <div className='addProductLeftTopRight'>
                            <div className='addProductLeftTopRightName'>
                                <input className='inputBlock' onChange={(e) => changeName(e)} defaultValue={prodName} placeholder='Tomato' type="text"/>
                            </div>
                            <div className='addProductLeftTopRightInfo' style={{height: '60px'}}>
                                <div     className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Contact Type
                                    </div>
                                    {/*<input className='inputBlock' onChange={(e) => setContactType(e.target.value)} defaultValue={contactType} placeholder='client/supplier' type="text"/>*/}
                                    <Select
                                        mode='multiple'
                                        style={{
                                            width: '80%',
                                            marginTop: '5px',
                                            marginBottom: '5px'
                                        }}
                                        placeholder="client/supplier"
                                        onChange={(value) => {setContactType(value)}}
                                        options={options}
                                        defaultValue={contactType}
                                    />
                                </div>
                            </div>
                            <div className='addProductLeftTopRightInfo'>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        ID
                                    </div>
                                    <Input disabled={true} style={{cursor: 'pointer', height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={currentElem._id} placeholder='Codigo' type="text"/>

                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Trade Name
                                    </div>
                                    <Input onChange={(e) => setTradeName(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={tradeName} placeholder='Codigo' type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setTradeName(e.target.value)} defaultValue={tradeName} placeholder='' type="text"/>*/}
                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Email
                                    </div>
                                    <Input onChange={(e) => setEmailContact(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={emailContact} placeholder='Email' type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setEmailContact(e.target.value)} defaultValue={emailContact} placeholder='email' type="text"/>*/}
                                </div>

                                <div className='enabledBlock' style={{display: 'none'}}>
                                    <div className='textIdBlock'>
                                        Enabled
                                    </div>
                                    <div className={enabled ? 'itemEnabled' : 'itemDisabled'} onClick={() => enableHandler()}>{enabled ? 'Yes' : 'No'}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addProductLeftBottom'>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Tags</span>
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Tags"
                                onChange={(value) => {console.log(value)}}
                                options={options}
                                defaultValue={tags && tags}
                            />
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setTags(e.target.value)} defaultValue={tags} placeholder='Tags' type="text"/>*/}
                            {/*<div className='addTags' onClick={() => setOpenModal(false)}>*/}
                            {/*    <BsPlus/>*/}
                            {/*</div>*/}
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Phone</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setPhone(e.target.value)} defaultValue={phone} placeholder='Phone' type="number"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Phone"
                                onChange={(value) => {console.log(value)}}
                                options={options}
                                defaultValue={phone}
                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Code</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setCode(e.target.value)} defaultValue={code} placeholder='code' type="text"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Code"
                                onChange={(value) => {console.log(value)}}
                                options={options}
                                defaultValue={code}
                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">IBAN</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setIBAN(e.target.value)} defaultValue={IBAN} placeholder='IBAN' type="text"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="IBAN"
                                onChange={(value) => {console.log(value)}}
                                options={options}
                                defaultValue={IBAN}
                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">SWIFT</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setSWIFT(e.target.value)} defaultValue={SWIFT} placeholder='SWIFT' type="text"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="SWIFT"
                                onChange={(value) => {console.log(value)}}
                                options={options}
                                defaultValue={SWIFT}
                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Address</span>
                            <TextArea onChange={(e) => setAddress(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={address} placeholder='Address' type="text"/>
                            {/*<Select*/}
                            {/*    mode="tags"*/}
                            {/*    style={{*/}
                            {/*        width: '100%',*/}
                            {/*        marginTop: '5px',*/}
                            {/*        marginBottom:'5px'*/}
                            {/*    }}*/}
                            {/*    placeholder="Address"*/}
                            {/*    onChange={(value) => {console.log(value)}}*/}
                            {/*    options={options}*/}
                            {/*    defaultValue={address}*/}
                            {/*/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">City</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setCity(e.target.value)} defaultValue={city} placeholder='City' type="text"/>*/}
                            <TextArea onChange={(e) => setCity(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={city} placeholder='City' type="text"/>

                            {/*<Select*/}
                            {/*    mode="tags"*/}
                            {/*    style={{*/}
                            {/*        width: '100%',*/}
                            {/*        marginTop: '5px',*/}
                            {/*        marginBottom: '5px'*/}
                            {/*    }}*/}
                            {/*    placeholder="City"*/}
                            {/*    onChange={(value) => {console.log(value)}}*/}
                            {/*    options={options}*/}
                            {/*    defaultValue={[city]}*/}
                            {/*/>*/}
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Postal Code</span>
                            <TextArea onChange={(e) => setPostalCode(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={postalCode} placeholder='Postal Code' type="text"/>

                            {/*<Select*/}
                            {/*    mode="tags"*/}
                            {/*    style={{*/}
                            {/*        width: '100%',*/}
                            {/*        marginTop: '5px',*/}
                            {/*        marginBottom: '5px'*/}
                            {/*    }}*/}
                            {/*    placeholder="Postal Code"*/}
                            {/*    onChange={(value) => {console.log(value)}}*/}
                            {/*    options={options}*/}
                            {/*    defaultValue={postalCode}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
                <div className='addProductRight'>
                    <div className="rightElem">
                        <div className='rightElemName switchElems'>
                            <span onClick={() => setSpanSwitcher(true)} style={{background: spanSwitcher && '#06C0B0',  color: spanSwitcher && '#FFFFFF'}}>%</span>
                            <span onClick={() => setSpanSwitcher(false)} style={{background: !spanSwitcher && '#06C0B0',  color: !spanSwitcher && '#FFFFFF'}}>€</span>
                        </div>
                        <div className='rightElemValue rightElemValueMB'>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'CP'}/><span></span>
                        </div>

                        <div className='rightElemValue rightElemValueMB'>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'DP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'SDP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled type="text" defaultValue={'MBP'}/><span></span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: !spanSwitcher && '#93E1DB',  color: !spanSwitcher && '#FFFFFF'}}>
                            <span><img src={moveStockImage} alt=""/></span>Price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceCP(e.target.value)} type="number" value={spanSwitcher ? currentPriceCP : parseFloat(parseFloat(marketPriceCP).toFixed(2))} defaultValue={marketPriceCP}/><span>€</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceDP(e.target.value)} type="number" value={spanSwitcher ? currentPriceDP : parseFloat(parseFloat(marketPriceDP).toFixed(2))} defaultValue={marketPriceDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceSDP(e.target.value)} type="number" value={spanSwitcher ? currentPriceSDP : parseFloat(parseFloat(marketPriceSDP).toFixed(2))} defaultValue={marketPriceSDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPrice(e.target.value)} type="number" value={spanSwitcher ? currentPrice : parseFloat(parseFloat(marketPrice).toFixed(2))} defaultValue={marketPrice}/><span>€</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB',  color: '#FFFFFF'}}>
                            <span><img src={arrowImage} alt=""/></span>Entry price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceCP(e.target.value)} type="number" value={entryPriceCP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceDP(e.target.value)} type="number" value={entryPriceDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceSDP(e.target.value)} type="number" value={entryPriceSDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => changeEntryPriceHandler(e)} type="number" value={entryPrice}/><span style={{color: '#00AB55'}}>€</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName'>
                            <span><img src={eurImage} alt=""/></span>Profit
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitCP(e.target.value)} type="number" value={spanSwitcher ? currentProfitCP : currentMargentCPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitDP(e.target.value)} type="number" value={spanSwitcher ? currentProfitDP : currentMargentDPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitSDP(e.target.value)} type="number" value={spanSwitcher ? currentProfitSDP : currentMargentSDPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfit(e.target.value)} type="number" value={spanSwitcher ? currentProfit : currentMargentProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: spanSwitcher && '#93E1DB', color: spanSwitcher && '#FFFFFF'}}>
                            <span><img src={prosImage} alt=""/></span>Margent
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentCP(e.target.value)} type="number"  value={spanSwitcher ? margentCP : currentMargentCP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentDP(e.target.value)} type="number"  value={spanSwitcher ? margentDP : currentMargentDP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentSDP(e.target.value)} type="number"  value={spanSwitcher ? margentSDP : currentMargentSDP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargent(e.target.value)} type="number"  value={spanSwitcher ? margent : currentMargent}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB',  color: '#FFFFFF'}}>
                            <span><img style={{width: '40px', height: '40px'}} src={TAX} alt=""/></span>IVA
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVACP(e.target.value)} type="number" value={IVACP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVADP(e.target.value)} type="number" value={IVADP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVASDP(e.target.value)} type="number" value={IVASDP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => changeIVAHandler(e)} type="number" value={IVA}/><span style={{color: '#000000'}}>%</span>
                        </div>
                    </div>
                    <div className="rightElem" style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='rightElemSave' onClick={() => {updateProd()}}>
                            Save
                        </div>
                        <div className='rightElemBack' onClick={() =>                 dispatch(setValue(2))
                        }>
                            Back
                        </div>
                        <div className='rightElemBack' onClick={() => copyProd()}>
                            Copy
                        </div>
                        <div className='rightElemDelete' onClick={() => {deleteProd()}}>
                            Delete
                        </div>
                    </div>

                    {/*<div className="rightElemPosAbsolute">*/}
                    {/*    <div className='rightElemSave' onClick={() => {updateProd()}}>*/}
                    {/*        Save*/}
                    {/*    </div>*/}
                    {/*    <div className='rightElemBack' onClick={() => setAddProduct(2)}>*/}
                    {/*        Back*/}
                    {/*    </div>*/}
                    {/*    <div className='rightElemBack' onClick={() => copyProd()}>*/}
                    {/*        Copy*/}
                    {/*    </div>*/}
                    {/*    <div className='rightElemDelete' onClick={() => {deleteProd()}}>*/}
                    {/*        Delete*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>

            <OrdersComponentContact/>

        </div>
    );
};

export default ChangeContact;