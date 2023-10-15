import React, {useMemo, useState} from 'react';
import axios from "axios";

const Pav = ({setbuffParada, buffParada, currentParada, setCurrentParada, checkBoxArr, setCheckBoxArr, items, prods,setItems, setModal, setThisPav, newPostsArr, allPav, pav, setGoPav, setMapsLink, setName, setEmail, setTel, setParada, obj}) => {
    let n1, n2;
    const [nextSector, setNextSector] = useState(true)
    n1 = 12;
    n2 = 12;
    const [thisPavArr, setThisPavArr] = useState([]);
    const thisPav = (num, pavArr) => {
        //console.log(newPostsArr)
        setThisPav(num)
        setModal(true)
        let pr = '';
        newPostsArr.forEach(e => {
            if(e != undefined){
                if(e.includes(String(num))){
                    setbuffParada(currentParada);
                    setThisPavArr(e)
                    setCurrentParada(e);
                    pr = e;
                }
            }
        })
        let arr = obj.filter(posts => {try{if(posts.Parada){return String(posts.Parada).includes(String(pr[0]))}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())

        if(currentParada.length > 0){
            let arrBuff = obj.filter(posts => {try{if(posts.Parada){return String(posts.Parada).includes(String(currentParada[0]))}}catch(e){}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
            axios.post('https://tpomobi.shop/updateMerca', {
                "obj": obj,
                "current": arrBuff[0]
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            axios.post('https://tpomobi.shop/updateMerca', {
                "obj": obj,
                "current": arr[0]
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        setName(arr[0].Name)
        setTel(arr[0].Telefono)
        setParada(arr[0].Parada)
        setMapsLink(arr[0].Ubicacion)
        setEmail(arr[0].Correo_electronico)
        setItems(arr[0].Productos);
        setCheckBoxArr(arr[0].Productos.map(prodId => prodId.id));



    }

    return (
        <div>
            <div className='pav'>
                <div className='pav2'>
                    {
                        [...Array(n1)].map((item, index) => {
                            let num = 8000+ 12 - index
                            return <button style={{background: thisPavArr.includes(String(num)) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8000+12-index)
                            }
                            } className="buttonPav" key={index}>{12 - index}</button>
                        } )
                    }
                </div>
                <div className='pavPcenter'>
                    <div className='pavP4'>
                        <div>
                            <button style={{background: thisPavArr.includes(String(8017)) ? 'green' : allPav.includes(parseInt(8017)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8017)
                            }} className="buttonPavP">17</button>
                            <button style={{background: thisPavArr.includes(String(8021)) ? 'green' : allPav.includes(parseInt(8021)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8021)
                            }} className="buttonPavP">21</button>
                        </div>
                        <div>
                            <button style={{background: thisPavArr.includes(String(8016)) ? 'green' : allPav.includes(parseInt(8016)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8016)
                            }} className="buttonPavP">16</button>
                            <button style={{background: thisPavArr.includes(String(8020)) ? 'green' : allPav.includes(parseInt(8020)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8020)
                            }} className="buttonPavP">20</button>
                        </div>
                    </div>
                    <div>
                        <button style={{background: thisPavArr.includes(String(8015)) ? 'green' : allPav.includes(parseInt(8015)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                            thisPav(8015)
                        }} className="buttonPavPcenter">15</button>
                    </div>
                    <div className='pavP4'>
                        <div>
                            <button style={{background: thisPavArr.includes(String(8014)) ? 'green' : allPav.includes(parseInt(8014)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8014)
                            }} className="buttonPavP">14</button>
                            <button style={{background: thisPavArr.includes(String(8019)) ? 'green' : allPav.includes(parseInt(8019)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8019)
                            }} className="buttonPavP">19</button>
                        </div>
                        <div>
                            <button style={{background: thisPavArr.includes(String(8013)) ? 'green' : allPav.includes(parseInt(8013)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8013)
                            }} className="buttonPavP">13</button>
                            <button style={{background: thisPavArr.includes(String(8018)) ? 'green' : allPav.includes(parseInt(8018)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(8018)
                            }} className="buttonPavP">18</button>
                        </div>
                    </div>
                </div>
                <div className='pav2'>
                    {
                        [...Array(n1)].map((item, index) =>
                            {
                                let num = 8000 + 33 - index
                                return <button style={{background: thisPavArr.includes(String(num)) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(8000 + 33 - index)
                                }
                                } className="buttonPav" key={index}>{33 - index}</button>
                            }
                        )
                    }
                </div>
            </div>

            <div className='arrowBackToMain' onClick={() => {setGoPav(true); setModal(false)}}>←</div>


        </div>
    );
};

export default Pav;