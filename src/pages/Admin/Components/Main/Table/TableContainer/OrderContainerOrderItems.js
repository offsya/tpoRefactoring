import React, {useEffect, useMemo, useState} from 'react';
import TableItem from "../TableItem/TableItem";
import tomato from "../images/tomato.svg";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addAllSelectedItems} from "../../../../features/allSelectedItems";
import {setSearch} from "../../../../features/searchItemsAdmin";
import {setAllArrayStatus} from "../../../../features/allStatus";
import { TbCheck } from 'react-icons/tb';
import {
    BorderTopOutlined,

} from '@ant-design/icons';
import {Button, Divider, notification, Select, Space} from 'antd';
import {deleteColumn, setAllChooseColumn} from "../../../../features/allChooseColumn";
import allItemsImage from '../images/allItems.svg'
import euroImage from '../images/euro.svg'
import arrowImage from '../images/arrow.svg'
import unEnabledImage from '../images/unenabled.svg'

import {
    addAllOrders,
    setAllOrders,
    setAllOrdersOrders,
    delAllOrders,
    changeStatusMany,
    changeOrderItems, changeStatusOne, changeOrderElem, changeStatusOrderItemMany,changeOrderElemParcial
} from "../../../../features/allOrders";
import { FaCheck } from 'react-icons/fa';

import { FaWhatsapp } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';

