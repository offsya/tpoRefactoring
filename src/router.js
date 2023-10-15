import {
  PushExcel_ROUTE,
  Shop_ROUTE,
  Mercabarna_ROUTE,
  Landing_ROUTE,
  BotTimer_ROUTE,
  BotTimerAdmin_ROUTE,
  Admin_ROUTE,
  SHOP_MOBILE,
} from './utils/consts'
import PushExcel from './pages/PushExcel'
import Shop from './pages/Shop'
import Mercabarna from './pages/Mercabarna'
import Landing from './pages/Landing'
import BotTimer from './pages/BotTimer'
import BotTimerAdmin from './pages/BotTimerAdmin'
import Admin from './pages/Admin/Admin'
import LandingApp from './pages/Landing/App'
import Desktop from './pages/Landing/Desktop/Desktop'
import Mobile from './pages/Landing/Mobile/Mobile'

export const publicRoutes = [
  {
    path: PushExcel_ROUTE,
    Component: PushExcel,
  },
  {
    path: Shop_ROUTE,
    Component: Shop,
  },
  {
    path: Mercabarna_ROUTE,
    Component: Mercabarna,
  },
  {
    path: Landing_ROUTE,
    Component: Desktop,
  },
  {
    path: BotTimer_ROUTE,
    Component: BotTimer,
  },
  {
    path: BotTimerAdmin_ROUTE,
    Component: BotTimerAdmin,
  },
  {
    path: Admin_ROUTE,
    Component: Admin,
  },
  {
    path: SHOP_MOBILE,
    Component: Mobile,
  },
]
