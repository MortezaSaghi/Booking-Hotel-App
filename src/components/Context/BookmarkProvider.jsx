import {createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";


export default function BookmarkProvider({ children }) {
  const [currentBookmark,setCurrentBookmark] = useState(null);
  const [bookmarks,setBookmarks] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    async function fetchBookmarks(){
      setIsLoading(true);
      try {
          const {data} = await axios.get(`${BASE_URL}/bookmarks`)
          setBookmarks(data);
          
      } catch (err) {
        toast.error(err.message);
        
      }finally{
        setIsLoading(false)
      }
    }
    fetchBookmarks();
  },[])
  
  const createBookmark = async (newBookmark) => {
    setIsLoading(true);
    // setCurrentBookmark(null)
    try {
        const {data} = await axios.post(`${BASE_URL}/bookmarks/`,newBookmark)
        setCurrentBookmark(data);
        setBookmarks(pre=>[...pre , data])
        
    } catch (err) {
      toast.error(err.message);
      
    }finally{
      setIsLoading(false)
    }
  }

  async function getBookmark(id){
    setIsLoading(true);
    setCurrentBookmark(null)
    try {
        const {data} = await axios.get(`${BASE_URL}/bookmarks/${id}`)
        setCurrentBookmark(data);
        
    } catch (err) {
      toast.error(err.message);
      
    }finally{
      setIsLoading(false)
    }
  }

  async function deleteBookmark(id){
    setIsLoading(true);
    try {
        const {data} = await axios.delete(`${BASE_URL}/bookmarks/${id}`)
        setBookmarks(pre=>pre.filter((item)=>item.id !== id));
        
    } catch (err) {
      toast.error(err.message);
      
    }finally{
      setIsLoading(false)
    }
  }

  return <BookmarkContext.Provider value={{deleteBookmark,createBookmark ,isLoading , bookmarks ,getBookmark ,currentBookmark }}>{children}</BookmarkContext.Provider>;
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
