import { Link, useOutletContext } from "react-router-dom";

export default function TVCard({ show }) {
  const { dispatch, types, state } = useOutletContext();
  const inList = state.watchlist.some(x => x.id === show.id);
  const img = show.image?.medium || show.image?.original || null;

  return (
    <div className="card">
      {img ? (
        <img src={img} alt={show.name}/>
      ) : (
        <div style={{height:190, display:"grid", placeItems:"center", background:"#0f172a10"}}>Poster Yok</div>
      )}
      <div className="body">
        <h3>{show.name}</h3>
        <div className="chips">
          {show.genres?.slice(0,3).map(g=> <span key={g} className="badge">{g}</span>)}
          {show.language && <span className="badge">🌐 {show.language}</span>}
          <span className="rating">⭐ {show.rating?.average ?? "N/A"}</span>
        </div>
        <div className="summary" dangerouslySetInnerHTML={{ __html: show.summary || "" }} />
        <div className="actions">
          <Link to={`/show/${show.id}`}><button className="btn">Detay</button></Link>
          {!inList ? (
            <button className="btn primary" onClick={()=>dispatch({ type: types.ADD_WATCHLIST, payload: { id: show.id, name: show.name } })}>
              Gösterime Ekle
            </button>
          ) : (
            <button className="btn" onClick={()=>dispatch({ type: types.REMOVE_WATCHLIST, payload: show.id })}>
              Çıkar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}