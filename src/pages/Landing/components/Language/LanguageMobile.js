import React, {useMemo} from 'react';
import '../../Mobile/Components/Menu/BodyBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {currentLang} from "../../features/currentLang";
import {setSearch} from "../../features/searchItems";
import {AiFillHeart} from "react-icons/ai";
import {addItem, setArr} from "../../../Admin/features/allFavoritCategory";

const LanguageMobile = ({current, langOpen, setLangOpen, setLangMobileOpen, setIsOpen}) => {

    const langArray = ['CAT', 'ES', 'EN', 'UA', 'RO', 'RU', 'FR', 'IT'];
    const dispatch = useDispatch()
    const lang = useSelector((state) => state.currentLang.currentLang)
    const search = useSelector((state) => state.search.search)
    const samplesCategory = useSelector((state) => state.allFavoritCategory.allFavoritCategory)

    const allItems = useSelector((state) => state.allItems.allItems)

    const allItemsTags = useMemo(() => {
        let arrT = allItems.map(elem => elem.category)
        let arrTBuff = []
        arrT = arrT.map(el => {
            if(Array.isArray(el)){
                return el.join()
            }else{
                return el
            }
        })
        arrT.map(el => {
            if(el.includes(',')){
                el.split(',').forEach(it => {
                    console.log(el)

                    if(it){
                        arrTBuff.push(it)
                    }
                })
            }else{
                arrTBuff.push(el)
            }
            return el
        })
        return [...new Set(arrTBuff)];
    }, [allItems])
    return (


        <div>
            {
                    current == 3 ?
                <div className='SamplesSubButtonBack-mobile' style={{left: '0px', top: '0px', overflow: 'auto', height: '80vh'}}>
                    {
                        allItemsTags.map(elem => {
                            return  <div style={{width: 'auto'}} className="SamplesSubButton-mobile" onClick={() => {setIsOpen(false); dispatch(setSearch(elem))}}>
                                <span style={{color: samplesCategory.includes(elem) && 'red', fontSize: '24px', marginRight: '3px', marginTop: '5px'}} onClick={(e) => {
                                    e.stopPropagation()
                                    if(samplesCategory.includes(elem)) {
                                        let ar = samplesCategory.filter(el => el != elem)
                                        dispatch(setArr(ar))
                                    }else{
                                        dispatch(addItem(elem))

                                    }
                                }}><AiFillHeart/></span> {elem}
                            </div>
                        })
                    }
                </div>
                        :
               <div className="lang-mobile">
                   {
                       langArray.map(elem => {
                           return <div className="langElem" onClick={() => {setLangMobileOpen(false); dispatch(currentLang(elem))}} style={{background: lang == elem && "#FFFFFF", color: lang == elem && "#5FC56D"}}>{elem}</div>
                       })
                   }
               </div>
            }

        </div>
    );
};

export default LanguageMobile;