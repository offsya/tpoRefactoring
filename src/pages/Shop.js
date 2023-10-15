import React, {useState, useMemo, useEffect, useRef} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Items from "../components/Items";
import ShowFullItem from "../components/ShowFullItem";
import Order from "../components/Order";
import axios from "axios";
import Form from "../components/Form";
import Lang from "../components/Lang";
import HeaderToCatalog from "../components/HeaderToCatalog";
import ItemsToCatalog from "../components/ItemsToCatalog";
import DelCat from "../components/DelCat";
import DelEs from "../components/DelEs";
import DelRus from "../components/DelRus";
import DelUkr from "../components/DelUkr";
import DelFr from "../components/DelFr";
import DelIta from "../components/DelIta";
import DelRom from "../components/DelRom";
import DelEng from "../components/DelEng";
const tg = window.Telegram.WebApp;

var usr = tg.initDataUnsafe?.user;
var queryId = tg.initDataUnsafe?.query_id;


const Shop = () => {


    const [dell, setDell] = useState(false)

    const [delAgree, setDelAgree] = useState('')

    const [agree, setAgree] = useState(false)

    const [itemLang, setItemLang] = useState('russian');

    const [categories, setCategories] = useState([])

    const [del, setDel] = useState(false)


    const [nameLang, setNameLang] = useState([]);


    const [checkCategory, setCheckCategory] = useState(true);



    const [items, setItems] = useState([])
    const [orders, setOrders] = useState([])
    const [curretItems, setCurretItems] = useState(items)
    const [showFullItem, setShowFullItem] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [lang, setLang] = useState(true)
    const [fullItem, setFullItem] = useState({})
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [isPostsLoading, setIsPostsLoading] = useState(true);


    const lastElement = useRef();
    const observer = useRef();

    //console.log(lastElement)
    let pagesArray = []

    useEffect(() => {
        tg.ready();
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', sendOrder)
        return () => {
            tg.offEvent('mainButtonClicked', sendOrder)
        }
    }, [orders])

    async function axiosPosts () {
        const response = await axios.post('https://tpomobi.shop/items')
        console.log(response.data)
        setCurretItems(response.data)
        setItems(response.data)
        addToCart(response.data);

    }

    function addToCart (items) {
        let arr = [];
        items.forEach((item) => {
            for(let i=0; i<localStorage.length; i++) {
                let key = localStorage.key(i);
                if(item.id == key && localStorage.getItem(key) != 0){
                    item.quantity = parseInt(localStorage.getItem(key));
                    arr.push(item);
                }
            }
        })
        setOrders(arr)
    }

    useEffect(async () => {
        await axiosPosts();

        console.log(totalPages)

        console.log(curretItems)
    }, [])


    const addToOrder = (item) => {
        let isInArray = false;
        orders.forEach(el => {
            if(el.id === item.id)
                isInArray = true
        })
        if(!isInArray){
            setOrders([...orders, item]);
        }
    }

    const addQuantity = (item, quantity) => {
        let newOrdersQuantity = orders.map(el => {
            if(el.id === item.id){
                el.quantity = quantity
            }
            return el
        })
        setOrders(newOrdersQuantity)
        console.log(orders)
    }

    const deleteOrder = (id) => {
        setOrders(() => {
            return orders.filter(e => e.id !== id)
        })

    }

    const chooseCategory = (category) => {
        if(category === 'all'){
            setCurretItems(items)
        }else{
            setCurretItems(items.filter(el => el.tag5 === category || el.tag4 === category || el.tag3 === category || el.tag2 === category || el.tag1 === category))
        }
    }

    const onShowItem = (item) => {
        setFullItem(item)
        setShowFullItem(!showFullItem);
    }
    const [searchQuery, setSearchQuery] = useState('')
    const searchPosts = useMemo(() => {
        if(searchQuery == ''){
            return curretItems
        }else{
            return items.filter(posts => {try{return posts[itemLang].toLowerCase().includes(searchQuery.toLowerCase())}catch(e){return posts[itemLang]}}) //posts.title.toLowerCase().includes(searchQuery.toLowerCase())
        }
        }, [searchQuery, curretItems, items])


    const [cartOpen, setCartOpen] = useState(false)



    const sendOrder = (number, address, message, deliveryDate, pay) => {
        //tg.sendData(JSON.stringify(orders));
        const data = {
            ord: orders,
            user: usr,
            teleg: tg,
            num: number,
            addr: address,
            mess: message,
            delivery: deliveryDate,
            pay: pay,
            lang: itemLang,
            queryId,
        }
        localStorage.clear();
        fetch('https://tpomobi.shop/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(e => {
            localStorage.clear();
            tg.close();
        })
        localStorage.clear();
    }

    const [minDay, setMinDay] = useState(0);

        orders.forEach(elem => {
            if(elem.dia > minDay){
                setMinDay(elem.dia)
            }
        })



    const showOrders = (props) => {
        let summa = 0
        orders.forEach(el => summa += parseFloat(el.price) * parseInt(localStorage.getItem(el.id) ? localStorage.getItem(el.id) : 0))
        return(
            <div>
                {
                    orders.map(el => {
                        return(
                            <Order itemLang={itemLang} nameLang={nameLang} setMinDay={setMinDay} onAdd={addToOrder} addQuantity={addQuantity} onDelete={deleteOrder} key={el.id} item={el}/>
                        )
                    })
                }
                <div className='button-for-order-cont' style={{opacity: summa < 29 ? "0.5" : "1"}}>
                    <button className='button-for-order' onClick={() => {if(summa > 29){setShowForm(true)}}}>
                        <p className='summa'>{nameLang[6]} {summa.toFixed(2)}€</p>
                    </button>
                </div>
                <div style={{width: '100%', textAlign: 'center', marginTop: '20px'}}><b>Min order 29€</b></div>
            </div>
        )
    }


    const showSellButton = () => {
        let summa = 0
        orders.forEach(el => summa += parseFloat(el.price) * parseInt(localStorage.getItem(el.id) ? localStorage.getItem(el.id) : 0))
        return(
            <div className='bottomBuyButton'>
                <div>
                    <button onClick={() => {setCartOpen(true)}}>
                        {nameLang[2]}: {summa.toFixed(2)}€
                    </button>
                </div>
            </div>
        )
    }




    let agr;

    if(itemLang == 'сatalan'){
        agr = <DelCat/>
    }else if(itemLang == 'español'){
        agr = <DelEs/>
    }else if(itemLang == 'russian'){
        agr = <DelRus/>
    }else if(itemLang == 'ucranian'){
        agr = <DelUkr/>
    }else if(itemLang == 'french'){
        agr = <DelFr/>
    }else if(itemLang == 'italian'){
        agr = <DelIta/>
    }else if(itemLang == 'romanian'){
        agr = <DelRom/>
    }else if(itemLang == 'english'){
        agr = <DelEng/>
    }

    //lol
    console.log(tg.initDataUnsafe)
    return (
        <div className="wrapper">
            {
                checkCategory ?
                    <div style={{marginTop: '40px', paddingTop: '10px'}}>
                            <HeaderToCatalog dell={dell} setDell={setDell} del={del} setDel={setDel} setShowForm={setShowForm} setLang={setLang} lang={lang} nameLang={nameLang} showFullItem={showFullItem}
                                             setShowFullItem={setShowFullItem} chooseCategory={chooseCategory}
                                             setCheckCategory={setCheckCategory} setShowForm={setShowForm}
                                             showForm={showForm} cartOpenonShowItem={onShowItem}
                                             searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                             cartOpen={cartOpen} setCartOpen={setCartOpen} onDelete={deleteOrder}
                                             onAdd={addToOrder} addQuantity={addQuantity}/>
                        {cartOpen && (
                            <div className='full-item-cart' onClick={() => setCartOpen(false)}>
                                <div className='cont' onClick={e => e.stopPropagation()}>
                                    <div className='shop-cart'>
                                        {orders.length > 0 ?
                                            <div>
                                                {showOrders()}
                                            </div>
                                            :
                                            <div className='empty'>
                                                <h2>{nameLang[1]}</h2>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                        {
                            searchQuery == '' ?
                                <ItemsToCatalog categories={categories} style={{marginTop: '150px'}} setCheckCategory={setCheckCategory} page={page} onShowItem={onShowItem} chooseCategory={chooseCategory} items={searchPosts} onAdd={addToOrder} onDelete={deleteOrder} addQuantity={addQuantity}/>
                                :
                                <div style={{marginTop: '100px'}}>
                                    <Items itemLang={itemLang} page={page} onShowItem={onShowItem} setMinDay={setMinDay} items={searchPosts} onAdd={addToOrder} onDelete={deleteOrder} addQuantity={addQuantity}/>

                                </div>
                        }
                        {showForm && <Form itemLang={itemLang} delAgree={delAgree} agree={agree} setAgree={setAgree} del={del} setDel={setDel} nameLang={nameLang} sendOrder={sendOrder} showForm={showForm} setShowForm={setShowForm} minDay={minDay}/>}
                        {showFullItem && <ShowFullItem itemLang={itemLang} setMinDay={setMinDay} nameLang={nameLang} item={fullItem} onAdd={addToOrder} onShowItem={onShowItem} onDelete={deleteOrder} addQuantity={addQuantity}/>}
                        {lang && <Lang setItemLang={setItemLang} setDelAgree={setDelAgree} setCategories={setCategories} setNameLang={setNameLang} setLang={setLang}/>}
                        {
                            dell &&
                            <div className='full-form' onClick={() => setDell(false)}>
                                <div onClick={e => e.stopPropagation()}>
                                    <div id="login-box">
                                        <div className="left">
                                            <div style={{textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}} className="formDelAgreeMain">
                                                {agr}
                                                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '-90px'}}>
                                                    <input  style={{height: '35px', background: '#ff8428', width: '100px', color: '#FFFFFF', fontWeight: '600'}} onClick={() => {setDell(false); setAgree(true)}} type="submit" name="signup_submit" value="Agree?"/>
                                                </div>
                                                <a href="https://t.me/Botonbcn" style={{width: '100%', textAlign: 'center', marginTop: '105px', marginBottom: '-80px', textDecoration: 'none', fontWeight: '600', color: 'grey '}}>Hay preguntas? O te falta algún producto? <span style={{textDecoration: 'underline', color: '#0000FF'}}>Escríbenos</span></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {orders.length > 0 && showSellButton()}
                        <Footer/>
                    </div>
                    :
                 <div>
                 <Header dell={dell} setDell={setDell}  del={del} setDel={setDel} setShowForm={setShowForm} setLang={setLang} lang={lang} nameLang={nameLang} showFullItem={showFullItem} setShowFullItem={setShowFullItem} chooseCategory={chooseCategory} setCheckCategory={setCheckCategory} setShowForm={setShowForm} showForm={showForm} cartOpenonShowItem={onShowItem} searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartOpen={cartOpen} setCartOpen={setCartOpen} onDelete={deleteOrder} onAdd={addToOrder} addQuantity={addQuantity}/>
            {cartOpen && (
                <div className='full-item-cart' onClick={() => setCartOpen(false)}>
                    <div className='cont' onClick={e => e.stopPropagation()}>
                        <div className='shop-cart'>
                            {orders.length > 0 ?
                                <div>
                                    {showOrders()}
                                </div>
                                :
                                <div className='empty'>
                                    <h2>{nameLang[1]}</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
            {
                curretItems.length > 0 ?
                    <Items itemLang={itemLang} page={page} onShowItem={onShowItem} setMinDay={setMinDay} items={searchPosts} onAdd={addToOrder} onDelete={deleteOrder} addQuantity={addQuantity}/>
                    :
                    <img style={{width: '100%', height: '100%'}} src="../../public/assets/gif/Loading.gif" alt=""/>
            }
            <div ref={lastElement}/>
            {showFullItem && <ShowFullItem itemLang={itemLang} setMinDay={setMinDay} nameLang={nameLang} item={fullItem} onAdd={addToOrder} onShowItem={onShowItem} onDelete={deleteOrder} addQuantity={addQuantity}/>}
            {showForm && <Form itemLang={itemLang} delAgree={delAgree} agree={agree} setAgree={setAgree} del={del} setDel={setDel} nameLang={nameLang} sendOrder={sendOrder} showForm={showForm} setShowForm={setShowForm} minDay={minDay}/>}
             {lang && <Lang setItemLang={setItemLang} setDelAgree={setDelAgree} setCategories={setCategories} setNameLang={setNameLang} setLang={setLang}/>}
                     {
                         dell &&
                         <div className='full-form' onClick={() => setDell(false)}>
                             <div onClick={e => e.stopPropagation()}>
                                 <div id="login-box">
                                     <div className="left">
                                         <div style={{textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}} className="formDelAgreeMain">
                                             {agr}
                                             <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '-90px'}}>
                                                 <input  style={{height: '35px', background: '#ff8428', width: '100px', color: '#FFFFFF', fontWeight: '600'}} onClick={() => {setDell(false); setAgree(true)}} type="submit" name="signup_submit" value="Agree?"/>
                                             </div>
                                             <a href="https://t.me/Botonbcn" style={{width: '100%', textAlign: 'center', marginTop: '105px', marginBottom: '-80px', textDecoration: 'none', fontWeight: '600', color: 'grey '}}>Hay preguntas? O te falta algún producto? <span style={{textDecoration: 'underline', color: '#0000FF'}}>Escríbenos</span></a>

                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     }
             {orders.length > 0 && showSellButton()}
            <Footer/>
                 </div>
                }
        </div>
    );
}

export default Shop;