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
import {
    addAllOrders,
    setAllOrders,
    setAllOrdersOrders,
    delAllOrders,
    changeStatusMany,
    changeStatusOrderItemMany, changeOrderElem, changeOrderElemParcial
} from "../../../features/allOrders";
import OrderContainer from "./TableContainer/OrderContainer";
import OrderContainerOrderItems from "./TableContainer/OrderContainerOrderItems";
import {setValue} from "../../../features/setAddProdAdmin";
import {BiPencil} from "react-icons/bi";
import snp1 from "./images/snp1.jpg";
import snp2 from "./images/snp2.jpg";
import NewOrder from "./TableContainer/NewOrder";
import {addallContacts} from "../../../features/allContacts";
import OrderContainerContact from "./TableContainer/OrderContainerContact";
const OrdersComponentContact = ({createProd, currentUser, updateProd}) => {

    const [allProducts, setAllProducts] = useState([])
    const [delProds, setDelProds] = useState(true)
    const dispatch = useDispatch();
    const [selectedElems, setSelectedElems] = useState([]);
    const [openStatus, setOpenStatus] = useState(false)

    const addProduct = useSelector((state) => state.setAddProduct.setAddProduct)
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allOrders = useSelector((state) => state.allOrders.allOrders)
    const [changeUpdateStatus, setChangeUpdateStatus] = useState(false)

    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const [updateAllProdHandler, setUpdateAllProdHandler] = useState(true)

    //         axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            setAllProducts(resp.data);
        });
    }, [addProduct, delProds, updateAllProdHandler])
    // useEffect(() => {
    //     axios.get('https://tpomobi.shop/getContactsAdmin').then((resp) => {
    //         dispatch(addallContacts(resp.data.map(it => {return {...it, _id: it.id}})));
    //     });
    // }, [])

    useEffect(() => {
        axios.get('https://tpomobi.shop/getOrdersAdmin').then((resp) => {
            dispatch(addAllOrders(resp.data.reverse()));
        });
    }, [])

    const deleteOrders = () => {
       if(addProduct == 2){
           allSelectedItems.forEach((elem) => {
               axios.post('https://tpomobi.shop/deleteOrderAdmin', {_id: elem._id}).then(function (res) {
                   dispatch(setValue(2))
                   setDelProds((prev) => !prev)
                   delAllSelectedItems([]);
                   dispatch(addAllOrders(res.data.reverse()));

               })
                   .catch(function (error) {
                       console.log(error);
                   });
           })
       }
    }

    const setParcialPay = async () => {
        if(addProduct == 2){
            allSelectedItems.forEach((elem) => {
                let total = ((elem.items.map(elem => elem.marketPriceCP ? parseFloat(elem.marketPriceCP*(elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)
                console.log(elem)
                dispatch(changeOrderElemParcial({paidValue: total, currentElem: elem}))

                axios.post('https://tpomobi.shop/updatePaidValueOrderAdmin', {
                    data: {'value': total, '_id': elem._id}
                })
            })
        }else{
            alert('add status name')
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

        window.open('https://tpomobi.shop/exportProductAdmin' + '?_ids=' + ids,"_blank")

        // axios.get('http://localhost:2222/exportProductAdmin').then(res => console.log(res)).catch(function (error) {
        //     console.log(error);
        // });
    }

    const updateStatus = (crElem) => {
        let crOrder = allOrders.filter(elem => elem._id == currentElem._id)
        if(addProduct == 2){
            dispatch(changeStatusMany({crElem, allSelectedItems}))
            axios.post('https://tpomobi.shop/updateStatusOrderAdminMany', {
                data: {crElem, allSelectedItems}
            })
        }else if(addProduct == 3){
            dispatch(changeStatusOrderItemMany({crElem, allSelectedItems, "currentElem": crOrder[0]}))
            axios.post('https://tpomobi.shop/updateStatusOrderItemAdminMany', {
                data: {crElem, allSelectedItems, "currentElem": crOrder[0]}
            })
        }else{
            console.log('bad if else Update status')
        }
    }



    useEffect(() => {dispatch(delAllSelectedItems())}, [addProduct])



    const allOrdersPrices = useMemo(() => {
        let arr = []
        allSelectedItems.forEach((elem, index) => {
            try{
                elem?.items.forEach(item => {
                    arr.push(item)
                })
            }catch (e){

            }
        })
        return arr
    }, [allSelectedItems])

    const allOrdersProductsPrices = useMemo(() => {
        let arr = []
        allSelectedItems.forEach((elem, index) => {
            arr.push(elem)
        })
        return arr
    }, [allSelectedItems])

    const allOrdersPaid = useMemo(() => {
        if(addProduct == 2){
            let arr = allSelectedItems.map((elem, index) => {
                return parseFloat(elem.paidValue)
            })
            return (arr.reduce((acc, num) => acc + num, 0)).toFixed(2)
        }
    }, [allSelectedItems])

    const allOrdersBalance = useMemo(() => {
       if(addProduct == 2){
           let arr = allSelectedItems.map((elem, index) => {
               return parseFloat(elem.paidValue) ?
                   ((elem.items.map((items) => items.marketPriceCP != ''
                       ?
                       parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)-(parseFloat(elem.paidValue).toFixed(2) || 0)).toFixed(2))
                   :
                   elem.items.map((items) => items.marketPriceCP != ''
                       ?
                       parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)
           })
           arr = arr.map(elem => parseFloat(elem))
           return (arr.reduce((acc, num) => acc + num, 0)).toFixed(2)
       }
    }, [allSelectedItems])


    const margenCounterMany = useMemo(() => {
        let arr = allSelectedItems.map((elem, index) => {
            let pr = (parseFloat(elem.marketPriceCP * (elem.quantity || 1)) - parseFloat(elem.ourPrice * (elem.quantity || 1)))
            let niz = (parseFloat(elem.ourPrice * (elem.quantity || 1)) + parseFloat(elem.ourPrice * (elem.quantity || 1)) * parseFloat(elem.IVA) / 100)

            return (pr / (niz) * 100).toFixed(2) == 'NaN' ? 0 : (pr / (niz) * 100).toFixed(2)
        })
        console.log(allSelectedItems)
        arr = arr.map(elem => parseFloat(elem))
        return (arr.reduce((acc, num) => acc + num, 0) / arr.length).toFixed(2)

    })

    const [currentElem, setCurrentElem] = useState({})
    const currentTable = () => {
        // if(addProduct == 1){return <CatalogItem allProducts={allProducts} setAllProducts={setAllProducts} setAddProduct={setAddProduct}/>}
        if(true){return <OrderContainerContact currentUser={currentUser} createProd={createProd} updateProd={updateProd} allProducts={allProducts} setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem}/>}
        // if(addProduct == 3){return <OrderContainerOrderItems allProducts={allProducts} allOrders={allOrders} setAllProducts={setAllProducts} currentElem={currentElem}/>}
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

                        <div className='selectButton' onClick={() => {setParcialPay()}}>
                            <img src={copy} alt=""/>
                            <span>Payment</span>
                        </div>
                        <div className='selectButton'>
                            <img src={track} alt=""/>
                            <span>Add Route</span>
                        </div>
                        <div className='selectButton' onClick={() => {deleteOrders();  dispatch(delAllSelectedItems())}}>
                            <img src={del} alt=""/>
                            <span style={{color: "#FB547E"}}>Delete</span>
                        </div>
                        {addProduct == 2 ?
                        <div className='selectButton'>
                            <div style={{fontWeight: '400'}}>Total Sold</div>
                            <span style={{color: "#00AB55"}}>{((allOrdersPrices.map(elem => elem.marketPriceCP ? parseFloat(elem.marketPriceCP*(elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                        </div>
                            :
                            <div className='selectButton'>
                                <div style={{fontWeight: '400'}}>Total Sold</div>
                                <span style={{color: "#00AB55"}}>{((allOrdersProductsPrices.map(elem => elem.marketPriceCP ? parseFloat(elem.marketPriceCP*(elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                            </div>
                        }
                        {addProduct == 2 ?
                            <div className='selectButton'>
                                <div style={{fontWeight: '400'}}>COGS</div>
                                <span style={{color: "#00AB55"}}>{((allOrdersPrices.map(elem => elem.ourPrice ? parseFloat(elem.ourPrice*(elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                            </div>
                            :
                            <div className='selectButton'>
                                <div style={{fontWeight: '400'}}>COGS</div>
                                <span style={{color: "#00AB55"}}>{((allOrdersProductsPrices.map(elem => elem.ourPrice ? parseFloat(elem.ourPrice*(elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                            </div>
                        }
                        {addProduct == 2 ?
                            <div className='selectButton'>
                                <div style={{textAlign: 'center', fontWeight: '400'}}>Estimated Profit</div>
                                <span style={{color: "#00AB55"}}>{((allOrdersPrices.map(elem => elem.marketPrice ? (parseFloat(elem.marketPriceCP*(elem.quantity || 1)) - parseFloat(elem.ourPrice*(elem.quantity || 1))) *  (1-parseFloat(elem.IVA)/100) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                            </div>
                            :
                            <div className='selectButton'>
                                <div style={{textAlign: 'center', fontWeight: '400'}}>Estimated Profit</div>
                                <span style={{color: "#00AB55"}}>{((allOrdersProductsPrices.map(elem => elem.marketPrice ? (parseFloat(elem.marketPriceCP*(elem.quantity || 1)) - parseFloat(elem.ourPrice*(elem.quantity || 1))) *  (1-parseFloat(elem.IVA)/100) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€</span>
                            </div>

                        }
                        {addProduct == 2 &&
                            <div className='selectButton'>
                                <div style={{textAlign: 'center', fontWeight: '400'}}>Paid</div>
                                <span style={{color: "#00AB55"}}>{allOrdersPaid}€</span>
                            </div>

                        }
                        {addProduct == 2 &&
                            <div className='selectButton'>
                                <div style={{textAlign: 'center', fontWeight: '400'}}>Balance</div>
                                <span style={{color: "#00AB55"}}>{allOrdersBalance}€</span>
                            </div>
                        }
                        {addProduct == 3 &&
                            <div className='selectButton'>
                                <div style={{textAlign: 'center', fontWeight: '400'}}>Margen</div>
                                <span style={{color: "#00AB55"}}>{margenCounterMany}%</span>
                            </div>
                        }

                    </div>
                    <div className='selectCloseButton' onClick={() => dispatch(delAllSelectedItems())}>
                        <IoClose/>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrdersComponentContact;