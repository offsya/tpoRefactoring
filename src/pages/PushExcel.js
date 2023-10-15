import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { TagsInput } from "react-tag-input-component";
import '../shop.css';


const PushExcel = () => {
    const [file, setFile] = useState([]);
    const [selected, setSelected] = useState([]);
    const [drag, setDrag] = useState(false)

    function dragStartHandler(e){
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e){
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e){
        console.log('drag & drop')
        console.log(e)
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        files.forEach(e => {
            if(!selected.includes(e.name)){
                //console.log(e.name)
                selected[0] = e.name
            }
        })
        //console.log(selected)
        //console.log(files)
        const formData = new FormData()
        formData.append('customFile', files[0]);
        setFile(formData);
        setDrag(false)
    }

    function send(){
        if(selected.length == 0){
            alert("Add all params");
        }else{
            try {
                axios.post('https://tpomobi.shop/', file,
                    {
                        headers: {
                            "Content-type": "multipart/form-data"
                        },
                    }
                ).then(e => {
                    alert('Отправлено')
                })

            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <Modal.Dialog>
                <h1>pushExcel</h1>

                <Modal.Body>
                    <Form>
                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label>Номер смены (дневная/ночная)</Form.Label>*/}
                        {/*    <Form.Control onClick={() => {setmodalshiftNumber(!modalshiftNumber)}} onChange={(e) => {setShiftNumber(e.target.value)}} type="text" value={shiftNumber} placeholder="" />*/}
                        {/*    <div className="select" style={{display: modalshiftNumber ? 'flex' : 'none'}}>*/}
                        {/*        <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Дневная'); e.preventDefault();}} className="option">Дневная</button>*/}
                        {/*        <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Ночная'); e.preventDefault();}} className="option">Ночная</button>*/}
                        {/*    </div>*/}
                        {/*</Form.Group>*/}
                        <Form.Group className="mb-3 tagsInput">
                            <TagsInput
                                value={selected}
                                onChange={setSelected}
                                name="order"
                                placeHolder=""
                            />
                        </Form.Group>
                        <Form.Group className="dragBox mb-3">
                            {drag
                                ?<div
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                     onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}
                                    className='drop-area'>Отпустите файлы, чтобы загрузить их</div>
                                :<div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                className='drop-ar'
                                >Перетащите файлы, чтобы загрузить их</div>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <div>
                    {/*<a href={id == null ? () => alert('Add order ID') : process.env.REACT_APP_API_URL + 'bot?link=v1.28681.Valxzm3mVmbn48j_l3vZldMPhdvtqWBq1XY_fvjznFHc3VYADAVcw5_p68JwRQMe&id=' + String(id).slice(2)}>*/}
                    <button onClick={() => {send()}} className="but">
                        Send
                    </button>
                    {/*</a>*/}
                </div>
            </Modal.Dialog>
        </div>
    );
};

export default PushExcel;