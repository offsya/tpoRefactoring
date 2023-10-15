import React from 'react';
import '../../Mobile/Components/Menu/BodyBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {currentLang} from "../../features/currentLang";

const Language = ({langOpen, setLangOpen}) => {

    const langArray = ['CAT', 'ES', 'EN', 'UA', 'RO', 'RU', 'FR', 'IT'];
    const dispatch = useDispatch()
    const lang = useSelector((state) => state.currentLang.currentLang)

    return (
        <div className="langLandingBodyBar">
            {
                langArray.map(elem => {
                    return <div className="langElem" onClick={() => dispatch(currentLang(elem))} style={{background: lang == elem && "#F5F4F2"}}>{elem}</div>
                })
            }
        </div>
    );
};

export default Language;