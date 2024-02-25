import {createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";


export default function BookmarkProvider({ children }) {
  const [currentBookmark,setCurrentBookmark] = useState(null);
  const [isLoadingCurrBookmark,setIsLoadingCurrBookmark] = useState(false);
  
  const { isLoading, data : bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id){
    setIsLoadingCurrBookmark(true);
    setCurrentBookmark(null)
    try {
        const {data} = await axios.get(`${BASE_URL}/bookmarks/${id}`)
        setCurrentBookmark(data);
        
    } catch (err) {
      toast.error(err.message);
      
    }finally{
      setIsLoadingCurrBookmark(false)
    }
  }

  return <BookmarkContext.Provider value={{isLoading , bookmarks ,getBookmark ,currentBookmark ,isLoadingCurrBookmark}}>{children}</BookmarkContext.Provider>;
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
