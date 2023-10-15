import React, {useState} from 'react';
import axios from "axios";

const Pav3 = ({currentParada, setCurrentParada, setItems, buffParada, checkBoxArr, items, prods, setbuffParada, setCheckBoxArr, setCurrentParadasetItems, setModal, setThisPav, allPav, pav, setGoPav, newPostsArr, setEmail, setMapsLink, setName, setParada, setTel, obj}) => {
    let n1, n2;
    const [nextSector, setNextSector] = useState(true)
        n1 = 18;
        n2 = 12;
    const [thisPavArr, setThisPavArr] = useState([]);


    const thisPav = (num, pavArr) => {
        //console.log(newPostsArr)
        setThisPav(num)
        setModal(true)
        let pr = '';
        newPostsArr.forEach(e => {
            if(e != undefined){
                if(e.includes(num)){
                    console.log(currentParada)
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
                            [...Array(n1)].map((item, index) =>
                        {
                            let num = String(pav) + '' + String(index+1 < 10 ? '0' : '') + '' + String(index+1)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+1 < 10 ? '0' : ''}{index+1}</button>
                        }
                            )
                        }
                    </div>
                    <div className='pav2'>
                        {
                            [...Array(n1)].map((item, index) =>
                        {
                            let num = String(pav) + '' + String(index+31 < 10 ? '0' : '') + '' + String(index+31)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+31 < 10 ? '0' : ''}{index+31}</button>
                        }
                            )
                        }
                    </div>
                    <div className='arrowTo arrowRight' onClick={() => setNextSector(false)}>→</div>
                </div>
                <div className='pav'>
                    <div className='pav2'>
                        {
                            [...Array(n2)].map((item, index) =>
                        {
                            let num = String(pav) + '' + String(index+n2 < 10 ? '0' : '') + '' + String(index+19)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+n2 < 10 ? '0' : ''}{index+19}</button>
                        }
                            )
                        }
                    </div>
                    <div className='pav2'>
                        {
                            [...Array(n2)].map((item, index) =>
                        {
                            let num = String(pav) + '' + String(index+n2*3 < 10 ? '0' : '') + '' + String(index+49)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+n2*3 < 10 ? '0' : ''}{index+49}</button>
                        }
                            )
                        }
                    </div>
                    <div className='arrowTo arrowLeft'  onClick={() => setNextSector(true)}>←</div>
                </div>
            <div className='arrowBackToMain' onClick={() => {setGoPav(true); setModal(false);}}>←</div>


        </div>
    );
};

export default Pav3;