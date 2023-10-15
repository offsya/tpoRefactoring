import React, { useMemo, useState } from 'react'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import ItemDefMarket from './ItemDefMarket'
import { HiPlus } from 'react-icons/hi'
import {
  deleteCartElem,
  setAllItemsCart,
  setCartElemQuantityDecrement,
  setCartElemQuantityIncrement,
  setCartElemQuantityValue,
} from '../../../../features/allCartItems'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { MdArrowForwardIos } from 'react-icons/md'
import { MdArrowBackIos } from 'react-icons/md'

import { setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue } from '../../../../features/allItems'
import { addAllItems } from '../../../../features/allItems'
import allProducts from '../../../../../Admin/features/allProducts'
import UpdatedItemDefMarket from './UpdatedItems/UpdatedItemDefMarket'
import { mainApi } from './../../../../../services/mainApi'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'

const ItemsCard = () => {
  const allItems = useSelector((state) => state.allItems.allItems)
  const { data, isLoading } = mainApi.useFindAllWordsQuery()
  // const [allItems, setAllItems] = useState([])
  const [currentUpperElem, setCurrentUpperElem] = useState({})
  const [upperInfoOpen, setUpperInfoOpen] = useState(false)

  const search = useSelector((state) => state.search.search)
  const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
  const dispatch = useDispatch()
  const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)

  useEffect(() => {
    if (data) {
      // setAllItems(data)
      dispatch(addAllItems([...data]))
    }
  }, [data])

  const handleChange = (event) => {
    const newValue = event.target.value
    // Проверяем, что введенное значение является числом
    if (!isNaN(newValue)) {
      dispatch(setCartElemQuantityValue({ value: newValue, elem: currentUpperElem }))
      dispatch(setElemQuantityValue({ value: newValue, elem: currentUpperElem }))
    }
  }

  const handleMouseLeave = (event) => {
    console.log('leave')
    if (true) {
      dispatch(
        setCartElemQuantityValue({ value: allItemsCart.filter((items) => items._id === currentUpperElem._id)[0].quantity, elem: currentUpperElem }),
      )
      dispatch(
        setElemQuantityValue({ value: allItemsCart.filter((items) => items._id === currentUpperElem._id)[0].quantity, elem: currentUpperElem }),
      )
    }
  }

  const allItemsSearch = useMemo(() => {
    if (search !== '') {
      return allItems.filter((elem) => {
        try {
          return (
            String(elem.name).toLowerCase().includes(search.toLowerCase()) ||
            String(elem.sku).toLowerCase().includes(search.toLowerCase()) ||
            String(elem.category).toLowerCase().includes(search.toLowerCase()) ||
            String(elem.proveedor).toLowerCase().includes(search.toLowerCase())
          )
        } catch (e) {
          return false
        }
      })
    } else {
      return allItems
    }
  }, [search, allItems])

  const randOne = useMemo(() => {
    if (currentUpperElem) {
      try {
        return Math.floor(1 + Math.random() * (allItems.length + 1 - 1))
      } catch (e) {
        return 2
      }
    } else {
      return 2
    }
  }, [currentUpperElem])
  const randTwo = useMemo(() => {
    if (currentUpperElem) {
      try {
        return Math.floor(1 + Math.random() * (allItems.length + 1 - 1))
      } catch (e) {
        return 2
      }
    } else {
      return 2
    }
  }, [currentUpperElem])
  const randThree = useMemo(() => {
    if (currentUpperElem) {
      try {
        return Math.floor(1 + Math.random() * (allItems.length + 1 - 1))
      } catch (e) {
        return 2
      }
    } else {
      return 2
    }
  }, [currentUpperElem])
  return isLoading ? (
    <CircularProgress color='success' />
  ) : (
    <div className='itemsCard'>
      {allItemsSearch.map((elem, index) => {
        // console.log(elem.enabled)
        if (index < 10) {
          return (
            <UpdatedItemDefMarket
              key={elem._id}
              currentUpperElem={currentUpperElem}
              setUpperInfoOpen={setUpperInfoOpen}
              setCurrentUpperElem={setCurrentUpperElem}
              elem={elem}
            />
          )
        }
      })}

      <div
        className={`upperInfo ${upperInfoOpen ? 'upperInfoOpenAnim' : 'upperInfoOpenCloseAnim'}`}
        style={{ margin: '0px auto', width: '65%', left: '50%', transform: 'translate(-50%, 0)', zIndex: '102' }}
      >
        <div className='upperInfoCloseButton' onClick={() => setUpperInfoOpen(false)}>
          <HiPlus className='buttonMoreIcon flip' />
        </div>
        <div className='upperInfoImg'>
          {allItems.findIndex((items) => items._id === currentUpperElem._id) >= 1 && (
            <span
              className='arrowLeftImage'
              onClick={() => {
                let ind = allItems.findIndex((items) => items._id === currentUpperElem._id)
                setCurrentUpperElem(allItems[ind - 1])
              }}
            >
              <MdArrowBackIos />
            </span>
          )}
          <img src={currentUpperElem?.img} alt='' />
          {allItems.findIndex((items) => items._id === currentUpperElem._id) < allItems.length - 1 && (
            <span
              className='arrowRightImage'
              onClick={() => {
                let ind = allItems.findIndex((items) => items._id === currentUpperElem._id)
                setCurrentUpperElem(allItems[ind + 1])
              }}
            >
              <MdArrowForwardIos />
            </span>
          )}
        </div>
        <div className='upperInfoName'>
          {currentUpperElem.name}
          <span>{currentUpperElem.unit}</span>
        </div>
        <div className='upperInfoBlocks'>
          {
            <div
              className='upperInfoImg'
              onClick={() => {
                setCurrentUpperElem(allItems[randOne])
              }}
            >
              <img src={allItems[randOne]?.img} alt='' />
            </div>
          }
          {
            <div
              className='upperInfoImg'
              onClick={() => {
                setCurrentUpperElem(allItems[randTwo])
              }}
            >
              <img src={allItems[randTwo]?.img} alt='' />
            </div>
          }
          {
            <div
              className='upperInfoImg'
              onClick={() => {
                setCurrentUpperElem(allItems[randThree])
              }}
            >
              <img src={allItems[randThree]?.img} alt='' />
            </div>
          }
        </div>
        <div className='upperInfoTexts'>
          <div>{currentUpperElem.desc}</div>
          <div>{currentUpperElem.sku}</div>
          <div>text</div>
        </div>
        <div
          className={`upperInfoPriceAndAdd ${upperInfoOpen ? 'upperInfoOpenAnimBottomElem' : 'upperInfoOpenCloseAnimBottomElem'}`}
          style={{ width: '100%', bottom: '0px', position: 'absolute', background: '#FFF', display: upperInfoOpen ? 'flex' : 'none' }}
        >
          <div className='upperInfoPrice'>
            <div className='upperInfoName'>{currentUpperElem.name}</div>
            {parseFloat(currentUpperElem.marketPriceCP).toFixed(2) != 'NaN' ? parseFloat(currentUpperElem.marketPriceCP).toFixed(2) : 0}€
          </div>
          <div style={{ width: '200px', display: upperInfoOpen ? 'flex' : 'none' }}>
            {!allItemsCart.find((items) => {
              return items._id === currentUpperElem._id
            }) ? (
              <div
                className='upperInfoAddToCart'
                style={{
                  background: allItemsCart.find((items) => items._id === currentUpperElem._id) ? '#E8E8E8' : '#5FC56E',
                  color: allItemsCart.find((items) => items._id === currentUpperElem._id) ? '#4c4c4c' : '#FFFFFF',
                }}
                onClick={() => {
                  dispatch(setElemQuantityValue({ value: 1, elem: currentUpperElem }))
                  dispatch(setAllItemsCart({ ...currentUpperElem, quantity: currentUpperElem.quantity }))
                }}
              >
                <span style={{ padding: '5px' }}>Add to Cart</span>
              </div>
            ) : (
              <div className='cardElemChangeDefMarket' onClick={(e) => e.stopPropagation()}>
                <FiMinus
                  onClick={(e) => {
                    let cr = allItemsCart.filter((items) => items._id === currentUpperElem._id)[0]

                    dispatch(setCartElemQuantityDecrement(cr))
                    dispatch(setElemQuantityDecrement(cr))
                    if (parseInt(cr.quantity) <= 1) {
                      dispatch(deleteCartElem(cr))
                    }
                  }}
                />
                <div>
                  <input
                    type='number'
                    style={{ textAlign: 'center' }}
                    onChange={handleChange}
                    onBlur={handleMouseLeave}
                    value={allItems.filter((items) => items._id === currentUpperElem._id)[0].quantity}
                  />
                </div>
                <FiPlus
                  onClick={() => {
                    dispatch(setCartElemQuantityIncrement(currentUpperElem))
                    dispatch(setElemQuantityIncrement(currentUpperElem))
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsCard
