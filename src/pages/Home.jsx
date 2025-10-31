import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Filters from "../components/Filters";
import TVList from "../components/TVList";
import Pagination from "../components/Pagination";
import WatchlistPanel from "../components/WatchlistPanel";

export default function Home() {
  const { state, dispatch, types } = useOutletContext();
  const { items, filters, page, pageSize, loading, error } = state;

  const filtered = useMemo(() => {
    return items.filter(s => {
      const rating = s.rating?.average ?? 0;
      const okGenre = filters.genre ? s.genres?.includes(filters.genre) : true;
      const okLang = filters.language ? s.language === filters.language : true;
      const okRate = rating >= (Number(filters.minRating) || 0);
      return okGenre && okLang && okRate;
    });
  }, [items, filters]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  return (
    <div className="grid">
      <div>
        <div className="toolbar">
          <SearchBox
            query={state.searchText}
            onChange={(evt) => {
              if (evt.type === "text") {
                dispatch({ type: types.SET_SEARCH_TEXT, payload: evt.value });
              } else if (evt.type === "submit") {
                dispatch({ type: types.SET_QUERY, payload: state.searchText.trim() });
              }
            }}
          />
          <Filters
            filters={filters}
            onChange={(f) => dispatch({ type: types.SET_FILTERS, payload: f })}
            onPageSize={(n) => dispatch({ type: types.SET_PAGE_SIZE, payload: n })}
          />
          <button className="reset" onClick={()=>{
            
            dispatch({ type: types.SET_SEARCH_TEXT, payload: "" });
            dispatch({ type: types.SET_QUERY, payload: "" });
            dispatch({ type: types.SET_FILTERS, payload: { genre:"", language:"", minRating:0 }});
            dispatch({ type: types.SET_BOOT, payload: true });
          }}>Sıfırla</button>
        </div>

        {loading && <div className="spinner">Yükleniyor…</div>}
        {error && <div className="error">Hata: {error} <button className="btn" onClick={()=>dispatch({ type: types.SET_BOOT, payload: true })}>Tekrar dene</button></div>}
        {!loading && !error && current.length === 0 && <div className="spinner">Sonuç yok.</div>}

        {!loading && !error && current.length > 0 && (
          <>
            <TVList shows={current} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPage={(p) => dispatch({ type: types.SET_PAGE, payload: p })}
            />
          </>
        )}
      </div>

      <WatchlistPanel />
    </div>
  );
}