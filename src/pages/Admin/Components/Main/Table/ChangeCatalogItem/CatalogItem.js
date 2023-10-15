import React, {useMemo, useState} from 'react';
import './CatalogItem.scss'
import axios from "axios";
import noImg from '../../../../../../assets/av.svg'
import moveStockImage from "./images/Move Stock.svg";
import arrowImage from "./images/arrow.svg";
import eurImage from "./images/€.svg";
import prosImage from "./images/prose.svg";
import NImage from "./images/N.svg";
import {BsPlus} from "react-icons/bs";
import TAX from "./images/TAX.png"
import {setValue} from "../../../../features/setAddProdAdmin";
import {useDispatch, useSelector} from "react-redux";
import {setallProductsSlice} from "../../../../features/allProducts";
import {notification, Space, Select, Input} from "antd";
import {AiOutlineArrowLeft} from "react-icons/ai";
const { TextArea } = Input;
const CatalogItem = ({allProducts, setAllProducts}) => {

    const [fileImage, setFileImage] = useState('')
    const [currentFileImage, setCurrentFileImage] = useState('')

    const allContacts = useSelector((state) => state.allContacts.allContacts)

    const dispatch = useDispatch()
    const [spanSwitcher, setSpanSwitcher] = useState(true)
    const [calcSwitcher, setCalcSwitcher] = useState(true)


    const [prodName, setProdName] = useState('')
    const [enabled, setEnabled] = useState(false);
    const [prodSKU, setProdSKU] = useState('')
    const [prodSKUProveedor, setProdSKUProveedor] = useState('')
    const [prodNameProveedor, setProdNameProveedor] = useState('')


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


    const [prodCategory, setProdCategory] = useState([])
    const [prodUnidad, setProdUnidad] = useState('')
    const [prodWeight, setProdWeight] = useState('')
    const [prodLtKg, setProdLtKg] = useState('')
    const [prodProveedor, setProdProveedor] = useState('')
    const [prodDesc, setProdDesc] = useState('')
    const [prodDimen, setProdDimen] = useState('')
    const [minQt, setMinQt] = useState(1)
    const [stockLocation, setStockLocation] = useState('')
    const [stockLocationPlace, setStockLocationPlace] = useState('')
    const [stockLocationShelf, setStockLocationShelf] = useState('')


    const [qtStep, setQtStep] = useState(1)
    const [prodDimenL, setProdDimenL] = useState('')
    const [prodDimenW, setProdDimenW] = useState('')
    const [prodDimenH, setProdDimenH] = useState('')




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


    const createNewProd = () => {
        // const formData = new FormData();
        const formData = new FormData();
        formData.append('sampleFile', currentFileImage || noImg)

        let informData =  {
            id: 1,
            quantity: 0,
            quantityOrder: 0,
            img: '',
            name: prodName,
            sku: prodSKU,
            marketPrice: marketPrice,
            marketPriceDP: marketPriceDP,
            marketPriceSDP: marketPriceSDP,
            marketPriceCP: marketPriceCP,
            ourPrice: entryPrice,
            ourPriceDP: entryPriceDP,
            ourPriceSDP: entryPriceSDP,
            ourPriceCP: entryPriceCP,
            MB: parseFloat(margent),
            DP: parseFloat(margentDP),
            SDP: parseFloat(margentSDP),
            CP: parseFloat(margentCP),
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
            dimensionL: prodDimenL,
            dimensionW: prodDimenW,
            dimensionH: prodDimenH,
            qtStep: qtStep,
            stockLocation: stockLocation,
            stockLocationShelf: stockLocationShelf,
            stockLocationPlace: stockLocationPlace
        };
        formData.append('data', informData)
        console.log(informData)
        // formData.append('customFile', file);
        // formData.append('informData', JSON.stringify(informData))
        // https://tpomobi.shop/createProductAdmin
        axios.post('https://tpomobi.shop/createProductAdmin', formData).then(function (response) {
            console.log(response.data)
            dispatch(setallProductsSlice({...informData, "_id": response.data.insertedId}))
        })
            .catch(function (error) {
                console.log(error);
        });
    }


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

    const allContactOptions = useMemo(() => {
        let x = allContacts.map((el, index) => {return {value: index + 1, label: el.name}})
        console.log(allContacts)

        return x
    }, [allContacts])

    const allUnitOptions = useMemo(() => {
        return [{value: 1, label: 'unidad'}, {value: 2, label: 'paq'}, {value: 3, label: 'bote'}, {value: 4, label: 'und'}, {value: 6, label: 'caja'}, {value: 7, label: 'kg'}, {value: 8, label: 'tarr'}, {value: 9, label: 'tara'}, {value: 10, label: 'bolsa'}, {value: 11, label: 'bandeja'}, {value: 12, label: 'tetrapaq'}, {value: 13, label: 'man'}, {value: 14, label: 'lata'}]
    }, [])


    return (
        <div className='tableMainClass'>
            <div className='textPlusSwitcher'>

            <div className='topicText' onClick={() => dispatch(setValue(2))} style={{color: '#02867A', fontSize: '20px'}}><span style={{color: 'black', display: 'flex', alignItems: 'center', justifyContent:'center', position: 'relative', marginRight: '5px'}}><AiOutlineArrowLeft/></span>Catalog - Add Product</div>
            <div className='switchElemsLanding'>
                <span onClick={() => setCalcSwitcher(true)} style={{background: calcSwitcher && '#06C0B0',  color: calcSwitcher && '#FFFFFF'}}>Standart</span>
                <span onClick={() => setCalcSwitcher(false)} style={{background: !calcSwitcher && '#06C0B0',  color: !calcSwitcher && '#FFFFFF'}}>Сalculator</span>
            </div>
            </div>
            <div className='addProductContainer'>
                <div className='addProductLeft'>
                    <div className='addProductLeftTop'>
                        <div className='addProductLeftTopImg'>
                            <img src={fileImage || noImg} alt=""/>
                            <input type="file" onChange={(e) => {setCurrentFileImage(e.target.files[0]); setFileImage(URL.createObjectURL(e.target.files[0]))}}/>
                        </div>
                        <div className='addProductLeftTopRight'>
                            <div className='addProductLeftTopRightName'>
                                <input className='inputBlock' onChange={(e) => setProdName(e.target.value)} placeholder='Tomato' type="text"/>
                            </div>
                            <div className='addProductLeftTopRightInfo' style={{height: '60px'}}>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Proveedor Name
                                    </div>
                                    <Select
                                        style={{
                                            height: '28px', width: '100%', maxWidth: '190px', margin: '5px 0px'
                                        }}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return (
                                                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            );

                                        }}
                                        placeholder="Proveedor Product Name"
                                        onChange={(value) => {console.log(value); setProdNameProveedor(value)}}
                                        options={allContactOptions}
                                        defaultValue={() => {
                                            let bf = [];
                                            allContactOptions.forEach((el, index) => el.label == prodNameProveedor && bf.push(prodNameProveedor))
                                            return bf
                                        }}

                                    />

                                    {/*<Select style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}} onChange={(e) => setProdNameProveedor(e.target.value)} defaultValue={prodNameProveedor} placeholder="Proveedor Product Name" type="text"/>*/}

                                    {/*<input className='inputBlock' onChange={(e) => setProdNameProveedor(e.target.value)} defaultValue={prodNameProveedor} placeholder='Tomato Proveedor' type="text"/>*/}
                                </div>
                            </div>
                            <div className='addProductLeftTopRightInfo'>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        ID
                                    </div>
                                    <Input disabled={true} style={{cursor: 'pointer', height: '28px', maxWidth: '190px', margin: '5px 0px'}} defaultValue={allProducts.length + 1} placeholder="ID's" type="text"/>

                                    {/*<input disabled className='inputBlock' style={{backgroundColor: '#FFFFFF'}} defaultValue={currentElem._id} type="text"/>*/}
                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        SKU
                                    </div>
                                    <Input style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}} onChange={(e) => setProdSKU(e.target.value)} defaultValue={prodSKU} placeholder="SKU" type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setProdSKU(e.target.value)} defaultValue={prodSKU} placeholder='SKu13213A' type="text"/>*/}
                                </div>
                                <div className='skuBlock'>
                                    <div className='textIdBlock'>
                                        Proveedor SKU
                                    </div>
                                    <Input style={{height: '28px', maxWidth: '190px', margin: '5px 0px'}} onChange={(e) => setProdSKUProveedor(e.target.value)} defaultValue={prodSKUProveedor} placeholder="Proveedor Product SKU" type="text"/>

                                    {/*<input className='inputBlock' onChange={(e) => setProdSKUProveedor(e.target.value)} defaultValue={prodSKUProveedor} placeholder='SKU Proveedor' type="text"/>*/}
                                </div>

                                {/*<div className='enabledBlock' style={{display: 'none'}}>*/}
                                {/*    <div className='textIdBlock'>*/}
                                {/*        Enabled*/}
                                {/*    </div>*/}
                                {/*    <div className={enabled ? 'itemEnabled' : 'itemDisabled'} onClick={() => enableHandler()}>{enabled ? 'Yes' : 'No'}</div>*/}

                                {/*</div>*/}
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
                                onChange={(value) => {setProdCategory(value)}}
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
                                onChange={(value) => {console.log(value); setProdProveedor(value)}}
                                options={allContactOptions}

                            />
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Description</span>
                            <TextArea onChange={(e) => setProdDesc(e.target.value)}  style={{height: '28px', maxWidth: '379.63px', margin: '5px 0px'}} defaultValue={prodDesc} placeholder='desc...' type="text"/>

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
                                onChange={(value) => {setProdUnidad(value)}}
                                options={allUnitOptions}
                                defaultValue={prodUnidad}
                            />

                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdUnidad(e.target.value)} defaultValue={prodUnidad} placeholder='unit' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Weight</span>
                            <Input style={{maxWidth: '379.63px', margin: '5px 0px'}} onChange={(e) => setProdWeight(e.target.value)} defaultValue={prodWeight} placeholder="Weight (kg)" type="text"/>

                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdWeight(e.target.value)} defaultValue={prodWeight} placeholder='kg' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Lt/Kg</span>
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
                                placeholder="Lt/Kg"
                                onChange={(value) => {setProdLtKg(value)}}
                                options={[{value: 'Lt', label: 'Lt'}, {value: 'Kg', label: 'Kg'}]}
                                defaultValue={prodLtKg}

                            />
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdLtKg(e.target.value)} defaultValue={prodLtKg} placeholder='lt' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Dimensiones</span>
                            <div style={{maxWidth: '379.63px', display: 'flex', justifyContent: 'space-between', margin: '5px 0px'}}>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenL(e.target.value)} defaultValue={prodDimenL} placeholder="Length (cm)" type="number"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenW(e.target.value)} defaultValue={prodDimenW} placeholder="Width (cm)" type="number"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setProdDimenH(e.target.value)} defaultValue={prodDimenH} placeholder="Height (cm)" type="number"/>
                            </div>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setProdDimen(e.target.value)} defaultValue={prodDimen} placeholder='43 × 16 × 24 cm' type="text"/>*/}

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Min. Quantity</span>
                            {/*<input className='inputBlockLeftBottomItem' onChange={(e) => setMinQt(e.target.value)} defaultValue={minQt} placeholder='7' type="number"/>*/}
                            <Input style={{maxWidth: '379.63px'}} onChange={(e) => setMinQt(e.target.value)} defaultValue={minQt} placeholder="Min. Qt (For Calculator Market)" type="number"/>

                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Stock Location</span>
                            <div style={{maxWidth: '379.63px', display: 'flex', justifyContent: 'space-between', margin: '5px 0px'}}>
                                <Input style={{width: 'auto'}} onChange={(e) => setStockLocationPlace(e.target.value)} defaultValue={stockLocationPlace} placeholder="Place" type="text"/>
                                <Input style={{width: 'auto'}} onChange={(e) => setStockLocationShelf(e.target.value)} defaultValue={stockLocationShelf} placeholder="Shelf" type="text"/>
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    filterOption={(input, option) => {
                                        return (
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        );

                                    }}
                                    defaultValue={stockLocation}
                                    placeholder="Warehouse"
                                    onChange={(value) => {console.log(value); setStockLocation(value)}}
                                    options={[{value: 'Congelador', label: 'Congelador'}, {value: 'ALP (Almacén La Pau)', label: 'ALP (Almacén La Pau)'}, {value: 'AMB (Almacén MB)', label: 'AMB (Almacén MB)'}, {value: 'AlmaRusa', label: 'AlmaRusa'}, {value: 'Gastos oficina TPO', label: 'Gastos oficina TPO'}, {value: 'MERMA', label: 'MERMA'}]}

                                />
                            </div>
                        </div>
                        <div className='addProductLeftBottomItem'>
                            <span className="spanTextName">Quantity step</span>
                            <Input style={{maxWidth: '379.63px'}} onChange={(e) => setQtStep(e.target.value)} defaultValue={qtStep} placeholder="Min. Qt (For Calculator Market)" type="number"/>

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
                            <input className='inputRightElem' style={{background: 'white', color: 'black'}} disabled type="text" defaultValue={'MB'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB'>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'DP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB'  style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'SDP'}/><span></span>
                        </div>
                        <div className='rightElemValue rightElemValueMB' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{background: 'white',  color: 'black'}} disabled type="text" defaultValue={'CP'}/><span></span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: !spanSwitcher && '#93E1DB', color: !spanSwitcher && '#FFFFFF'}}>
                            <span><img src={moveStockImage} alt=""/></span>Price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPrice(e.target.value)} type="number" value={spanSwitcher ? currentPrice : marketPrice} defaultValue={marketPrice}/><span>€</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceDP(e.target.value)} type="number" value={spanSwitcher ? currentPriceDP : marketPriceDP} defaultValue={marketPriceDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceSDP(e.target.value)} type="number" value={spanSwitcher ? currentPriceSDP : marketPriceSDP} defaultValue={marketPriceSDP}/><span>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' onChange={(e) => setMarketPriceCP(e.target.value)} type="number" value={spanSwitcher ? currentPriceCP : marketPriceCP} defaultValue={marketPriceCP}/><span>€</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB', color: '#FFFFFF'}}>
                            <span><img src={arrowImage} alt=""/></span>Entry price
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => changeEntryPriceHandler(e)} type="number" value={entryPrice}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceDP(e.target.value)} type="number" value={entryPriceDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceSDP(e.target.value)} type="number" value={entryPriceSDP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#00AB55'}} onChange={(e) => setEntryPriceCP(e.target.value)} type="number" value={entryPriceCP}/><span style={{color: '#00AB55'}}>€</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName'>
                            <span><img src={eurImage} alt=""/></span>Profit
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfit(e.target.value)} type="number" value={spanSwitcher ? currentProfit : currentMargentProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitDP(e.target.value)} type="number" value={spanSwitcher ? currentProfitDP : currentMargentDPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitSDP(e.target.value)} type="number" value={spanSwitcher ? currentProfitSDP : currentMargentSDPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#7376F9'}} onChange={(e) => setProfitCP(e.target.value)} type="number" value={spanSwitcher ? currentProfitCP : currentMargentCPProfit}/><span style={{color: '#7376F9'}}>€</span>
                        </div>
                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: spanSwitcher && '#93E1DB', color: spanSwitcher && '#FFFFFF'}}>
                            <span><img src={prosImage} alt=""/></span>Margent
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargent(e.target.value)} type="number"  value={spanSwitcher ? margent : currentMargent}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentDP(e.target.value)} type="number"  value={spanSwitcher ? margentDP : currentMargentDP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentSDP(e.target.value)} type="number"  value={spanSwitcher ? margentSDP : currentMargentSDP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#F1C52B'}} onChange={(e) => setMargentCP(e.target.value)} type="number"  value={spanSwitcher ? margentCP : currentMargentCP}/><span style={{color: '#F1C52B'}}>%</span>
                        </div>

                    </div>
                    <div className="rightElem">
                        <div className='rightElemName' style={{background: '#93E1DB', color: '#FFFFFF'}}>
                            <span><img style={{width: '40px', height: '40px'}} src={TAX} alt=""/></span>IVA
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => changeIVAHandler(e)} type="number" value={IVA}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue'>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVADP(e.target.value)} type="number" value={IVADP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVASDP(e.target.value)} type="number" value={IVASDP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                        <div className='rightElemValue' style={{display: calcSwitcher && 'none'}}>
                            <input className='inputRightElem' style={{color: '#000000'}} onChange={(e) => setIVACP(e.target.value)} type="number" value={IVACP}/><span style={{color: '#000000'}}>%</span>
                        </div>
                    </div>
                    <div className="rightElem" style={{display: 'flex', justifyContent: 'flex-start'}}>
                        {/*<div className='rightElemSave' onClick={() => {createNewProd(); dispatch(setValue(2))}}>*/}
                        <div className='rightElemSave' style={{opacity: '1'}} onClick={() => {createNewProd(); dispatch(setValue(2))}}>

                        Add
                        </div>
                        <div className='rightElemBack' onClick={() =>                 dispatch(setValue(2))
                        }>
                            Back
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogItem;