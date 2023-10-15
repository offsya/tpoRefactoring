import React, {useEffect, useMemo, useState} from 'react';
import './CatalogItem.scss'
import axios from "axios";
import noImg from '../../../../../../assets/av.svg'
import arrowImage from "./images/arrow.svg";
import moveStockImage from "./images/Move Stock.svg";
import prosImage from "./images/prose.svg";
import eurImage from "./images/€.svg";
import {BsPlus} from "react-icons/bs";
import {CgClose} from "react-icons/cg";
import {AiOutlineArrowLeft} from "react-icons/ai";

import TAX from "./images/TAX.png";
import {setValue} from "../../../../features/setAddProdAdmin";
import {useDispatch, useSelector} from "react-redux";
import {setallProductsSlice} from "../../../../features/allProducts";
import {notification, Space, Select, Input} from "antd";
const { TextArea } = Input;





const ChangeCatalogItem = ({allProducts, setAllProducts, currentElem}) => {

    const [currentFileImage, setCurrentFileImage] = useState(currentElem.img)
    const dispatch = useDispatch();
    const allContacts = useSelector((state) => state.allContacts.allContacts)

    const [spanSwitcher, setSpanSwitcher] = useState(true)
    const [calcSwitcher, setCalcSwitcher] = useState(true)
    const [SPOSwitcher, setSPOSwitcher] = useState(currentElem?.SPOSwitcher || false)


    const [prodName, setProdName] = useState(currentElem.name)
    const [enabled, setEnabled] = useState(currentElem.enabled);
    const [prodSKU, setProdSKU] = useState(currentElem.sku)
    const [prodSKUProveedor, setProdSKUProveedor] = useState(currentElem.skuProveedor)
    const [prodNameProveedor, setProdNameProveedor] = useState(currentElem.nameProveedor)
    console.log(currentElem)

    const [marketPriceSPO, setMarketPriceSPO] = useState(currentElem.SPOPrice || 0)
    const [entryPriceSPO, setEntryPriceSPO] = useState(currentElem.ourPrice || 0)
    const [profitSPO, setProfitSPO] = useState(0)
    const [margentSPO, setMargentSPO] = useState(currentElem.MBSPO || 0)
    const [IVASPO, setIVASPO] = useState(currentElem.IVASPO || 0)

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


    const [prodCategory, setProdCategory] = useState(currentElem.category)
    const [prodBrands, setProdBrands] = useState(currentElem.brand)
    const [prodBusinessType, setProdBusinessType] = useState(currentElem.businessType)


    const [decimal, setDecimal] = useState(currentElem.decimal)

    const [prodUnidad, setProdUnidad] = useState(currentElem.unit)
    const [prodWeight, setProdWeight] = useState(currentElem.weight)
    const [prodWeightUnits, setProdWeightUnits] = useState(currentElem.weightUnits)

    const [prodLtKg, setProdLtKg] = useState(currentElem.LtKg)
    const [dias, setDias] = useState(currentElem.dias || '')
    const [TBO, setTBO] = useState(currentElem.TBO || '')
    const [stock, setStock] = useState(currentElem.stock || '')
    const [email, setEmail] = useState(currentElem?.email || '')


    const [prodProveedor, setProdProveedor] = useState(currentElem.proveedor)
    const [prodDesc, setProdDesc] = useState(currentElem.desc)
    const [prodDimenL, setProdDimenL] = useState(currentElem.length)
    const [prodDimenW, setProdDimenW] = useState(currentElem.weight)
    const [prodDimenH, setProdDimenH] = useState(currentElem.height)

    const [minQt, setMinQt] = useState(currentElem.minQt)
    const [stockLocation, setStockLocation] = useState(currentElem.stand)
    const [stockLocationPlace, setStockLocationPlace] = useState(currentElem.place)
    const [stockLocationShelf, setStockLocationShelf] = useState(currentElem.shelf)

    const [qtStep, setQtStep] = useState(currentElem.quantityStep)



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
            sku: prodSKU,
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
            category: prodCategory,
            proveedor: prodProveedor,
            skuProveedor: prodSKUProveedor,
            nameProveedor: prodNameProveedor,
            unit: prodUnidad,
            desc: prodDesc,
            minQt: 7,
            IVA: IVA,
            IVADP: IVADP,
            IVASDP: IVASDP,
            IVACP: IVACP,
            enabled: enabled,
            status: currentElem.status,
            weight: prodWeight,
            LtKg: prodLtKg,
            dimensionL: prodDimenL,
            dimensionW: prodDimenW,
            dimensionH: prodDimenH,
            qtStep: qtStep,
            stockLocation: stockLocation,
            stockLocationShelf: stockLocationShelf,
            stockLocationPlace: stockLocationPlace
        };
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://tpomobi.shop/createProductAdmin', {data: informData}).then(function (response) {
            dispatch(setValue(2))
            dispatch(setallProductsSlice({...informData, "_id": response.data.insertedId}))
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
            sku: prodSKU,
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
            category: prodCategory,
            proveedor: prodProveedor,
            skuProveedor: prodSKUProveedor,
            nameProveedor: prodNameProveedor,
            unit: prodUnidad,
            desc: prodDesc,
            minQt: minQt,
            IVA: IVA,
            IVADP: IVADP,
            IVASDP: IVASDP,
            IVACP: IVACP,
            enabled: enabled,
            weight: prodWeight,
            LtKg: prodLtKg,
            length: prodDimenL,
            width: prodDimenW,
            height: prodDimenH,
            quantityStep: qtStep,
            stand: stockLocation,
            shelf: stockLocationShelf,
            place: stockLocationPlace,
            stock: stock,
            dias: dias,
            TBO: TBO,
            SPOPrice: spanSwitcher ? currentPriceSPO : marketPriceSPO,
            brand: prodBrands,
            businessType: prodBusinessType,
            decimal: decimal,
        };
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        axios.post('https://tpomobi.shop/updateProductAdmin', {data: informData, _id: currentElem._id}).then(async function(response) {
            await openNotification('top');
        })
            .catch(function (error) {
                console.log(error);
        });
    }

    const changeName = (e) => {
        setProdName(e.target.value)
    }

    const [openModal, setOpenModal] = useState(false)


    const currentPriceSPO = useMemo(() => {
        let price = (parseFloat(entryPriceSPO) + parseFloat(entryPriceSPO) * parseFloat(margentSPO)/100) + (parseFloat(entryPriceSPO) + parseFloat(entryPriceSPO) * parseFloat(margentSPO)/100)*parseFloat(IVA)/100;
        return price.toFixed(2);
    }, [entryPriceSPO, margentSPO, IVA])
    const currentProfitSPO = useMemo(() => {
        let profit = (parseFloat(currentPriceSPO) - parseFloat(entryPriceSPO)) * (1 - parseFloat(IVA) / 100)
        return profit.toFixed(2);
    }, [entryPriceSPO, margent, currentPriceSPO])
    const currentMargentProfitSPO = useMemo(() => {
        let withoutIVA = parseFloat(IVA) != 0 ? parseFloat(marketPriceSPO) - parseFloat((parseFloat(marketPriceSPO) * (parseFloat(IVA) / 100)).toFixed(2)) : parseFloat(marketPriceSPO)
        let margentProfit = ( withoutIVA - parseFloat(entryPriceSPO));
        return margentProfit.toFixed(2);
    }, [entryPriceSPO, marketPriceSPO, IVA])
    const currentMargentSPO = useMemo(() => {
        let withoutIVA = parseFloat(IVA) != 0 ? parseFloat(marketPriceSPO) - parseFloat((parseFloat(marketPriceSPO) * (parseFloat(IVA) / 100)).toFixed(2)) : parseFloat(marketPriceSPO)
        let margentProfit = ( withoutIVA - parseFloat(entryPriceSPO));
        let margent = parseFloat(margentProfit) / parseFloat(entryPriceSPO) * 100
        return margent.toFixed(2);
    }, [entryPriceSPO, marketPrice, IVA])




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


    const allContactOptions = useMemo(() => {
        let x = allContacts.map((el, index) => {return {value: el.name, label: el.name}})

        return x
    }, [allContacts])

    const prodBrandsOptions = useMemo(() => {
        if(Array.isArray(prodBrands)) {
            return prodBrands.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: prodBrands, label: prodBrands}]
        }
    }, [])

    const prodCategoryOptions = useMemo(() => {
        if(Array.isArray(prodCategory)) {
            return prodCategory.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: prodCategory, label: prodCategory}]
        }
    }, [])
    const prodBusinessTypeOptions = useMemo(() => {
        if(Array.isArray(prodBusinessType)) {
            return prodBusinessType.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: prodBusinessType, label: prodBusinessType}]
        }
    }, [])

    const prodProveedorsNameOptions = useMemo(() => {
        if(Array.isArray(prodNameProveedor)) {
            return prodNameProveedor.map((el, index) => {
                return {value: el, label: el}
            })
        }else{

            return [{value: prodNameProveedor, label: prodNameProveedor}]
        }
    }, [])


    const allUnitOptions = useMemo(() => {
        return [{value: 'unidad', label: 'unidad'},
            {value: 'paq', label: 'paq'},
            {value: 'bote', label: 'bote'},
            {value: 'und', label: 'und'},
            {value: 'caja', label: 'caja'},
            {value: 'kg', label: 'kg'},
            {value: 'tarr', label: 'tarr'},
            {value: 'bolsa', label: 'bolsa'},
            {value: 'bandeja', label: 'bandeja'},
            {value: 'tetrapaq', label: 'tetrapaq'},
            {value: 'man', label: 'man'},
            {value: 'lata', label: 'lata'}]
    }, [])

    return (
        <div className='tableMainClass'>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='textPlusSwitcher'>
                <div className='topicText' onClick={() => dispatch(setValue(2))}><span style={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginRight: '5px'
                }}><AiOutlineArrowLeft/></span>Catalog - Change Product
                </div>

                <div className='switchElemsLanding'>
                    <span onClick={() => setCalcSwitcher(true)} style={{
                        background: calcSwitcher && '#06C0B0',
                        color: calcSwitcher && '#FFFFFF'
                    }}>Standart</span>
                    <span onClick={() => setCalcSwitcher(false)} style={{
                        background: !calcSwitcher && '#06C0B0',
                        color: !calcSwitcher && '#FFFFFF'
                    }}>Сalculator</span>
                </div>

                <div className='switchElemsLanding' style={{position: 'absolute', top: '45px', width: '250px', right: '25px'}}>
                     <span onClick={() => setSPOSwitcher((prev) => !prev)} style={{
                         background: SPOSwitcher && '#06C0B0',
                         color: SPOSwitcher && '#FFFFFF',
                         width: '250px'

                     }}>SPO</span>
                </div>
            </div>

            <div className='addProductContainer'>
                <div className='addProductLeft'>
                    <div className='addProductLeftTop'>
                    <div className='addProductLeftTopImg'>
                            <img src={currentFileImage || noImg} alt=""/>
                            <input type="file" onChange={(e) => uploadImage(e.target.files[0], currentElem)}/>
                        </div>
                        <div className='addProductLeftTopRight' style={{height: 'auto'}}>
                            <div className='addProductLeftTopRightName'>
                                <input className='inputBlock' onChange={(e) => changeName(e)} defaultValue={prodName}
                                       placeholder='Tomato' type="text"/>
                            </div>
                            <div className='addProductLeftTopRightInfo' style={{height: '60px'}}>
                                <div className='skuBlock' style={{height: 'auto'}}>
                                    <div className='textIdBlock'>
                                        Proveedor Product Name
                                    </div>
                                    {/*<Select*/}
                                    {/*    type='tags'*/}
                                    {/*    style={{*/}
                                    {/*        height: '28px', width: '100%', maxWidth: '190px', margin: '5px 0px'*/}
                                    {/*    }}*/}
                                    {/*    showSearch*/}
                                    {/*    // filterOption={(input, option) => {*/}
                                    {/*    //     return (*/}
                                    {/*    //         option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                                    {/*    //     );*/}
                                    {/*    //*/}
                                    {/*    // }}*/}
                                    {/*    placeholder="Proveedor Product Name"*/}
                                    {/*    options={prodProveedorsNameOptions}*/}
                                    {/*    onChange={(value) => {setProdNameProveedor(value); console.log(value)}}*/}
                                    {/*    defaultValue={Array.isArray(prodNameProveedor) ? prodNameProveedor.map(el => el) : prodNameProveedor}*/}
                                    {/*/>*/}
                                    <TextArea style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}}
                                              onChange={(e) => setProdNameProveedor(e.target.value)}
                                              defaultValue={prodNameProveedor} placeholder="Proveedor Product Name"
                                              type="text"/>

                                    {/*<Select*/}
                                    {/*    mode="tags"*/}
                                    {/*        style={{*/}
                                    {/*            height: '28px', width: '100%', maxWidth: '190px', margin: '5px 0px'*/}
                                    {/*        }}*/}
                                    {/*    placeholder="Proveedor Product Name"*/}
                                    {/*    onChange={(value) => {setProdNameProveedor(value)}}*/}
                                    {/*    options={prodProveedorsNameOptions}*/}
                                    {/*    defaultValue={Array.isArray(prodNameProveedor) ? prodNameProveedor.map(el => el) : prodNameProveedor}*/}
                                    {/*/>*/}
                                    {/*<Select style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}} onChange={(e) => setProdNameProveedor(e.target.value)} defaultValue={prodNameProveedor} placeholder="Proveedor Product Name" type="text"/>*/}

                                    {/*<input className='inputBlock' onChange={(e) => setProdNameProveedor(e.target.value)} defaultValue={prodNameProveedor} placeholder='Tomato Proveedor' type="text"/>*/}
                                </div>
                            </div>
                            <div className='addProductLeftTopRightInfo' style={{height: 'auto'}}>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        ID
                                    </div>
                                    <Input disabled={true} style={{
                                        cursor: 'pointer',
                                        height: '28px',
                                        maxWidth: '190px',
                                        margin: '5px 0px'
                                    }} defaultValue={currentElem._id} placeholder="ID's" type="text"/>

                                    {/*<input disabled className='inputBlock' style={{backgroundColor: '#FFFFFF'}} defaultValue={currentElem._id} type="text"/>*/}
                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        SKU
                                    </div>
                                    <Input style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}}
                                           onChange={(e) => setProdSKU(e.target.value)} defaultValue={prodSKU}
                                           placeholder="SKU" type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setProdSKU(e.target.value)} defaultValue={prodSKU} placeholder='SKu13213A' type="text"/>*/}
                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Proveedor SKU
                                    </div>
                                    <TextArea style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}}
                                              onChange={(e) => setProdSKUProveedor(e.target.value)}
                                              defaultValue={prodSKUProveedor} placeholder="Proveedor Product SKU"
                                              type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setProdSKUProveedor(e.target.value)} defaultValue={prodSKUProveedor} placeholder='SKU Proveedor' type="text"/>*/}
                                </div>

                                <div className='enabledBlock' style={{display: 'none'}}>
                                    <div className='textIdBlock'>
                                        Enabled
                                    </div>
                                    <div className={enabled ? 'itemEnabled' : 'itemDisabled'}
                                         onClick={() => enableHandler()}>{enabled ? 'Yes' : 'No'}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addProductLeftBottom' style={{padding: '5px 0px 10px 0px'}}>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Category</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdCategory(e.target.value)} defaultValue={prodCategory} placeholder='Vegetables' type="text"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Category"
                                onChange={(value) => {
                                    setProdCategory(value)
                                }}
                                options={prodBrandsOptions}
                                defaultValue={Array.isArray(prodCategory) ? prodCategory.map(el => el) : prodCategory}
                            />

                            {/*<div className='addTags' onClick={() => setOpenModal(false)}>*/}
                            {/*    <BsPlus/>*/}
                            {/*</div>*/}
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Brands</span>
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Category"
                                onChange={(value) => {
                                    setProdBrands(value)
                                }}
                                options={prodCategoryOptions}
                                defaultValue={Array.isArray(prodBrands) ? prodBrands.map(el => el) : prodBrands}
                            />

                            {/*<div className='addTags' onClick={() => setOpenModal(false)}>*/}
                            {/*    <BsPlus/>*/}
                            {/*</div>*/}
                        </div>

                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Business Type</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdCategory(e.target.value)} defaultValue={prodCategory} placeholder='Vegetables' type="text"/>*/}
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                placeholder="Category"
                                onChange={(value) => {
                                    setProdBusinessType(value)
                                }}
                                options={prodBusinessTypeOptions}
                                defaultValue={Array.isArray(prodBusinessType) ? prodBusinessType.map(el => el) : prodBusinessType}
                            />

                            {/*<div className='addTags' onClick={() => setOpenModal(false)}>*/}
                            {/*    <BsPlus/>*/}
                            {/*</div>*/}
                        </div>

                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Proveedors</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdProveedor(e.target.value)} defaultValue={prodProveedor} placeholder='TPO Proveedor' type="text"/>*/}
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );

                                }}
                                placeholder="Proveedors"
                                onChange={(value) => {
                                    console.log(value);
                                    setProdProveedor(value)
                                }}
                                options={allContactOptions}
                                defaultValue={() => {
                                    let bf = [];
                                    allContactOptions.forEach((el, index) => el.label == currentElem.proveedor && bf.push(el.label))
                                    return bf
                                }}

                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Description</span>
                            <TextArea onChange={(e) => setProdDesc(e.target.value)}
                                      style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}}
                                      defaultValue={prodDesc} placeholder='desc...' type="text"/>

                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdDesc(e.target.value)} defaultValue={prodDesc} placeholder='desc...' type="text"/>*/}
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Unidad</span>
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );

                                }}
                                placeholder="Unit"
                                onChange={(value) => {
                                    setProdUnidad(value)
                                }}
                                options={allUnitOptions}
                                defaultValue={prodUnidad}
                            />

                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdUnidad(e.target.value)} defaultValue={prodUnidad} placeholder='unit' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Weight</span>
                            <Input style={{maxWidth: '379.63px', margin: '5px 0px'}}
                                   onChange={(e) => setProdWeight(e.target.value)} defaultValue={prodWeight}
                                   placeholder="Weight (kg)" type="text"/>

                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdWeight(e.target.value)} defaultValue={prodWeight} placeholder='kg' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Weight Units</span>
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );

                                }}
                                placeholder="weightUnits"
                                onChange={(value) => {
                                    setProdLtKg(value)
                                    setProdWeightUnits(value)
                                }}
                                options={[{value: 'Lt', label: 'Lt'}, {value: 'Kg', label: 'Kg'}, {
                                    value: 'Ml',
                                    label: 'Ml'
                                }, {value: 'Gr', label: 'Gr'}]}
                                defaultValue={prodWeightUnits}

                            />
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdLtKg(e.target.value)} defaultValue={prodLtKg} placeholder='lt' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Dimensiones</span>
                            <div style={{
                                maxWidth: '379.63px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '5px 0px'
                            }}>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenL(e.target.value)}
                                       defaultValue={prodDimenL} placeholder="Length (cm)" type="number"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenW(e.target.value)}
                                       defaultValue={prodDimenW} placeholder="Width (cm)" type="number"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenH(e.target.value)}
                                       defaultValue={prodDimenH} placeholder="Height (cm)" type="number"/>
                            </div>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdDimen(e.target.value)} defaultValue={prodDimen} placeholder='43 × 16 × 24 cm' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Min. Quantity</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setMinQt(e.target.value)} defaultValue={minQt} placeholder='7' type="number"/>*/}
                            <Input style={{maxWidth: '379.63px'}} onChange={(e) => setMinQt(e.target.value)}
                                   defaultValue={minQt} placeholder="Min. Qt (For Calculator Market)" type="number"/>

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Stock Location</span>
                            <div style={{
                                maxWidth: '379.63px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '5px 0px'
                            }}>
                                <Input style={{width: 'auto'}} onChange={(e) => setStockLocationPlace(e.target.value)}
                                       defaultValue={stockLocationPlace} placeholder="Place" type="text"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setStockLocationShelf(e.target.value)}
                                       defaultValue={stockLocationShelf} placeholder="Shelf" type="text"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setStockLocation(e.target.value)}
                                       defaultValue={stockLocation} placeholder="Stand" type="text"/>

                                {/*<Select*/}
                                {/*    mode="multiple"*/}
                                {/*    style={{*/}
                                {/*        width: '100%',*/}
                                {/*    }}*/}
                                {/*    filterOption={(input, option) => {*/}
                                {/*        return (*/}
                                {/*            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                                {/*        );*/}

                                {/*    }}*/}
                                {/*    defaultValue={stockLocation}*/}
                                {/*    placeholder="Stand"*/}
                                {/*    onChange={(value) => {console.log(value); setStockLocation(value)}}*/}
                                {/*    options={[{value: 'Congelador', label: 'Congelador'}, {value: 'ALP (Almacén La Pau)', label: 'ALP (Almacén La Pau)'}, {value: 'AMB (Almacén MB)', label: 'AMB (Almacén MB)'}, {value: 'AlmaRusa', label: 'AlmaRusa'}, {value: 'Gastos oficina TPO', label: 'Gastos oficina TPO'}, {value: 'MERMA', label: 'MERMA'}]}*/}

                                {/*/>*/}
                            </div>
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Quantity step</span>
                            <Input style={{maxWidth: '379.63px'}} onChange={(e) => setQtStep(e.target.value)}
                                   defaultValue={qtStep} placeholder="Min. Qt (For Calculator Market)" type="number"/>

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Decimal</span>
                            <Select
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );
                                }}
                                placeholder="Yes/No"
                                onChange={(value) => {
                                    setDecimal(value)
                                }}
                                options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
                                value={{value: decimal, label: decimal ? 'Yes' : 'No'}}

                            />
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdLtKg(e.target.value)} defaultValue={prodLtKg} placeholder='lt' type="text"/>*/}

                        </div>

                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Active</span>
                            <Select
                                style={{
                                    width: '100%',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );
                                }}
                                placeholder="Yes/No"
                                onChange={(value) => {
                                    setEnabled(value)
                                }}
                                options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
                                value={{value: enabled, label: enabled ? 'Yes' : 'No'}}

                            />
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdLtKg(e.target.value)} defaultValue={prodLtKg} placeholder='lt' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Stock</span>
                            <div style={{
                                maxWidth: '379.63px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '5px 0px'
                            }}>
                                <Input style={{width: 'auto', textAlign: 'right'}}
                                       onChange={(e) => setStock(e.target.value)}
                                       value={stock || ''} placeholder="Stock" type="text"/>
                                <Input disabled={true} style={{width: 'auto', textAlign: 'right'}}
                                       onChange={(e) => setTBO(e.target.value)}
                                       value={TBO || ''} placeholder="Days" type="text"/>
                                <Input style={{width: 'auto', textAlign: 'right'}}
                                       onChange={(e) => setDias(e.target.value)}
                                       value={dias || ''} placeholder="Dias" type="text"/>

                                {/*<Select*/}
                                {/*    mode="multiple"*/}
                                {/*    style={{*/}
                                {/*        width: '100%',*/}
                                {/*    }}*/}
                                {/*    filterOption={(input, option) => {*/}
                                {/*        return (*/}
                                {/*            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                                {/*        );*/}

                                {/*    }}*/}
                                {/*    defaultValue={stockLocation}*/}
                                {/*    placeholder="Warehouse"*/}
                                {/*    onChange={(value) => {console.log(value); setStockLocation(value)}}*/}
                                {/*    options={[{value: 'Congelador', label: 'Congelador'}, {value: 'ALP (Almacén La Pau)', label: 'ALP (Almacén La Pau)'}, {value: 'AMB (Almacén MB)', label: 'AMB (Almacén MB)'}, {value: 'AlmaRusa', label: 'AlmaRusa'}, {value: 'Gastos oficina TPO', label: 'Gastos oficina TPO'}, {value: 'MERMA', label: 'MERMA'}]}*/}

                                {/*/>*/}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='addProductRight'>
                    <div className="rightElem">
                        <div className='rightElemName switchElems'>
                            <span onClick={() => setSpanSwitcher(true)} style={{
                                background: spanSwitcher && '#06C0B0',
                                color: spanSwitcher && '#FFFFFF'
                            }}>%</span>
                            <span onClick={() => setSpanSwitcher(false)} style={{
                                background: !spanSwitcher && '#06C0B0',
                                color: !spanSwitcher && '#FFFFFF'
                            }}>€</span>
                        </div>
                        <div className='rightElemValue rightElemValueMB'>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled
                                   type="text" defaultValue={'CP'}/><span></span>
                        </div>

                        <div className='rightElemValue rightElemValueMB'>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled
                                   type="text" defaultValue={'DP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled
                                   type="text" defaultValue={'SDP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled
                                   type="text" defaultValue={'MBP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled
                                   type="text" defaultValue={'SPO'}/><span></span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName'
                             style={{background: !spanSwitcher && '#93E1DB', color: !spanSwitcher && '#FFFFFF'}}>
                            <span><img src={moveStockImage} alt=""/></span>Price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceCP(e.target.value)}
                                   type="number"
                                   value={spanSwitcher ? currentPriceCP : parseFloat(parseFloat(marketPriceCP).toFixed(2))}
                                   defaultValue={marketPriceCP}/><span>€</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceDP(e.target.value)}
                                   type="number"
                                   value={spanSwitcher ? currentPriceDP : parseFloat(parseFloat(marketPriceDP).toFixed(2))}
                                   defaultValue={marketPriceDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceSDP(e.target.value)}
                                   type="number"
                                   value={spanSwitcher ? currentPriceSDP : parseFloat(parseFloat(marketPriceSDP).toFixed(2))}
                                   defaultValue={marketPriceSDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPrice(e.target.value)}
                                   type="number"
                                   value={spanSwitcher ? currentPrice : parseFloat(parseFloat(marketPrice).toFixed(2))}
                                   defaultValue={marketPrice}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceSPO(e.target.value)}
                                   type="number"
                                   value={spanSwitcher ? currentPriceSPO : parseFloat(parseFloat(marketPriceSPO).toFixed(2))}
                                   defaultValue={marketPriceSPO}/><span>€</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB', color: '#FFFFFF'}}>
                            <span><img src={arrowImage} alt=""/></span>Entry price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}}
                                   onChange={(e) => setEntryPriceCP(e.target.value)} type="number"
                                   value={entryPriceCP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}}
                                   onChange={(e) => setEntryPriceDP(e.target.value)} type="number"
                                   value={entryPriceDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}}
                                   onChange={(e) => setEntryPriceSDP(e.target.value)} type="number"
                                   value={entryPriceSDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}}
                                   onChange={(e) => changeEntryPriceHandler(e)} type="number" value={entryPrice}/><span
                            style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}}
                                   onChange={(e) => setEntryPriceSPO(e)} type="number" value={entryPriceSPO}/><span
                            style={{color: '#00AB55'}}>€</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName'>
                            <span><img src={eurImage} alt=""/></span>Profit
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}}
                                   onChange={(e) => setProfitCP(e.target.value)} type="number"
                                   value={spanSwitcher ? currentProfitCP : currentMargentCPProfit}/><span
                            style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}}
                                   onChange={(e) => setProfitDP(e.target.value)} type="number"
                                   value={spanSwitcher ? currentProfitDP : currentMargentDPProfit}/><span
                            style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}}
                                   onChange={(e) => setProfitSDP(e.target.value)} type="number"
                                   value={spanSwitcher ? currentProfitSDP : currentMargentSDPProfit}/><span
                            style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}}
                                   onChange={(e) => setProfit(e.target.value)} type="number"
                                   value={spanSwitcher ? currentProfit : currentMargentProfit}/><span
                            style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}}
                                   onChange={(e) => setProfitSPO(e.target.value)} type="number"
                                   value={spanSwitcher ? currentProfitSPO : currentMargentProfitSPO}/><span
                            style={{color: '#7376F9'}}>€</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName'
                             style={{background: spanSwitcher && '#93E1DB', color: spanSwitcher && '#FFFFFF'}}>
                            <span><img src={prosImage} alt=""/></span>Margent
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}}
                                   onChange={(e) => setMargentCP(e.target.value)} type="number"
                                   value={spanSwitcher ? margentCP : currentMargentCP}/><span
                            style={{color: '#F1C52B'}}>%</span>
                        </div>

                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}}
                                   onChange={(e) => setMargentDP(e.target.value)} type="number"
                                   value={spanSwitcher ? margentDP : currentMargentDP}/><span
                            style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}}
                                   onChange={(e) => setMargentSDP(e.target.value)} type="number"
                                   value={spanSwitcher ? margentSDP : currentMargentSDP}/><span
                            style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}}
                                   onChange={(e) => setMargent(e.target.value)} type="number"
                                   value={spanSwitcher ? margent : currentMargent}/><span
                            style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}}
                                   onChange={(e) => setMargentSPO(e.target.value)} type="number"
                                   value={spanSwitcher ? margentSPO : currentMargentSPO}/><span
                            style={{color: '#F1C52B'}}>%</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB', color: '#FFFFFF'}}>
                            <span><img style={{width: '40px', height: '40px'}} src={TAX} alt=""/></span>IVA
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}}
                                   onChange={(e) => setIVACP(e.target.value)} type="number" value={IVACP}/><span
                            style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}}
                                   onChange={(e) => setIVADP(e.target.value)} type="number" value={IVADP}/><span
                            style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}}
                                   onChange={(e) => setIVASDP(e.target.value)} type="number" value={IVASDP}/><span
                            style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}}
                                   onChange={(e) => changeIVAHandler(e)} type="number" value={IVA}/><span
                            style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: !SPOSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}}
                                   onChange={(e) => changeIVAHandler(e)} type="number" value={IVA}/><span
                            style={{color: '#000000'}}>%</span>
                        </div>
                    </div>
                    <div className="rightElem rightElemOptionsButtons"
                         style={{display: 'flex', justifyContent: 'flex-start'}}>
                        {/*<div className='rightElemSave' onClick={() => {updateProd()}}>*/}
                        <div className='rightElemSave' style={{opacity: '1'}} onClick={() => {
                            updateProd()
                        }}>
                            Save
                        </div>
                        <div className='rightElemBack' onClick={() => dispatch(setValue(2))}>
                            Back
                        </div>
                        <div className='rightElemBack' onClick={() => copyProd()}>
                            Copy
                        </div>
                        <div className='rightElemDelete' onClick={() => {
                            deleteProd()
                        }}>
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
            {
                openModal &&
                <div className='modalAdmin' onClick={() => setOpenModal(false)}>
                    <div className='profitModalAdmin' onClick={(e) => e.stopPropagation()}>
                        <div className='seeProfitText'>Add <CgClose className="closeButton"
                                                                    onClick={() => setOpenModal(false)}/></div>

                    </div>

                </div>
            }
        </div>
    );
};

export default ChangeCatalogItem;