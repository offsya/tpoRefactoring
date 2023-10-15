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
    delAllSelectedItems,
} from "../../../features/allSelectedItems";
import allContacts, {
    addallContacts, allContactsSlice,
    changeStatusMany,
    changeStatusOne,
    changeStatusOrderItemMany
    // changeStatusMany,
    // changeStatusOrderItemMany
} from "../../../features/allContacts";
import OrderContainer from "./TableContainer/OrderContainer";
import OrderContainerOrderItems from "./TableContainer/OrderContainerOrderItems";
import {setValue} from "../../../features/setAddProdAdmin";

import {BiPencil} from "react-icons/bi";
import snp1 from "./images/snp1.jpg";
import snp2 from "./images/snp2.jpg";
import NewOrder from "./TableContainer/NewOrder";
import ContactsContainer from "./TableContainer/ContactsContainer";
import ChangeContact from "./ContactChange/ChangeContact";
import CreateContact from "./ContactChange/CreateContact";
import ChangeContactTwo from "./ContactChange/ChangeContactTwo";
import CreateContactTwo from "./ContactChange/CreateContactTwo";
const ContactsComponent = ({}) => {


    const [allProducts, setAllProducts] = useState([])
    const [delProds, setDelProds] = useState(true)
    const dispatch = useDispatch();
    const [selectedElems, setSelectedElems] = useState([]);
    const [openStatus, setOpenStatus] = useState(false)

    const addProduct = useSelector((state) => state.setAddProduct.setAddProduct)
    const addContactOrUpdate = useSelector((state) => state.setAddContactOrUpdate.setAddContactOrUpdate)

    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allOrders = useSelector((state) => state.allOrders.allOrders)
    const [changeUpdateStatus, setChangeUpdateStatus] = useState(false)

    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const [updateAllProdHandler, setUpdateAllProdHandler] = useState(true)

    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            setAllProducts(resp.data);
        });
    }, [addProduct, delProds, updateAllProdHandler])


    useEffect(() => {
        axios.get('https://tpomobi.shop/getContactsAdmin').then((resp) => {
            console.log(resp.data)
            dispatch(addallContacts(resp.data));
        });
    }, [allContacts])

    const deleteOrders = () => {
       if(addProduct == 2){
           allSelectedItems.forEach((elem) => {
               axios.post('https://tpomobi.shop/deleteContactAdmin', {_id: elem._id}).then(function (res) {
                   dispatch(setValue(2))
                   setDelProds((prev) => !prev)
                   delAllSelectedItems([]);
                   dispatch(addallContacts(res.data));

               })
                   .catch(function (error) {
                       console.log(error);
                   });
           })
       }
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
                setAllProducts((prev) => [...prev, {...informData, "_id": response.data.insertedId}])
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

    const exportExcel = () => {

        let ids = allSelectedItems.map(elem => {
            return elem._id
        })

        window.open('https://tpomobi.shop/exportContactsAdmin' + '?_ids=' + ids,"_blank")

        // axios.get('http://localhost:2222/exportProductAdmin').then(res => console.log(res)).catch(function (error) {
        //     console.log(error);
        // });
    }

    const updateStatus = (crElem) => {
        // let crOrder = allOrders.filter(elem => elem._id == currentElem._id)
        // if(addProduct == 2){
        //     dispatch(changeStatusMany({crElem, allSelectedItems}))
        //     axios.post('https://tpomobi.shop/updateStatusOrderAdminMany', {
        //         data: {crElem, allSelectedItems}
        //     })
        // }else if(addProduct == 3){
        //     dispatch(changeStatusOrderItemMany({crElem, allSelectedItems, "currentElem": crOrder[0]}))
        //     axios.post('https://tpomobi.shop/updateStatusOrderItemAdminMany', {
        //         data: {crElem, allSelectedItems, "currentElem": crOrder[0]}
        //     })
        // }else{
        //     console.log('bad if else Update status')
        // }
    }



    useEffect(() => {dispatch(delAllSelectedItems())}, [addProduct])


    const [currentElem, setCurrentElem] = useState({})
    const currentTable = () => {
        if(addProduct == 1){return <CreateContactTwo allProducts={allProducts} setAllProducts={setAllProducts}/>}
        if(addProduct == 2){return <ContactsContainer allProducts={allProducts} setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem}/>}
        if(addProduct == 3){return <ChangeContactTwo allContacts={allContacts} allProducts={allProducts} allOrders={allOrders} setAllProducts={setAllProducts} currentElem={currentElem}/>}
        // if(addProduct == 1){return <NewOrder allProducts={allProducts} allOrders={allOrders} setAllProducts={setAllProducts} currentElem={currentElem}/>}

    }

    return (
        <div>
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
                                        if((addProduct == 3 && elem.type == 'products') || (addProduct == 2 && elem.type == 'orders')) {
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
                        <div className='selectButton' onClick={() => {deleteOrders();  dispatch(delAllSelectedItems())}}>
                            <img src={del} alt=""/>
                            <span style={{color: "#FB547E"}}>Delete</span>
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

export default ContactsComponent;