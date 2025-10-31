import { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { searchShows } from "./api/tvmaze";

const initialState = {
  
  searchText: "",
  
  query: "",
  filters: { genre: "", language: "", minRating: 0 },
  page: 1,
  pageSize: 6,
  items: [],
  loading: false,
  error: null,
  watchlist: [],
  boot: true, 
};

export const types = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  SET_QUERY: "SET_QUERY",
  SET_FILTERS: "SET_FILTERS",
  SET_WATCHLIST: "SET_WATCHLIST",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  ADD_WATCHLIST: "ADD_WATCHLIST",
  REMOVE_WATCHLIST: "REMOVE_WATCHLIST",
  CLEAR_WATCHLIST: "CLEAR_WATCHLIST",
  SET_PAGE: "SET_PAGE",
  SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
  SET_BOOT: "SET_BOOT",
};

function reducer(state, action) {
  switch (action.type) {
    case types.FETCH_INIT:       return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESS:    return { ...state, loading: false, items: action.payload };
    case types.FETCH_FAILURE:    return { ...state, loading: false, error: action.payload };
    case types.SET_QUERY:        return { ...state, query: action.payload, page: 1 };
    case types.SET_SEARCH_TEXT:  return { ...state, searchText: action.payload };
    case types.SET_FILTERS:      return { ...state, filters: { ...state.filters, ...action.payload }, page: 1 };
    case types.SET_PAGE_SIZE:    return { ...state, pageSize: action.payload, page: 1 };
    case types.SET_PAGE:         return { ...state, page: action.payload };
    case types.SET_WATCHLIST:    return { ...state, watchlist: action.payload };
    case types.ADD_WATCHLIST:
      if (state.watchlist.find(x => x.id === action.payload.id)) return state;
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case types.REMOVE_WATCHLIST: return { ...state, watchlist: state.watchlist.filter(x => x.id !== action.payload) };
    case types.CLEAR_WATCHLIST:  return { ...state, watchlist: [] };
    case types.SET_BOOT:         return { ...state, boot: action.payload };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  useEffect(() => {
    if (!state.boot) return;
    let on = true;
    (async () => {
      dispatch({ type: types.FETCH_INIT });
      try {
        const queries = ["harry potter", "lord of the rings", "dark", "witcher", "game of thrones"];
        const results = await Promise.all(queries.map(q => searchShows(q)));
       
        const merged = [];
        const seen = new Set();
        results.forEach(({ data }) => {
          data.forEach(d => {
            const s = d.show;
            if (!seen.has(s.id)) { seen.add(s.id); merged.push(s); }
          });
        });
        if (!on) return;
        dispatch({ type: types.FETCH_SUCCESS, payload: merged });
        dispatch({ type: types.SET_BOOT, payload: false });
      } catch {
        if (!on) return;
        dispatch({ type: types.FETCH_FAILURE, payload: "Veri çekilemedi" });
        dispatch({ type: types.SET_BOOT, payload: false });
      }
    })();
    return () => { on = false; };
  }, [state.boot]);

  
  useEffect(() => {
    if (!state.query) return; 
    let on = true;
    (async () => {
      dispatch({ type: types.FETCH_INIT });
      try {
        const { data } = await searchShows(state.query);
        const normalized = data.map(d => d.show);
        if (!on) return;
        dispatch({ type: types.FETCH_SUCCESS, payload: normalized });
      } catch {
        if (!on) return;
        dispatch({ type: types.FETCH_FAILURE, payload: "Veri çekilemedi" });
      }
    })();
    return () => { on = false; };
  }, [state.query]);

  
  useEffect(() => {
    const raw = localStorage.getItem("watchlist");
    if (raw) dispatch({ type: types.SET_WATCHLIST, payload: JSON.parse(raw) });
  }, []);
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return <Outlet context={{ state, dispatch, types }} />;
}