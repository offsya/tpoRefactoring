import React, {useState, useMemo} from 'react';
import '../TableComponent.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { FiCheck } from 'react-icons/fi';
import { TbCheck } from 'react-icons/tb';
import { RxCheck } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import {stateCreateOrUpdate} from "../../../../features/addContactOrUpdate";





import {useDispatch, useSelector} from "react-redux";
import {
    setAllSelectedItems,
    delAllSelectedItems
} from "../../../../features/allSelectedItems";

import {
    setDeleteStatus,
    setAllStatus,
    setAllArrayStatus,
    setOpenColorPicker
} from "../../../../features/allStatus";
import {
    changeStatusOne,
    changeStatusMany
} from "../../../../features/allOrders";

import fakePhoto from '../../../../../../assets/av.svg'
import { GithubPicker, TwitterPicker, ChromePicker } from 'react-color';
import axios from "axios";
import {setValue} from "../../../../features/setAddProdAdmin";
import StatusComponent from "./StatusComponent";
const ContactsItem = ({elem, setCurrentElem, setSelectedElems}) => {
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
    const allChooseColumn = useSelector((state) => state.allChooseColumnOrders.allChooseColumnOrders)
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
        setStatusSelectOpen(false)
        setStatusAddOpen(false)

    });
    const [statusName, setStatusName] = useState('Text')
    const [statusDesc, setStatusDesc] = useState('')
    const createStatus = () => {
            axios.post('https://tpomobi.shop/createStatusAdmin', {
                "name": statusName,
                "desc": statusDesc,
                "color": '#FFF',
                "openColorPicker": false,
                "type": 'contacts'
            }).then((res) => {
                dispatch(setAllStatus(res.data))
            })
    }

    const updateStatus = (crElem) => {
        dispatch(changeStatusOne({_id: elem._id, crElem}))
        if(true){
            axios.post('https://tpomobi.shop/updateStatusOrderAdmin', {
               data: {crElem, elem}
            })
        }else{
            alert('add status name')
        }
    }

    const updateStatusMany = (crElem) => {
        dispatch(changeStatusMany({crElem, allSelectedItems}))
        axios.post('https://tpomobi.shop/updateStatusOrderAdminMany', {
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
    if(elem?.name == 'testContact'){
        console.log(Date(elem.lastVisit))
    }

    const handleChangeComplete = (color) => {
        setColorPicker(elem.status.color);
    };
    const selectArrayHandler = () => {
       dispatch(setAllSelectedItems(elem))
    }
        return (
        <div className='tableItem' style={{background: allSelectedItems.find(e => e._id == elem._id) ? '#E3FBF0' : (elem?.status?.name ? elem?.status?.color + '80' : '#FFF'), fontSize: '14px'}}  onClick={() => {setStatusSelectOpen(false)}}>
            <div className='checkbox' onClick={selectArrayHandler} style={{color: '#FFF', fontSize: '20px', background: allSelectedItems.find(e => e._id == elem._id) && '#06C0B0', border: allSelectedItems.find(e => e._id == elem._id) && '2px solid #06C0B0'}}>{allSelectedItems.find(e => e._id == elem._id) && <TbCheck/>}</div>
            <div onClick={() => {setCurrentElem(elem); dispatch(stateCreateOrUpdate('update')); dispatch(setValue(3))}} style={{display: !allChooseColumn.includes('Number') && 'none'}} className='itemId' data-tooltip={elem._id}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem._id}</span></div>
            <div style={{display: !allChooseColumn.includes('Source') && 'none', position: 'relative', top: '2px'}} className='itemId' data-tooltip={elem?.platform ? (elem.platform == 'browser' ? "Browser" : elem.platform == 'telegram' ? "Telegram" : "WhatsApp") : 'Browser'}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem?.platform ?  elem.platform == 'browser' ? <GrLanguage style={{color: 'black', fontSize: '20px'}}/> : elem.platform == 'telegram' ? <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/> : <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/> : <GrLanguage style={{color: 'black', fontSize: '20px'}}/>}</span></div>

            <div style={{display: !allChooseColumn.includes('Codigo') && 'none'}} className='itemId' data-tooltip={elem.tradeName}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.tradeName}</span></div>
            <div style={{display: !allChooseColumn.includes('Name') && 'none', position: 'relative', top: '2px'}} className='itemId' data-tooltip={elem.name}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem.name}</span></div>
            <div style={{display: !allChooseColumn.includes('Type') && 'none'}} className='itemId' data-tooltip={elem.type == 'userUnion' && '🧑‍User' || elem.type == 'user' && '📲Account' || elem.type == 'supplier' && '🚚Supplier' || elem.type == 'client' && '💰Business' || elem.type == 'ambassador' && '👑Ambassador'}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.type == 'userUnion' && '🧑‍User' || elem.type == 'user' && '📲Account' || elem.type == 'supplier' && '🚚Supplier' || elem.type == 'client' && '💰Business' || elem.type == 'ambassador' && '👑Ambassador'}</span></div>


            <div style={{display: !allChooseColumn.includes('Status') && 'none', color: status.color == '#FFF' ? 'black' : "#FFF", background: status.color, border: status.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}} className='itemEnabled' onClick={(e) => {e.stopPropagation(); setStatusSelectOpen(prev => !prev)}}>
                {status.name || 'Add'}
                {statusAddOpen ?
                    <div className='statusChangerMenu' onClick={(e) => e.stopPropagation()} >
                        <div className='allStatusItems'>
                            {allStatus.map(elem => {
                                if(elem.type == 'contacts'){
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

                                if(elem.type == 'contacts') {
                                    return <div className='statusElem' onClick={() => {
                                        setStatus(elem);
                                        // updateStatus(elem);
                                        // updateStatusMany(elem);
                                    }} style={{background: elem.color}}>{elem.name}</div>
                                }
                            })}
                            <div className='statusElem' onClick={() => {
                                setStatus({name: '',
                                    desc: '',
                                    color: '#FFF',
                                    _id: ''});
                                // updateStatus({name: '',
                                //     desc: '',
                                //     color: '#FFF',
                                //     _id: ''});
                                // updateStatusMany({name: '',
                                //     desc: '',
                                //     color: '#FFF',
                                //     _id: ''});
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
            <div style={{display: !allChooseColumn.includes('Phone') && 'none'}} className='itemId' data-tooltip={Array.isArray(elem.phone) ? elem.phone.join() : elem.phone}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{Array.isArray(elem.phone) ? elem.phone.join() : elem.phone}</span></div>
            <div style={{display: !allChooseColumn.includes('Address') && 'none'}} className='itemId' data-tooltip={elem?.billAddress.address}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem?.billAddress.address}</span></div>
            <div style={{display: !allChooseColumn.includes('Email') && 'none'}} className='itemId' data-tooltip={elem.email}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.email}</span></div>
            <div style={{display: !allChooseColumn.includes('Tags') && 'none'}} className='itemId' data-tooltip={Array.isArray(elem.tags) ? elem.tags.join() : elem.tags}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{Array.isArray(elem.tags) ? elem.tags.join() : elem.tags}</span></div>
            <div style={{display: !allChooseColumn.includes('NIF') && 'none'}} className='itemId' data-tooltip={Array.isArray(elem.nif) ? elem.nif.join() : elem.nif}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{Array.isArray(elem.nif) ? elem.nif.join() : elem.nif}</span></div>
            <div style={{display: !allChooseColumn.includes('IBAN') && 'none'}} className='itemId' data-tooltip={Array.isArray(elem.iban) ? elem.iban.join() : elem.iban}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{Array.isArray(elem.iban) ? elem.iban.join() : elem.iban}</span></div>
            <div style={{display: !allChooseColumn.includes('Last Visit') && 'none'}} className='itemId' data-tooltip={elem?.lastVisit && (new Date(elem.lastVisit).getDate() + '.' + (new Date(elem.lastVisit).getMonth() + 1) + '.' + new Date(elem.lastVisit).getFullYear() + ' (' + (parseInt(new Date(elem.lastVisit).getHours()) < 10 ? '0' + new Date(elem.lastVisit).getHours() : new Date(elem.lastVisit).getHours()) + ':' + (parseInt(new Date(elem.lastVisit).getMinutes()) < 10 ? '0' + new Date(elem.lastVisit).getMinutes() : new Date(elem.lastVisit).getMinutes()) + ')')}><span style={{overflow: 'hidden', width: '150px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{elem?.lastVisit && (new Date(elem.lastVisit).getDate() + '.' + (new Date(elem.lastVisit).getMonth() + 1) + '.' + new Date(elem.lastVisit).getFullYear() + ' (' + (parseInt(new Date(elem.lastVisit).getHours()) < 10 ? '0' + new Date(elem.lastVisit).getHours() : new Date(elem.lastVisit).getHours()) + ':' + (parseInt(new Date(elem.lastVisit).getMinutes()) < 10 ? '0' + new Date(elem.lastVisit).getMinutes() : new Date(elem.lastVisit).getMinutes()) + ')')}</span></div>
            <div style={{display: !allChooseColumn.includes('Last Update') && 'none'}} className='itemId' data-tooltip={elem.barcode}><span style={{overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}></span></div>

            <div className='itemMore' onClick={() => {setCurrentElem(elem); dispatch(stateCreateOrUpdate('update')); dispatch(setValue(3))}}>
                <FiMoreHorizontal/>
            </div>
        </div>
    );
};

export default ContactsItem;