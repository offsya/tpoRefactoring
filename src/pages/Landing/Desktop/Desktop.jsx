import React from 'react'
import OptionsSearchBar from './Components/Search/OptionsSearchBar'
import OptionsBar from './Components/Options/OptionsBarDefMarket'
import SearchBar from './Components/Search/SearchBar'
import { useSelector } from 'react-redux'
import BodyBar from './Components/BodyComponents/BodyBar'
import SearchBarFirst from './Components/Search/SearchBarFirst'
import FirstWindow from './Components/FirstWindow/FirstWindow'
import ProfileSearchBar from './Components/Search/ProfileSearchBar'
import ProfileBar from './Components/Profile/ProfileBar'
import RegModal from './Components/Auth/RegModal'

export default function Desktop() {
  const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
  const seeOptions = useSelector((state) => state.seeOptions.seeOptions)

  const [regModalOpen, setRegModalOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)

  return (
    <div>
      {!profileOpen ? (
        <div>
          {true ? ( // !frstWin ?
            <div>
              {chooseMarket == 1 ? (
                <div>
                  {seeOptions ? (
                    <div>
                      <OptionsSearchBar setRegModalOpen={setRegModalOpen} />
                      <OptionsBar />
                    </div>
                  ) : (
                    <div>
                      <SearchBar setProfileOpen={setProfileOpen} setRegModalOpen={setRegModalOpen} />
                      <BodyBar />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {seeOptions ? (
                    <div>
                      <OptionsSearchBar setRegModalOpen={setRegModalOpen} />
                      <OptionsBar />
                    </div>
                  ) : (
                    <div>
                      <SearchBar setRegModalOpen={setRegModalOpen} />
                      <BodyBar />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {/*<FirstWindow/>*/}
              <SearchBarFirst />
              <FirstWindow />
            </div>
          )}
        </div>
      ) : (
        <div>
          <ProfileSearchBar setProfileOpen={setProfileOpen} />
          <ProfileBar setProfileOpen={setProfileOpen} />
        </div>
      )}
      {regModalOpen && <RegModal setProfileOpen={setProfileOpen} setRegModalOpen={setRegModalOpen} />}
      {/*{regModalOpen && <ModalShadow setRegModalOpen={setRegModalOpen}/>}*/}
    </div>
  )
}
