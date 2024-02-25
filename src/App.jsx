import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/Locationlist/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/Context/HotelProvider";
import SingelHotel from "./components/SingelHotel/SingelHotel";
import BookMarksLayout from "./components/BookMarksLayout/BookMarksLayout";
import BookmarkProvider from "./components/Context/BookmarkProvider";
import BookmarkList from "./components/BookmarkList/BookmarkList";
import SingelBookmark from "./components/SingelBookmark/SingelBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";

function App() {
  return (
    <BookmarkProvider>
      <HotelProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingelHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookMarksLayout />}>
            <Route index element={<BookmarkList/>} />
            <Route path=":id" element={<SingelBookmark/>} />
            <Route path="add" element={<AddNewBookmark/>} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default App;
