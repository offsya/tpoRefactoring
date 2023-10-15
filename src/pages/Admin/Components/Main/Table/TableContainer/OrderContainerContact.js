
import React, {useEffect, useMemo, useState} from 'react';
import TableItem from "../TableItem/TableItem";
import tomato from "../images/tomato.svg";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addAllSelectedItems, delAllSelectedItems} from "../../../../features/allSelectedItems";
import {setSearch} from "../../../../features/searchItemsAdmin";
import {setAllArrayStatus, setOpenColorPicker} from "../../../../features/allStatus";


import {setAllChooseColumn} from "../../../../features/allChooseColumn";
import {setAllChooseColumnOrders} from "../../../../features/allChooseColumnOrders";
import { TbCheck } from 'react-icons/tb';

import instagram from '../images/instagram.svg'
import choco from '../images/choco.png'

import prezoColor from '../images/prezo.png'
import prezoBlack from '../images/PREZOlogo.png'

import allItemsImage from '../images/allItems.svg'
import euroImage from '../images/euro.svg'
import arrowImage from '../images/arrow.svg'
import unEnabledImage from '../images/unenabled.svg'

import {BiCategoryAlt, BiSearch} from 'react-icons/bi';
import {FaCheck, FaTelegramPlane, FaUserCircle, FaWhatsapp} from "react-icons/fa";
import OrderItem from "../TableItem/OrderItem";
import {setValue} from "../../../../features/setAddProdAdmin";
import {GrLanguage} from "react-icons/gr";
import {addAllOrders} from "../../../../features/allOrders";
import {setAddContactOrUpdateSlice} from "../../../../features/addContactOrUpdate";
import tgIcon from "../images/telegramIcon.svg";
const OrderContainerContact = ({setCurrentElem, setSelectedElems, setAllProducts, allProducts, createProd, currentUser, updateProd}) => {

    console.log(currentUser)

    const [allChoose, setAllChoose] = useState(['Number', 'Source', 'Client', 'Comments', 'Status', 'Date','Address', 'Phone', 'Total', 'Profit', 'Paid', 'Balance', 'Margen', 'User', 'Delivery Date'])

    const [selectedAll, setSelectedAll] = useState(false)

    const [selectedChooseAll, setSelectedChooseAll] = useState(false)

    const [ordersFilter, setOrdersFilter] = useState('all')
    const [searchFilter, setSearchFilter] = useState('')


    const [checkboxContact, setCheckboxContact] = useState(false)
        const [inputSearch, setInputSearch] = useState('')

    const [filtersOpen, setFiltersOpen] = useState(false)

    const [newOrderDisabled, setNewOrderDisabled] = useState(true);
    const allContacts = useSelector((state) => state.allContacts.allContacts)


    const setAddContactOrUpdate = useSelector((state) => state.setAddContactOrUpdate.setAddContactOrUpdate)

    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allOrders = useSelector((state) => state.allOrders.allOrders)
    const dispatch = useDispatch()
    // const searchFilterByName = useMemo(() => {
    //     return allProducts.filter(elem => String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()))
    // }, [allProducts, searchItemsAdmin])
    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)
    const allChooseColumn = useSelector((state) => state.allChooseColumnOrders.allChooseColumnOrders)


    const [getAllProdObserver, setGetAllProdObserver] = useState(false);
    const [inpValue, setInpValue] = useState('');


    const searchFilterByName = useMemo(() => {
        return allProducts.filter(elem => {
            return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        })
    }, [allProducts, searchItemsAdmin])

    const filterHandler = useMemo(() => {
        return allOrders.filter(elem => {
            if(ordersFilter != "all"){
                if(String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'browser' ?  elem?.userAcc?.email || 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg._data.notifyName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())){
                    return (elem.type == ordersFilter)
                }

            }else{
                return String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'browser' ? elem?.userAcc?.email || 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg._data.notifyName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())
            }
        })
    }, [ordersFilter, allOrders, searchFilter])


    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            // setAllProducts(resp.data);
        });
    }, [getAllProdObserver])

    useEffect(() => {
        axios.get('https://tpomobi.shop/getStatusAdmin').then((resp) => {
            dispatch(setAllArrayStatus(resp.data))
        });
    }, [])

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const addAllItemsToSelect = () => {
        setSelectedAll((prev) => !prev)
        dispatch(addAllSelectedItems({arr: filterHandler || allOrders, check: selectedAll}))
    }

    const allOrdersPrices = useMemo(() => {
        let arr = []
        allOrders.forEach((elem, index) => {
                try{
                    elem?.items.forEach(item => {
                        arr.push(item)
                    })
                }catch (e){

                }
        })
        return arr
    }, [allOrders])

    const createNewOrder = () => {
        if(newOrderDisabled == true) {
            setNewOrderDisabled(false)
            axios.post('https://tpomobi.shop/createOrderAdmin', {
                data: {
                    items: [],
                    date: Date.now(),
                    type: 'browser',
                    status: {},
                    order: 'CP',
                    paidValue: 0
                }
            }).then(async (res) => {
                console.log(res.data)
                dispatch(addAllOrders(res.data.reverse()));
                setNewOrderDisabled(true)

            })
        }
    }


    const currentClient = useMemo(() => {
        let buff = allContacts.filter(el => {
            if (el.type == 'userUnion' && el.tradeName == currentUser.tradeName) {
                return true
            }

        })

        return buff.map(el => el.phone)
    }, [allContacts])

    console.log(currentClient)




    return (
        <div className='tableMainClass' onClick={() => setFiltersOpen(false)}>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>Orders</div>
        <div className='tableContainer'>
            <div className='tableOptions'>
                <div className='itemsLength'>
                    Showing 1-{filterHandler.length || allOrders.length} of {allOrders.length} orders.</div>
                <div className='itemsFilter'>
                    {/*color: '#25a2e0', fontSize: '24px'*/}
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        All orders
                    </div>
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        Filters
                    </div>
                    <div className='filter' onClick={(e) => {e.stopPropagation(); setFiltersOpen(prev => !prev)}}>
                        Source
                        {filtersOpen &&
                            <div className='filtersOpen'onClick={(e) => e.stopPropagation()}>
                                <div className='filter' style={{color: '#25a2e0', fontSize: '24px'}} onClick={() => setOrdersFilter('telegram')}>
                                    <FaTelegramPlane/>
                                </div>
                                <div className='filter' style={{color: 'lime', fontSize: '24px'}} onClick={() => setOrdersFilter('whatsapp')}>
                                    <FaWhatsapp/>
                                </div>
                                <div className='filter' onClick={() => setOrdersFilter('browser')}>
                                    <GrLanguage/>
                                </div>
                                <div className='filter' onClick={() => setOrdersFilter('prezo')}>
                                    <img src={prezoColor} alt="" style={{width: '75px', height: '30px'}}/>
                                </div>
                                <div className='filter' onClick={() => setOrdersFilter('instagram')}>
                                    <img src={instagram} alt="" style={{width: '30px', height: '30px'}}/>
                                </div>
                                <div className='filter' onClick={() => setOrdersFilter('choco')}>
                                    <img src={choco} alt="" style={{width: '75px', height: '30px'}}/>
                                </div>
                            </div>

                        }
                    </div>
                    <div className='filter' onClick={(e) => {e.stopPropagation(); setCheckboxContact(prev => !prev)}}>
                        Connect users
                        {
                            checkboxContact &&
                            <div className='addProductBlock' style={{top: '45px', right: "0px", left: '0px'}} onClick={(e) => e.stopPropagation()}>
                                <div className='addProductBlockInfoLine'>
                                    <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox' style={{fontSize: '20px', color: '#FFF', background:'#06C0B0', border: '2px solid #FFF'}}><TbCheck/></div>
                                    <div style={{width: '50px'}} className='addProductBlockInfoLineImage'>Source</div>
                                    <div style={{width: '50px'}} className='addProductBlockInfoLineName'>Name</div>
                                    <div className='addProductBlockInfosearchBlock' style={{display:"flex",alignItems:"center",width: '150px', borderBottom: '0.5px solid #06C0B0', height: '29px'}}>
                                        <input className='search' style={{marginLeft:"0px",width: '150px',  height: '29px',  borderTop: '0.5px solid #06C0B0',borderRadius:"7px"}} onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} placeholder='Search'/>
                                        <span style={{right: '-2px'}}><BiSearch/></span>
                                    </div>
                                    <div style={{width: '50px'}} className='addProductBlockInfoLinePrice'>Info</div>
                                </div>
                                <div className='addProductBlockElems'>
                                    <div className='addProductBlockElem'>
                                        <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'  style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border:  '2px solid #06C0B0'}}><TbCheck/></div>
                                        <div style={{width: '100px'}} className='addProductBlockInfoLineImage'><img className='itemImage' src={tgIcon}/></div>
                                        <div style={{width: '100px', overflow: 'hidden'}} className='addProductBlockInfoLineName'>123</div>
                                        <div className='searchBlock' style={{width: '0px'}}></div>
                                        <div style={{width: '200px',display:"flex",justifyContent:"right"}} className='addProductBlockInfoLinePrice'>maksim12@gmail.com</div>
                                    </div>
                                    <div className='addProductBlockElem'>
                                        <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'  style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border:  '2px solid #06C0B0'}}><TbCheck/></div>
                                        <div style={{width: '100px'}} className='addProductBlockInfoLineImage'><img className='itemImage' src={tgIcon}/></div>
                                        <div style={{width: '100px', overflow: 'hidden'}} className='addProductBlockInfoLineName'>123</div>
                                        <div className='searchBlock' style={{width: '0px'}}></div>
                                        <div style={{width: '200px',display:"flex",justifyContent:"right"}} className='addProductBlockInfoLinePrice'>maksim12@gmail.com</div>
                                    </div>
                                    <div className='addProductBlockElem'>
                                        <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'  style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border:  '2px solid #06C0B0'}}><TbCheck/></div>
                                        <div style={{width: '100px'}} className='addProductBlockInfoLineImage'><img className='itemImage' src={tgIcon}/></div>
                                        <div style={{width: '100px', overflow: 'hidden'}} className='addProductBlockInfoLineName'>123</div>
                                        <div className='searchBlock' style={{width: '0px'}}></div>
                                        <div style={{width: '200px',display:"flex",justifyContent:"right"}} className='addProductBlockInfoLinePrice'>maksim12@gmail.com</div>
                                    </div>
                                    <div className='addProductBlockElem'>
                                        <div style={{width: '26px'}} className='addProductBlockInfoLineCheckbox'  style={{color: '#FFF', fontSize: '20px', background: '#06C0B0', border:  '2px solid #06C0B0'}}><TbCheck/></div>
                                        <div style={{width: '100px'}} className='addProductBlockInfoLineImage'><img className='itemImage' src={tgIcon}/></div>
                                        <div style={{width: '100px', overflow: 'hidden'}} className='addProductBlockInfoLineName'>123</div>
                                        <div className='searchBlock' style={{width: '0px'}}></div>
                                        <div style={{width: '200px',display:"flex",justifyContent:"right"}} className='addProductBlockInfoLinePrice'>maksim12@gmail.com</div>
                                    </div>



                                </div>
                                <div className='addProductBlockAddButton' >
                                    Add
                                </div>
                            </div>
                        }
                    </div>

                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    <div className='addProduct' style={{opacity: newOrderDisabled == true ? 1 : 0.5}} onClick={() => {

                        console.log(setAddContactOrUpdate)
                        if(setAddContactOrUpdate == 'create'){
                            return createProd()
                        }else if(setAddContactOrUpdate == 'update'){
                            return updateProd()
                        }

                    }}>
                        Save
                    </div>
                    <div className='addProduct' style={{opacity: newOrderDisabled == true ? 1 : 0.5}} onClick={() => {createNewOrder()}}>
                        New Order
                    </div>
                </div>
            </div>
            <div className='tableItems' style={{width: '100%', overflowX: 'auto'}}>
                <div className='tableColumns' style={{fontSize: '16px', fontWeight: '400'}}>
                    <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{fontSize: '20px', color: '#FFF', background: allSelectedItems.length == (filterHandler.length || allOrders.length) ? '#06C0B0' : '#FFF', border: allSelectedItems.length == (filterHandler.length || allOrders.length) && '2px solid #FFF'}}>{allSelectedItems.length == (filterHandler.length || allOrders.length) && <TbCheck/>}</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Number') && 'none'}} className='itemId'>Number</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Source') && 'none'}} className='itemId'>Source</div>

                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Client') && 'none'}} className='itemId'>Client</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('User') && 'none'}} className='itemId'>User</div>


                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Status') && 'none'}}>Status</div>
                    <div style={{minWidth: '150px', maxWidth: '150px', textAlign: 'center', display: !allChooseColumn.includes('Delivery Date') && 'none'}}>Delivery Date</div>

                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Total') && 'none'}}>Total</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Paid') && 'none'}}>Paid</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Balance') && 'none'}}>Balance</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Margen') && 'none'}}>Margen</div>

                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>Profit</div>
                    <div style={{width: '150px', textAlign: 'center', display: !allChooseColumn.includes('Date') && 'none'}}>Date</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Address') && 'none'}} className='itemName'>Address</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Phone') && 'none'}}>Phone</div>

                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Comments') && 'none'}} className='itemId'>Comments</div>

                    <div className='chooseVisibleColumnsBlock'>
                        <div style={{width: '24px', textAlign: 'center'}} onClick={() => {setSelectedChooseAll((prev) => !prev)}} className='chooseVisibleColumns'>
                            <BiCategoryAlt/>
                        </div>
                        <span style={{display: !selectedChooseAll && 'none'}}>
                            <div>
                                Columns
                            </div>
                            {
                                allChoose.map(elem => {
                                   return <div style={{display: 'flex', alignItems: 'center', color: 'black'}} onClick={() => dispatch(setAllChooseColumnOrders(elem))}>
                                        <div className='checkbox' style={{color: '#00AB55', border: allChooseColumn.includes(elem) && '2px solid #00AB55', marginRight: '8px'}}>{allChooseColumn.includes(elem) && '✓'}</div>
                                            {elem}
                                        </div>
                                })
                            }

                        </span>
                    </div>
                </div>
                {/*style={{overflow: 'none', maxHeight: 'calc(100vh - 410px)'}}*/}
                <div>
                    {
                        filterHandler.map(elem => {
                                try {
                                        if(currentUser.type == 'client'){
                                            // if(elem.tradeName == currentUser.tradeName || elem.userAcc.tradeName == currentUser.tradeName){
                                            if(currentClient.includes(elem?.userAcc?.phone) || currentClient.includes(elem?.msg?._data?.from.split('@')[0]) || currentClient.includes(elem.userAcc?.findItem?.phone)){

                                                return <OrderItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                                            }
                                        }
                                        if(currentUser.type == 'user'){
                                            if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
                                                return <OrderItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                                            }
                                        }
                                        if(currentUser.type == 'userUnion'){
                                            if(elem.msg?._data?.from.split('@')[0] == currentUser.phone || elem.userAcc.phone == currentUser.phone){
                                                return <OrderItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                                            }
                                        }
                                }catch (e) {

                                }
                        })
                    }
                </div>
            </div>
        </div>

        </div>
    );
};

export default OrderContainerContact;