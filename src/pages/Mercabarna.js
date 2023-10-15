import '../Mercabarna.css';
import {useState, useMemo, useEffect} from "react";
import Pav from "./pav";
import Pav6 from "./pav6";
import Pav7 from "./pav7";
import Pav3 from "./pav3";
import PavP from "./pavP";
import axios, * as others from 'axios';
const tg = window.Telegram.WebApp;

function Mercabarna() {
    const [obj, setObj] = useState([])
    const [prod, setProd] = useState([])
    const [effectUpdate, setEffectUpdate] = useState(true);
    const [edit, setEdit] = useState(false);
    const [showProd, setShowProd] = useState(false);

    const [search, setSearch] = useState(' ');
    const [searchChange, setSearchChange] = useState(' ')
    const [side, setSide] = useState(false);
    const [pav, setPav] = useState(10);
    const [goPav, setGoPav] = useState(true);
    const [changeSide, setChangeSide] = useState(true)
    const [thisPav, setThisPav] = useState('')
    const [modal, setModal] = useState(false)
    const [modalSwitch, setModalSwitch] = useState(true)
    const [items, setItems] = useState([]);
    const [modalForAddNewProd, setModalForAddNewProd] = useState(false)
    const [modalForUpdateProd, setModalForUpdateProd] = useState(false)
    const [modalForDeleteProd, setModalForDeleteProd] = useState(false)

    const [updateComplete, setUpdateComplete] = useState(false)
    const [currElemForUpdate, setCurrElemForUpdate] = useState({})

    const [currentParada, setCurrentParada] = useState('');
    const [buffParada, setbuffParada] = useState('');

    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [parada, setParada] = useState('')
    const [mapsLink, setMapsLink] = useState('')
    const [email, setEmail] = useState('')


    const [createNewProdNombre, setCreateNewProdNombre] = useState('')
    const [createNewProdSKU, setCreateNewProdSKU] = useState('')
    const [createNewProdTipo, setCreateNewProdTipo] = useState('')
    const [createNewProdDesc, setCreateNewProdDesc] = useState('')
    const [createNewProdPrecio, setCreateNewProdPrecio] = useState('')
    const [createNewProdIVA, setCreateNewProdIVA] = useState('')
    const [createNewProdLongName, setCreateNewProdLongName] = useState('')


    const [updateProdNombre, setUpdateProdNombre] = useState('')
    const [updateProdSKU, setUpdateProdSKU] = useState('')
    const [updateProdTipo, setUpdateProdTipo] = useState('')
    const [updateProdDesc, setUpdateProdDesc] = useState('')
    const [updateProdPrecio, setUpdateProdPrecio] = useState('')
    const [updateProdIVA, setUpdateProdIVA] = useState('')
    const [updateProdLongName, setUpdateProdLongName] = useState('')


    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('customFile', file);
        setCurrElemForUpdate((obj) => {
            return {...obj, image: {
                    name: null,
                    data: null,
                    mimetype: null
                }}
        })
        console.log(file.name)
        // axios.post('/upload', formData)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    const createImg = (imageData) => {
        // const blob = new Blob([data.data], { type: data.mimetype });
        // const imageUrl = URL.createObjectURL(blob);
        return `data:${imageData.mimetype};base64,${imageData.data}`
    }



    useEffect(() => {
        axios.get('https://tpomobi.shop/productsMerca').then((resp) => {
            const allPersons = resp.data;
            setProd(allPersons);
        });
    }, [effectUpdate]);

    useEffect(() => {
        axios.get('https://tpomobi.shop/itemsMerca').then((resp) => {
            const allPersons = resp.data;
            setObj(allPersons);
            console.log('YES')
        });
    }, [effectUpdate]);

    const [checkBoxArr, setCheckBoxArr] = useState([]);


    const searchPosts = useMemo(() => {
        return obj.filter(posts => {try{if(posts.Productos && search.length > 1){return String((posts.Productos.map((e) => e.nombre)).join()).toLowerCase().includes(search.toLowerCase())}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
    }, [search])

    const searchChangePosts = useMemo(() => {
        console.log(searchChange.length)
        if(searchChange.length <= 1){
            return prod
        }else{
            return prod.filter(posts => {try{if(posts && searchChange.length > 1){return String(posts.nombre).toLowerCase().includes(searchChange.toLowerCase())}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
        }
    }, [searchChange, prod])

    const allPav = useMemo(() => {
        let needArray = [];
        searchPosts.forEach(posts => {try{if(posts.Parada.includes('-')){
            let frst = posts.Parada.split('-')[0];
            let sec = posts.Parada.split('-')[1];
            for(let i = parseInt(frst); i<=parseInt(sec); i++){
                needArray.push(i);
            }
        }else{
            needArray.push(parseInt(posts.Parada))
        }}catch(e){console.log(e)}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
        return needArray;
    }, [searchPosts])
    const newPostsArr = useMemo(() => {
        return obj.map(posts => {try{if(posts.Parada.includes('-')){
            let frst = posts.Parada.split('-')[0];
            let sec = posts.Parada.split('-')[1];
            let testArr = [];
            for(let i = parseInt(frst); i<=parseInt(sec); i++){
                testArr.push(String(i));
            }
            return [...testArr];
        }else{return [posts.Parada]}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
    }, [obj])


    const saveAndUpdate = () => {
        if(currentParada.length > 0){
            let arrBuff = obj.filter(posts => {try{if(posts.Parada){return String(posts.Parada).includes(String(currentParada[0]))}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
            axios.post('https://tpomobi.shop/updateMerca', {
                "obj": obj,
                "current": arrBuff[0]
            }).then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }



    const deleteProd = (e) => {
        if(currentParada.length > 0){
            axios.post('https://tpomobi.shop/deleteOneProd', e).then(function (response) {
                console.log(response);
                setCreateNewProdDesc('');
                setCreateNewProdTipo('');
                setCreateNewProdNombre('');
                setCreateNewProdSKU('');
                setCreateNewProdIVA('');
                setCreateNewProdPrecio('');
                setCreateNewProdLongName('');
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const copyNewProd = (e) => {
        const formData = new FormData();

        let file = e.image
        console.log(file)
        let informData = {
            "sku": e.sku,
            "description": e.description,
            "tipo": e.tipo,
            "nombre": e.nombre,
            "precio": e.precio,
            "IVA": e.IVA,
            "longName": e.longName,
            "image": e.image
        };
        formData.append('informData', JSON.stringify(informData))
        if(currentParada.length > 0){
            axios.post('https://tpomobi.shop/copyOneProd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                console.log(response);
                setCreateNewProdDesc('');
                setCreateNewProdTipo('');
                setCreateNewProdNombre('');
                setCreateNewProdSKU('');
                setCreateNewProdIVA('');
                setCreateNewProdPrecio('');
                setCreateNewProdLongName('');
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const createNewProd = () => {
        const formData = new FormData();
        console.log(file)
        let informData = {
            "sku": createNewProdSKU,
            "description": createNewProdDesc,
            "tipo": createNewProdTipo,
            "nombre": createNewProdNombre,
            "precio": createNewProdPrecio,
            "IVA": createNewProdIVA,
            "longName": createNewProdLongName
        };
        formData.append('customFile', file);
        formData.append('informData', JSON.stringify(informData))
        if(currentParada.length > 0){
            axios.post('https://tpomobi.shop/addOneProd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                    console.log(response);
                    setCreateNewProdDesc('');
                    setCreateNewProdTipo('');
                    setCreateNewProdNombre('');
                    setCreateNewProdSKU('');
                    setCreateNewProdIVA('');
                    setCreateNewProdPrecio('');
                    setCreateNewProdLongName('');
                    setEffectUpdate((prev) => !prev)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const updateProd = () => {
        const formData = new FormData();
        let informData = {
            "sku": updateProdSKU,
            "description": updateProdDesc,
            "tipo": updateProdTipo,
            "nombre": updateProdNombre,
            "precio": updateProdPrecio,
            "IVA": updateProdIVA,
            "longName": updateProdLongName,
            "elemUpdate": currElemForUpdate
        };

        formData.append('customFile', file);
        formData.append('informData', JSON.stringify(informData))
        if(currentParada.length > 0){
            axios.post('https://tpomobi.shop/updateProd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                console.log(response.data);
                setFile(null)
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const addProdInDataBase = (e) => {
        console.log(e)
        obj.forEach(posts => {
            if (posts.Parada.includes(currentParada[0])){
                let prodInclude = false;
                let indElem = '';
                posts.Productos.forEach((prod, index) => {
                    if(prod.id == e.id){
                        prodInclude = true;
                        indElem = index;
                    }
                })
                if(prodInclude == false){
                    posts.Productos.push(e);
                    setCheckBoxArr(items.map(prodId => prodId.id));
                }
                if(prodInclude == true){
                    posts.Productos.splice(indElem, 1);
                    setCheckBoxArr(items.map(prodId => prodId.id));
                }
            }
        })
    }

    return (
        <div className="Merca">
            <div className='openArrow' onClick={() => {setSide(true)}}>←</div>
            <input style={{width: '200px'}} className="input1" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..."/>
            <div className="side" style={{display: side ? "block" : "none", minHeight: pav == 30 && goPav == false ? 1025 + 'px' : 1000 + 'px'}} onClick={(e) => e.stopPropagation()}>
                <div className='backArrow' onClick={() => setSide(false)}>→</div>
                {
                    changeSide ?
                        <div className="infoSide">
                            <h5>Pav Info</h5>
                            <div style={{marginTop: '0px'}} className='changeArrow' onClick={() => setChangeSide(!changeSide)}>←→</div>
                            <div><h5>{name}</h5></div>
                            <hr/>
                            <div style={{fontSize: '12px'}}>
                                <div><b>Telefono: {tel}</b></div>
                                <div>Parada: <b>{parada}</b></div>
                                <br/>
                                <div>{mapsLink}</div>
                                <br/>
                                <div><b>{email}</b></div>
                            </div>
                            <h5>Current parada: {thisPav > 8000 ? parseInt(String(thisPav).slice(-2)) : thisPav}</h5>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}} onClick={() => {setModal(true)}}>Add items</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}} onClick={(e) => {setShowProd((e) => !e)}}>Show Products</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}} onClick={(e) => {setEdit((e) => !e)}}>Edit</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}}>Call</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}}>Send Message</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}}>WhatsApp Link</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}}>Telegram Link</button>
                            <button className='addItemButtonModal' style={{position: 'relative', marginTop: '10px', width: '100px'}}>Support</button>

                        </div>
                        :
                        <div>
                            <h5>Search Pav</h5>
                            <div style={{marginTop: '0px'}} className='changeArrow' onClick={() => setChangeSide(!changeSide)}>←→</div>
                            {allPav.map(e => <button className='buttonPav buttonPavRightSide' onClick={() => {
                                if (parseInt(e / 100) == 10) {
                                    setPav(10);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 20) {
                                    setPav(20);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 30) {
                                    setPav(30);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 40) {
                                    setPav(40);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 50) {
                                    setPav(50);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 60) {
                                    setPav(60);
                                    setGoPav(false)
                                }
                                if (parseInt(e / 100) == 70) {
                                    setPav(70);
                                    setGoPav(false)
                                }
                            }}>{e}</button>)
                            }
                        </div>
                }
            </div>
            {
                goPav ?
                    <div  className="container">
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 10){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}}  className="block1 block11" onClick={() => {setPav(10); setGoPav(false)}}>A</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 40){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="block1 block11" onClick={() => {setPav(40); setGoPav(false)}}>D</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 20){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="block1 block11" onClick={() => {setPav(20); setGoPav(false)}}>B</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 70){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="div1 block11" onClick={() => {setPav(70); setGoPav(false)}}>G</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 50){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="block1 block11" onClick={() => {setPav(50); setGoPav(false)}}>E</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 30){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="block1 block11" onClick={() => {setPav(30); setGoPav(false)}}>C</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 60){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="block1 block11" onClick={() => {setPav(60); setGoPav(false)}}>F</button>
                        <button style={{background: allPav.some(e => {
                                if(parseInt(e/100) == 80){
                                    return true;
                                }
                            }) ? 'orange' : '#F0F0F0'}} className="pavP block11" onClick={() => {setPav(80); setGoPav(false)}}>P</button>
                    </div>

                :
                pav == 80 ?
                <PavP buffParada={buffParada} setbuffParada={setbuffParada} currentParada={currentParada} setCurrentParada={setCurrentParada} items={items} prods={prod} checkBoxArr={checkBoxArr} setCheckBoxArr={setCheckBoxArr} setItems={setItems} setModal={setModal} setThisPav={setThisPav} obj={obj} setName={setName} setTel={setTel} setMapsLink={setMapsLink} setEmail={setEmail} setParada={setParada} newPostsArr={newPostsArr} allPav={allPav} pav={pav} setGoPav={setGoPav}/>
                    :
                    pav == 60 ?
                        <Pav6 buffParada={buffParada} setbuffParada={setbuffParada} currentParada={currentParada} setCurrentParada={setCurrentParada} items={items} prods={prod} checkBoxArr={checkBoxArr} setCheckBoxArr={setCheckBoxArr} setItems={setItems} setModal={setModal} setThisPav={setThisPav} obj={obj} setName={setName} setTel={setTel} setMapsLink={setMapsLink} setEmail={setEmail} setParada={setParada} newPostsArr={newPostsArr} allPav={allPav} pav={pav} setGoPav={setGoPav}/>
                        :
                        pav == 30 ?
                            <Pav3 buffParada={buffParada} setbuffParada={setbuffParada} currentParada={currentParada} setCurrentParada={setCurrentParada} items={items} prods={prod} checkBoxArr={checkBoxArr} setCheckBoxArr={setCheckBoxArr} setItems={setItems} setModal={setModal} setThisPav={setThisPav} obj={obj} setName={setName} setTel={setTel} setMapsLink={setMapsLink} setEmail={setEmail} setParada={setParada} newPostsArr={newPostsArr} allPav={allPav} pav={pav} setGoPav={setGoPav}/>
                            :
                            pav == 70 ?
                                <Pav7 buffParada={buffParada} setbuffParada={setbuffParada} currentParada={currentParada} setCurrentParada={setCurrentParada} items={items} prods={prod} checkBoxArr={checkBoxArr} setCheckBoxArr={setCheckBoxArr} setItems={setItems} setModal={setModal} setThisPav={setThisPav} obj={obj} setName={setName} setTel={setTel} setMapsLink={setMapsLink} setEmail={setEmail} setParada={setParada} newPostsArr={newPostsArr} allPav={allPav} pav={pav} setGoPav={setGoPav}/>
                                :
                                <Pav buffParada={buffParada} setbuffParada={setbuffParada} currentParada={currentParada} setCurrentParada={setCurrentParada} items={items} prods={prod} checkBoxArr={checkBoxArr} setCheckBoxArr={setCheckBoxArr} setItems={setItems} setModal={setModal} setThisPav={setThisPav} obj={obj} setName={setName} setTel={setTel} setMapsLink={setMapsLink} setEmail={setEmail} setParada={setParada} newPostsArr={newPostsArr} allPav={allPav} pav={pav} setGoPav={setGoPav}/>
            }
            {
                modal &&
                <div className="modal" style={{position: (showProd == false && modalSwitch == true) || (items.length < 7 && modalSwitch == true)  ? "fixed" : "absolute"}} onClick={(e) => e.stopPropagation()}>
                    <div className="modalWindow">
                        {
                            modalSwitch ?
                                <div className="modalWindowDiv">
                                    <div className='openArrowModal' onClick={() => setModal(false)}>←</div>
                                    <h4>Parada - {thisPav > 8000 ? parseInt(String(thisPav).slice(-2)) : thisPav}</h4>
                                    <div className='buttonsModelWindow'>
                                        <button className='addItemButtonModal' style={{position: 'relative', marginTop: '30px', width: '100px'}} onClick={(e) => setModalSwitch(false)}>Change</button>
                                        <button className='addItemButtonModal' style={{position: 'relative', marginTop: '30px', width: '100px'}} onClick={(e) => {setSide((e) => !e); setChangeSide(true)}}>Info</button>
                                        <button className='addItemButtonModal' style={{position: 'relative', marginTop: '30px', width: '100px'}} onClick={(e) => {saveAndUpdate()}}>Save</button>
                                        <button className='addItemButtonModal' style={{position: 'relative', marginTop: '30px', width: '100px'}} onClick={(e) => {setShowProd((e) => !e)}}>Show Products</button>
                                        <button className='addItemButtonModal' style={{position: 'relative', marginTop: '30px', width: '100px'}} onClick={(e) => {setEdit((e) => !e)}}>Edit</button>
                                    </div>
                                    {   showProd &&
                                        items.map((e, index) => {
                                            return <div className='prodItems'><div className="indexMerca">{index + 1}</div><div className="nombreMerca">{e.nombre}</div><div className="descMerca">[{e.description}]</div><div className="descMerca">{e.precio}</div><div className="descMerca">{e.IVA}</div><div>{e.image?.name && <img className="imageMiniTest" src={createImg(e.image)}/>}</div><div style={{display: edit ? 'block' : 'none'}} className="checkMerca" onClick={() => {addProdInDataBase(e)}}>{!checkBoxArr.includes(e.id) ? 'x' : 'x' }</div></div>
                                        })
                                    }
                                </div>
                                :
                                <div className="modalWindowAdd">
                                    <div className='openArrowModal' onClick={() => setModalSwitch(true)}>←</div>
                                    <h4 style={{marginBottom: '70px'}}>Parada - {thisPav}</h4>
                                    <div>
                                        <input style={{marginTop: '-20px', width: '200px', height: '20px', backgroundColor: 'whitesmoke', background:'none'}} className="inputChange" onChange={(e) => setSearchChange(e.target.value)} type="text" placeholder="Search..."/>
                                        <button className='addItemButtonModal1' onClick={(e) => {saveAndUpdate()}}>Save</button>
                                        <button className='createItemButtonModal1' onClick={(e) => {setModalForAddNewProd(true)}}>Create New Product</button>

                                    </div>
                                    {
                                        searchChangePosts.length < 1 ?
                                            prod.map((e, index) => {
                                                //console.log(prod);
                                                return <div className='prodItems'><div className="indexMerca">{index + 1}</div><div className="nombreMerca">{e.nombre}</div><div className="descMerca">[{e.description}]</div><div>{e.image?.name && <img className="imageMiniTest" src={createImg(e.image)}/>}</div><div className="checkMerca" onClick={() => {addProdInDataBase(e)}}>{!checkBoxArr.includes(e.id) ? '+' : '✔' }</div><div className="checkMerca" onClick={() => {setCurrElemForUpdate(e); setModalForDeleteProd(true)}}><b>✘</b></div><div className="checkMerca" onClick={() => {copyNewProd(e)}}><b>↻</b></div><div className="checkMerca" onClick={() => {
                                                    setModalForUpdateProd(true);
                                                    setUpdateProdIVA(e.IVA)
                                                    setUpdateProdLongName(e.longName)
                                                    setUpdateProdNombre(e.nombre)
                                                    setUpdateProdPrecio(e.precio)
                                                    setUpdateProdDesc(e.description)
                                                    setUpdateProdSKU(e.sku)
                                                    setUpdateProdTipo(e.tipo)
                                                    console.log(e)
                                                    setCurrElemForUpdate(e)
                                                }}><b>✎</b></div></div>
                                            })
                                            :
                                        searchChangePosts.map((e, index) => {
                                            //console.log(searchChangePosts);
                                                return <div className='prodItems'><div className="indexMerca">{index + 1}</div><div className="nombreMerca">{e.nombre}</div><div className="descMerca">[{e.description}]</div><div>{<img className="imageMiniTest" src="https://photos.google.com/photo/AF1QipOKX2JLrnIZoTql6haTBvYFSXVt1GXde2xufpkR"/>}</div><div className="checkMerca" onClick={() => {addProdInDataBase(e)}}>{!checkBoxArr.includes(e.id) ? '+' : '✔' }</div><div className="checkMerca" onClick={() => {setCurrElemForUpdate(e); setModalForDeleteProd(true)}}><b>✘</b></div><div className="checkMerca" onClick={() => {copyNewProd(e)}}><b>↻</b></div><div className="checkMerca" onClick={() => {
                                                    setModalForUpdateProd(true);
                                                    setUpdateProdIVA(e.IVA)
                                                    setUpdateProdLongName(e.longName)
                                                    setUpdateProdNombre(e.nombre)
                                                    setUpdateProdPrecio(e.precio)
                                                    setUpdateProdDesc(e.description)
                                                    setUpdateProdSKU(e.sku)
                                                    setUpdateProdTipo(e.tipo)
                                                    console.log(e)
                                                    setCurrElemForUpdate(e)
                                                }}><b>✎</b></div></div>
                                        })
                                    }
                                </div>
                        }
                    </div>

                </div>

            }
            {
                modalForDeleteProd &&
                <div className="modalForNewProduct">
                    <h3>Delete?</h3>
                    <div className="closeButtonForAddNewProd" onClick={() => {setModalForDeleteProd(false); deleteProd(currElemForUpdate)}}><button style={{width: '150px'}}>Yes</button></div>
                    <div className="closeButtonForAddNewProd" onClick={() => {setModalForDeleteProd(false)}}><button style={{width: '150px'}}>No</button></div>
                </div>
            }
            {
                modalForAddNewProd &&
                <div className="modalForNewProduct">
                    <div className="closeButtonForAddNewProd" onClick={() => {setModalForAddNewProd(false)}}><button style={{width: '150px'}}>Close</button></div>
                    <div>
                        <div>Nombre</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Acelga" onChange={(e) => setCreateNewProdNombre(e.target.value)}/>
                        <div>SKU</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="BHieACELman" onChange={(e) => setCreateNewProdSKU(e.target.value)}/>
                        <div>Tipo</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Hierbas" onChange={(e) => setCreateNewProdTipo(e.target.value)}/>
                        <div>Description</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="man" onChange={(e) => setCreateNewProdDesc(e.target.value)}/>
                        <div>Precio</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Precio" onChange={(e) => setCreateNewProdPrecio(e.target.value)}/>
                        <div>IVA</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="IVA" onChange={(e) => setCreateNewProdIVA(e.target.value)}/>
                        <div>Long Name</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="lang name..." onChange={(e) => setCreateNewProdLongName(e.target.value)}/>
                        <div>Upload Image</div>
                        <form onSubmit={handleSubmit}>
                            <input id="inputForCreateNewProd" type="file" onChange={handleFileUpload} />
                            <button type="submit">Upload</button>
                        </form>

                    </div>
                    <button className="buttonForAddNewProd" onClick={() => {if(createNewProdSKU != '' && createNewProdTipo != '' && createNewProdNombre != '' && createNewProdDesc != '' && createNewProdIVA != '' && createNewProdPrecio != '' && createNewProdLongName != ''){createNewProd()}}}>{createNewProdSKU != '' && createNewProdTipo != '' && createNewProdNombre != '' && createNewProdDesc != '' ? "Add" : "Not Add, Empty Places" }</button>
                </div>
            }
            {
                modalForUpdateProd &&
                <div className="modalForNewProduct">
                    <div className="closeButtonForAddNewProd" onClick={() => {setModalForUpdateProd(false)}}><button style={{width: '150px'}}>Close</button></div>
                    <div>
                        <div>Nombre</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Acelga" defaultValue={updateProdNombre} onChange={(e) => setUpdateProdNombre(e.target.value)}/>
                        <div>SKU</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="BHieACELman" defaultValue={updateProdSKU} onChange={(e) => setUpdateProdSKU(e.target.value)}/>
                        <div>Tipo</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Hierbas" defaultValue={updateProdTipo} onChange={(e) => setUpdateProdTipo(e.target.value)}/>
                        <div>Description</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="man" defaultValue={updateProdDesc} onChange={(e) => setUpdateProdDesc(e.target.value)}/>
                        <div>Precio</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="Precio" defaultValue={updateProdPrecio} onChange={(e) => setUpdateProdPrecio(e.target.value)}/>
                        <div>IVA</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="IVA" defaultValue={updateProdIVA} onChange={(e) => setUpdateProdIVA(e.target.value)}/>
                        <div>Long Name</div>
                        <input id="inputForCreateNewProd" type="text" placeholder="lang name..." defaultValue={updateProdLongName} onChange={(e) => setUpdateProdLongName(e.target.value)}/>
                        <div>Upload Image</div>
                        <form onSubmit={handleSubmit}>
                            <input id="inputForCreateNewProd" type="file" onChange={handleFileUpload} />
                            <button type="submit">Delete Image</button>
                        </form>

                    </div>
                    {   updateComplete ?
                        <div className="closeButtonForAddNewProd" onClick={() => {setModalForUpdateProd(false); setUpdateComplete(false)}}><button style={{width: '150px'}}>Close</button></div>
                            :
                        <button className="buttonForAddNewProd" onClick={() => {updateProd(); setUpdateComplete(true)}}>Update</button>
                            }
                </div>
            }
        </div>
    );
}

export default Mercabarna;
