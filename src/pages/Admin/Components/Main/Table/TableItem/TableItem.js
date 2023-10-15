import React, {useState, useMemo} from 'react';
import '../TableComponent.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setAllSelectedItems,
    delAllSelectedItems
} from "../../../../features/allSelectedItems";

import {
    deleteStatus,
    setAllStatus,
    setAllArrayStatus,
    setStatusName,
    setOpenColorPicker,
    setDeleteStatus
} from "../../../../features/allStatus";

import fakePhoto from '../../../../../../assets/av.svg'
import { GithubPicker, CirclePicker } from 'react-color';
import axios from "axios";
import {setValue} from "../../../../features/setAddProdAdmin";
import {TbCheck} from "react-icons/tb";
import StatusComponent from "./StatusComponent";
import {IoClose} from "react-icons/io5";
import {BiPencil} from "react-icons/bi";
import {changeStatusMany} from "../../../../features/allProducts";
const   TableItem = ({elem, setCurrentElem}) => {
    const [enabled, setEnabled] = useState(elem.enabled);
    const [status, setStatus] = useState(elem.status || {
        name: '',
        desc: '',
        color: '#FFF',
        _id: ''
    });
    const [allChangesStatusArray, setAllChangesStatusArray] = useState([])

    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch()
    const allSelectedItems = useSelector((state) => state.allSelectedItems.allSelectedItems)
    const allChooseColumn = useSelector((state) => state.allChooseColumn.allChooseColumn)
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    const currStatus = useMemo(() => {
        let cStatus = allStatus.filter(elem => elem._id == status._id);
        if(cStatus.length == 0){
            cStatus = [{
                name: '',
                desc: '',
                color: '#FFF'
            }]
        }
        return cStatus[0]
    }, [status])

    const [statusSelectOpen, setStatusSelectOpen] = useState(false)
    const [statusAddOpen, setStatusAddOpen] = useState(false)
    const [colorPicker, setColorPicker] = useState("#fff")
    window.addEventListener("click", function(event) {
        setStatusSelectOpen(false);
        setStatusAddOpen(false);
    });
    const [statusName, setStatusName] = useState('')
    const [statusDesc, setStatusDesc] = useState('')

    const createStatus = () => {
        axios.post('https://tpomobi.shop/createStatusAdmin', {
            "name": statusName,
            "desc": statusDesc,
            "color": '#FFF',
            "openColorPicker": false,
            "type": 'products'
        }).then((res) => {
            dispatch(setAllStatus(res.data))
        })
    }

    const updateStatus = (crElem) => {
        dispatch(changeStatusMany({crElem, allSelectedItems: [elem]}))

        if(true){
            axios.post('https://tpomobi.shop/updateStatusProductsAdmin', {
                data: {crElem, elem}
            })
        }else{
            alert('add status name')
        }
    }

    const updateStatusMany = (crElem) => {
        dispatch(changeStatusMany({crElem, allSelectedItems}))
        axios.post('https://tpomobi.shop/updateStatusProductItemAdminMany', {
            data: {crElem, allSelectedItems}
        })
    }


    const saveStatusChanges = () => {
        if(allChangesStatusArray.length > 0){

            axios.post('https://tpomobi.shop/updateNameOfStatusAdmin', {
                data: allChangesStatusArray
            })
        }

    }

    const deleteStatus = (elem) => {

        axios.post('https://tpomobi.shop/deleteStatusAdmin', {
            elem
        }).then((res) => {
            dispatch(setDeleteStatus(elem))
        })

    }

    const handleChangeComplete = (color) => {
        setColorPicker(color.hex);
    };
    const selectArrayHandler = () => {
       dispatch(setAllSelectedItems(elem))
    }
    return (
        <div className='tableItem' style={{background: allSelectedItems.find(e => e._id == elem._id) ? '#E3FBF0' : (currStatus.name != '' ? currStatus.color + '80' : '#FFF'), fontSize: '14px'}}>
            <div className='checkbox' onClick={selectArrayHandler} style={{color: '#FFF', fontSize: '20px', background: allSelectedItems.find(e => e._id == elem._id) && '#06C0B0', border: allSelectedItems.find(e => e._id == elem._id) && '2px solid #06C0B0'}}>{allSelectedItems.find(e => e._id == elem._id) && <TbCheck/>}</div>
            <div style={{display: !allChooseColumn.includes('ID') && 'none'}} className='itemId' data-tooltip={elem._id}><span style={{overflow: 'hidden', width: '10px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.id}</span></div>

            <div style={{display: !allChooseColumn.includes('SKU') && 'none'}} className='itemId' data-tooltip={elem.sku}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.sku}</span></div>
            <div style={{display: !allChooseColumn.includes('Barcode') && 'none'}} className='itemId' data-tooltip={elem.barcode}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.barcode}</span></div>

            <div style={{width: '60px', textAlign: 'center', display: !allChooseColumn.includes('Image') && 'none'}}><img className='itemImage' src={elem.img || fakePhoto}/></div>
            <div style={{display: !allChooseColumn.includes('Enabled') && 'none', color: status.color == '#FFF' ? 'black' : "#FFF", background: status.color, border: status.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}} className='itemEnabled' onClick={(e) => {e.stopPropagation(); setStatusSelectOpen(prev => !prev)}}>
                {status.name || 'Add'}
                {statusAddOpen ?
                    <div className='statusChangerMenu' onClick={(e) => e.stopPropagation()} >
                        <div className='allStatusItems'>
                            {allStatus.map(elem => {
                                if(elem.type == 'products'){
                                    return <StatusComponent setAllChangesStatusArray={setAllChangesStatusArray} deleteStatus={deleteStatus} colorPicker={colorPicker} setColorPicker={setColorPicker} elem={elem} statusAddOpen={statusAddOpen}/>
                                }
                            })}
                            <div className='statusElemInputChangeBlock'>
                                <div className='statusElemInputChange'>

                                    <div className='addNewButton' onClick={() => createStatus()}>Add new +</div>
                                </div>
                                <div className='statusElemInputChangeClose' style={{opacity: 0}}>
                                    <IoClose/>
                                </div>
                            </div>
                        </div>
                        {/*<div className='twoButtons'>*/}
                        {/*    <div onClick={() => {setStatusAddOpen(prev => !prev); createStatus()}}>Add</div><div onClick={() => setStatusAddOpen(prev => !prev)}>Back</div>*/}
                        {/*</div>*/}
                        <div className='statusElemAddLine'></div>
                        <div className='statusElemAdd' onClick={() => {setStatusAddOpen(prev => !prev); saveStatusChanges()}}>
                            Save
                        </div>
                    </div>
                    :

                    <div onClick={(e) => e} style={{display: !statusSelectOpen && 'none'}} className='statusChangerMenu'>
                        <div className='allStatusItems' style={{gridColumnGap: '10px'}}>
                            {allStatus.map(elem => {
                                if(elem.type == 'products'){
                                    return <div className='statusElem' onClick={() => {setStatus(elem); updateStatus(elem); updateStatusMany(elem)}} style={{background: elem.color}}>{elem.name}</div>
                                }
                            })}
                            <div className='statusElem' onClick={() => {
                                setStatus({name: '',
                                    desc: '',
                                    color: '#FFF',
                                    _id: ''});
                                updateStatus({name: '',
                                    desc: '',
                                    color: '#FFF',
                                    _id: ''})
                                updateStatusMany({name: '',
                                    desc: '',
                                    color: '#FFF',
                                    _id: ''})
                            }} style={{background: '#FFF', color: 'black', border: '0.5px solid rgb(183, 183, 183)'}}>Clear</div>
                        </div>

                        <div className='statusElemAddLine'></div>
                        <div className='statusElemAdd' onClick={() => setStatusAddOpen(prev => !prev)}>
                            <BiPencil/>edit status
                        </div>



                    </div>
                }

            </div>
            {/*setEnabled((prev) => !prev)*/}
            <div style={{display: !allChooseColumn.includes('Name') && 'none'}} data-tooltip={elem.name} className='itemName'><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.name}</span></div>
            <div style={{display: !allChooseColumn.includes('Category') && 'none'}} data-tooltip={elem.category}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.category}</span></div>
            <div style={{display: !allChooseColumn.includes('Proveedor') && 'none'}} data-tooltip={elem.proveedor}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.proveedor}</span></div>
            <div style={{display: !allChooseColumn.includes('Description') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.desc}</span></div>
            <div style={{display: !allChooseColumn.includes('Unit') && 'none'}} data-tooltip={elem.unit}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.unit}</span></div>

            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('IVA') && 'none'}}>{elem.IVA}%</div>

            <div style={{width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Entry Price') && 'none'}}>{parseFloat(elem.ourPrice).toFixed(2) != 'NaN' ? parseFloat(elem.ourPrice).toFixed(2) : '0.00'}€</div>
            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('MBP') && 'none'}}>{parseFloat(elem.marketPrice).toFixed(2) != 'NaN' ? parseFloat(elem.marketPrice).toFixed(2) : '0.00'}€</div>
            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('DP') && 'none'}}>{parseFloat(elem.marketPriceDP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceDP).toFixed(2) : '0.00'}€</div>
            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('SDP') && 'none'}}>{parseFloat(elem.marketPriceSDP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceSDP).toFixed(2) : '0.00'}€</div>
            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('CP') && 'none'}}>{parseFloat(elem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceCP).toFixed(2) : '0.00'}€</div>
            <div style={{width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>{parseFloat(elem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat((parseFloat(elem.marketPriceCP) - parseFloat(elem.ourPrice)) * (1-parseFloat(elem.IVA)/100)).toFixed(2) : '0.00'}€</div>

            <div className='itemMore' onClick={() => {setCurrentElem(elem);                 dispatch(setValue(3))
            }}>
                <FiMoreHorizontal/>
            </div>
        </div>
    );
};

export default TableItem;