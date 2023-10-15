import React, {useEffect, useMemo, useState} from 'react';
import TableItem from "../TableItem/TableItem";
import tomato from "../images/tomato.svg";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addAllSelectedItems} from "../../../../features/allSelectedItems";
import {setSearch} from "../../../../features/searchItemsAdmin";
import {setAllArrayStatus} from "../../../../features/allStatus";
import { TbCheck } from 'react-icons/tb';

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
    changeOrderItems, changeStatusOne, changeOrderElem
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
const NewOrder = ({setAddProduct, allProducts, setCurrentElem, setAllProducts, setSelectedElems, currentElem}) => {


    const [allChoose, setAllChoose] = useState(['ID', 'SKU', 'Barcode', 'Image', 'Enabled', 'Name', 'Category','Proveedor', 'Description', 'Unit', 'IVA', 'Entry Price' ,'MBP', 'DP', 'SDP', 'CP', 'Profit', 'Margen', 'Total'])


    const [allSelectedAddProd, setAllSelectedAddProd] = useState([])

    const [stCrStatus, setStCrStatus] = useState(currentElem.status)
    const [openStatus, setOpenStatus] = useState(false)
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allOrders = useSelector((state) => state.allOrders.allOrders)

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)

    const [editOpen, setEditOpen] = useState(true)

    const [editArr, setEditArr] = useState(currentElem.items)

    useEffect(() => {
        let bArr = allOrders.filter(el => currentElem._id == el._id)

        setEditArr(bArr[0].items)
    }, [allOrders])

    const [selectedAll, setSelectedAll] = useState(false)
    const [delivered, setDelivered] = useState(false)
    const [paid, setPaid] = useState(false)

    const [addProdOpen, setAddProdOpen] = useState(false)
    const [inputParcial, setInputParcial] = useState('')

    const [inputSearch, setInputSearch] = useState('')
    const [selectedChooseAll, setSelectedChooseAll] = useState(false)

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
            return String(elem.name).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.sku).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.category).toLowerCase().includes(inputSearch.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(inputSearch.toLowerCase())
        })
    }, [allProducts, inputSearch])


    const searchFilterByName = useMemo(() => {
        return allOrders.filter(elem => currentElem._id == elem._id)[0].items.filter(elem => {
                try {
                    return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
                }catch (e) {

                }

        })
    }, [allOrders, searchItemsAdmin])


    useEffect(() => {
        axios.get('https://tpomobi.shop/getStatusAdmin').then((resp) => {
            dispatch(setAllArrayStatus(resp.data))
        });
    }, [])


    const addAllItemsToSelect = () => {
        setSelectedAll((prev) => !prev)
        dispatch(addAllSelectedItems({arr: currentElem.items, check: selectedAll}))
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
        setStCrStatus(crElem)
        dispatch(changeStatusOne({_id: currentElem._id, crElem}))
        if(true){
                axios.post('https://tpomobi.shop/updateStatusOrderAdmin', {
                data: {crElem, currentElem}
            })
        }else{
            alert('add status name')
        }
    }

    const changeOrderElemHandler = () => {
        dispatch(changeOrderElem({editArr, currentElem}))
        if(true){
            axios.post('https://tpomobi.shop/changeOrderItemsAdmin', {
                data: {editArr, currentElem}
            })
        }else{
            alert('add status name')
        }
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

    return (
        <div className='tableMainClass' onClick={() => setAddProdOpen(false)}>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>Order - {currentElem._id}</div>
            <div className='statsDiv'>
                <div className='statsDivBlockOrderItem'>
                    <div className='statsDivBlockTitle'>
                        <div className='statsDivBlockTitleText'>Information</div>
                        <div className='statsDivBlockTitleLine'></div>
                    </div>
                    <div className='statsDivBlockBody'>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Created</div>
                            <div className='statsDivBlockInfoData'>{new Date(currentElem.date).getDate() + '.' + new Date(currentElem.date).getMonth() + '.' + new Date(currentElem.date).getFullYear() + ' (' + (parseInt(new Date(currentElem.date).getHours()) < 10 ? '0' + new Date(currentElem.date).getHours() : new Date(currentElem.date).getHours()) + ':' + (parseInt(new Date(currentElem.date).getMinutes()) < 10 ? '0' + new Date(currentElem.date).getMinutes() : new Date(currentElem.date).getMinutes()) + ')'}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Source</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? <span>Browser <GrLanguage style={{color: 'black', fontSize: '20px'}}/> </span>: currentElem.type == 'telegram' ? <span>Telegram <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/> </span>: <span>WhatsApp <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/></span>}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Comment</div>
                            <div className='statsDivBlockInfoData'>i dont now</div>
                        </div>
                    </div>

                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockTextInOrder' onClick={() => setOpenStatus(prev => !prev)}>Status <span style={{color: stCrStatus.color == '#FFF' ? 'black' : "#FFF", background: stCrStatus.color, border: stCrStatus.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}}>{stCrStatus.name}</span></div>
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
                    <div className='statsDivBlockTextInOrder' onClick={() => setPaid(prev => !prev)}>Paid <span style={{background: !paid && '#FF9191', border: !paid && '1px solid #FF9191'}}>{paid ? 'Yes' : 'No'}</span></div>
                    <div className='statsDivBlockTextInOrder'>Total <div className='totalNumber'>{currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</div></div>
                    {!paid &&

                        <div className='statsDivBlockTextInOrder'>Paid <div className='totalNumber'><input type="text" placeholder={'Enter value'} style={{textAlign: 'right', width: '100px'}} onChange={(e) => setInputParcial(e.target.value)}/></div></div>
                    }
                    {!paid &&

                        <div className='statsDivBlockTextInOrder'>Balance <div className='totalNumber'>{(parseFloat(currentElem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*items.quantity) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2))-parseFloat(inputParcial)).toFixed(2)}€</div></div>
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
                            <div className='statsDivBlockInfoData' style={{fontSize: '12px'}}>{currentElem._id}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Name</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? 'User' : currentElem.type == 'telegram' ? currentElem.tg.user.first_name : currentElem.msg._data.notifyName}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Username</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? 'Username' : currentElem.type == 'telegram' ? currentElem.tg.user.username : currentElem.msg._data.from.split('@')[0]}</div>
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
                            <div className='statsDivBlockInfoName'>Recipient</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? 'User' : currentElem.type == 'telegram' ? currentElem.tg.user.first_name : currentElem.msg._data.notifyName}</div>
                        </div>
                        <div className='statsDivBlockInfo'>
                            <div className='statsDivBlockInfoName'>Phone</div>
                            <div className='statsDivBlockInfoData'>{currentElem.type == 'browser' ? '' : currentElem.type == 'telegram' ? '' : currentElem.msg._data.from.split('@')[0]}</div>
                        </div>
                    </div>

                </div>

                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Listo</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>0/10</div>



                </div>
            </div>
        <div className='tableContainer'>
            <div className='tableOptions'>
                <div className='itemsLength'>
                    Showing 1-{currentElem.items.length} of {currentElem.items.length} items.</div>
                <div className='itemsFilter'>
                    <div className='filter'>
                        Filters
                    </div>
                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => dispatch(setSearch(e.target.value))} value={searchItemsAdmin} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    {editOpen ?
                        <div className='addProduct' onClick={() => {setEditOpen(false)}}>
                            Edit
                        </div>
                        :
                        <div className='addProduct' onClick={() => {setEditOpen(true); changeOrderElemHandler()}}>
                            Save
                        </div>
                    }
                    {
                        editOpen == false &&
                        <div className='addProduct' onClick={() => {setEditOpen(true)}}>
                            Back
                        </div>
                    }
                    <div className='addProduct' onClick={(e) => {e.stopPropagation(); setAddProdOpen(prev => !prev)}}>
                        Add Product
                    </div>
                    {
                        addProdOpen &&
                        <div className='addProductBlock' onClick={(e) => e.stopPropagation()}>
                            <div className='addProductBlockInfoLine'>
                                <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox' onClick={() => selectArrayHandlerAddProdAll()} style={{fontSize: '20px', color: '#FFF', background: allSelectedAddProd.length == searchFilterAddProducts.length && '#06C0B0', border: allSelectedAddProd.length == searchFilterAddProducts.length && '2px solid #FFF'}}>{allSelectedAddProd.length == searchFilterAddProducts.length && <TbCheck/>}</div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLineImage'>image</div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLineName'>name</div>
                                <div className='searchBlock' style={{width: '150px', borderBottom: '0.5px solid #06C0B0', height: '29px'}}>
                                    <input className='search' style={{width: '150px',  height: '29px',  borderTop: '0.5px solid #06C0B0'}} onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} placeholder='Search'/>
                                    <span style={{right: '-2px', bottom: '1px'}}><BiSearch/></span>
                                </div>
                                <div style={{width: '50px'}} className='addProductBlockInfoLinePrice'>CP</div>
                            </div>
                            <div className='addProductBlockElems'>
                                {
                                    searchFilterAddProducts.map(elem => {
                                        return <div className='addProductBlockElem'>
                                            <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox' onClick={() => selectArrayHandlerAddProd(elem)} style={{color: '#FFF', fontSize: '20px', background: allSelectedAddProd.find(e => e._id == elem._id) && '#06C0B0', border: allSelectedAddProd.find(e => e._id == elem._id) && '2px solid #06C0B0'}}>{allSelectedAddProd.find(e => e._id == elem._id) && <TbCheck/>}</div>
                                            <div style={{width: '50px'}} className='addProductBlockInfoLineImage'><img className='itemImage' src={elem.img || fakePhoto}/></div>
                                            <div style={{width: '200px', overflow: 'hidden'}} className='addProductBlockInfoLineName'>{elem.name}</div>
                                            <div className='searchBlock' style={{width: '0px'}}></div>
                                            <div style={{width: '50px'}} className='addProductBlockInfoLinePrice'>{elem.marketPriceCP}€</div>
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
                        <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{fontSize: '20px', color: '#FFF', background: allSelectedItems.length == currentElem.items.length && '#06C0B0', border: allSelectedItems.length == currentElem.items.length && '2px solid #FFF'}}>{allSelectedItems.length == currentElem.items.length && <TbCheck/>}</div>
                        <div className='checkbox' style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border: '2px solid #FFF'}}><AiOutlineLike/></div>

                        <div className='chooseVisibleColumnsBlock'>
                            <div style={{width: '24px', textAlign: 'center'}} onClick={() => {setSelectedChooseAll((prev) => !prev)}} className='chooseVisibleColumns'>
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
                        searchFilterByName.map(elem => {
                            return <TableItemOrderItem editOpen={editOpen} setEditArr={setEditArr} currentElem={currentElem} setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
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
                <div className='tableOrderButton' style={{width: '200px'}}>Confirm</div>
                <div className='tableOrderButton' onClick={() => {dispatch(setValue(2)); changeOrderElemHandler()}} style={{width: '200px'}}>Save</div>
                <div className='tableOrderButton' onClick={() => dispatch(setValue(2))}>Back</div>
                <div className='tableOrderButton'>Copy</div>
                <div className='tableOrderButton'>Delete</div>
            </div>
        </div>
        </div>
    );
};

export default NewOrder;