import React, { useEffect, useMemo, useState } from 'react'
import '../../../Mobile/Components/Menu/BodyBar.scss'
import MenuButton from './MenuButton'
import Calend from '../Calendar/Calend'
import Language from '../../../components/Language/Language'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentMenuButton } from '../../../features/menuSlice'
import LastOrderModal from '../Modals/LastOrderModal'
import FavoriteElemModal from '../../../Mobile/Components/ModalWindow/FavoriteElemModal'
import { setSearch } from '../../../features/searchItems'
import { AiFillHeart } from 'react-icons/ai'
import { addItem, setArr } from '../../../../Admin/features/allFavoritCategory'
import FilterSideBar from '../FilterSideBar/FilterSideBar'

const MenuBar = () => {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.menu.currentMenuButton)
  const [lastOrderModal, setLastOrderModal] = useState(false)
  const samplesCategory = useSelector((state) => state.allFavoritCategory.allFavoritCategory)

  const [favoriteElemModal, setFavoriteElemModal] = useState(false)
  const allItems = useSelector((state) => state.allItems.allItems)
  const search = useSelector((state) => state.search.search)

  const allItemsTags = useMemo(() => {
    let arrT = allItems.map((elem) => elem.category)

    let arrTBuff = []
    arrT = arrT.map((el) => {
      if (Array.isArray(el)) {
        return el.join()
      } else {
        return el
      }
    })
    arrT.map((el) => {
      if (el.includes(',')) {
        el.split(',').forEach((it) => {
          if (it) {
            arrTBuff.push(it)
          }
        })
      } else {
        arrTBuff.push(el)
      }
      return el
    })
    // arrT = arrT.flatMap(arr => {
    //     try {
    //         if(Array.isArray(arr)){
    //             return arr[0].split(', ')
    //         }else{
    //             return arr.split(', ')
    //         }
    //     }catch (e){}
    // });
    return [...new Set(arrTBuff)]
  }, [allItems])

  useEffect(() => {
    if (allItems) {
      console.log(allItems, 'allItems')
    }
  }, [allItems])

  return (
    <div className='menuBar'>
      <FilterSideBar />

      <MenuButton title='Home' icon={1} />
      <MenuButton title='Samples' icon={9} />
      <div className='SamplesSubButtonBack'>
        {current == 9 && (
          <div className='SamplesSubButton' onClick={() => setFavoriteElemModal((prev) => !prev)}>
            · My favorite's
          </div>
        )}
        {current == 9 && (
          <div className='SamplesSubButton' onClick={() => setLastOrderModal((prev) => !prev)}>
            · My last order
          </div>
        )}
        {current == 9 &&
          samplesCategory.length > 0 &&
          samplesCategory.map((elem, index) => {
            return (
              <div key={index} className='SamplesSubButton' onClick={() => dispatch(setSearch(elem))}>
                <span
                  onClick={() => {
                    if (samplesCategory.includes(elem)) {
                      let ar = samplesCategory.filter((el) => el != elem)
                      dispatch(setArr(ar))
                    } else {
                      dispatch(addItem(elem))
                    }
                  }}
                >
                  <AiFillHeart />
                </span>{' '}
                {elem}
              </div>
            )
          })}
      </div>
      {/*<MenuButton title="Markets" icon={2}/>*/}
      <MenuButton title='Category' icon={3} />
      {current == 3 && (
        <div className='SamplesSubButtonBack' style={{ height: '300px', overflow: 'auto' }}>
          {allItemsTags.map((elem) => {
            return (
              <div className='SamplesSubButton' onClick={() => dispatch(setSearch(elem))}>
                <span
                  style={{ color: samplesCategory.includes(elem) && 'red' }}
                  onClick={() => {
                    if (samplesCategory.includes(elem)) {
                      let ar = samplesCategory.filter((el) => el != elem)
                      dispatch(setArr(ar))
                    } else {
                      dispatch(addItem(elem))
                    }
                  }}
                >
                  <AiFillHeart />
                </span>{' '}
                {elem}
              </div>
            )
          })}
        </div>
      )}
      <MenuButton title='Language' icon={4} />
      {current == 4 && <Language />}
      {lastOrderModal && <LastOrderModal setLastOrderModal={setLastOrderModal} />}
      {favoriteElemModal && <FavoriteElemModal setFavoriteElemModal={setFavoriteElemModal} />}
    </div>
  )
}

export default MenuBar
