import React from 'react';
import './ModalWindow.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import ProfitElemMobile from "./ProfitElemMobile";

const ProfitModalMobile = ({setSeeModal}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    return (
        <div className='modal' onClick={() => setSeeModal(false)}>
            <div className='profitModal-mobile' onClick={(e) => e.stopPropagation()}>
                <div className='seeProfitText-mobile'>See your economy <CgClose className="closeButton" onClick={() => setSeeModal(false)}/></div>
                <div className='profitTableElem'>
                    <span className='profitProductName-mobile'>Product <br/>name</span>
                    <span className='profitProductMiddle-mobile'>AMP</span>
                    <span className='profitOurPrice-mobile'>our <br/>price</span>
                    <span className='profitQuantity-mobile'>quantity</span>
                    <span className='profitProfit-mobile'>economy</span>
                </div>
                <div className="profitTable">
                    {
                        allItemsCart.map((elem, index) => {
                            return <ProfitElemMobile key={index} elem={elem}/>
                        })
                    }
                </div>
                <div className='totalProfit'><div className='totalProfitText'>Total economy</div><div className='totalProfitPrice'>{(allItemsCart.map(elem => (elem.marketPriceCP - (elem.ourPriceCP * (chooseOption == 1 ? elem.CP : elem.DP) / 100 + elem.ourPriceCP)) * elem.quantity)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</div></div>

            </div>

        </div>
    );
};

export default ProfitModalMobile;