import {BiCategoryAlt, BiSearch} from 'react-icons/bi';
import {FaUserCircle} from "react-icons/fa";
import {setValue} from "../../../../features/setAddProdAdmin";
import TableItemOrderItem from "../TableItem/TableItemOrderItem";
import {AiOutlineLike} from "react-icons/ai";
import fakePhoto from "../../../../../../assets/av.svg";
const OrderContainerOrderItems = ({setAddProduct, allProducts, setCurrentElem, setAllProducts, setSelectedElems, currentElem}) => {


    const [allChoose, setAllChoose] = useState(['ID', 'SKU', 'Barcode', 'Image', 'Enabled', 'Name', 'Category','Proveedor', 'Description', 'Unit', 'IVA', 'Entry Price' ,'MBP', 'DP', 'SDP', 'CP', 'Profit', 'Margen', 'Total'])


    const [allSelectedAddProd, setAllSelectedAddProd] = useState([])

    const [stCrStatus, setStCrStatus] = useState(currentElem.status)
    const [openStatus, setOpenStatus] = useState(false)
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allOrders = useSelector((state) => state.allOrders.allOrders)


    window.addEventListener("click", function(event) {
        setOpenStatus(false)
    });

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)

    const [editOpen, setEditOpen] = useState(true)

    const [editArr, setEditArr] = useState(currentElem.items)

    useEffect(() => {
        let bArr = allOrders.filter(el => currentElem._id == el._id)

        setEditArr(bArr[0].items)
    }, [allOrders])

    const [selectedAll, setSelectedAll] = useState(false)
    const [delivered, setDelivered] = useState(false)

    const [addProdOpen, setAddProdOpen] = useState(false)
    const [inputParcial, setInputParcial] = useState(currentElem.paidValue || 0)

    const [inputSearch, setInputSearch] = useState('')
    const [selectedChooseAll, setSelectedChooseAll] = useState(false)
    const [paid, setPaid] = useState((parseFloat(currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))-parseFloat(inputParcial)) <= 0 ? 'Yes' : parseFloat(inputParcial) <= 0 ? 'No' : 'Parcial')
    console.log((parseFloat(currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))))
    const dispatch = useDispatch()
    // const searchFilterByName = useMemo(() => {
    //     return allProducts.filter(elem => String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()))
    // }, [allProducts, searchItemsAdmin])
    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)
    const allChooseColumn = useSelector((state) => state.allChooseColumn.allChooseColumn)


    const [getAllProdObserver, setGetAllProdObserver] = useState(false);
    const [inpValue, setInpValue] = useState('');


    const searchFilterAddProducts = useMemo(() => {
        return allProducts.filter(elem => {
            elem.quantityOrder = 1
            elem.quantity = 1
            return String(elem.name).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.sku).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.category).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(inputSearch.toLowerCase())
        })
    }, [allProducts, inputSearch])


    const searchFilterByName = useMemo(() => {
        return allOrders.filter(elem => currentElem._id == elem._id)[0].items.filter(elem => {
            try {
                return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
            } catch (e) {

            }

        })
        // if(allOrders.filter(elem => currentElem._id == elem._id)[0].type == 'whatsapp') {
        //     const matchedItems = allOrders.filter(elem => currentElem._id == elem._id)[0].items.filter(elem => {
        //         try {
        //                 let newElem = allProducts.find(item => item.sku === elem.sku);
        //
        //                 if (newElem) {
        //                     console.log(newElem)
        //                         console.log(elem)
        //                     return {
        //                         ...newElem,
        //                         quantity: elem.quantity,
        //                         quantityOrder: elem.quantityOrder
        //                     };
        //                 }
        //
        //             // let newElem = allProducts.map(item => {
        //             //     if(item.sku == elem.sku){
        //             //         console.log(elem)
        //             //         return {...item, quantity: elem.quantity, quantityOrder: elem.quantityOrder}
        //             //     }
        //             // })
        //             //
        //             // return String(newElem[0].name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(newElem[0].sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(newElem[0].category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(newElem[0].proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        //
        //         } catch (e) {
        //             console.log(e)
        //         }
        //
        //     })
        //
        //     return matchedItems.filter(newElem =>
        //         String(newElem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) ||
        //         String(newElem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) ||
        //         String(newElem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) ||
        //         String(newElem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        //     );
        // }else {
        //     // return allOrders.filter(elem => currentElem._id == elem._id)[0].items.filter(elem => {
        //     //     try {
        //     //         return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        //     //     } catch (e) {
        //     //
        //     //     }
        //     //
        //     // })
        // }
    }, [allOrders, searchItemsAdmin])


    useEffect(() => {
        axios.get('https://tpomobi.shop/getStatusAdmin').then((resp) => {
            dispatch(setAllArrayStatus(resp.data))
        });
    }, [])


    const addAllItemsToSelect = () => {
        setSelectedAll((prev) => !prev)
        dispatch(addAllSelectedItems({arr: searchFilterByName || currentElem.items, check: selectedAll}))
    }

    const selectArrayHandlerAddProd = (elem) => {
        const filterArray = allSelectedAddProd.map((elem) => elem._id);
        if(!filterArray.includes(elem._id)){
            setAllSelectedAddProd(prev => [...prev, elem])
        }else{
            setAllSelectedAddProd(allSelectedAddProd.filter(item => item._id !== elem._id))
        }
    }

    const selectArrayHandlerAddProdAll = () => {
        if(allSelectedAddProd.length > 0){
            setAllSelectedAddProd([])
        }else{
            setAllSelectedAddProd(searchFilterAddProducts)
        }
    }

    const updateOrderItems = async () => {
        let data = {...currentElem, items: [...currentElem.items, ...allSelectedAddProd]}
        await axios.post('https://tpomobi.shop/updateOrderItemsAdmin', {elem: data}).then((resp) => {
            dispatch(changeOrderItems({_id: currentElem._id, arr: allSelectedAddProd}));

        });
    }

    const updateStatus = (crElem) => {
        console.log(crElem)
        console.log(currentElem)
        setStCrStatus(crElem)
        dispatch(changeStatusOne({_id: currentElem._id, crElem}))
        if(true){
                axios.post('https://tpomobi.shop/updateStatusOrderAdmin', {
                data: {crElem, elem: currentElem}
            })
        }else{
            alert('add status name')
        }
    }

    console.log(currentElem)

    const changeOrderElemHandler = async () => {
        dispatch(changeOrderElem({editArr, currentElem}))
        dispatch(changeOrderElemParcial({paidValue: inputParcial, currentElem}))

        if(true){
            axios.post('https://tpomobi.shop/changeOrderItemsAdmin', {
                data: {editArr, currentElem}
            })
            axios.post('https://tpomobi.shop/updatePaidValueOrderAdmin', {
                data: {'value': inputParcial, '_id': currentElem._id}
            })
        }else{
            alert('add status name')
        }
        await openNotification('top');
    }




    // const margenCounter = useMemo(() => {
    //     let arrT = currentElem.items.map(elem => {
    //         let pr = (parseFloat(elem.marketPriceCP)-parseFloat(elem.ourPrice))
    //         let niz = (parseFloat(elem.ourPrice) + parseFloat(elem.ourPrice) * parseFloat(elem.IVA)/100)

    //
    //         return (pr/(niz)*100).toFixed(2) == 'NaN' ? 0 :parseFloat((pr/(niz)*100).toFixed(2))
    //     })
    //     return arrT.reduce((acc, curr) => acc + curr, 0)
    //
    // }, [currentElem.items])
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
            message: `Save Completed.`,
            placement,
        });
    };


    const [qunatityElems, setQuantityElems] = useState('20')

    const orderNumber = () => {
        const browserType={
            "browser": "WW",
            "whatsapp": "WA",
            "telegram": "TG",
        }
        return  `${browserType[currentElem?.type]+(new Date(currentElem.date).getFullYear()%100)+(new Date(currentElem.date).getMonth()+1<=9?("0"+(new Date(currentElem.date).getMonth()+1)):(new Date(currentElem.date).getMonth()+1))+(new Date(currentElem.date).getDate()<=9?("0"+new Date(currentElem.date).getDate()):new Date(currentElem.date).getDate()) + (currentElem?.tradeName || "") + (currentElem.type== "whatsapp" ? "CP": currentElem.order)+(currentElem._id.slice(-4))}`

    }
    return (
        <div className='tableMainClass' onClick={() => setAddProdOpen(false)}>
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>Order - {orderNumber()}</div>
            <div className='statsDiv'>
                <div className='statsDivBlockOrderItem'>
                    <div className='statsDivBlockTitle'>
                        <div className='statsDivBlockTitleText'>Information</div>
                        <div className='statsDivBlockTitleLine'></div>
                    </div>
                    <div className='statsDivBlockBody'>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Created</div>
                            <div className='statsDivBlockInfoData'>{new Date(currentElem.date).getDate() + '.' + (new Date(currentElem.date).getMonth() + 1) + '.' + new Date(currentElem.date).getFullYear() + ' (' + (parseInt(new Date(currentElem.date).getHours()) < 10 ? '0' + new Date(currentElem.date).getHours() : new Date(currentElem.date).getHours()) + ':' + (parseInt(new Date(currentElem.date).getMinutes()) < 10 ? '0' + new Date(currentElem.date).getMinutes() : new Date(currentElem.date).getMinutes()) + ')'}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Source</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? <span>Browser <GrLanguage style={{color: 'black', fontSize: '20px'}}/> </span>: currentElem.type == 'telegram' ? <span>Telegram <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/> </span>: <span>WhatsApp <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/></span>}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Comment</div>
                            <div className='statsDivBlockInfoData'>{currentElem.description}</div>
                        </div>
                    </div>

                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockTextInOrder' onClick={(e) => {e.stopPropagation(); setOpenStatus(prev => !prev)}}>Status <span style={{color: stCrStatus.color == '#FFF' ? 'black' : "#FFF", background: stCrStatus.color, border: stCrStatus.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}}>{stCrStatus.name}</span></div>
                    {openStatus &&
                        <div className='statusChangerMenu' style={{position: "absolute", top: '50px', left: '150px'}}>
                            <div className='allStatusItems' style={{gridColumnGap: '10px'}}>
                                {allStatus.map(elem => {
                                    if(elem.type == 'orders') {
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
                    <div className='statsDivBlockTextInOrder' onClick={() => {setPaid(prev => prev == 'Yes' ? 'Parcial' : prev == 'Parcial' ? 'No' : 'Yes'); paid == 'Yes' ? setInputParcial(0) : paid == 'Parcial' ? setInputParcial(0) : setInputParcial(currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))}}>Paid <span style={{background: paid == 'No' ? '#FF9191' : paid == 'Parcial' ? 'orange' : '#00AB55', border: paid == 'No' ? '1px solid #FF9191' : paid == 'Parcial' ? '1px solid orange' : '1px solid #00AB55'}}>{paid}</span></div>
                    <div className='statsDivBlockTextInOrder'>Total <div className='totalNumber'>{currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</div></div>
                    {paid == 'Parcial' &&

                        <div className='statsDivBlockTextInOrder'>Paid <div className='totalNumber'><input type="text" value={inputParcial} style={{textAlign: 'right', width: '50px', borderBottom: '1px solid black'}} onChange={(e) => setInputParcial((e.target.value).replace(',', '.'))} placeholder={'0'}/>€</div></div>
                    }
                    {paid == 'Parcial'  &&

                        <div className='statsDivBlockTextInOrder'>Balance <div className='totalNumber'>{(parseFloat(currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))-parseFloat(inputParcial) || 0).toFixed(2)}€</div></div>
                    }


                </div>
                <div className='statsDivBlockOrderItem'>
                    <div className='statsDivBlockTitle'>
                        <div className='statsDivBlockTitleText'>Client</div>
                        <div className='statsDivBlockTitleLine'></div>
                    </div>
                    <div className='statsDivBlockBody'>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>ID:</div>
                            <div className='statsDivBlockInfoData' style={{fontSize: '12px'}}>{currentElem?.userAcc?._id}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Name</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? currentElem?.userAcc?.email || 'User' : currentElem.type == 'telegram' ? currentElem.tg.user.first_name : currentElem.msg._data.notifyName}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Username</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? currentElem?.userAcc?.email || 'User' : currentElem.type == 'telegram' ? currentElem.tg.user.username : currentElem.msg._data.from.split('@')[0]}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Recipient</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? currentElem?.userAcc?.email || 'User' : currentElem.type == 'telegram' ? currentElem.tg.user.first_name : currentElem.msg._data.notifyName}</div>
                        </div>
                    </div>

                </div>

                <div className='statsDivBlockOrderItem'>
                    <div className='statsDivBlockTitle'>
                        <div className='statsDivBlockTitleText'>{currentElem?.order || 'CP'}</div>
                        <div className='statsDivBlockTitleLine'></div>
                    </div>
                    <div className='statsDivBlockBody'>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Phone</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? '' : currentElem.type == 'telegram' ? '' : currentElem.msg._data.from.split('@')[0]}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Delivery Date</div>
                            <div className='statsDivBlockInfoData'>{currentElem.deliveryDate}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Delivery Time</div>
                            <div className='statsDivBlockInfoData'>{currentElem.deliveryTime}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Payment Type</div>
                            <div className='statsDivBlockInfoData'>{currentElem.paymentType}</div>
                        </div>
                    </div>

                </div>

                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Listo</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{searchFilterByName.filter(el => el.status?.name == 'Listo').length + '/' + searchFilterByName.length}</div>



                </div>
            </div>
        <div className='tableContainer'>
            <div className='tableOptions'>

                <div className='itemsLength'>
                    <div className='itemsFilter'>
                        <div className='filter' style={{position: "relative", left: '-7px'}} onClick={() => dispatch(setValue(2))}>
                            Back
                        </div>
                    </div>
                    Showing 1-{searchFilterByName.length || currentElem.items.length} of {currentElem.items.length} items.</div>
                <div className='itemsFilter'>
                    <div className=''>
                        <Select
                            style={{
                                marginTop: '0px',
                                width: '200px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#06C0B0',
                                fontSize: '32px'
                            }}
                            size={'large'}
                            placeholder="Rows Quantity"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={(value) => setQuantityElems(value)}
                            options={[
                                {value: '20', label: '20'},
                                {value: '50', label: '50'},
                                {value: '100', label: '100'},
                                {value: '150', label: '150'},
                                {value: '200', label: '200'},
                                {value: '500', label: '500'},
                                {value: 'All', label: 'All'}
                            ]}
                        />
                    </div>
                    <div className='filter'>
                        Filters
                    </div>
                    <div className='filter' onClick={() => {
                        dispatch(setValue(3));
                        changeOrderElemHandler()
                    }}>
                        Save
                    </div>
                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => dispatch(setSearch(e.target.value))}
                               value={searchItemsAdmin} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    {editOpen ?
                        <div className='addProduct' onClick={() => {
                            setEditOpen(false)
                        }}>
                            Edit
                        </div>
                        :
                        <div className='addProduct' onClick={() => {
                            setEditOpen(true);
                            changeOrderElemHandler()
                        }}>
                            Save
                        </div>
                    }
                    {
                        editOpen == false &&
                        <div className='addProduct' onClick={() => {
                            setEditOpen(true)
                        }}>
                            Back
                        </div>
                    }
                    <div className='addProduct' onClick={(e) => {
                        e.stopPropagation();
                        setAddProdOpen(prev => !prev)
                    }}>
                        Add Product
                    </div>
                    {
                        addProdOpen &&
                        <div className='addProductBlock' onClick={(e) => e.stopPropagation()}>
                            <div className='addProductBlockInfoLine'>
                                <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'
                                     onClick={() => selectArrayHandlerAddProdAll()} style={{
                                    fontSize: '20px',
                                    color: '#FFF',
                                    background: allSelectedAddProd.length == searchFilterAddProducts.length && '#06C0B0',
                                    border: allSelectedAddProd.length == searchFilterAddProducts.length && '2px solid #FFF'
                                }}>{allSelectedAddProd.length == searchFilterAddProducts.length && <TbCheck/>}</div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLineImage'>image</div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLineName'>name</div>
                                <div className='searchBlock'
                                     style={{width: '150px', borderBottom: '0.5px solid #06C0B0', height: '29px'}}>
                                    <input className='search'
                                           style={{width: '150px', height: '29px', borderTop: '0.5px solid #06C0B0'}}
                                           onChange={(e) => setInputSearch(e.target.value)} value={inputSearch}
                                           placeholder='Search'/>
                                    <span style={{right: '-2px', bottom: '1px'}}><BiSearch/></span>
                                </div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLinePrice'>CP</div>
                            </div>
                            <div className='addProductBlockElems'>
                                {
                                    searchFilterAddProducts.map(elem => {
                                        return <div className='addProductBlockElem'>
                                            <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'
                                                 onClick={() => selectArrayHandlerAddProd(elem)} style={{
                                                color: '#FFF',
                                                fontSize: '20px',
                                                background: allSelectedAddProd.find(e => e._id == elem._id) && '#06C0B0',
                                                border: allSelectedAddProd.find(e => e._id == elem._id) && '2px solid #06C0B0'
                                            }}>{allSelectedAddProd.find(e => e._id == elem._id) && <TbCheck/>}</div>
                                            <div style={{width: '50px'}} className='addProductBlockInfoLineImage'><img
                                                className='itemImage' src={elem.img || fakePhoto}/></div>
                                            <div style={{width: '200px', overflow: 'hidden'}}
                                                 className='addProductBlockInfoLineName'>{elem.name}</div>
                                            <div className='searchBlock' style={{width: '0px'}}></div>
                                            <div style={{width: '50px'}}
                                                 className='addProductBlockInfoLinePrice'>{elem.marketPriceCP}€
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className='addProductBlockAddButton' onClick={() => {
                                updateOrderItems()
                                setAddProdOpen(false)
                            }}>
                                Add
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='tableItems'>
                <div className='tableColumns' style={{fontSize: '16px', fontWeight: '400'}}>
                    <div style={{display: 'flex', gridGap: '5px'}}>
                        <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{
                            fontSize: '20px',
                            color: '#FFF',
                            background: allSelectedItems.length == (searchFilterByName.length || currentElem.items.length) && '#06C0B0',
                            border: allSelectedItems.length == (searchFilterByName.length || currentElem.items.length) && '2px solid #FFF'
                        }}>{allSelectedItems.length == (searchFilterByName.length || currentElem.items.length) &&
                            <TbCheck/>}</div>
                        <div className='checkbox'
                             style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border: '2px solid #FFF'}}>
                            <AiOutlineLike/></div>

                        <div className='chooseVisibleColumnsBlock'>
                            <div style={{width: '24px', textAlign: 'center'}} onClick={() => {
                                setSelectedChooseAll((prev) => !prev)
                            }} className='chooseVisibleColumns'>
                                <BiCategoryAlt/>
                            </div>
                            <span style={{display: !selectedChooseAll && 'none', left: '-10px'}}>
                            <div>
                                Columns
                            </div>
                                {
                                    allChoose.map(elem => {
                                        return <div style={{display: 'flex', alignItems: 'center', color: 'black'}} onClick={() => dispatch(setAllChooseColumn(elem))}>
                                            <div className='checkbox' style={{color: '#00AB55', border: allChooseColumn.includes(elem) && '2px solid #00AB55', marginRight: '8px'}}>{allChooseColumn.includes(elem) && '✓'}</div>
                                            {elem}
                                        </div>
                                    })
                                }
                              </span>
                        </div>
                    </div>
                    <div style={{width: '10px', textAlign: 'left', display: !allChooseColumn.includes('ID') && 'none'}} className='itemId'>ID</div>
                    <div style={{width: '50px', textAlign: 'left', display: !allChooseColumn.includes('SKU') && 'none'}} className='itemId'>SKU</div>
                    <div style={{width: '50px', textAlign: 'left', display: !allChooseColumn.includes('Barcode') && 'none'}} className='itemId'>Barcode</div>

                    <div style={{width: '60px', textAlign: 'center', display: !allChooseColumn.includes('Image') && 'none'}}>Image</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Enabled') && 'none'}}>Enabled</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Name') && 'none'}} className='itemName'>Name</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Category') && 'none'}}>Category</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Proveedor') && 'none'}}>Proveedor</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Description') && 'none'}}>Description</div>
                    <div style={{width: '50px', textAlign: 'left', display: !allChooseColumn.includes('Unit') && 'none'}}>Unit</div>

                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('C.Qty') && 'none'}}>C.Qty</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('O.Qty') && 'none'}}>O.Qty</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('IVA') && 'none'}}>IVA</div>

                    <div style={{whiteSpace: 'nowrap', width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Entry Price') && 'none'}}>Entry Price</div>

                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('MBP') && 'none'}}>MBP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('DP') && 'none'}}>DP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('SDP') && 'none'}}>SDP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('CP') && 'none'}}>CP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>Profit</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Margen') && 'none'}}>Margen</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Total') && 'none'}}>Total</div>


                    {/*<div style={{display: 'flex', gridGap: '5px'}}>*/}
                    {/*    <div className='checkbox' style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border: '2px solid #FFF'}}><AiOutlineLike/></div>*/}
                    {/*    <div className='chooseVisibleColumnsBlock'>*/}
                    {/*        <div style={{width: '24px', textAlign: 'center'}} onClick={() => {setSelectedChooseAll((prev) => !prev)}} className='chooseVisibleColumns'>*/}
                    {/*            <BiCategoryAlt/>*/}
                    {/*        </div>*/}
                    {/*        <span style={{display: !selectedChooseAll && 'none'}}>*/}
                    {/*        <div>*/}
                    {/*            Columns*/}
                    {/*        </div>*/}
                    {/*            {*/}
                    {/*                allChoose.map(elem => {*/}
                    {/*                    return <div style={{display: 'flex', alignItems: 'center', color: 'black'}} onClick={() => dispatch(setAllChooseColumn(elem))}>*/}
                    {/*                        <div className='checkbox' style={{color: '#00AB55', border: allChooseColumn.includes(elem) && '2px solid #00AB55', marginRight: '8px'}}>{allChooseColumn.includes(elem) && '✓'}</div>*/}
                    {/*                        {elem}*/}
                    {/*                    </div>*/}
                    {/*                })*/}
                    {/*            }*/}

                    {/*    </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
                {/*style={{overflow: 'none', maxHeight: 'calc(100vh - 410px)'}}*/}
                <div>
                    {
                        searchFilterByName.map((elem, index) => {
                            if(qunatityElems == 'All' || searchItemsAdmin) {
                                return <TableItemOrderItem editOpen={editOpen} setEditArr={setEditArr} currentElem={currentElem} setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                            } else if(index < parseInt(qunatityElems)) {
                                return <TableItemOrderItem editOpen={editOpen} setEditArr={setEditArr} currentElem={currentElem} setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>

                            }
                        })
                    }
                </div>
            </div>
        </div>
        <div className='tableOrderInfo'>
            <div className='tableOrderInfoElem'>
                <div className='tableOrderInfoElemName'>Products</div>
                <div className='tableOrderInfoElemData'>{currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</div>
            </div>
            <div className='tableOrderInfoElem'>
                <div className='tableOrderInfoElemName'>Profit</div>
                <div className='tableOrderInfoElemData'>{currentElem.items.map((items) => items.marketPriceCP != '' ? (parseFloat(items.marketPriceCP*(items.quantity || 1)) - parseFloat(items.ourPrice*(items.quantity || 1))) * (1-parseFloat(items.IVA)/100) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</div>
            </div>
            {/*<div className='tableOrderInfoElem'>*/}
            {/*    <div className='tableOrderInfoElemName'>Margen</div>*/}
            {/*    <div className='tableOrderInfoElemData'>{margenCounter}€</div>*/}
            {/*</div>*/}
            <div className='tableOrderInfoElem'>
                <div className='tableOrderInfoElemName'>Delivery</div>
                <div className='tableOrderInfoElemData'>0€</div>
            </div>
            <div className='tableOrderInfoElem'>
                <div className='tableOrderInfoElemName tableOrderInfoElemTotal'>Total</div>
                <div className='tableOrderInfoElemData tableOrderInfoElemTotal'>{currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</div>
            </div>
        </div>
        <div className='tableOrderButtons'>
            <div className='tableOrderButtonsElems'>
                <div className='tableOrderButton' style={{width: '200px'}}>Add Route</div>
                <div className='tableOrderButton' onClick={() => {dispatch(setValue(3)); changeOrderElemHandler()}} style={{width: '200px'}}>Save</div>
                <div className='tableOrderButton' onClick={() => dispatch(setValue(2))}>Back</div>
                <div className='tableOrderButton'>Copy</div>
                <div className='tableOrderButton'>Delete</div>
            </div>
        </div>
        </div>
    );
};

export default OrderContainerOrderItems;