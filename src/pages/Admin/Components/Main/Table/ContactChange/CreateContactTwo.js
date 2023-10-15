import React, {useEffect, useMemo, useState} from 'react';
import '../ChangeCatalogItem/CatalogItem.scss'
import axios from "axios";
import noImg from '../../../../../../assets/av.svg'
import arrowImage from "./images/arrow.svg";
import moveStockImage from "./images/Move Stock.svg";
import prosImage from "./images/prose.svg";
import eurImage from "./images/€.svg";

import turn from "./images/turn.svg";
import debt from "./images/debt.svg";
import timeIcon from "./images/time.svg";

import prft from "./images/prft.svg";
import {AiOutlineLike} from "react-icons/ai";
import {AiOutlineDislike} from "react-icons/ai";

import {BsPlus} from "react-icons/bs";
import {CgClose} from "react-icons/cg";
import TAX from "./images/TAX.png";
import {setValue} from "../../../../features/setAddProdAdmin";
import {useDispatch, useSelector} from "react-redux";
import {setallProductsSlice} from "../../../../features/allProducts";
import {notification, Space, Select, Input} from "antd";
import OrdersComponent from "../OrdersComponent";
import OrderContainer from "../TableContainer/OrderContainer";
import OrdersComponentContact from "../OrdersComponentContact";
import { Rate } from 'antd';
import { Progress } from 'antd';
import {AiOutlineArrowLeft} from "react-icons/ai";
import {addallContacts, createContact, updateContact} from "../../../../features/allContacts";
import chocoIcon from "./images/chocoicon.svg";
import whatsappIcon from "./images/whatsappIcon.svg";
import webIcon from "./images/WebIcon.svg";
import tgIcon from "../images/telegramIcon.svg";
import cIcon from "./images/C.svg";
import {GrLanguage} from "react-icons/gr";
import {FaTelegramPlane, FaWhatsapp} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";



const { TextArea } = Input;





