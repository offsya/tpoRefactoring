import React, { useEffect, useMemo, useState } from 'react'
import './UpdatedItemDefMarket.scss'
import { HiPlus } from 'react-icons/hi'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCartElem,
  setAllItemsCart,
  setCartElemQuantityDecrement,
  setCartElemQuantityIncrement,
  setCartElemQuantityValue,
  setCartElemCurrentUnit,
} from '../../../../../features/allCartItems'
import { setFavoriteItems, deleteFavoriteItems } from '../../../../../features/FavoriteItems'
import { setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue, setElemCurrentUnit } from '../../../../../features/allItems'

import { FiMinus, FiPlus } from 'react-icons/fi'
import { AiOutlineStar } from 'react-icons/ai'
import { Checkbox, Select } from 'antd'
import { allContactsSlice } from '../../../../../../Admin/features/allContacts'
import ItemInfoModalWindow from '../../../../../Mobile/Components/ItemInfoModal/ItemInfoModalWindow'
import imager from '../../../../../../../assets/Notification.svg'
const UpdatedItemDefMarket = ({ elem, setUpperInfoOpen, setCurrentUpperElem }) => {
  const dispatch = useDispatch()
  const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
  const allItems = useSelector((state) => state.allItems.allItems)
  const [modalInfoActive, setModalInfoActive] = useState(false)

  const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
  const favoriteItems = useSelector((state) => state.favoriteItems.favoriteItems)
  const [checkBoxChecker, setCheckBoxChecker] = useState(false)

  const unitsArray = useMemo(() => {
    return allItems.map((elem) => {
      return elem.unit
    })
  }, [allItems])
  let unitSet = new Set(unitsArray)

  //
  // const OptionsList = useMemo(()=>{
  //     console.log(elem)
  //     if(Array.isArray(elem.unit)){
  //         console.log(elem.unit)
  //         let options=[]
  //         for (let i = 0; i < elem.unit.length; i++) {
  //             console.log(elem.unit[i])
  //             options.push({
  //                 value: elem.unit[i],
  //                 label: elem.unit[i],
  //             });
  //         }
  //         console.log(options)
  //         return options
  //     }else{
  //         let options=[]
  //         console.log("++++++++++"+elem.unit)
  //         for (let i = 0; i < elem.unit.split(",").length; i++) {
  //             options.push({
  //                 value: elem.unit.split(",")[i],
  //                 label: elem.unit.split(",")[i],
  //             });
  //         }
  //         console.log(options)
  //         return options
  //     }
  // }, [])
  const OptionsList = (elem) => {
    let options = []

    if (Array.isArray(elem.unit)) {
      console.log(elem.unit)
      for (let i = 0; i < elem.unit.length; i++) {
        console.log(elem.unit[i])
        options.push({
          value: elem.unit[i],
          label: elem.unit[i],
        })
      }
      console.log(options)
      return options
    } else {
      for (let i = 0; i < elem.unit.split(',').length; i++) {
        options.push({
          value: elem.unit.split(',')[i],
          label: elem.unit.split(',')[i],
        })
      }
      console.log(options)
      return options
    }
  }
  const handleChange = (event) => {
    let newValue = event.target.value

    // Проверяем, что введенное значение является числом
    if (!isNaN(newValue)) {
      dispatch(setCartElemQuantityValue({ value: newValue, elem: elem, chooseWeeks: chooseWeeks }))

      dispatch(setElemQuantityValue({ value: newValue, elem: elem, chooseWeeks: chooseWeeks }))
    }
  }

  const handleChangeCurrentUnit = (newUnit) => {
    console.log(newUnit)
    const newValue = newUnit
    if (isNaN(newValue)) {
      dispatch(setCartElemCurrentUnit({ value: newValue, elem: elem, chooseWeeks: chooseWeeks }))

      dispatch(setElemCurrentUnit({ value: newValue, elem: elem, chooseWeeks: chooseWeeks }))
    }
  }

  const handleMouseLeave = (event) => {
    console.log('leave')
    if (true) {
      dispatch(setCartElemQuantityValue({ value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks }))
      dispatch(setElemQuantityValue({ value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks }))
    }
  }
  return (
    <div className='UpdatedItemCard'>
      <ItemInfoModalWindow active={modalInfoActive} setActive={setModalInfoActive} />
      <div className='UpdatedTopRowImgFavoritePC'>
        {false && (
          <div className='UpdatedSpoSign'>
            <span>SPO</span>
          </div>
        )}

        <div
          className='UpdatedFavoriteIconV2PC'
          onClick={(e) => {
            dispatch(setFavoriteItems(elem))
            e.stopPropagation()
            console.log(elem.unit)
          }}
        >
          {favoriteItems.find((items) => items._id === elem._id) ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </div>

      <div className='UpdatedImgCardBackgroundPC'>
        <img className='UpdatedImgCardPC' src={elem.img} alt='tomato' />
      </div>
      <div className='UpdatedItemInfo'>
        <div
          className='UpdatedNameCard'
          onClick={() => {
            setUpperInfoOpen(true)
            setCurrentUpperElem(elem)
          }}
        >
          {elem?.name && elem.name.length > 15 ? (
            <div>
              {elem.name.slice(0, 15)}
              <span style={{ color: '#5FC56E' }}> more...</span>
            </div>
          ) : (
            <div>
              {elem.name} <span style={{ color: '#5FC56E' }}> more...</span>
            </div>
          )}
        </div>
      </div>
      <div
        className='UpdatedOtherInfo'
        onClick={(e) => {
          setModalInfoActive(true)
          e.stopPropagation()
        }}
      >
        {elem.weight && (
          <div className='UpdatedProductUnit'>
            <span>{elem.weight + '' + elem.LtKg}</span>
          </div>
        )}
        {elem.stock == '1' && !elem.dias && (
          <div className='UpdatedStockOrNot'>
            <span>Stock ✔</span>
          </div>
        )}
        {elem.stock == '0' && !elem.dias && (
          <div className='UpdatedStockOrNot' style={{ background: '#F5F4F2', border: '1px solid #FF725E' }}>
            <span style={{ color: '#FF725E' }}>Stock ×</span>
          </div>
        )}

        {elem.dias && (
          <div className='UpdatedDaysLeft'>
            <span>{elem.dias} days</span>
          </div>
        )}
        {(elem.stock == '2' || (elem?.stock == undefined && !elem.dias)) && (
          <div className='UpdatedTBC'>
            <span>TBC</span>
          </div>
        )}
      </div>
      <div className='UpdatedPriceAndButton'>
        {!allItemsCart.find((items) => {
          return items._id === elem._id
        }) ? (
          <div className='UpdatedMiddlePriceCurrent'>
            {parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP)).toFixed(2) : 0.0}€/
            <span className='UpdatedMiddlePriceCurrentKg'>{Array.isArray(elem?.unit) ? elem?.unit[0] : elem.unit}</span>
          </div>
        ) : (
          <div className='UpdatedCardElemChangeDefMarket' onClick={(e) => e.stopPropagation()}>
            <FiMinus
              onClick={(e) => {
                dispatch(setCartElemQuantityDecrement(elem))
                dispatch(setElemQuantityDecrement(elem))
                if (parseInt(elem.quantity) <= 1) {
                  dispatch(deleteCartElem(elem))
                }
              }}
            />
            <div className='inputUnits' style={{ display: 'flex', justifyContent: !checkBoxChecker ? 'center' : 'end' }}>
              <input
                style={{
                  borderRight: '1px solid grey',
                  marginRight: !checkBoxChecker ? '5px' : '0px',
                  textAlign: !checkBoxChecker ? 'center' : 'center',
                  width: (parseFloat(elem.quantity).toFixed(2).toString().length + 1) * 8 + 'px',
                }}
                type='number'
                onChange={handleChange}
                onBlur={handleMouseLeave}
                value={elem.quantity}
              />
              {!allItemsCart.find((items) => {
                return items._id === elem._id
              }) ? (
                ' '
              ) : Array.isArray(elem.unit) || elem.unit.includes(',') ? (
                <div className='UnitsSetelect'>
                  {!checkBoxChecker && (
                    <Select
                      style={{
                        padding: 0,
                        width: 68,
                      }}
                      onChange={(newUnit) => handleChangeCurrentUnit(newUnit)}
                      options={OptionsList(elem)}
                      value={elem?.currentUnit || OptionsList(elem)[0]}
                    />
                  )}
                </div>
              ) : (
                <div>{elem.unit}</div>
              )}
            </div>
            <FiPlus
              onClick={() => {
                dispatch(setCartElemQuantityIncrement(elem))
                dispatch(setElemQuantityIncrement(elem))
              }}
            />
          </div>
        )}
        {!allItemsCart.find((items) => {
          return items._id === elem._id
        }) && (
          <div
            className={`UpdatedButtonMore ${allItemsCart.find((items) => items._id === elem._id) || elem.stock == 0 ? 'flip' : 'flipBack'}`}
            onClick={(e) => {
              e.stopPropagation()
              if (elem.stock != '0' || elem.dias) {
                dispatch(setAllItemsCart(elem))
                dispatch(setElemQuantityValue({ value: 1, elem: elem, chooseWeeks: chooseWeeks }))
              }
            }}
          >
            {elem.stock != '0' ? <HiPlus className='buttonMoreIcon' /> : <img style={{ width: '16px', height: '20px' }} src={imager} alt='' />}
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdatedItemDefMarket
