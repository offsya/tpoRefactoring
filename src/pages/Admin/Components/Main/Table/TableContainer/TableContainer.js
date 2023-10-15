import React, {useEffect, useMemo, useState} from 'react';
import TableItem from "../TableItem/TableItem";
import tomato from "../images/tomato.svg";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addAllSelectedItems} from "../../../../features/allSelectedItems";
import {setSearch} from "../../../../features/searchItemsAdmin";
import {setAllArrayStatus} from "../../../../features/allStatus";

import {deleteColumn, setAllChooseColumn} from "../../../../features/allChooseColumn";
import allItemsImage from '../images/allItems.svg'
import euroImage from '../images/euro.svg'
import arrowImage from '../images/arrow.svg'
import unEnabledImage from '../images/unenabled.svg'
import { TbCheck } from 'react-icons/tb';

import { BiCategoryAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';

import {FaCheck, FaUserCircle} from "react-icons/fa";
import {setValue} from "../../../../features/setAddProdAdmin";
import {addallProductsSlice} from "../../../../features/allProducts";
import {Select} from "antd";
const TableContainer = ({setCurrentElem, setSelectedElems}) => {

    const [allChoose, setAllChoose] = useState(['ID', 'SKU', 'Barcode', 'Image', 'Enabled', 'Name', 'Category','Proveedor', 'Description', 'Unit', 'IVA', 'Entry Price' ,'MBP', 'DP', 'SDP', 'CP'])

    const [selectedAll, setSelectedAll] = useState(false)

    const [selectedChooseAll, setSelectedChooseAll] = useState(false)
    const [qunatityElems, setQuantityElems] = useState('20')
    const allProducts = useSelector((state) => state.allProducts.allProducts)

    const dispatch = useDispatch()
    // const searchFilterByName = useMemo(() => {
    //     return allProducts.filter(elem => String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()))
    // }, [allProducts, searchItemsAdmin])
    const searchItemsAdmin = useSelector((state) => state.searchItemsAdmin.searchItemsAdmin)
    const allChooseColumn = useSelector((state) => state.allChooseColumn.allChooseColumn)


    const [getAllProdObserver, setGetAllProdObserver] = useState(false);
    const [inpValue, setInpValue] = useState('');


    const searchFilterByName = useMemo(() => {
        return allProducts.filter(elem => {
            return String(elem.name).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.sku).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.category).toLowerCase().includes(searchItemsAdmin.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(searchItemsAdmin.toLowerCase())
        }).reverse()
    }, [allProducts, searchItemsAdmin])

    useEffect(() => {
        axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
            dispatch(addallProductsSlice(resp.data))

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
        dispatch(addAllSelectedItems({arr: searchFilterByName || allProducts, check: selectedAll}))
    }



    const importExcel = (file) => {
        const formData = new FormData();
        console.log(file[0])
        formData.append('sampleFile', file[0])
        axios.post('https://tpomobi.shop/importProductsAdmin', formData,{
        }).then((res) => {
            console.log(res.data)
            dispatch(addallProductsSlice(res.data))
            setInpValue('')
            // setGetAllProdObserver(prev => !prev)
        })

    }

    return (
        <div className='tableMainClass'>
            <div className='topicText' style={{fontSize: '20px', color: '#02867A'}}>Catalog - products</div>
            <div className='statsDiv'>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={allItemsImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Total Items</div>
                    <div className='statsDivBlockNumber'>{allProducts.length}</div>
                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={arrowImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Enabled Items</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{(allProducts.filter(elem => elem.enabled)).length}</div>
                </div>
                <div className='statsDivBlock'>
                    <div className='statsDivBlockIcon'>
                        <img src={unEnabledImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>UnEnabled Items</div>
                    <div className='statsDivBlockNumber' style={{color: '#FF8181'}}>{(allProducts.filter(elem => !elem.enabled)).length}</div>


                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Entry COGS</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allProducts.map(elem =>  parseFloat(elem.ourPrice) ? parseFloat(elem.ourPrice) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}</div>



                </div>
                <div className='statsDivBlock'>

                    <div className='statsDivBlockIcon'>
                        <img src={euroImage} alt=""/>
                    </div>
                    <div className='statsDivBlockText'>Catalog Price</div>
                    <div className='statsDivBlockNumber' style={{color: '#00AB55'}}>{((allProducts.map(elem =>  parseFloat(elem.marketPriceCP) ? parseFloat(elem.marketPriceCP) : 0)).reduce((acc, num) => acc + num, 0)).toFixed(2)}</div>



                </div>
            </div>
        <div className='tableContainer'>
            <div className='tableOptions'>
                <div className='itemsLength'>
                    Showing 1-{searchFilterByName.length || allProducts.length} of {allProducts.length} items.</div>
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
                    <div className='filter'>
                        SPO
                    </div>
                    <div className='filter'>
                        Filters
                    </div>
                    {/*LuSearch*/}

                    <div className='searchBlock'>
                        <input className='search' onChange={(e) => dispatch(setSearch(e.target.value))} value={searchItemsAdmin} placeholder='Search'/>
                        <span><BiSearch/></span>
                    </div>
                    <div className='addProduct' onClick={() => dispatch(setValue(1))}>

                        Add Product
                    </div>

                </div>
            </div>
            <div className='tableItems'>
                <div className='tableColumns' style={{fontSize: '16px', fontWeight: '400'}}>
                    <div className='checkbox' onClick={() => addAllItemsToSelect()} style={{fontSize: '20px', color: '#FFF', background: allSelectedItems.length == (searchFilterByName.length || allProducts.length) && '#06C0B0', border: allSelectedItems.length == (searchFilterByName.length || allProducts.length) && '2px solid #FFF'}}>{allSelectedItems.length == (searchFilterByName.length || allProducts.length) && <TbCheck/>}</div>
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
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('IVA') && 'none'}}>IVA</div>
                    <div style={{whiteSpace: 'nowrap', width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Entry Price') && 'none'}}>Entry Price</div>

                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('MBP') && 'none'}}>MBP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('DP') && 'none'}}>DP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('SDP') && 'none'}}>SDP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('CP') && 'none'}}>CP</div>
                    <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>Profit</div>

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
                                   return <div style={{display: 'flex', alignItems: 'center', color: 'black'}} onClick={() => dispatch(setAllChooseColumn(elem))}>
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
                        searchFilterByName.map((elem, index) => {
                            if(qunatityElems == 'All' || searchItemsAdmin){
                                return <TableItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                            } else if(index < parseInt(qunatityElems)){
                                return <TableItem setSelectedElems={setSelectedElems} setCurrentElem={setCurrentElem} elem={elem}/>
                            }
                        })
                    }
                </div>
            </div>
        </div>

        </div>
    );
};

export default TableContainer;