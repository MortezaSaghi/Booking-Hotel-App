
import { Toaster } from 'react-hot-toast'
import './App.css'
import Header from './components/Header/Header'
import LocationList from './components/Locationlist/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import HotelProvider from './components/Context/HotelProvider'
import SingelHotel from './components/SingelHotel/SingelHotel'

function App() {

  return (
    <HotelProvider>
      <Toaster/>
      <Header/>
      <Routes>
        <Route path="/" element={<LocationList/>} />
        <Route path='/hotels' element={<AppLayout/>}>
          <Route index element={<Hotels/>}/>
          <Route path=':id' element={<SingelHotel/>}/>
        </Route>
      </Routes>
      
    </HotelProvider>
  )
}

export default App
