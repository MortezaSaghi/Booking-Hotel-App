import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  isLoading: false,
  bookmarks: [],
  currentBookmark: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark:action.payload,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        currentBookmark:null,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

export default function BookmarkProvider({ children }) {
  // const [currentBookmark,setCurrentBookmark] = useState(null);
  // const [bookmarks,setBookmarks] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        toast.error(err.message);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in loading bookmarks",
        });
      }
    }
    fetchBookmarks();
  }, []);

  const createBookmark = async (newBookmark) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    // dispatch({ type: "bookmark/loaded", payload: null });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({
        type: "rejected",
        payload: "an Error accurred in fetching single bookmark.",
      });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        deleteBookmark,
        createBookmark,
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
