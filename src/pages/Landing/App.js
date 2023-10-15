import React, { useEffect } from 'react'
import './styles/App.scss'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addAllItems } from './features/allItems'
import fk from '../../assets/av.svg'
import { addAllOrders } from '../Admin/features/allOrders'
import { setUserAcc, setRememberData } from './features/userAcc'
import { addallContacts } from '../Admin/features/allContacts'
import { Route, Routes } from 'react-router-dom'
import Desktop from './Desktop/Desktop'
import Mobile from './Mobile/Mobile'
const tg = window.Telegram.WebApp

function LandingApp() {
  tg.isClosingConfirmationEnabled = true
  tg.onEvent('popupClosed', () => console.log('popup closed'))
  //   const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
  //   const frstWin = useSelector((state) => state.frstWin.frstWin)
  //   const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

  //   const allContacts = useSelector((state) => state.allContacts.allContacts)

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900)
  //   const [isOpenCart, setIsOpenCart] = React.useState(false)
  //   const [isOpenFilters, setIsOpenFilters] = React.useState(false)
  //   const [modalInfoActive, setModalInfoActive] = React.useState(false)

  const [regModalOpen, setRegModalOpen] = React.useState(false)
  //   const [profileOpen, setProfileOpen] = React.useState(false)
  //   const [personalDataMobile, setPersonalDataMobile] = React.useState(true)
  //   const [ordersMobile, setOrdersMobile] = React.useState(false)
  //   const [sideMenuMobile, setSideMenuMobile] = React.useState(true)

  //   const userAcc = useSelector((state) => state.userAcc.userAcc)

  const dispatch = useDispatch()

  const acceptLogin = async (numberPhone, password) => {
    let informData = {
      phone: numberPhone,
      password: password,
    }
    await axios
      .post('https://tpomobi.shop/acceptLoginAcc', { data: informData })
      .then(async function (response) {
        console.log(typeof response.data)

        if (typeof response.data == 'string') {
          // api.warning({
          //     message: `Not Found.`,
          //     placement: 'top',
          // });
        } else {
          // api.success({
          //     message: `Welcome.`,
          //     placement: 'top',
          // });
          // localStorage.setItem('userAccPassword', response.data.password)
          // localStorage.setItem('userAccEmail', response.data.email)
          // localStorage.setItem('userAccRemember', check)
          dispatch(setUserAcc(response.data))
          await axios
            .post('https://tpomobi.shop/updateLastVisitContactAdmin', { data: { ...response.data, lastVisit: Date.now() } })
            .then(function (response) {
              console.log(response.data)
            })

          setRegModalOpen(false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  React.useEffect(() => {
    try {
      console.log(localStorage.getItem('userAccRemember'))
      console.log(localStorage.getItem('userAccRemember') == 'true')
      if (localStorage.getItem('userAccRemember') == 'true') {
        acceptLogin(localStorage.getItem('userAccNumberPhone'), localStorage.getItem('userAccPassword'))
      }
    } catch (e) {}
  }, [])
  React.useEffect(() => {
    axios.get('https://tpomobi.shop/getContactsAdmin').then(async (resp) => {
      console.log(resp.data)
      dispatch(addallContacts(resp.data))
      if (tg.initDataUnsafe.user) {
        const findItem = resp.data.find((el) => el.password == tg.initDataUnsafe.user.id)
        if (findItem) {
          dispatch(setUserAcc({ ...findItem }))
          await axios
            .post('https://tpomobi.shop/updateLastVisitContactAdmin', { data: { ...findItem, lastVisit: Date.now() } })
            .then(function (response) {
              console.log(response.data)
            })

          setRegModalOpen(false)
        }
      }
    })
  }, [])
  React.useEffect(() => {
    axios.get('https://tpomobi.shop/getOrdersAdmin').then((resp) => {
      dispatch(addAllOrders(resp.data.reverse()))
    })
  }, [])

  React.useEffect(() => {
    axios.get('https://tpomobi.shop/getProductsAdmin').then((resp) => {
      let enabledItemsArray = resp.data.filter((elem) => elem.enabled)
      enabledItemsArray.map((elem) => {
        elem.img = elem.img ? elem.img : fk
        return elem
      })
      dispatch(addAllItems(enabledItemsArray))
      console.log(resp.data)
    })
  }, [])

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerWidth])

  return (
    <div className='LandingApp'>
      <Routes>
        <Route path='/site' element={<Desktop />} />
        <Route path='/mobile' element={<Mobile />} />
      </Routes>
    </div>
  )
}

export default LandingApp
