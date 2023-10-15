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
import {addallContacts} from "../../../../features/allContacts";
import allContacts from "../../../../features/allContacts";
import ContactsItem from "../TableItem/ContactsItem";
import {stateCreateOrUpdate} from "../../../../features/addContactOrUpdate";
import {addallProductsSlice} from "../../../../features/allProducts";
import {Select} from "antd";

const   ContactsContainer = ({setCurrentElem, setSelectedElems, setAllProducts, allProducts, setAddProducts}) => {


    const [allChoose, setAllChoose] = useState(['Number', 'Name', 'Codigo', 'Type', 'Status', 'Phone', 'Address', 'Email', 'Last Visit', 'Last Update', 'IBAN', 'NIF', 'Tags', 'Source'])

    const [selectedAll, setSelectedAll] = useState(false)

    const [selectedChooseAll, setSelectedChooseAll] = useState(false)

    const [ordersFilter, setOrdersFilter] = useState('all')
    const [searchFilter, setSearchFilter] = useState('')


    const [filtersOpen, setFiltersOpen] = useState(false)

    const [newOrderDisabled, setNewOrderDisabled] = useState(true);
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const allContacts = useSelector((state) => state.allContacts.allContacts)
    console.log(allContacts)

    // console.log(allContacts)
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
        return allContacts.filter(elem => {
            if(ordersFilter != "all"){
                if(String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.phone || elem.mobile).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.email).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem?.billAddress.address).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.tradeName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.name).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'client' ? 'client' : elem.type == 'debtor' ? 'debtor' : 'supplier').toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())){
                    return (elem.type == ordersFilter)
                }
            }else{
                return String(elem.phone || elem.mobile).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.email).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem?.billAddress.address).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.tradeName).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.name).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem._id).toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type == 'client' ? 'client' : elem.type == 'debtor' ? 'debtor' : 'supplier').toLowerCase().includes(searchFilter.toLowerCase()) || String(elem.type).toLowerCase().includes(searchFilter.toLowerCase())
            }
        }).reverse()
    }, [ordersFilter, allContacts, searchFilter])


    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            // setAllProducts(resp.data);
        });
    }, [getAllProdObserver])

    // useEffect(() => {
    //     axios.get('https://tpomobi.shop/getStatusAdmin').then((resp) => {
    //         dispatch(setAllArrayStatus(resp.data))
    //     });
    // }, [])

    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const addAllItemsToSelect = () => {
        setSelectedAll((prev) => !prev)
        dispatch(addAllSelectedItems({arr: filterHandler || allContacts, check: selectedAll}))
    }

    const allContactsPrices = useMemo(() => {
        return allContacts
    }, [allContacts])

    const createNewOrder = () => {
        if(newOrderDisabled == true) {
            setNewOrderDisabled(false)
            axios.post('https://tpomobi.shop/createOrderAdmin', {
                data: {
                    items: [],
                    date: Date.now(),
                    type: 'browser',
                    status: {},
                    order: 'CP'
                }
            }).then(async (res) => {
                console.log(res.data)
                // dispatch(addallContacts(res.data.reverse()));
                setNewOrderDisabled(true)

            })
        }
    }


    const importExcel = (file) => {
        const formData = new FormData();
        console.log(file[0])
        formData.append('sampleFile', file[0])
        axios.post('https://tpomobi.shop/importContactsAdmin', formData,{
        }).then((res) => {
            console.log(res.data)
            dispatch(addallContacts(res.data))
            setInpValue('')
            // setGetAllProdObserver(prev => !prev)
        })

    }


    const [qunatityElems, setQuantityElems] = useState('20')


    return (
        <div className='tableMainClass' onClick={() => setFiltersOpen(false)}>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>All Contacts</div>
            <div className='statsDiv'>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={allItemsImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Contacts</div>
                    <div className='statsDivBlockNumber'>{allContacts.length}</div>
                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Clients</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allContactsPrices.filter(elem => elem.type == 'client')).length)}</div>
                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Suppliers</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allContactsPrices.filter(elem => elem.type == 'supplier')).length)}</div>


                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Debtors</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allContactsPrices.filter(elem => elem.type == 'debtor')).length)}</div>



                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Leads</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allContactsPrices.filter(elem => elem.type == 'lead')).length)}</div>



                </div>
            </div>
        <div className='tableContainer'>
            <div className='tableOptions'>
                <div className='itemsLength'>
                    Showing 1-{filterHandler.length || allContacts.length} of {allContacts.length} contacts.</div>
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
                        Import
                        <input type="file" style={{opacity: '0', position: 'absolute', width: '137px', height: '45px'}} onChange={(e) => importExcel(e.target.files)} value={inpValue}/>
                    </div>
                    {/*color: '#25a2e0', fontSize: '24px'*/}
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        All Contacts
                    </div>
                    <div className='filter' onClick={() => setOrdersFilter('all')}>
                        Platforms
                    </div>
                    <div className='filter' onClick={(e) => {e.stopPropagation(); setFiltersOpen(prev => !prev)}}>
                        Types
                        {filtersOpen &&
                            <div className='filtersOpen' onClick={(e) => e.stopPropagation()}>
                                <div className='filter' style={{fontSize: '15px'}} onClick={() => setOrdersFilter('client')}>
                                    💰Business
                                </div>
                                <div className='filter'style={{fontSize: '15px'}} onClick={() => setOrdersFilter('supplier')}>
                                    🚚Suppliers
                                </div>
                                <div className='filter'style={{fontSize: '15px'}} onClick={() => setOrdersFilter('user')}>
                                    📲Accounts
                                </div>
                                <div className='filter' style={{whiteSpace: 'nowrap', fontSize: '15px'}} onClick={() => setOrdersFilter('ambassador')}>
                                    👑Ambassadors
                                </div>
                                <div className='filter'style={{fontSize: '15px'}} onClick={() => setOrdersFilter('userUnion')}>
                                    🧑‍User
                                </div>
                            </div>

                        }
                    </div>
                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    <div className='addProduct' style={{opacity: 1}} onClick={() => {dispatch(setValue(1)); dispatch(stateCreateOrUpdate('create'))}}>
                        New Contact
                    </div>
                </div>
            </div>
            <div className='tableItems'>
                <div className='tableColumns' style={{fontSize: '16px', fontWeight: '400'}}>
                    <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{fontSize: '20px', color: '#FFF', background: allSelectedItems.length == (filterHandler.length || allContacts.length) ? '#06C0B0' : '#FFF', border: allSelectedItems.length == (filterHandler.length || allContacts.length) && '2px solid #FFF'}}>{allSelectedItems.length == (filterHandler.length || allContacts.length) && <TbCheck/>}</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Number') && 'none'}} className='itemId'>Number</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Source') && 'none'}} className='itemId'>Platform</div>

                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Codigo') && 'none'}} className='itemId'>Codigo</div>
                    <div style={{width: '100px', textAlign: 'center ', display: !allChooseColumn.includes('Name') && 'none'}} className='itemId'>Name</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Type') && 'none'}} className='itemId'>Type</div>


                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Status') && 'none'}}>Status</div>

                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Phone') && 'none'}}>Phone</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Address') && 'none'}} className='itemId'>Address</div>
                    <div style={{width: '100px', textAlign: 'left', display: !allChooseColumn.includes('Email') && 'none'}} className='itemId'>Email</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Tags') && 'none'}} className='itemId'>Tags</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('NIF') && 'none'}} className='itemId'>NIF</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('IBAN') && 'none'}} className='itemId'>IBAN</div>
                    <div style={{width: '150px', textAlign: 'center', display: !allChooseColumn.includes('Last Visit') && 'none'}} className='itemId'>Last Visit</div>
                    <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Last Update') && 'none'}} className='itemId'>Last Update</div>



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
                            if(qunatityElems == 'All' || searchFilter) {
                                return <ContactsItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                            } else if(index < parseInt(qunatityElems)) {
                                return <ContactsItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>

                            }
                        })
                    }
                </div>
            </div>
        </div>

        </div>
    );
};

export default ContactsContainer;