const CreateContactTwo = ({allProducts, setAllProducts, currentElem}) => {

    const [currentFileImage, setCurrentFileImage] = useState('')
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0)
    const [spanSwitcher, setSpanSwitcher] = useState(true)
    const [calcSwitcher, setCalcSwitcher] = useState(true)
    const [clientInfoSwitcher, setClientInfoSwitcher] = useState(2)

    const allContacts = useSelector((state) => state.allContacts.allContacts)
    const allOrders = useSelector((state) => state.allOrders.allOrders)

    const [solvencia, setSolvencia] = useState(false)
    const [dificilidad, setDificilidad] = useState(false)
    const [extraPedidos, setExtraPedidos] = useState(false)


    const [prodName, setProdName] = useState('')
    const [enabled, setEnabled] = useState(1);
    const [tradeName, setTradeName] = useState('')
    const [tipo, setTipo] = useState('')
    const [group, setGroup] = useState('')

    const [emailContact, setEmailContact] = useState('')
    const [contactType, setContactType] = useState('client')
    const [timePicker, setTimePicker] = useState(1)

    const [sortQuantityOrPrice, setSortQuantityOrPrice] = useState(1)

    const [username, setUserName] = useState('')
    const [employee, setEmployee] = useState('')
    const [responsable, setResponsable] = useState('')

    const activeAcc = useMemo(() => {
        return 'browser'
    }, [])

    const [marketPrice, setMarketPrice] = useState(0)
    const [entryPrice, setEntryPrice] = useState(0)
    const [profit, setProfit] = useState(0)
    const [margent, setMargent] = useState(0)
    const [IVA, setIVA] = useState(0)

    const [marketPriceDP, setMarketPriceDP] = useState(0)
    const [entryPriceDP, setEntryPriceDP] = useState(0)
    const [profitDP, setProfitDP] = useState(0)
    const [margentDP, setMargentDP] = useState(0)
    const [IVADP, setIVADP] = useState(0)

    const [marketPriceSDP, setMarketPriceSDP] = useState(0)
    const [entryPriceSDP, setEntryPriceSDP] = useState(0)
    const [profitSDP, setProfitSDP] = useState(0)
    const [margentSDP, setMargentSDP] = useState(0)
    const [IVASDP, setIVASDP] = useState(0)


    const [marketPriceCP, setMarketPriceCP] = useState(0)
    const [entryPriceCP, setEntryPriceCP] = useState(0)
    const [profitCP, setProfitCP] = useState(0)
    const [margentCP, setMargentCP] = useState(0)
    const [IVACP, setIVACP] = useState(0)


    const [tags, setTags] = useState('')
    const [IBAN, setIBAN] = useState('')
    const [SWIFT, setSWIFT] = useState('')
    const [nif, setNIF] = useState('')
    const [cif, setCIF] = useState('')
    const [address, setAddress] = useState('')

    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')


    const [openUserInfo, setOpenUserInfo] = useState([]);

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


    const enableHandler = () => {
        setEnabled((prev) => !prev)
    }


    const createProd = () => {
        // const formData = new FormData();

        let informData =  {
            img: currentFileImage,
            name: prodName,
            tradeName: tradeName,
            tags: tags,
            phone: phone,
            email: emailContact,
            type: contactType,
            iban: IBAN,
            code: code,
            enabled: enabled,
            swift: SWIFT,
            nif: nif,
            cif: cif,
            solvencia: solvencia,
            dificilidad: dificilidad,
            extraPedidos: extraPedidos,
            billAddress: {address: address, city: city, postalCode: postalCode},
            rate: rateValue,
            time: timer,
            tipo: tipo,
            group: group,
            employee: employee,
            responsable: responsable,
            username: username
        };

        console.log(informData)
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://tpomobi.shop/createContactAdmin', {data: informData}).then(async function(response) {
            await openNotification('top');
            dispatch(createContact({...informData, "id": response.data.insertedId, "_id": response.data.insertedId}))
            setTimeout(() => {dispatch(setValue(2));}, 2000)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const changeName = (e) => {
        setProdName(e.target.value)
    }

    const [openModal, setOpenModal] = useState(false)
    const [checkboxContact,setCheckboxContact ] = useState(contactType ? (contactType != 'client' ? 1 : 2) : 2)
    const [checkboxContactAmbassador,setCheckboxContactAmbassador ] = useState(false)


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
        formData.append('currentElemId', '')
        // axios.post('https://tpomobi.shop/uploadPhotoContact', formData,{
        // }).then((res) => {
        //     setCurrentFileImage(res.data)
        // })

    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
            message: `Save Completed.`,
            placement,
        });
    };

    const [options, setOptions] = useState([{value: 'client', label: 'client'}, {value: 'supplier', label: 'supplier'}, {value: 'user', label: 'user'}, {value: 'ambassador', label: 'ambassador'}])
    const [optionsTime, setOptionsTime] = useState([{value: 'Month', label: 'Month'}, {value: 'Year', label: 'Year'}])


    const [rateDesc, setRateDesc] = useState(['terrible', 'bad', 'normal', 'good', 'wonderful']);
    const [rateValue, setRateValue] = useState(0)


    const optionsPhone = useMemo(() => {
        if(Array.isArray(phone)) {
            return phone.map((el, index) => {
                return {value: el, label: el}
            })
        }else{
            return [{value: phone, label: phone}]
        }
    }, [])

    const optionsIBAN = useMemo(() => {
        if(Array.isArray(IBAN)) {
            return IBAN.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: IBAN, label: IBAN}]
        }
    }, [])

    const optionsSWIFT = useMemo(() => {
        if(Array.isArray(SWIFT)) {
            return SWIFT.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: SWIFT, label: SWIFT}]
        }
    }, [])

    const optionsCIF = useMemo(() => {
        if(Array.isArray(cif)) {
            return cif.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: cif, label: cif}]
        }
    }, [])

    const optionsNIF = useMemo(() => {
        if(Array.isArray(nif)) {
            return nif.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: nif, label: nif}]
        }
    }, [])

    const allContactTradesNameHandler = useMemo(() => {
        let array = allContacts.filter(el => el.type == 'client' && el.tradeName)
        return array.map((el, index) => {
            return {value: el.tradeName, label: el.tradeName, key: index}
        })
    }, [])

    const [inputSearch, setInputSearch] = useState('')
    const searchFilterAddProducts = useMemo(() => {
        return allProducts.filter(elem => {
            return String(elem.name).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.sku).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.category).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(inputSearch.toLowerCase())
        })
    }, [allProducts, inputSearch])

    const currentClient = useMemo(() => {
        let buff = allContacts.filter(el => {
            if (el.type == 'userUnion' && el.tradeName == tradeName) {
                return true
            }

        })
        return buff.map(el => el.phone)
    }, [tradeName])



    const currentUsersUnion = useMemo(() => {
        return allContacts.filter(el => {
            if (el.type == 'userUnion' && el.tradeName == tradeName) {
                return true
            }

        })
    }, [tradeName])



    const allClientOrders = useMemo(() => {

        return allOrders.filter(elem => {
            if(contactType == 'client') {

                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })


    }, [tradeName])


    const allProductsStats = useMemo(() => {
        const outputArray = [];
        if(sortQuantityOrPrice == 1){
            allClientOrders.forEach((group) => {
                group.items.forEach((item) => {
                    const existingItem = outputArray.find((outputItem) => outputItem.sku === item.sku);

                    if (existingItem) {
                        existingItem.quantity += item.quantity;
                    } else {
                        outputArray.push({ ...item });
                    }
                });
            });
            outputArray.sort((a, b) => b.quantity - a.quantity);

        }else if(sortQuantityOrPrice == 2){
            allClientOrders.forEach((group) => {
                group.items.forEach((item) => {
                    const existingItem = outputArray.find((outputItem) => outputItem.sku === item.sku);

                    if (existingItem) {
                        existingItem.marketPriceCP += item.marketPriceCP;
                    } else {
                        outputArray.push({ ...item });
                    }
                });
            });
            outputArray.sort((a, b) => b.marketPriceCP - a.marketPriceCP);

        }
        return outputArray // answer
    }, [allClientOrders, sortQuantityOrPrice, tradeName])

    const turnoverOneUser = (currentClient, allClientOrders) => {

        let buff = allClientOrders.filter(elem => {
            if(contactType == 'client') {

                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })



        return buff.map(elem => {

            return parseFloat(elem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))


        }).reduce((acc, curr) => acc + curr, 0).toFixed(2)

    }
    const orderLenghtUser = (currentClient, allOrders) => {

        return allOrders.filter(elem => {
            if(contactType == 'client') {
                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })


    }


    const turnoverAll = useMemo(() => {

        let buff = allOrders.filter(elem => {
            if(contactType == 'client') {

                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })




        return buff.map(elem => {

            return parseFloat(elem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))


        }).reduce((acc, curr) => acc + curr, 0).toFixed(2)


    }, [allOrders, tradeName])


    const debtAll = useMemo(() => {

        let buff = allOrders.filter(elem => {
            if(contactType == 'client') {

                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })




        return (buff.map(elem => {

            return parseFloat(elem.paidValue) ?
                ((elem.items.map((items) => items.marketPriceCP != ''
                    ?
                    parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)-(parseFloat(elem.paidValue).toFixed(2) || 0)).toFixed(2))
                :
                elem.items.map((items) => items.marketPriceCP != ''
                    ?
                    parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)

        })).reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)


    }, [allOrders, tradeName])


    const profitAll = useMemo(() => {

        let buff = allOrders.filter(elem => {
            if(contactType == 'client') {

                // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                if (currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)) {
                    return elem
                }
            }

            // if(currentUser.type == 'user'){
            //     if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
            //     }
            // }
            if(contactType == 'userUnion'){
                if(elem.msg?._data?.from.split('@')[0] == currentElem.phone || elem.userAcc?.phone == currentElem.phone || currentElem.phone == elem.userAcc?.findItem?.phone){
                    return elem
                }
            }
        })




        return buff.map(elem => {

            return parseFloat(elem.items.map((items) => items.marketPriceCP != '' ? (parseFloat(items.marketPriceCP*(items.quantity || 1)) - parseFloat(items.ourPrice*(items.quantity || 1))) * (1-parseFloat(items.IVA)/100) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))

        }).reduce((acc, curr) => acc + curr, 0).toFixed(2)


    }, [allOrders, tradeName])


    return (
        <div className='tableMainClass'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='textPlusSwitcher'>
                <div className='topicText' onClick={() => dispatch(setValue(2))}><span style={{display: 'flex', alignItems: 'center', justifyContent:'center', position: 'relative', marginRight: '5px', color: '#2E2E2E'}}><AiOutlineArrowLeft/></span>Contacts - Change Contact</div>

                {/*<div className='switchElemsLanding'>*/}
                {/*    <span onClick={() => setCalcSwitcher(true)} style={{background: calcSwitcher && '#06C0B0',  color: calcSwitcher && '#FFFFFF'}}>Standart</span>*/}
                {/*    <span onClick={() => setCalcSwitcher(false)} style={{background: !calcSwitcher && '#06C0B0',  color: !calcSwitcher && '#FFFFFF'}}>Сalculator</span>*/}
                {/*</div>*/}
            </div>

            <div className='addContactContainer'>
                <div className='addContactContainerLeft'>
                    <div className="addContactContainerTop">
                        <div className="addContactContainerTopElem1" style={{background:checkboxContact==1 ? "#B4B8DA":"#AAEAF8"}}>
                            <div className="addContactContainerTopElem1Left" >
                                <div className='addContactImg'>
                                    <img src={currentFileImage || noImg} alt=""/>
                                    <input type="file" onChange={(e) => uploadImage(e.target.files[0], currentElem)}/>
                                </div>
                                <div className="userIdField">
                                    ID:6508b25be2e8a6bee5c120f6
                                </div>
                                <div className="clientStatusButtons">
                                    <div className="statusButton" >
                                        <div className=" statusButtonSpanDiv" style={{background:checkboxContact==1 ? "#06C0B0":"#D9D9D9",width:"40px"}}>
                                            <span style={{color:checkboxContact==1 ? "#FFF":"black"}}>User</span>
                                        </div>
                                        {/*<div className="checkboxClients"  onClick={() => setCheckboxContact(1)}>{checkboxContact==1 && "✔"}</div>*/}
                                        <div className="checkboxClients">{checkboxContact==1 && "✔"}</div>

                                    </div>
                                    <div className="statusButton">
                                        <div className=" statusButtonSpanDiv" style={{background:checkboxContact==2 ? "#06C0B0":"#D9D9D9",width:"45px"}}>
                                            <span style={{color:checkboxContact==2 ? "#FFF":"black"}}>Client</span>
                                        </div>
                                        {/*<div className="checkboxClients" onClick={() => setCheckboxContact(2)}>{checkboxContact==2 && "✔"}</div>*/}
                                        <div className="checkboxClients">{checkboxContact==2 && "✔"}</div>

                                    </div>
                                    <div className="statusButton">
                                        <div className=" statusButtonSpanDiv" style={{background:checkboxContactAmbassador ? "#06C0B0":"#D9D9D9",width:"91px"}}>
                                            <span style={{color:checkboxContactAmbassador ? "#FFF":"black"}}>Ambassador</span>
                                        </div>
                                        <div className="checkboxClients" onClick={() => setCheckboxContactAmbassador(prev => !prev)}>{checkboxContactAmbassador ? "✔" : ''}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="addContactContainerTopElem1Right">
                                <div className="someLinks">
                                    <img src={chocoIcon} alt=""/>
                                </div>
                                <div className="someLinks">
                                    <img src={whatsappIcon} alt=""/>
                                </div>
                                <div className="someLinks">
                                    <img src={webIcon} alt=""/>
                                </div>
                                <div className="someLinks">
                                    <img src={tgIcon} alt=""/>
                                </div>
                                <div className="someLinks">
                                    <img src={cIcon} alt=""/>
                                </div>
                                <div className="someLinks">
                                    <img src={chocoIcon} alt=""/>
                                </div>

                            </div>
                        </div>
                        <div className="addContactContainerTopElem2">
                            { checkboxContact==1 ?
                                <div className="addContactContainerTopElem2Left" style={{background:checkboxContact==1 ? "#B4B8DA":"#AAEAF8"}}>
                                    <div className="textElem"><span className='textElemName'>Username</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>TEST USERNAME</span>*/}
                                        <Input onChange={(e) => setUserName(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} value={username} placeholder='Username' type="text"/>
                                    </div>
                                    <div className="textElem"><span className='textElemName'>Name</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>TEST NAME</span>*/}
                                        <Input onChange={(e) => changeName(e)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} value={prodName} placeholder='Name' type="text"/>

                                        {/*<Input onChange={(e) => setTradeName(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={tradeName} placeholder='Codigo' type="text"/>*/}
                                    </div>
                                    <div className="textElem"><span className='textElemName'>Employee</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>🍸 Coctelero</span>*/}
                                        <Input onChange={(e) => setEmployee(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} value={employee} placeholder='🍸 Coctelero' type="text"/>
                                    </div>
                                    <div className="textElem">
                                        <span className='textElemName'>Responsable:</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>Bar</span>*/}

                                        <Input onChange={(e) => setResponsable(e.target.value)} style={{cursor: 'pointer', height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} value={responsable} placeholder='Bar' type="text"/>
                                    </div>
                                    <div className="textElem">
                                        <span className='textElemName'>Client</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>1TMR</span>*/}
                                        {/*<Input onChange={(e) => setTradeName(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={tradeName} placeholder='Codigo' type="text"/>*/}

                                        <Select
                                            size={'small'}
                                            style={{
                                                marginTop: '5px',
                                                marginBottom: '5px',
                                                height: '23px',
                                                width: 'auto',
                                                minWidth: '63%',
                                            }}
                                            filterOption={(input, option) => {
                                                return (
                                                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );

                                            }}
                                            showSearch
                                            placeholder="Code"
                                            onChange={(value) => {setTradeName(value)}}
                                            options={allContactTradesNameHandler}
                                            defaultValue={() => {
                                                let bf = [];
                                                allContactTradesNameHandler.forEach((el, index) => el.label == tradeName && bf.push(el.label))
                                                return bf
                                            }}
                                        />
                                        {/*<Select*/}
                                        {/*    style={{*/}
                                        {/*        width: '80%',*/}
                                        {/*        marginTop: '5px',*/}
                                        {/*        marginBottom: '5px',*/}
                                        {/*        maxWidth: '180px'*/}
                                        {/*    }}*/}
                                        {/*    placeholder="client/supplier"*/}
                                        {/*    onChange={(value) => {setContactType(value)}}*/}
                                        {/*    options={options}*/}
                                        {/*    defaultValue={contactType}*/}
                                        {/*/>*/}

                                    </div>
                                    <div className="textElem">
                                    <span className='textElemName'>Active account:
                                    </span>
                                        {/*{activeAcc.map(el => {*/}
                                        {/*    return (*/}

                                        {/*        <div style={{height:"23px", maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left',width: "92px",*/}
                                        {/*            justifyContent: "center",*/}
                                        {/*            alignItems: "center",*/}
                                        {/*            display:"flex",*/}
                                        {/*            borderRadius: "7px",*/}
                                        {/*            background: "#06C0B0"}}>*/}
                                        {/*    <span style={{color: "#FFF",*/}
                                        {/*        fontFamily: "Inter",*/}
                                        {/*        fontSize: "14px",*/}
                                        {/*        fontStyle: "normal",*/}
                                        {/*        fontWeight: "400",*/}
                                        {/*        lineHeight: "normal"*/}
                                        {/*    }}>*/}
                                        {/*        {el.platform}*/}
                                        {/*    </span>*/}
                                        {/*        </div>*/}

                                        {/*    )*/}
                                        {/*})}*/}
                                        {/*<Input onChange={(e) => setEmailContact(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={emailContact} placeholder='Email' type="text"/>*/}
                                        <div style={{display: 'flex', justifyContent: 'space-around', width: '70%', alignItems: 'center', alignContent: 'center'}}>
                                            {activeAcc.includes('browser') && <GrLanguage style={{color: 'black', fontSize: '20px'}}/>}
                                            {activeAcc.includes('telegram') && <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/>}
                                            {activeAcc.includes('whatsapp') && <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/>}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="addContactContainerTopElem2Left" style={{background:checkboxContact==1 ? "#B4B8DA":"#AAEAF8"}}>
                                    <div className="textElem">
                                        <span className='textElemName' style={{fontSize: '12px'}}>Cod:</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>1TMR</span>*/}
                                        <Input onChange={(e) => setTradeName(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={tradeName} placeholder='Codigo' type="text"/>
                                    </div>
                                    <div className="textElem"><span className='textElemName'>Name:</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>Tamarindo BCN </span>*/}
                                        <Input onChange={(e) => changeName(e)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={prodName} placeholder='Name' type="text"/>
                                    </div>
                                    <div className="textElem"><span className='textElemName'>Google maps:</span>
                                        <a href='#' style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left', display: 'flex', alignItems: 'center'}}>Go to link</a>
                                        {/*<Input onChange={(e) => changeName(e)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={prodName} placeholder='Name' type="text"/>*/}
                                    </div>
                                    <div className="textElem">
                                        <span className='textElemName'>Tipo:</span>
                                        {/*<span style={{height: '23px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}}>Restaurant</span>*/}
                                        <Input style={{cursor: 'pointer', height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={'Restaurant'} value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder='Restaurant' type="text"/>
                                    </div>
                                    <div className="textElem">
                                        <span className='textElemName'>Group:</span>
                                        {/*<span style={{height: '23px', maxWidth: '220px', margin: '2.5px 0px'}}>Tamarindo restaurants </span>*/}
                                        <Input style={{cursor: 'pointer', height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={'Tamarindo Restaurants'} value={group} onChange={(e) => setGroup(e.target.value)} placeholder='Tamarindo Restaurants' type="text"/>

                                        {/*<Select*/}
                                        {/*    style={{*/}
                                        {/*        width: '80%',*/}
                                        {/*        marginTop: '5px',*/}
                                        {/*        marginBottom: '5px',*/}
                                        {/*        maxWidth: '180px'*/}
                                        {/*    }}*/}
                                        {/*    placeholder="client/supplier"*/}
                                        {/*    onChange={(value) => {setContactType(value)}}*/}
                                        {/*    options={options}*/}
                                        {/*    defaultValue={contactType}*/}
                                        {/*/>*/}

                                    </div>
                                    <div className="textElem">
                                        <span className='textElemName'>Active account:</span>
                                        {/*<div style={{height:"23px", maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left',width: "92px",*/}
                                        {/*    justifyContent: "center",*/}
                                        {/*    display:"flex",*/}
                                        {/*    alignItems: "center",*/}
                                        {/*    borderRadius: "7px",*/}
                                        {/*    background: "#06C0B0"}}>*/}
                                        {/*    <span style={{color: "#FFF",*/}
                                        {/*        fontFamily: "Inter",*/}
                                        {/*        fontSize: "14px",*/}
                                        {/*        fontStyle: "normal",*/}
                                        {/*        fontWeight: "400",*/}
                                        {/*        lineHeight: "normal"}}>Consentio</span>*/}
                                        {/*</div>*/}
                                        <div style={{display: 'flex', justifyContent: 'space-around', width: '70%', alignItems: 'center', alignContent: 'center'}}>
                                            {activeAcc.includes('browser') && <GrLanguage style={{color: 'black', fontSize: '20px'}}/>}
                                            {activeAcc.includes('telegram') && <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/>}
                                            {activeAcc.includes('whatsapp') && <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/>}
                                        </div>
                                        {/*<Input onChange={(e) => setEmailContact(e.target.value)} style={{height: '28px', maxWidth: '180px', margin: '2.5px 0px', textAlign: 'left'}} defaultValue={emailContact} placeholder='Email' type="text"/>*/}

                                    </div>
                                </div>
                            }
                            <div className="addContactContainerTopElem2Right">

                                <div className='qtsTop'>
                                    <div className="quarterTopLeft">
                                        <div className='imgBlock'>
                                            <img src={turn} alt=""/>
                                            <span style={{fontSize: '14px'}} className='number'>{turnoverAll}€</span>
                                        </div>
                                        <div className='nameBlock'>
                                            Turnover
                                        </div>
                                    </div>
                                    <div className="quarterTopRight">
                                        <div className='imgBlock'>
                                            <img style={{marginLeft: '10px'}} src={prft} alt=""/>
                                            <span style={{fontSize: '14px'}} className='number'>{profitAll}€</span>
                                        </div>
                                        <div className='nameBlock'  style={{marginLeft: '10px'}}>
                                            Profit
                                        </div>
                                    </div>
                                </div>
                                <div className='qtsBottom'>
                                    <div className="quarterBottomLeft">
                                        <div className='imgBlock'>
                                            <img src={timeIcon} alt=""/>
                                            <input align="right" type="text" className='number' value={timer} onChange={(e)=>
                                            {
                                                setTimer(e.target.value)
                                            }} style={{
                                                width:"40px",
                                                marginLeft: "8px",
                                                color: "#575757",
                                                fontFamily: "Inter",
                                                fontSize: "20px",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "normal",
                                                display: "inline-flex",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign:"right",
                                            }}/>
                                            {/*<span className='number'>45min</span>*/}
                                            <span className="number" style={{marginLeft:2}}> min</span>

                                        </div>
                                        <div className='nameBlock'>
                                            Tiempo de picking
                                        </div>
                                    </div>
                                    <div className="quarterBottomRight">
                                        <div className='imgBlock'>
                                            <img style={{marginLeft: '10px'}} src={debt} alt=""/>
                                            <span style={{fontSize: '14px'}} className='number'>{debtAll.toFixed(2)}€</span>
                                        </div>
                                        <div className='nameBlock' style={{marginLeft: '10px'}}>
                                            Debt
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="addContactContainerTopElem3">
                            <div>
                                Margen medio
                                <Select
                                    style={{
                                        width: '80%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '180px'
                                    }}
                                    placeholder="client/supplier"
                                    onChange={(value) => {setContactType(value)}}
                                    options={optionsTime}
                                    defaultValue={timePicker}
                                />
                            </div>
                            <Progress type="circle" percent={75} size={[150, 400]} strokeWidth={10} strokeColor={'#F1C52B'} style={{fontSize: '32px', fontWeight: '600'}}/>
                        </div>
                    </div>
                    <div className="addContactContainerBottom">
                        <div className="addContactContainerBottomElem1">
                            <div className="addContactContainerBottomElem1One">
                                <div className='ratingStars'>
                                    <span className='rateText'>Rating interna:</span>
                                    <Rate allowHalf tooltips={rateDesc} onChange={(e) => setRateValue(e)} value={rateValue}/>
                                </div>
                                <div className="someElemsDiv">
                                    <div className="someElems">
                                        <div className='titleSpan'>
                                            Solvencia:
                                        </div>
                                        <div style={{display: 'flex'}}>
                                        <span className='likeSpan' onClick={() => {
                                            setSolvencia(true)
                                        }} style={{color: solvencia && '#00E471'}}><AiOutlineLike/></span>
                                            <span className='dislikeSpan' onClick={() => {
                                                setSolvencia(false)
                                            }} style={{color: !solvencia && '#FB547E'}}><AiOutlineDislike/></span>
                                        </div>
                                    </div>
                                    <div className="someElems">
                                        <div className='titleSpan'>
                                            Dificilidad:
                                        </div>
                                        <div style={{display: 'flex'}}>
                                        <span className='likeSpan' onClick={() => {
                                            setDificilidad(true)
                                        }} style={{color: dificilidad && '#00E471'}}><AiOutlineLike/></span>
                                            <span className='dislikeSpan' onClick={() => {
                                                setDificilidad(false)
                                            }} style={{color: !dificilidad && '#FB547E'}}><AiOutlineDislike/></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="addContactContainerBottomElem1Two" onClick={() => setExtraPedidos(prev => !prev)}>
                                    <div>Extra pedidos:</div>
                                    <span style={{background: !extraPedidos && 'red'}}>{extraPedidos ? "Yes" : "No"}</span>
                                </div>
                            </div>

                        </div>
                        <div className="addContactContainerBottomElem2">


                            <div className='infoTop'>
                                <span className='infoTopText'>Rentabilidad potencial/real</span>
                                <Select
                                    style={{
                                        width: '80%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '180px'
                                    }}
                                    placeholder="client/supplier"
                                    onChange={(value) => {setContactType(value)}}
                                    options={optionsTime}
                                    defaultValue={timePicker}
                                />
                            </div>
                            <div className='infoBottom'>
                                <div className='infoBottomText'>
                                    <div className='infoBottomTextBlock'>
                                        <span>Potencial</span>
                                        <div style={{color: '#c4371a'}}>
                                            75%
                                        </div>
                                    </div>
                                    <div className='infoBottomTextBlock'>
                                        <span>Real</span>
                                        <div style={{color: '#52c41a'}}>30%</div>
                                    </div>
                                </div>
                                <div className='progressBlock'>
                                    <Progress type="circle" percent={75} success={{
                                        percent: 30,
                                    }}
                                              size={[150, 400]}
                                              strokeWidth={10}
                                              strokeColor={'#c4371a'}
                                              style={{fontSize: '32px', fontWeight: '600'}}/>
                                </div>

                            </div>

                        </div>
                        <div className="addContactContainerBottomElem3">


                            <div className="textElem"><span className='textElemName'>Phone</span>
                                <Input
                                    showSearch={true}
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '379.63px',
                                        textAlign: 'left'
                                    }}
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(value) => {setPhone(value.target.value)}}
                                    defaultValue={Array.isArray(optionsPhone) ? optionsPhone.map(el => el.value) : [optionsPhone.value]}
                                />
                            </div>
                            <div className="textElem"><span className='textElemName'>IBAN</span>
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '379.63px'
                                    }}
                                    placeholder="IBAN"
                                    onChange={(value) => {setIBAN(value)}}
                                    options={optionsIBAN}
                                    defaultValue={Array.isArray(optionsIBAN) ? optionsIBAN.map(el => el.value) : [optionsIBAN.value]}
                                />                            </div>
                            <div className="textElem"><span className='textElemName'>SWIFT</span>
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '379.63px'
                                    }}
                                    placeholder="SWIFT"
                                    onChange={(value) => {setSWIFT(value)}}
                                    options={optionsSWIFT}
                                    defaultValue={Array.isArray(optionsSWIFT) ? optionsSWIFT.map(el => el.value) : [optionsSWIFT.value]}
                                />
                            </div>
                            <div className="textElem"><span className='textElemName'>NIF</span>
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '379.63px'
                                    }}
                                    placeholder="NIF"
                                    onChange={(value) => {setNIF(value)}}
                                    options={optionsNIF}
                                    defaultValue={Array.isArray(optionsNIF) ? optionsNIF.map(el => el.value) : [optionsNIF.value]}
                                />
                            </div>
                            <div className="textElem"><span className='textElemName'>CIF</span>
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        maxWidth: '379.63px'
                                    }}
                                    placeholder="CIF"
                                    onChange={(value) => {setCIF(value)}}
                                    options={optionsCIF}
                                    defaultValue={Array.isArray(optionsCIF) ? optionsCIF.map(el => el.value) : [optionsCIF.value]}
                                />
                            </div>

                            <div className="textElem"><span className='textElemName'>Address</span>
                                <TextArea onChange={(e) => setAddress(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '2.5px 0px'}} defaultValue={address} placeholder='Address' type="text"/>

                            </div>
                            <div className="textElem"><span className='textElemName'>City</span>

                                <TextArea onChange={(e) => setCity(e.target.value)} style={{height: '28px', maxWidth: '379.63px', margin: '2.5px 0px'}} defaultValue={city} placeholder='City' type="text"/>



                            </div>




                        </div>
                    </div>
                </div>
                <div className='addContactContainerRight'>
                    <div  className='addContactContainerRightUpperSwitcher'>
                        <div className="addContactContainerRightUpperSwitcherValue" style={{width: contactType == 'client' ? '180px' : '100%', background: clientInfoSwitcher == 1 && 'white', color: clientInfoSwitcher == 1 && 'black'}} onClick={() => setClientInfoSwitcher(2)}>Top ordered products</div>
                        <div className="addContactContainerRightUpperSwitcherValue" style={{width: '122px', background: clientInfoSwitcher == 2 && 'white', color: clientInfoSwitcher == 2 && 'black'}} onClick={() => setClientInfoSwitcher(1)}>Users</div>
                    </div>

                    {clientInfoSwitcher == 1 &&
                        <div className='addContactContainerRightStats' style={{marginLeft: '3px', marginRight: '10px'}}>
                            <div className="addContactContainerRightStatsElem" style={{justifyContent: 'flex-start'}}>

                                <div className="addContactContainerRightStatsElemBlock" style={{color: '#06C0B0', justifyContent: 'flex-start', width: '125px'}}>Total</div>
                                <div className="addContactContainerRightStatsElemBlock" style={{justifyContent: 'flex-start'}}>

                                    <span>✔</span>
                                    <div style={{color: '#C0C0C0'}}>Showing 1-{currentUsersUnion.length}</div>

                                </div>
                            </div>
                            <div className="addContactContainerRightStatsElem">

                                <div className="addContactContainerRightStatsElemBlock">Users</div>
                                <div className="addContactContainerRightStatsElemBlock" style={{color: '#06C0B0', width: '60px'}}>{currentUsersUnion.length}</div>
                            </div>
                            <div className="addContactContainerRightStatsElem">

                                <div className="addContactContainerRightStatsElemBlock">Orders</div>
                                <div className="addContactContainerRightStatsElemBlock" style={{color: '#06C0B0', width: '70px'}}>{allClientOrders.length}</div>
                            </div>
                            <div className="addContactContainerRightStatsElem">

                                <div className="addContactContainerRightStatsElemBlock">€</div>
                                <div className="addContactContainerRightStatsElemBlock" style={{color: '#06C0B0', width: '50px', paddingRight: '9px'}}>{turnoverAll}€</div>
                            </div>



                        </div>

                    }

                    <div className='addContactContainerRightStatsButtonLine'  style={{display: 'block', marginTop: '15px', height: "0.15px", width: "100%", background: "#A4A4A4"}}>
                    </div>
                    {clientInfoSwitcher == 1 &&
                        <div className='addContactContainerRightStats' style={{display: 'block', maxHeight: '400px', marginTop: '5px'}}>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', height: '418px', overflow: 'scroll'}}>
                                {/*{contactType == 'userUnion' && currentUsersUnion.map((el, index) => {*/}
                                {/*    return (*/}
                                {/*        <div>*/}
                                {/*            <div className='usersElem' style={{background: openUserInfo.includes(index) && '#F1F1F1', height: openUserInfo.includes(index) && '200px', borderBottom: openUserInfo.includes(index) && 'none', borderRadius: openUserInfo.includes(index) && '7px', marginBottom: openUserInfo.includes(index) && '5px', marginTop: openUserInfo.includes(index) && '5px', width: '319px'}}>*/}
                                {/*                <div className='userElemCard'>*/}
                                {/*                    <div className='userElemCardCheckBox'>*/}
                                {/*                        ✔*/}
                                {/*                    </div>*/}
                                {/*                    <div className='userElemCardName'>*/}
                                {/*                        {el.name}*/}
                                {/*                        <span>*/}
                                {/*                            {el.phone}*/}
                                {/*                        </span>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*                <div className='userElemCardName' style={{width: '40px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                                {/*                    {orderLenghtUser(el.phone, allClientOrders).length}*/}
                                {/*                </div>*/}
                                {/*                <div className='userElemCardName' style={{width: '70px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                                {/*                    {turnoverOneUser(el.phone, allClientOrders)}€*/}
                                {/*                </div>*/}
                                {/*                <div className='userElemArrowBottom' style={{transform: openUserInfo.includes(index) && 'rotate(180deg)'}} onClick={() => setOpenUserInfo(prev => prev.includes(index) ? prev.filter(e => e != index) : [...prev, index])}>*/}
                                {/*                    <IoIosArrowDown/>*/}
                                {/*                </div>*/}
                                {/*                {openUserInfo.includes(index) &&*/}
                                {/*                    <div className='userElemUsers'>*/}
                                {/*                        {allContacts.filter(e => {return (e.type == 'user' && (e.phone == el.phone || e.phone == el.phone[0]))}).map((el, index) => {*/}

                                {/*                            return (*/}
                                {/*                                <div className='userElemUsersElem'>*/}
                                {/*                                    <div className='userElemUsersElemCheckBoxAndPlarform' style={{width: '172px'}}>*/}
                                {/*                                        <div className='userElemUsersElemCheckBox'>*/}
                                {/*                                            ✔*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className='userElemUsersElemPlatform'>*/}

                                {/*                                            {el.platform.includes('browser') && <GrLanguage style={{color: 'black', fontSize: '20px'}}/>}*/}
                                {/*                                            {el.platform.includes('telegram') && <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/>}*/}
                                {/*                                            {el.platform.includes('whatsapp') && <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/>}*/}


                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className='userElemUsersElemValue' style={{width: '40px'}}>*/}
                                {/*                                        {orderLenghtUser(el.phone, allClientOrders).filter(e => e.type.includes(el.platform)).length}*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className='userElemUsersElemValue' style={{width: '70px'}}>*/}
                                {/*                                        {turnoverOneUser(el.phone, orderLenghtUser(el.phone, allClientOrders).filter(e => e.type.includes(el.platform)))}€*/}
                                {/*                                    </div>*/}



                                {/*                                </div>*/}
                                {/*                            )*/}
                                {/*                        })*/}
                                {/*                        }*/}
                                {/*                    </div>*/}
                                {/*                }*/}

                                {/*            </div>*/}




                                {/*            /!*{!openUserInfo.includes(index) && <div className='addContactContainerRightStatsButtonLine'  style={{display: 'block', marginTop: '15px', height: "0.15px", width: "319px", background: "#A4A4A4"}}>*!/*/}
                                {/*            /!*</div>}*!/*/}
                                {/*        </div>*/}
                                {/*    )*/}

                                {/*})}*/}

                                {contactType == 'client' && currentUsersUnion.map((el, index) => {
                                    return (
                                        <div>
                                            <div className='usersElem' style={{background: openUserInfo.includes(index) && '#F1F1F1', height: openUserInfo.includes(index) && '200px', borderBottom: openUserInfo.includes(index) && 'none', borderRadius: openUserInfo.includes(index) && '7px', marginBottom: openUserInfo.includes(index) && '5px', marginTop: openUserInfo.includes(index) && '5px', width: '319px'}}>
                                                <div className='userElemCard'>
                                                    <div className='userElemCardCheckBox'>
                                                        ✔
                                                    </div>
                                                    <div className='userElemCardName'>
                                                        {el.name}
                                                        <span>
                                                            {el.phone}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='userElemCardName' style={{width: '40px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    {orderLenghtUser(el.phone, allClientOrders).length}
                                                </div>
                                                <div className='userElemCardName' style={{width: '70px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    {turnoverOneUser(el.phone, allClientOrders)}€
                                                </div>
                                                <div className='userElemArrowBottom' style={{transform: openUserInfo.includes(index) && 'rotate(180deg)'}} onClick={() => setOpenUserInfo(prev => prev.includes(index) ? prev.filter(e => e != index) : [...prev, index])}>
                                                    <IoIosArrowDown/>
                                                </div>
                                                {openUserInfo.includes(index) &&
                                                    <div className='userElemUsers'>
                                                        {allContacts.filter(e => {return (e.type == 'user' && (e.phone == el.phone || e.phone == el.phone[0]))}).map((el, index) => {

                                                            return (
                                                                <div className='userElemUsersElem'>
                                                                    <div className='userElemUsersElemCheckBoxAndPlarform' style={{width: '172px'}}>
                                                                        <div className='userElemUsersElemCheckBox'>
                                                                            ✔
                                                                        </div>
                                                                        <div className='userElemUsersElemPlatform'>

                                                                            {el.platform.includes('browser') && <GrLanguage style={{color: 'black', fontSize: '20px'}}/>}
                                                                            {el.platform.includes('telegram') && <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/>}
                                                                            {el.platform.includes('whatsapp') && <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/>}


                                                                        </div>
                                                                    </div>
                                                                    <div className='userElemUsersElemValue' style={{width: '40px'}}>
                                                                        {orderLenghtUser(el.phone, allClientOrders).filter(e => e.type.includes(el.platform)).length}
                                                                    </div>
                                                                    <div className='userElemUsersElemValue' style={{width: '70px'}}>
                                                                        {turnoverOneUser(el.phone, orderLenghtUser(el.phone, allClientOrders).filter(e => e.type.includes(el.platform)))}€
                                                                    </div>



                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                }

                                            </div>




                                            {/*{!openUserInfo.includes(index) && <div className='addContactContainerRightStatsButtonLine'  style={{display: 'block', marginTop: '15px', height: "0.15px", width: "319px", background: "#A4A4A4"}}>*/}
                                            {/*</div>}*/}
                                        </div>
                                    )

                                })}
                            </div>


                            {/*<div className='addContactContainerRightStatsUserElem'>*/}
                            {/*    <div className="addContactContainerRightStatsElemBlock">*/}

                            {/*        <span>✔</span>*/}
                            {/*        <div style={{color: '#C0C0C0'}}>Showing 3-15</div>*/}

                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>

                    }
                    {clientInfoSwitcher == 2 &&

                        <div className='addContactContainerRightInfo'>
                            <div className="addContactContainerRightInfoLeft"><div style={{height: '20px', width: '20px', background: '#FB547E'}}> </div>1-3</div>
                            <div className="addContactContainerRightInfoLeft"><div style={{height: '20px', width: '20px',background: '#7376F9'}}> </div>4-6</div>
                            <div className="addContactContainerRightInfoLeft"><div style={{height: '20px', width: '20px',background: '#00AB55'}}> </div>7-10</div>

                            <div className="addContactContainerRightInfoRight">
                                <Select
                                    defaultValue={"Quantity"}
                                    placeholder=" "
                                    onChange={value =>  setSortQuantityOrPrice(value)}
                                    options={[
                                        {
                                            value: 1,
                                            label: 'Quantity',
                                        },
                                        {
                                            value: 2,
                                            label: 'Price',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    }

                    {clientInfoSwitcher == 2 &&
                        <div className='addContactContainerRightElemsContainer'>
                            <div className="addContactContainerRightElemsContainerElem" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                                <div>
                                    Products
                                </div>
                                <div>
                                    Qty
                                </div>
                            </div>

                            <div style={{height: '420px', overflow: 'auto'}}>
                                {

                                    allProductsStats.map(el => {
                                        return <div className="addContactContainerRightElemsContainerElem" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', textAlign: 'center'}}>
                                            <div className='addContactContainerRightElemsContainerElemProduct' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', textAlign: 'center'}}>
                                                <img style={{width: '50px'}} src={el.img} alt=""/>
                                                <span>{el.name}</span>
                                            </div>
                                            <div className='addContactContainerRightElemsContainerElemQty' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', textAlign: 'center'}}>
                                                {sortQuantityOrPrice == 1 ? el.quantity : el.marketPriceCP.toFixed(2) + '€'}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>

                    }

                </div>


            </div>

            <OrdersComponentContact createProd={createProd} currentUser={{}}/>

        </div>
    );
};

export default CreateContactTwo;