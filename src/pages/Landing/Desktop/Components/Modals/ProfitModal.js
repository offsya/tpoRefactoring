import React from 'react'
import '../../../Mobile/Components/ModalWindow/ModalWindow.scss'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import CartElem from '../Carts/CartElem/CartElem'
import ProfitElem from './ProfitElem'

const ProfitModal = ({ setSeeModal, currentOption }) => {
  const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
  const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
  const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
  return (
    <div className='modal' onClick={() => setSeeModal(false)}>
      <div className='profitModal' onClick={(e) => e.stopPropagation()}>
        <div className='seeProfitText'>
          See your economy <CgClose className='closeButton' onClick={() => setSeeModal(false)} />
        </div>
        <div className='profitTableElem'>
          <span className='profitProductName'>Product name</span>
          <span className='profitProductMiddle'>AMP</span>
          <span className='profitOurPrice'>
            our <br />
            price
          </span>
          <span className='profitQuantity'>quantity</span>
          <span className='profitProfit'>economy</span>
        </div>
        <div className='profitTable'>
          {allItemsCart.map((elem, index) => {
            return <ProfitElem key={index} elem={elem} />
          })}
        </div>
        <div className='totalProfit'>
          <div className='totalProfitText'>Total economy</div>
          <div className='totalProfitPrice'>
            {allItemsCart
              .map(
                (elem) =>
                  (elem.marketPriceCP - ((elem.ourPriceCP * (chooseOption == 1 ? elem.MB : elem.DP)) / 100 + elem.ourPriceCP)) * elem.quantity,
              )
              .reduce((acc, num) => acc + num, 0)
              .toFixed(2) || 0}
            €
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfitModal
