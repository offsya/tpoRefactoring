import React from 'react'
import SearchBarMobileV2 from './Components/SeacrhBar/SearchBarMobileV2'
import OptionsBarMobile from './Components/OptionBar/OptionsBarMobile'
import CartMobile from './Components/Cart/CartMobile'
import ItemsCardMobile from './Components/ItemCard/ItemsCardMobile'
import ItemInfoModalWindow from './Components/ItemInfoModal/ItemInfoModalWindow'
import RegMobile from './Components/RegAndLogin/RegMobile'
import SearchBarFirstMobile from './Components/SeacrhBar/SearchBarFirstMobile'
import FirstWindowMobile from './Components/FirstWindow/FirstWindowMobile'
import SideMenuMobile from './Components/SideMenu/SideMenuMobile'
import BarWithLogoAndBack from './Components/BarWithLogoAndBack/BarWithLogoAndBack'
import ProfileMobile from './Components/Profile/PersonalData/ProfileMobile'
import HistoryinordersMobile from './Components/Profile/HistoryOfOrders/HistoryinordersMobile'
import FiltersModalWindow from './Components/FiltersModal/FiltersModalWindow'
import { useSelector } from 'react-redux'

export default function Mobile() {
  const [regModalOpen, setRegModalOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [personalDataMobile, setPersonalDataMobile] = React.useState(true)
  const [ordersMobile, setOrdersMobile] = React.useState(false)
  const [sideMenuMobile, setSideMenuMobile] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900)
  const [isOpenCart, setIsOpenCart] = React.useState(false)
  const [isOpenFilters, setIsOpenFilters] = React.useState(false)
  const [modalInfoActive, setModalInfoActive] = React.useState(false)

  const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
  const userAcc = useSelector((state) => state.userAcc.userAcc)

  return (
    <div>
      {!profileOpen ? (
        <div>
          {true ? ( // !frstWin ?
            <div>
              {/*<SearchBarMobile setRegModalOpen={setRegModalOpen} setIsMobile={setIsMobile}  isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} setProfileOpen={setProfileOpen}/>*/}

              <SearchBarMobileV2
                setRegModalOpen={setRegModalOpen}
                setIsMobile={setIsMobile}
                isOpenCart={isOpenCart}
                setIsOpenCart={setIsOpenCart}
                setProfileOpen={setProfileOpen}
              />
              {isOpenCart ? (
                <div>
                  {seeOptions ? (
                    <OptionsBarMobile
                      setRegModalOpen={setRegModalOpen}
                      setIsMobile={setIsMobile}
                      isOpenCart={isOpenCart}
                      setIsOpenCart={setIsOpenCart}
                      setProfileOpen={setProfileOpen}
                    />
                  ) : (
                    <CartMobile setRegModalOpen={setRegModalOpen} />
                  )}
                </div>
              ) : (
                <div>
                  <ItemsCardMobile setIsOpenFilters={setIsOpenFilters} setModalInfoActive={setModalInfoActive} />
                  <ItemInfoModalWindow active={modalInfoActive} setActive={setModalInfoActive} />
                  {isOpenFilters && <FiltersModalWindow setIsOpenFilters={setIsOpenFilters} />}
                </div>
              )}
              {regModalOpen && !userAcc.phone && (
                <RegMobile
                  setProfileOpen={setProfileOpen}
                  setRegModalOpen={setRegModalOpen}
                  setIsMobile={setIsMobile}
                  isOpenCart={isOpenCart}
                  setIsOpenCart={setIsOpenCart}
                />
              )}
            </div>
          ) : (
            <div>
              <div>
                {/*<FirstWindowV2Mobile/>*/}
                <SearchBarFirstMobile />
                <FirstWindowMobile />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#FBFBFB', overflow: 'hidden' }}>
          {sideMenuMobile && (
            <SideMenuMobile
              setSideMenuMobile={setSideMenuMobile}
              setPersonalDataMobile={setPersonalDataMobile}
              setOrdersMobile={setOrdersMobile}
              setProfileOpen={setProfileOpen}
            />
          )}
          {!sideMenuMobile && (
            <BarWithLogoAndBack
              setSideMenuMobile={setSideMenuMobile}
              setPersonalDataMobile={setPersonalDataMobile}
              setOrdersMobile={setOrdersMobile}
            />
          )}
          {personalDataMobile && <ProfileMobile setSideMenuMobile={setSideMenuMobile} />}
          {ordersMobile && <HistoryinordersMobile setSideMenuMobile={setSideMenuMobile} />}

          {/*{<TotalProfitMobile/>}*/}
        </div>
      )}
    </div>
  )
}
