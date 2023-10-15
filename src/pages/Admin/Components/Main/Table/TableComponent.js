import React, {useEffect, useMemo, useState} from 'react';
import './TableComponent.scss';
import TableItem from "./TableItem/TableItem";
import TableContainer from "./TableContainer/TableContainer";
import CatalogItem from "./ChangeCatalogItem/CatalogItem";
import tomato from "./images/tomato.svg";
import axios from "axios";
import ChangeCatalogItem from "./ChangeCatalogItem/ChangeCatalogItem";
import status from './selectedImages/status.svg'
import copy from './selectedImages/copy.svg'
import del from './selectedImages/delete.svg'
import newOrder from './selectedImages/new order.svg'
import expor from './selectedImages/export.svg'
import track from './selectedImages/icon _truck_.svg'
import { IoClose } from 'react-icons/io5';
import {useDispatch, useSelector} from "react-redux";
import {
    setAllSelectedItems,
    delAllSelectedItems, addAllSelectedItems
} from "../../../features/allSelectedItems";
import {setValue} from "../../../features/setAddProdAdmin";
import {changeStatusMany, changeStatusOrderItemMany, addallProductsSlice, setallProductsSlice} from "../../../features/allProducts";
import {addallContacts} from "../../../features/allContacts";
const TableComponent = ({}) => {

    const [delProds, setDelProds] = useState(true)
    const dispatch = useDispatch();
    const [selectedElems, setSelectedElems] = useState([]);
    const addProduct = useSelector((state) => state.setAddProduct.setAddProduct)
    const [openStatus, setOpenStatus] = useState(false)
    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allProducts = useSelector((state) => state.allProducts.allProducts)

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const [updateAllProdHandler, setUpdateAllProdHandler] = useState(true)
    //         axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            dispatch(addallProductsSlice(resp.data))
            console.log(resp.data)
        });
    }, [addProduct, delProds, updateAllProdHandler])
    // useEffect(() => {
    //     axios.get('https://tpomobi.shop/getContactsAdmin').then((resp) => {
    //         dispatch(addallContacts(resp.data.map(it => {return {...it, _id: it.id}})));
    //     });
    // }, [])
    const deleteProds = () => {
       allSelectedItems.forEach((elem) => {
           axios.post('https://tpomobi.shop/deleteProductAdmin', {_id: elem._id}).then(function (response) {
               dispatch(setValue(2))
               setDelProds((prev) => !prev)
               delAllSelectedItems([]);
           })
               .catch(function (error) {
                   console.log(error);
               });
       })
    }
    const copyFewProd = async () => {
        for await(const elem of allSelectedItems){
            let informData =  {
                id: 1,
                quantity: 0,
                quantityOrder: 0,
                img: elem.img,
                name: elem.name,
                sku: elem.sku,
                marketPrice: elem.marketPrice,
                marketPriceDP: elem.marketPriceDP,
                marketPriceSDP: elem.marketPriceSDP,
                marketPriceCP: elem.marketPriceCP,
                ourPrice: elem.ourPrice,
                ourPriceDP: elem.ourPriceDP,
                ourPriceSDP: elem.ourPriceSDP,
                ourPriceCP: elem.ourPriceCP,
                MB: elem.MB,
                DP: elem.DP,
                SDP: elem.SDP,
                CP: elem.CP,
                category: elem.category,
                proveedor: elem.proveedor,
                skuProveedor: elem.skuProveedor,
                unit: elem.unit,
                dimension: elem.dimension,
                desc: elem.desc,
                minQt: elem.minQt,
                IVA: elem.IVA,
                IVADP: elem.IVADP,
                IVASDP: elem.IVASDP,
                IVACP: elem.IVACP,
                enabled: elem.enabled,
                status: elem.status
            };

            // formData.append('customFile', file);
            // formData.append('informData', JSON.stringify(informData))
            await axios.post('https://tpomobi.shop/createProductAdmin', {data: informData}).then(function (response) {
                dispatch(setValue(2))
                console.log(response.data)
                dispatch(setallProductsSlice({...informData, "_id": response.data.insertedId}))
                setUpdateAllProdHandler((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const searchFilterByName = useMemo(() => {
        return allProducts.filter(elem => {
            return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        })
    }, [allProducts, searchItemsAdmin])
    console.log(allProducts)
    const exportExcel = () => {

        let ids = allSelectedItems.map(elem => {
            return elem._id
        })

        window.open('https://tpomobi.shop/exportProductAdmin' + '?_ids=' + ids,"_blank")

        // axios.get('http://localhost:2222/exportProductAdmin').then(res => console.log(res)).catch(function (error) {
        //     console.log(error);
        // });
    }


    useEffect(() => {dispatch(delAllSelectedItems())}, [addProduct])


        const updateStatus = (crElem) => {
        if(true){

            dispatch(changeStatusMany({crElem, allSelectedItems}))
            axios.post('https://tpomobi.shop/updateStatusProductItemAdminMany', {
                data: {crElem, allSelectedItems}
            })
        }else{
            alert('add status name')
        }
    }


    const [currentElem, setCurrentElem] = useState({})
    const currentTable = () => {
        if(addProduct == 1){return <CatalogItem allProducts={allProducts}/>}
        if(addProduct == 2){return <TableContainer setSelectedElems={setSelectedElems} allProducts={allProducts} setCurrentElem={setCurrentElem}/>}
        if(addProduct == 3){return <ChangeCatalogItem allProducts={allProducts} currentElem={currentElem}/>}
    }




    return (
        <div style={{height: '100%', background: '#f5f5f5'}}>
            {currentTable()}
            {
                allSelectedItems.length != 0 &&
                <div className='howInMonday'>
                    <div className='selectedLength'>{allSelectedItems.length}<span>Selected <br/>Rows</span></div>
                    <div className='selectedButtons'>
                        <div className='selectButton' onClick={() => copyFewProd()}>
                            <img src={copy} alt=""/>
                            <span>Copy</span>
                        </div>
                        <div className='selectButton' onClick={() => exportExcel()}>
                            <img src={expor} alt=""/>
                            <span>Export</span>
                        </div>
                        <div className='selectButton' onClick={() => setOpenStatus(prev => !prev)}>
                            <img src={status} alt=""/>
                            <span>Status</span>
                        </div>
                        {openStatus &&
                            <div className='statusChangerMenu' style={{position: "absolute", top: '-150px', left: '300px'}}>
                                <div className='allStatusItems' style={{gridColumnGap: '10px'}}>
                                    {allStatus.map(elem => {
                                        if((elem.type == 'products')) {
                                            return <div className='statusElem' onClick={() => {
                                                updateStatus(elem);
                                                setOpenStatus(false)
                                            }} style={{background: elem.color}}>{elem.name}</div>
                                        }
                                    })}

                                    <div className='statusElem' onClick={() => {
                                        setOpenStatus(false)
                                        updateStatus({name: '',
                                            desc: '',
                                            color: '#FFF',
                                            _id: ''})
                                    }} style={{background: '#FFF', color: 'black', border: '0.5px solid rgb(183, 183, 183)'}}>Clear</div>
                                </div>

                            </div>

                        }
                        <div className='selectButton'>
                            <img src={newOrder} alt=""/>
                            <span>New order</span>
                        </div>
                        <div className='selectButton'>
                            <img src={track} alt=""/>
                            <span>Add Route</span>
                        </div>
                        <div className='selectButton' onClick={() => {deleteProds();  dispatch(delAllSelectedItems())}}>
                            <img src={del} alt=""/>
                            <span style={{color: "#FB547E"}}>Delete</span>
                        </div>
                        <div className='selectButton'>
                            <div style={{fontWeight: '400', textAlign: 'center'}}>Total Items Price</div>
                            <span style={{color: "#00AB55"}}>{((allSelectedItems.map(elem => parseFloat(elem.ourPrice) ? parseFloat(elem.ourPrice) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                        </div>
                        <div className='selectButton'>
                            <div style={{fontWeight: '400', textAlign: 'center', width: '150px'}}>Total Market Price</div>
                            <span style={{color: "#00AB55"}}>{((allSelectedItems.map(elem => parseFloat(elem.marketPrice) ? parseFloat(elem.marketPrice) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                        </div>

                    </div>
                    <div className='selectCloseButton' onClick={() => dispatch(delAllSelectedItems())}>
                        <IoClose/>
                    </div>
                </div>
            }
        </div>
    );
};

export default TableComponent;