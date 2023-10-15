import React, {useState, useMemo} from 'react';
import '../TableComponent.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setAllSelectedItems,
    delAllSelectedItems,
    setAllSelectedItemsOrders
} from "../../../../features/allSelectedItems";
import {
    addAllOrders,
    setAllOrders,
    setAllOrdersOrders,
    delAllOrders,
    changeStatusMany, changeStatusOrderItemMany, changeOrderElem,
} from "../../../../features/allOrders";
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
import {AiOutlineLike} from "react-icons/ai";

const TableItemOrderItem = ({elem, setCurrentElem, currentElem, editOpen, setEditArr}) => {
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
    const allOrders = useSelector((state) => state.allOrders.allOrders)

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
        let crOrder = allOrders.filter(elem => elem._id == currentElem._id)
        if(true){
            dispatch(changeStatusOrderItemMany({crElem, "allSelectedItems": [elem], "currentElem": crOrder[0]}))
            axios.post('https://tpomobi.shop/updateStatusOrderItemAdminMany', {
                data: {crElem, "allSelectedItems": [elem], "currentElem": crOrder[0]}
            })
        }else{
            alert('add status name')
        }
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

    const margenCounter = () => {
        let pr = (parseFloat(elem.marketPriceCP*(elem.quantity || 1))-parseFloat(elem.ourPrice*(elem.quantity || 1)))
        let niz = (parseFloat(elem.ourPrice*(elem.quantity || 1)) + parseFloat(elem.ourPrice*(elem.quantity || 1)) * parseFloat(elem.IVA)/100)

        return (pr/(niz)*100).toFixed(2) == 'NaN' ? 0 :(pr/(niz)*100).toFixed(2)

    }

    const handleChangeComplete = (color) => {
        setColorPicker(color.hex);
    };
    const selectArrayHandler = () => {
       dispatch(setAllSelectedItemsOrders(elem))
    }



    const updateStatusMany = async (crElem) => {
        let crOrder = allOrders.filter(elem => elem._id == currentElem._id)
        dispatch(changeStatusOrderItemMany({crElem, allSelectedItems, "currentElem": crOrder[0]}))
        await axios.post('https://tpomobi.shop/updateStatusOrderItemAdminMany', {
            data:{crElem, allSelectedItems, "currentElem": crOrder[0]}
        })
    }

    const updateStatusOneElem = (crElem) => {
        let crOrder = allOrders.filter(elem => elem._id == currentElem._id)

        dispatch(changeStatusOrderItemMany({crElem, "allSelectedItems":[elem], "currentElem": crOrder[0]}))
        axios.post('https://tpomobi.shop/updateStatusOrderItemAdminMany', {
            data: {crElem, "allSelectedItems": [elem], "currentElem": crOrder[0]}
        })

    }

    window.addEventListener("click", function(event) {
        setStatusSelectOpen(false);
        setStatusAddOpen(false);
    });


    return (
        <div className='tableItem' style={{background: allSelectedItems.find(e => e._id == elem._id) ? '#E3FBF0' : (elem?.status?.name ? elem.status.color + '80' : '#FFF'), fontSize: '14px'}}>
            <div style={{display: 'flex', gridGap: '5px'}}>
                <div className='checkbox' onClick={selectArrayHandler} style={{color: '#FFF', fontSize: '20px', background: allSelectedItems.find(e => e._id == elem._id) && '#06C0B0', border: allSelectedItems.find(e => e._id == elem._id) && '2px solid #06C0B0'}}>{allSelectedItems.find(e => e._id == elem._id) && <TbCheck/>}</div>
                <div className='checkbox' onClick={() => {setStatus(prev => prev.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {
                    name: '',
                    desc: '',
                    color: '#FFF'
                });
                    updateStatus(status.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {
                    name: '',
                    desc: '',
                    color: '#FFF'
                })
                    updateStatusMany(status.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {
                        name: '',
                        desc: '',
                        color: '#FFF'
                    });
                    allSelectedItems.length == 0 && updateStatusOneElem(status.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {
                        name: '',
                        desc: '',
                        color: '#FFF'
                    })
                }} style={{color: '#FFF', fontSize: '20px', background: elem?.status?.name == 'Listo' && '#06C0B0', border: elem?.status?.name == 'Listo' && '2px solid #06C0B0'}}>{elem?.status?.name == 'Listo' && <AiOutlineLike/>}</div>

                <div className='itemMore' onClick={() => {setCurrentElem(elem); dispatch(setValue(3))
                }}>
                    <FiMoreHorizontal/>
                </div>
            </div>
            <div style={{display: !allChooseColumn.includes('ID') && 'none'}} className='itemId' data-tooltip={elem._id}><span style={{overflow: 'hidden', width: '10px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.id}</span></div>

            <div style={{display: !allChooseColumn.includes('SKU') && 'none'}} className='itemId' data-tooltip={elem.sku}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.sku}</span></div>
            <div style={{display: !allChooseColumn.includes('Barcode') && 'none'}} className='itemId' data-tooltip={elem.barcode}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.barcode}</span></div>

            <div style={{width: '60px', textAlign: 'center', display: !allChooseColumn.includes('Image') && 'none'}}><img className='itemImage' src={elem.img || fakePhoto}/></div>
            <div style={{display: !allChooseColumn.includes('Enabled') && 'none', color: elem.status?.color == '#FFF' ? 'black' : "#FFF", background: elem.status?.color, border: elem.status?.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}} className='itemEnabled' onClick={(e) => {e.stopPropagation(); setStatusSelectOpen(prev => !prev)}}>
                {elem?.status?.name || 'Add'}
                {statusAddOpen ?
                    <div className='statusChangerMenu' onClick={(e) => e.stopPropagation()} >
                        <div className='allStatusItems'>
                            {allStatus.map(elem => {
                                if(elem.type == 'products'){
                                    return <StatusComponent setAllChangesStatusArray={setAllChangesStatusArray} deleteStatus={deleteStatus} colorPicker={colorPicker} setColorPicker={setColorPicker} elem={elem} statusAddOpen={statusAddOpen}/>

                                    // return <div className='statusElem' onClick={() => {setStatus(elem); updateStatus(elem); updateStatusMany(elem)}} style={{background: elem.color}}>{elem.name}</div>
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
                                        return <div className='statusElem' onClick={() => {setStatus(elem); updateStatus(elem); updateStatusMany(elem); allSelectedItems.length == 0 && updateStatusOneElem(elem)}} style={{background: elem.color}}>{elem.name}</div>
                                }
                            })}
                        </div>

                        <div className='statusElemAddLine'></div>
                        <div className='statusElemAdd' onClick={() => setStatusAddOpen(prev => !prev)}>
                            <BiPencil/>edit status
                        </div>



                    </div>
                }

            </div>
            {/*setEnabled((prev) => !prev)*/}
            <div style={{display: !allChooseColumn.includes('Name') && 'none'}} data-tooltip={elem.name} className='itemName'><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{editOpen ? elem.name : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '100px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, name: e.target.value}}else{return el}}))} type="text" defaultValue={elem.name}/>}</span></div>
            <div style={{display: !allChooseColumn.includes('Category') && 'none'}} data-tooltip={elem.category}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{editOpen ? elem.category : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '100px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, category: e.target.value}}else{return el}}))} type="text" defaultValue={elem.category}/>}</span></div>
            <div style={{display: !allChooseColumn.includes('Proveedor') && 'none'}} data-tooltip={elem.proveedor}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{editOpen ? elem.proveedor : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '100px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, proveedor: e.target.value}}else{return el}}))} type="text" defaultValue={elem.proveedor}/>}</span></div>
            <div style={{display: !allChooseColumn.includes('Description') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{editOpen ? elem.desc : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '100px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, desc: e.target.value}}else{return el}}))} type="text" defaultValue={elem.desc}/>}</span></div>
            <div style={{display: !allChooseColumn.includes('Unit') && 'none'}} data-tooltip={elem.currentUnit || elem.unit}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{editOpen ? elem.currentUnit || elem.unit : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, currentUnit: e.target.value}}else{return el}}))} type="text" defaultValue={elem.currentUnit || elem.unit}/>}</span></div>
            <div style={{display: !allChooseColumn.includes('C.Qty') && 'none'}}><span style={{overflow: 'hidden', width: '50px', whiteSpace: 'nowrap', display: 'inline-block'}}>{parseFloat(elem?.quantityOrder).toFixed(2) || 2}</span></div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('O.Qty') && 'none'}}>{editOpen ? parseFloat(elem.quantity).toFixed(2) : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, quantity: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.quantity}/>}</div>

            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('IVA') && 'none'}}>{editOpen ? elem.IVA + '%' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, IVA: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.IVA}/>}</div>
            <div style={{position: 'relative', bottom: '3px', width: '100px', textAlign: 'center', display: !allChooseColumn.includes('Entry Price') && 'none'}}>{editOpen ? (parseFloat(elem.ourPrice).toFixed(2) != 'NaN' ? parseFloat(elem.ourPrice).toFixed(2) : '0.00') + '€' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, ourPrice: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.ourPrice}/>}</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('MBP') && 'none'}}>{editOpen ? (parseFloat(elem.marketPrice).toFixed(2) != 'NaN' ? parseFloat(elem.marketPrice).toFixed(2) : '0.00') + '€' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, marketPrice: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.marketPrice}/>}</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('DP') && 'none'}}>{editOpen ? (parseFloat(elem.marketPriceDP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceDP).toFixed(2) : '0.00') + '€' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, marketPriceDP: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.marketPriceDP}/>}</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('SDP') && 'none'}}>{editOpen ? (parseFloat(elem.marketPriceSDP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceSDP).toFixed(2) : '0.00') + '€' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, marketPriceSDP: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.marketPriceSDP}/>}</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('CP') && 'none'}}>{editOpen ? (parseFloat(elem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat(elem.marketPriceCP).toFixed(2) : '0.00') + '€' : <input style={{background: 'none', borderBottom: '0.5px solid black', height: '25px', width: '50px'}} onChange={(e) => setEditArr(prev => prev.map(el => {if(el.sku == elem.sku){return {...el, marketPriceCP: parseFloat(e.target.value)}}else{return el}}))} type="number" defaultValue={elem.marketPriceCP}/>}</div>

            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Profit') && 'none'}}>{parseFloat(elem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat((parseFloat(elem.marketPriceCP*(elem.quantity || 1)) - parseFloat(elem.ourPrice*(elem.quantity || 1))) * (1-parseFloat(elem.IVA)/100)).toFixed(2) : '0.00'}€</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Margen') && 'none'}}>{margenCounter()}%</div>
            <div style={{position: 'relative', bottom: '3px', width: '50px', textAlign: 'center', display: !allChooseColumn.includes('Total') && 'none'}}>{parseFloat(elem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat((parseFloat(elem.marketPriceCP*(elem.quantity || 1)))).toFixed(2) : '0.00'}€</div>

            {/*<div style={{display: 'flex', gridGap: '5px'}}>*/}
            {/*    <div className='checkbox' onClick={() => {setStatus(prev => prev.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {*/}
            {/*        name: '',*/}
            {/*        desc: '',*/}
            {/*        color: '#FFF'*/}
            {/*    }); updateStatus(status.name != 'Listo' ? allStatus.filter(st => st.name == 'Listo')[0] : {*/}
            {/*        name: '',*/}
            {/*        desc: '',*/}
            {/*        color: '#FFF'*/}
            {/*    })}} style={{color: '#FFF', fontSize: '20px', background: status.name == 'Listo' && '#06C0B0', border: status.name == 'Listo' && '2px solid #06C0B0'}}>{status.name == 'Listo' && <AiOutlineLike/>}</div>*/}
            {/*    <div className='itemMore' onClick={() => {setCurrentElem(elem);                 dispatch(setValue(3))*/}
            {/*    }}>*/}
            {/*        <FiMoreHorizontal/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default TableItemOrderItem;