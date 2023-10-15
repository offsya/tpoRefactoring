import React, {useState, useMemo, useEffect} from 'react';
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
import spainflag from "../../../../../Landing/components/Profile/spainflag.svg";
import belarus from "../../../../../Landing/components/Profile/belarus.png";





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
import allProducts from "../../../../features/allProducts";
import allContacts, {addallContacts} from "../../../../features/allContacts";
const OrderItem = ({elem, setCurrentElem, setSelectedElems}) => {
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
    const allContacts = useSelector((state) => state.allContacts.allContacts)

    useEffect(() => {
        axios.get('https://tpomobi.shop/getContactsAdmin').then((resp) => {
            dispatch(addallContacts(resp.data));
        });
    }, [])


    const currentClient = useMemo(() => {
            return allContacts.filter(el => {
                if (el.type == 'userUnion') {
                    if (elem.type == 'browser') {
                        if (el.phone == elem?.userAcc?.phone) {
                            return el
                        }
                    }

                    if (elem.type == 'whatsapp') {
                            if (el.phone == elem?.msg?._data?.from.split('@')[0]) {
                                return el
                            }

                    }

                    if (elem.type == 'telegram') {
                            if (el.phone == elem.userAcc?.phone || el.phone == elem.userAcc?.findItem?.phone) {
                                return el
                            }
                    }
            }

            })[0]
    }, [allContacts])
    // console.log(currentClient)


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
        setStatusSelectOpen(false);
        setStatusAddOpen(false);
    });



    const [statusName, setStatusName] = useState('Text')
    const [statusDesc, setStatusDesc] = useState('')
    const createStatus = () => {
            axios.post('https://tpomobi.shop/createStatusAdmin', {
                "name": statusName,
                "desc": statusDesc,
                "color": '#FFF',
                "openColorPicker": false,
                "type": 'orders'
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


    const phoneFlag = useMemo(() => {
        const stringValue = String((elem.type == 'browser' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.type == 'telegram' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.msg._data.from.split('@')[0]));
        if (stringValue.startsWith('34')) {
            // Handle the case where the string starts with '34'
            return true
        } else {
            return false
        }

    }, [])


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

    const colorGreenOrRed = useMemo(() => {
        let answer
        try{
            answer = elem.items.map((items) => items.marketPriceCP != ''
                ?
                parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)

        }catch (e) {

        }

        return parseFloat(answer) == parseFloat(elem.paidValue) ? 'green' : 'red'
    }, [elem.paidValue])
    const handleChangeComplete = (color) => {
        setColorPicker(elem.status.color);
    };
    const selectArrayHandler = () => {
       dispatch(setAllSelectedItems(elem))
    }

    const margenCounterOrder = useMemo(() => {
        let arr = elem.items.map((elem, index) => {
            let pr = (parseFloat(elem.marketPriceCP * (elem.quantity || 1)) - parseFloat(elem.ourPrice * (elem.quantity || 1)))
            let niz = (parseFloat(elem.ourPrice * (elem.quantity || 1)) + parseFloat(elem.ourPrice * (elem.quantity || 1)) * parseFloat(elem.IVA) / 100)

            return (pr / (niz) * 100).toFixed(2) == 'NaN' ? 0 : (pr / (niz) * 100).toFixed(2)
        })
        arr = arr.map(elem => parseFloat(elem))
        return (arr.reduce((acc, num) => acc + num, 0) / arr.length).toFixed(2)

    })
    const orderNumber = () => {
        const browserType={
            "browser": "WW",
            "whatsapp": "WA",
            "telegram": "TG",
        }
        return  `${browserType[elem?.type]+(new Date(elem.date).getFullYear()%100)+(new Date(elem.date).getMonth()+1<=9?("0"+(new Date(elem.date).getMonth()+1)):(new Date(elem.date).getMonth()+1))+(new Date(elem.date).getDate()<=9?("0"+new Date(elem.date).getDate()):new Date(elem.date).getDate()) + (elem?.tradeName || "") + (elem.type== "whatsapp" ? "CP": elem.order)+(elem._id.slice(-4))}`

    }


        return (
        <div className='tableItem' style={{background: allSelectedItems.find(e => e._id == elem._id) ? '#E3FBF0' : (elem?.status?.name ? elem?.status?.color + '80' : '#FFF'), fontSize: '14px'}}  onClick={() => {setStatusSelectOpen(false)}}>
            <div className='checkbox' onClick={selectArrayHandler} style={{minWidth: '24px', maxWidth: '24px', color: '#FFF', fontSize: '20px', background: allSelectedItems.find(e => e._id == elem._id) && '#06C0B0', border: allSelectedItems.find(e => e._id == elem._id) && '2px solid #06C0B0'}}>{allSelectedItems.find(e => e._id == elem._id) && <TbCheck/>}</div>
            <div onClick={() => {setCurrentElem(elem); dispatch(setValue(3))}} style={{display: !allChooseColumn.includes('Number') && 'none'}} className='itemId' data-tooltip={
                    orderNumber()
            }>
                <span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>
                {
                    orderNumber()

                }
            </span></div>
            <div style={{display: !allChooseColumn.includes('Source') && 'none', position: 'relative', top: '2px'}} className='itemId' data-tooltip={elem.type == 'browser' ? "Browser" : elem.type == 'telegram' ? "Telegram" : "WhatsApp"}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem.type == 'browser' ? <GrLanguage style={{color: 'black', fontSize: '20px'}}/> : elem.type == 'telegram' ? <FaTelegramPlane style={{color: '#25a2e0', fontSize: '24px'}}/> : <FaWhatsapp style={{color: 'lime', fontSize: '24px'}}/>}</span></div>

            <div style={{display: !allChooseColumn.includes('Client') && 'none'}} className='itemId' data-tooltip={elem.type == 'browser' ? elem?.userAcc?.name || elem?.userAcc?.email || 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg?._data?.notifyName}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem?.tradeName || currentClient?.tradeName}</span></div>
            <div style={{display: !allChooseColumn.includes('User') && 'none'}} className='itemId' data-tooltip={elem.type == 'browser' ? elem?.userAcc?.name || elem?.userAcc?.email || 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg?._data?.notifyName}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'left'}}>{elem.type == 'browser' ? elem?.userAcc?.name || elem?.userAcc?.email || 'User' : elem.type == 'telegram' ? elem.tg.user.first_name : elem.msg?._data?.notifyName}</span></div>


            <div style={{minWidth: '100px', maxWidth: '100px', display: !allChooseColumn.includes('Status') && 'none', color: elem?.status?.color == '#FFF' ? 'black' : "#FFF", background: elem?.status?.color, border: elem?.status?.color == '#FFF' ? '0.5px solid #B7B7B7' : 'none'}} className='itemEnabled' onClick={(e) => {e.stopPropagation(); setStatusSelectOpen(prev => !prev)}}>
                {elem.status.name || 'Add'}
                {statusAddOpen ?
                    <div className='statusChangerMenu' onClick={(e) => e.stopPropagation()} >
                        <div className='allStatusItems'>
                            {allStatus.map(elem => {
                                if(elem.type == 'orders'){
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

                                if(elem.type == 'orders') {
                                    return <div className='statusElem' onClick={() => {
                                        setStatus(elem);
                                        updateStatus(elem);
                                        updateStatusMany(elem);
                                    }} style={{background: elem.color}}>{elem.name}</div>
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
                                    _id: ''});
                                updateStatusMany({name: '',
                                    desc: '',
                                    color: '#FFF',
                                    _id: ''});
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
            <div style={{display: !allChooseColumn.includes('Delivery Date') && 'none'}} data-tooltip={elem?.deliveryTime} className='itemName'><span style={{overflow: 'hidden', minWidth: '150px', maxWidth: '150px', whiteSpace: 'nowrap',  display: 'inline-block'}}>{elem?.deliveryDate}</span></div>

            <div style={{display: !allChooseColumn.includes('Total') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem.items.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</span></div>
            <div style={{display: !allChooseColumn.includes('Margen') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{margenCounterOrder || '0.00'}%</span></div>

            <div style={{display: !allChooseColumn.includes('Profit') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem.items.map((items) => items.marketPriceCP != '' ? (parseFloat(items.marketPriceCP*(items.quantity || 1)) - parseFloat(items.ourPrice*(items.quantity || 1))) * (1-parseFloat(items.IVA)/100) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</span></div>

            <div style={{display: !allChooseColumn.includes('Paid') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{parseFloat(elem.paidValue) ? parseFloat(elem.paidValue).toFixed(2) : '0.00'}€</span></div>
            <div style={{display: !allChooseColumn.includes('Balance') && 'none'}} data-tooltip={elem.desc}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block', color: colorGreenOrRed}}>{
                parseFloat(elem.paidValue) ?
                ((elem.items.map((items) => items.marketPriceCP != ''
                    ?
                    parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)-(parseFloat(elem.paidValue).toFixed(2) || 0)).toFixed(2))
                :
                elem.items.map((items) => items.marketPriceCP != ''
                    ?
                    parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2)}€</span></div>
          <div style={{display: !allChooseColumn.includes('Date') && 'none'}} data-tooltip={elem.name} className='itemName'><span style={{overflow: 'hidden', minWidth: '150px', maxWidth: '150px', whiteSpace: 'nowrap', display: 'inline-block'}}>{new Date(elem.date).getDate() + '.' + (new Date(elem.date).getMonth() + 1) + '.' + new Date(elem.date).getFullYear() + ' (' + (parseInt(new Date(elem.date).getHours()) < 10 ? '0' + new Date(elem.date).getHours() : new Date(elem.date).getHours()) + ':' + (parseInt(new Date(elem.date).getMinutes()) < 10 ? '0' + new Date(elem.date).getMinutes() : new Date(elem.date).getMinutes()) + ')'}</span></div>
            <div style={{minWidth: '100px', maxWidth: '100px', display: !allChooseColumn.includes('Address') ? 'none' : 'block', paddingLeft: '5px', paddingRight: '5px'}} data-tooltip={elem.category}>
                {/*<span style={{overflow: 'hidden', width: '65px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>*/}
                {/*    { String((elem.type == 'browser' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.type == 'telegram' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.msg._data.from.split('@')[0])).startsWith('34') ? 'Spain' : 'Belarus'}*/}
                {/*</span>*/}
                {String((elem.type == 'browser' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.type == 'telegram' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.msg._data.from.split('@')[0])).startsWith('375') && <img style={{transform: 'rotate(0deg)', width: '25px', height: '20px', borderRadius: '15px'}} src={belarus} alt=""/> || String((elem.type == 'browser' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.type == 'telegram' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.msg._data.from.split('@')[0])).startsWith('34') && <img src={spainflag} alt=""/>}

            </div>
            <div style={{display: !allChooseColumn.includes('Phone') && 'none'}} data-tooltip={elem.proveedor}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block'}}>{elem.type == 'browser' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.type == 'telegram' ? elem.userAcc?.phone|| elem.userAcc?.findItem?.phone : elem.msg._data.from.split('@')[0]}</span></div>
            <div style={{display: !allChooseColumn.includes('Comments') && 'none'}} className='itemId' data-tooltip={elem.description}><span style={{overflow: 'hidden', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center'}}>{elem.description}</span></div>

            <div className='itemMore' style={{minWidth: '24px', maxWidth: '24px'}} onClick={() => {setCurrentElem(elem);dispatch(setValue(3))}}>
                <FiMoreHorizontal/>
            </div>
        </div>
    );
};

export default OrderItem;