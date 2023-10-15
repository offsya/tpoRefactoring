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
import {Select} from "antd";
const OrderContainer = ({setCurrentElem, setSelectedElems, setAllProducts, allProducts}) => {


    const [allChoose, setAllChoose] = useState(['Number', 'Source', 'Client', 'Status', 'Date','Address', 'Phone', 'Total', 'Profit', 'Paid', 'Balance', 'Margen', 'Comments', 'User', 'Delivery Date'])

    const [selectedAll, setSelectedAll] = useState(false)

    const [selectedChooseAll, setSelectedChooseAll] = useState(false)

    const [ordersFilter, setOrdersFilter] = useState('all')
    const [searchFilter, setSearchFilter] = useState('')


    const [filtersOpen, setFiltersOpen] = useState(false)

    const [newOrderDisabled, setNewOrderDisabled] = useState(true);

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
                if(String(elem.tradeName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.userAcc?.phone || elem.userAcc?.findItem?.phone || elem.msg?._data?.from.split('@')[0]).toLowerCase().includes(searchFilter.toLowerCase())  || String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'browser' ? 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg._data.notifyName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())){
                    return (elem.type == ordersFilter)
                }

            }else{
                return String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.tradeName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.userAcc?.phone || elem.userAcc?.findItem?.phone || elem.msg?._data?.from.split('@')[0]).toLowerCase().includes(searchFilter.toLowerCase())  || String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'browser' ? 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg._data.notifyName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())
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

    const allOrdersPaid = useMemo(() => {

            let arr = allOrders.map((elem, index) => {
                if(parseFloat(elem?.paidValue)){
                    return parseFloat(elem.paidValue)
                }else{
                    return 0
                }
            })
            return (arr.reduce((acc, num) => acc + num, 0)).toFixed(2)
    }, [allOrders])

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
    const [qunatityElems, setQuantityElems] = useState('20')




    return (
        <div className='tableMainClass' onClick={() => setFiltersOpen(false)}>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>All Orders</div>
            <div className='statsDiv'>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={allItemsImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Orders</div>
                    <div className='statsDivBlockNumber'>{allOrders.length}</div>
                </div>
                {/*<div className='statsDivBlock'>*/}
                {/*    <div className='statsDivBlockIcon'>*/}
                {/*        <assets src={arrowImage} alt=""/>*/}
                {/*    </div>*/}
                {/*    <div className='statsDivBlockText'>Completed Orders</div>*/}
                {/*    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{0}</div>*/}
                {/*</div>*/}
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Sold</div>
                    <div className='statsDivBlockNumber'
                         style={{color: '#00AB55'}}>{((allOrdersPrices.map(elem => elem.marketPriceCP ? parseFloat(elem.marketPriceCP * (elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€
                    </div>


                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>COGS</div>
                    <div className='statsDivBlockNumber'
                         style={{color: '#00AB55'}}>{((allOrdersPrices.map(elem => elem.ourPrice ? parseFloat(elem.ourPrice * (elem.quantity || 1)) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€
                    </div>


                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Estimated Profit</div>
                    <div className='statsDivBlockNumber'
                         style={{color: '#00AB55'}}>{((allOrdersPrices.map(elem => elem.marketPriceCP ? (parseFloat(elem.marketPriceCP * (elem.quantity || 1)) - parseFloat(elem.ourPrice * (elem.quantity || 1))) * (1 - parseFloat(elem.IVA) / 100) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}€
                    </div>


                </div>

                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Paid</div>
                    <div className='statsDivBlockNumber'
                         style={{color: '#00AB55'}}>{allOrdersPaid}€
                    </div>


                </div>


            </div>
            <div className='tableContainer'>
                <div className='tableOptions'>
                    <div className='itemsLength'>
                        Showing 1-{filterHandler.length || allOrders.length} of {allOrders.length} orders.
                    </div>
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
                    {/*color: '#25a2e0', fontSize: '24px'*/}
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        All orders
                    </div>
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        Filters
                    </div>
                    <div className='filter' onClick={(e) => {e.stopPropagation(); setFiltersOpen(prev => !prev)}}>
                        Platforms
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
                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    <div className='addProduct' style={{opacity: newOrderDisabled == true ? 1 : 0.5}} onClick={() => {createNewOrder()}}>
                        New Order
                    </div>
                </div>
            </div>
            <div className='tableItems' style={{width: '100%', background: 'white'}}>
                <div className='tableColumns' onScroll={(e) => console.log(e)} style={{fontSize: '16px', fontWeight: '400', width:'100%', background: '#06C0B0', overflowX: 'inherit'}}>
                    <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{minWidth: '24px', maxWidth: '24px', fontSize: '20px', color: '#FFF', background: allSelectedItems.length == (filterHandler.length || allOrders.length) ? '#06C0B0' : '#FFF', border: allSelectedItems.length == (filterHandler.length || allOrders.length) && '2px solid #FFF'}}>{allSelectedItems.length == (filterHandler.length || allOrders.length) && <TbCheck/>}</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Number') && 'none'}} className='itemId'>Order</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Source') && 'none'}} className='itemId'>Platform</div>

                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'left', display: !allChooseColumn.includes('Client') && 'none'}} className='itemId'>Business</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'left', display: !allChooseColumn.includes('User') && 'none'}} className='itemId'>User</div>

                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Status') && 'none'}}>Status</div>
                    <div style={{minWidth: '150px', maxWidth: '150px', textAlign: 'center', display: !allChooseColumn.includes('Delivery Date') && 'none'}}>Delivery Date</div>

                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Total') && 'none'}}>Total</div>

                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Margen') && 'none'}}>Margen</div>

                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>Profit</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Paid') && 'none'}}>Paid</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Balance') && 'none'}}>Balance</div>
                    <div style={{minWidth: '150px', maxWidth: '150px', textAlign: 'center', display: !allChooseColumn.includes('Date') && 'none'}}>Creation Date</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Address') && 'none'}} className='itemName'>Country</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'center', display: !allChooseColumn.includes('Phone') && 'none'}}>Phone</div>
                    <div style={{minWidth: '100px', maxWidth: '100px', textAlign: 'left', display: !allChooseColumn.includes('Comments') && 'none'}} className='itemId'>Comments</div>

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
                        filterHandler.map((elem, index) => {
                                try {
                                    if(qunatityElems == 'All' || searchFilter) {

                                        return <OrderItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                                    } else if(index < parseInt(qunatityElems)) {
                                        return <OrderItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>

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

export default OrderContainer;