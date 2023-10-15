import React, {useMemo, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import ItemMobile from "../Item/ItemMobile";
import ItemsCardDefMarket from "../../../Desktop/Components/Login/Items/ItemsCardDefMarket";
import ItemMobileDefMarket from "../Item/ItemMobileDefMarket";
import "./MainBar.scss"
import ItemMobilePart2 from "../Item/ItemMobilePart2";
import {HiPlus} from 'react-icons/hi'
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityDecrement,
    setCartElemQuantityIncrement, setCartElemQuantityValue
} from "../../../features/allCartItems";
import {FiMinus, FiPlus} from "react-icons/fi";
import {setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue} from "../../../features/allItems";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import ItemMobileDefMarketV2 from "../Item/ItemMobileDefMarketV2";
import UpdatedItemMobile from "../UpdatedItems/UpdatedItemMobile";
import SearchMobile from "../SeacrhBar/SearchMobile";
import {setSearch} from "../../../features/searchItems";



const ItemsCardMobile = ({setIsOpenFilters, setModalInfoActive}) => {
    const allItems = useSelector((state) => state.allItems.allItems)
    const search = useSelector((state) => state.search.search)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

    const dispatch = useDispatch()
    const [currentUpperElem, setCurrentUpperElem] = useState({})
    const [upperInfoOpen, setUpperInfoOpen] = useState(false);
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
    const [sortPopularity, setSortPopularity] = useState(false)
    const [sortPrice, setSortPrice] = useState(false)
    const [sortAlphabet, setSortAlphabet] = useState(false)
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: currentUpperElem}))
            dispatch(setElemQuantityValue({value: newValue, elem: currentUpperElem}))
        }
    };


    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: allItemsCart.filter((items) => items._id === currentUpperElem._id)[0].quantity, elem: currentUpperElem}))
            dispatch(setElemQuantityValue({value: allItemsCart.filter((items) => items._id === currentUpperElem._id)[0].quantity, elem: currentUpperElem}))
        }
    }

    const allItemsSearch = useMemo(() => {
        if(search !== ''){
            return allItems.filter((elem, index) => {
                if(true){
                    try{
                        return String(elem.name).toLowerCase().includes(search.toLowerCase()) || String(elem.sku).toLowerCase().includes(search.toLowerCase()) || String(elem.category).toLowerCase().includes(search.toLowerCase()) || String(elem.proveedor).toLowerCase().includes(search.toLowerCase())
                    }catch (e) {
                        return false
                    }
                }
            })
        }else{

            return allItems
        }

    }, [search, allItems])


    const randOne = useMemo(() => {
        if(currentUpperElem){
            try{

                return (Math.floor(1 + Math.random() * (allItems.length + 1 - 1)))

            }catch (e) {
                return 2
            }
        }else{
            return 2
        }
    }, [currentUpperElem])
    const randTwo = useMemo(() => {
        if(currentUpperElem){
            try{

                return (Math.floor(1 + Math.random() * (allItems.length + 1 - 1)))

            }catch (e) {
                return 2
            }
        }else{
            return 2
        }
    }, [currentUpperElem])
    const randThree = useMemo(() => {
        if(currentUpperElem){
            try{

                return (Math.floor(1 + Math.random() * (allItems.length + 1 - 1)))

            }catch (e) {
                return 2
            }
        }else{
            return 2
        }
    }, [currentUpperElem])

    return (<div style={{display:"flex",flexDirection:"column"}}>
            <div style={{width: '100%'}}>
                <div className="FilterAndSearchMenu">
                    <div className="FilterAndSearch">
                        <div className="FilterInMenu" onClick={() => setIsOpenFilters(true)}><span>Filters</span></div>
                        <div className='search-mobileV2'>
                            <input type="text" onChange={(e) => dispatch(setSearch(e.target.value))} value={search} placeholder=""
                                   className='searchInput-mobileV2'/>
                            <div className='searchIcon-mobileV2'></div>
                            <div className='searchIcon-mobileV2-2' onClick={() => dispatch(setSearch(''))}></div>
                        </div>
                    </div>
                    <div className="OtherFilters">
                        <div className="FilterMenuAlphabet" onClick={()=>{
                            setSortPopularity(!sortPopularity)
                            setSortPrice(false)
                            setSortAlphabet(false)
                        }}
                             style={{
                                 background:sortPopularity ? "#5FC56E" :"#E8E8E8",
                                 color:sortPopularity? "#FFFFFF":"#4C4C4C",
                             }}>
                            Stock
                        </div>
                        <div className="FilterMenuAlphabet"  onClick={()=>{
                            setSortPopularity(false)
                            setSortPrice(!sortPrice)
                            setSortAlphabet(false)
                        }}
                             style={{
                                 background:sortPrice ? "#5FC56E" :"#E8E8E8",
                                 color:sortPrice? "#FFFFFF":"#4C4C4C",
                             }}>
                            Price
                        </div>
                        <div className="FilterMenuAlphabet" onClick={()=>{
                            setSortPopularity(false)
                            setSortPrice(false)
                            setSortAlphabet(!sortAlphabet)
                        }}
                             style={{
                                 background:sortAlphabet ? "#5FC56E" :"#E8E8E8",
                                 color:sortAlphabet? "#FFFFFF":"#4C4C4C",
                             }}>
                            A-Z
                        </div>
                    </div>
                </div>

            </div>
            <div className='itemsCard-mobile' style={{gridTemplateRows: allItemsSearch.length < 6 ? '0fr' : '1fr', gridTemplateColumns: chooseMarket == 2 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', paddingLeft: chooseMarket == 2 ? '15px' : '5px'}}>

                {
                    allItemsSearch.map(elem => {
                        return chooseMarket == 2
                            ?
                            // <ItemMobile elem={elem}/>
                            <ItemMobilePart2 setUpperInfoOpen={setUpperInfoOpen} setCurrentUpperElem={setCurrentUpperElem} elem={elem}/>

                            :
                            // <ItemMobileDefMarketV2 setUpperInfoOpen={setUpperInfoOpen} setCurrentUpperElem={setCurrentUpperElem} elem={elem}/>
                            <UpdatedItemMobile setModalInfoActive={setModalInfoActive} setUpperInfoOpen={setUpperInfoOpen} setCurrentUpperElem={setCurrentUpperElem} elem={elem}/>

                        // <ItemMobileDefMarket setUpperInfoOpen={setUpperInfoOpen} setCurrentUpperElem={setCurrentUpperElem} elem={elem}/>
                    })
                }
                <div className={`upperInfo ${upperInfoOpen ? 'upperInfoOpenAnim' : 'upperInfoOpenCloseAnim'}`} style={{marginLeft: chooseMarket == 2 ? '-15px' : '0px'}}>
                    <div className='upperInfoCloseButton' onClick={() => setUpperInfoOpen(false)}>
                        <HiPlus className="buttonMoreIcon flip"/>
                    </div>
                    <div className='upperInfoImg'>{allItems.findIndex((items) => items._id === currentUpperElem._id) >= 1 && <span className='arrowLeftImage' onClick={() => {
                        let ind = allItems.findIndex((items) => items._id === currentUpperElem._id)
                        setCurrentUpperElem(allItems[ind - 1])
                    }}><MdArrowBackIos/></span>}<img src={currentUpperElem?.img} alt=""/>{allItems.findIndex((items) => items._id === currentUpperElem._id) < allItems.length-1 && <span className='arrowRightImage' onClick={() => {
                        let ind = allItems.findIndex((items) => items._id === currentUpperElem._id)
                        setCurrentUpperElem(allItems[ind + 1])
                    }}><MdArrowForwardIos/></span>}</div>                    <div className='upperInfoName'>{currentUpperElem.name}<span>{currentUpperElem.unit}</span></div>
                    <div className='upperInfoBlocks'>
                        {

                            <div className='upperInfoImg' onClick={() => {
                                setCurrentUpperElem(allItems[randOne])
                            }}>
                                <img src={allItems[randOne]?.img} style={{boxShadow: 'none', padding: '0px', height: 'auto', width: '100px'}} alt=""/>
                            </div>
                        }
                        {

                            <div className='upperInfoImg' style={{boxShadow: 'none', padding: '0px', height: 'auto', width: '100px'}} onClick={() => {
                                setCurrentUpperElem(allItems[randTwo])
                            }}>
                                <img src={allItems[randTwo]?.img} alt=""/>
                            </div>
                        }
                        {

                            <div className='upperInfoImg' style={{boxShadow: 'none', padding: '0px', height: 'auto', width: '100px'}} onClick={() => {
                                setCurrentUpperElem(allItems[randThree])
                            }}>
                                <img src={allItems[randThree]?.img} alt=""/>
                            </div>
                        }

                    </div>
                    <div className='upperInfoTexts'>
                        <div>{currentUpperElem.desc}</div>
                        <div>{currentUpperElem.sku}</div>
                        <div>text</div>
                    </div>
                    <div className={`upperInfoPriceAndAdd ${upperInfoOpen ? 'upperInfoOpenAnimBottomElem' : 'upperInfoOpenCloseAnimBottomElem'}`}  style={{width: '100%', bottom: '0px', position: 'absolute', background: '#FFF',display: upperInfoOpen ? "flex" : "none"}}>
                        <div className='upperInfoPrice'>{parseFloat(currentUpperElem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat(currentUpperElem.marketPriceCP).toFixed(2) : 0}€</div>
                        <div style={{width: '200px'}}>
                            {
                                !allItemsCart.find((items) => {
                                    return (items._id === currentUpperElem._id)
                                }) ?
                                    <div className='upperInfoAddToCart' style={{background: allItemsCart.find((items) => items._id === currentUpperElem._id) ? '#E8E8E8': '#5FC56E', color: allItemsCart.find((items) => items._id === currentUpperElem._id) ? '#4c4c4c' : "#FFFFFF"}}  onClick={() => {

                                        dispatch(setElemQuantityValue({value: 1, elem: currentUpperElem}));
                                        dispatch(setAllItemsCart({...currentUpperElem, quantity: 1}))}}>
                                        <span style={{padding: '5px'}}>Add to Cart</span></div>

                                    :
                                    <div className='cardElemChangeDefMarket' onClick={(e) => e.stopPropagation()}>
                                        <FiMinus onClick={(e) => {
                                            let cr = allItemsCart.filter((items) => items._id === currentUpperElem._id)[0]

                                            dispatch(setCartElemQuantityDecrement(cr))
                                            dispatch(setElemQuantityDecrement(cr))
                                            if(parseInt(cr.quantity) <= 1){
                                                dispatch(deleteCartElem(cr))
                                            }
                                        }}/>
                                        <div>
                                            <input type="number" style={{textAlign: 'center'}} onChange={handleChange} onBlur={handleMouseLeave} value={allItems.filter((items) => items._id === currentUpperElem._id)[0].quantity}/></div>
                                        <FiPlus onClick={() => {

                                            dispatch(setCartElemQuantityIncrement(currentUpperElem))
                                            dispatch(setElemQuantityIncrement(currentUpperElem))

                                        }}/>
                                    </div>
                            }
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ItemsCardMobile;