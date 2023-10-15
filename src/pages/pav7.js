import React, {useState} from 'react';
import axios from "axios";

const Pav7 = ({currentParada, buffParada, checkBoxArr, items, prods, setbuffParada, setCheckBoxArr, setCurrentParada, setItems, setModal, setThisPav, allPav, pav, setGoPav, newPostsArr, setEmail, setMapsLink, setName, setParada, setTel, obj}) => {



    let n1, n2, i = 0;
    const [nextSector, setNextSector] = useState(true)
        n1 = 14;
        n2 = 8;
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
                            let num = String(pav) + '' + String(index+23 < 10 ? '0' : '') + '' + String(index+23)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+23 < 10 ? '0' : ''}{index+23}</button>
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
                            let num = String(pav) + '' + String(index+15 < 10 ? '0' : '') + '' + String(index+15)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+15 < 10 ? '0' : ''}{index+15}</button>
                        }

                            )
                        }
                        <div>
                            <button style={{background: thisPavArr.includes(String(7045)) ? 'green' : allPav.includes(parseInt(7045)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(String(7045))
                            }} className="buttonPav last70Button">7045</button>
                            <button style={{background: thisPavArr.includes(String(7046)) ? 'green' : allPav.includes(parseInt(7046)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(String(7046))
                            }} className="buttonPav last70Button">7046</button>
                        </div>
                    </div>
                    <div className='pav2'>
                        {
                            [...Array(n2)].map((item, index) =>

                        {
                            let num = String(pav) + '' + String(index+37 < 10 ? '0' : '') + '' + String(index+37)
                            return <button style={{background: thisPavArr.includes(num) ? 'green' : allPav.includes(parseInt(num)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                    thisPav(num)
                                }
                                } className="buttonPav" key={index}>{pav}{index+37 < 10 ? '0' : ''}{index+37}</button>
                        }

                            )
                        }
                        <div>
                            <button style={{background: thisPavArr.includes(String(7047)) ? 'green' : allPav.includes(parseInt(7047)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(String(7047))
                            }} className="buttonPav last70Button">7047</button>
                            <button style={{background: thisPavArr.includes(String(7048)) ? 'green' : allPav.includes(parseInt(7048)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                thisPav(String(7048))
                            }} className="buttonPav last70Button">7048</button>
                        </div>
                    </div>
                    <div className='arrowTo arrowLeft'  onClick={() => setNextSector(true)}>←</div>
                </div>
            <div className='arrowBackToMain' onClick={() => {setGoPav(true);setModal(false);}}>←</div>
                <div className="under">
                    {
                        [...Array(1)].map((item, index) => {
                            return (
                                <div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7049 + index)) ? 'green' : allPav.includes(parseInt(7049 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7049))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7049 + index)) ? 'green' : allPav.includes(parseInt(7049 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7050))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7049 + index)) ? 'green' : allPav.includes(parseInt(7049 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7051))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++}</button>
                                    </div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7049 + index + 3)) ? 'green' : allPav.includes(parseInt(7049 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7055))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7049 + index + 3)) ? 'green' : allPav.includes(parseInt(7049 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7056))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7049 + index + 3)) ? 'green' : allPav.includes(parseInt(7049 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7057))
                                        }} className="buttonPav last70ButtonUnder">{7049 + index++ + 3}</button>
                                    </div>

                                </div>

                            )
                        })
                    }
                    {
                        [...Array(1)].map((item, index) => {
                            return (
                                <div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7052 + index )) ? 'green' : allPav.includes(parseInt(7052 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7052))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7052 + index )) ? 'green' : allPav.includes(parseInt(7052 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7053))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7052 + index )) ? 'green' : allPav.includes(parseInt(7052 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7054))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++}</button>
                                    </div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7052 + index + 3)) ? 'green' : allPav.includes(parseInt(7052 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7058))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7052 + index + 3)) ? 'green' : allPav.includes(parseInt(7052 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7059))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7052 + index + 3)) ? 'green' : allPav.includes(parseInt(7052 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7060))
                                        }} className="buttonPav last70ButtonUnder">{7052 + index++ + 3}</button>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>

                <div className="under">
                    {
                        [...Array(1)].map((item, index) => {
                            return (
                                <div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7061 + index)) ? 'green' : allPav.includes(parseInt(7061 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7061))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7061 + index)) ? 'green' : allPav.includes(parseInt(7061 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7062))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7061 + index)) ? 'green' : allPav.includes(parseInt(7061 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7063))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++}</button>
                                    </div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7061 + index + 3)) ? 'green' : allPav.includes(parseInt(7061 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7067))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7061 + index + 3)) ? 'green' : allPav.includes(parseInt(7061 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7068))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7061 + index + 3)) ? 'green' : allPav.includes(parseInt(7061 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7069))
                                        }} className="buttonPav last70ButtonUnder">{7061 + index++ + 3}</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        [...Array(1)].map((item, index) => {
                            return (
                                <div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7064 + index)) ? 'green' : allPav.includes(parseInt(7064 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7064))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7064 + index)) ? 'green' : allPav.includes(parseInt(7064 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7065))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++}</button>
                                        <button style={{background: thisPavArr.includes(String(7064 + index)) ? 'green' : allPav.includes(parseInt(7064 + index)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7066))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++}</button>
                                    </div>
                                    <div>
                                        <button style={{background: thisPavArr.includes(String(7064 + index + 3)) ? 'green' : allPav.includes(parseInt(7064 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7070))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7064 + index + 3)) ? 'green' : allPav.includes(parseInt(7064 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7071))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++ + 3}</button>
                                        <button style={{background: thisPavArr.includes(String(7064 + index + 3)) ? 'green' : allPav.includes(parseInt(7064 + index + 3)) ? 'orange' : '#F0F0F0'}} onClick={() => {
                                            thisPav(String(7072))
                                        }} className="buttonPav last70ButtonUnder">{7064 + index++ + 3}</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

        </div>
    );
};

export default Pav7;