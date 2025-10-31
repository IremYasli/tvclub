import { useOutletContext } from "react-router-dom";

export default function WatchlistPanel() {
  const { state, dispatch, types } = useOutletContext();
  return (
    <aside className="side">
      <h3>Gösterime Girecekler ({state.watchlist.length})</h3>
      {state.watchlist.length === 0 && <div className="empty">Listeye eklenmiş yapım yok.</div>}
      <ul>
        {state.watchlist.map(item=>(
          <li key={item.id}>
            <span className="kv">🎬 {item.name}</span>
            <button className="btn" onClick={()=>dispatch({ type: types.REMOVE_WATCHLIST, payload: item.id })}>Sil</button>
          </li>
        ))}
      </ul>
      {state.watchlist.length>0 && (
        <button className="btn" style={{marginTop:10}} onClick={()=>dispatch({ type: types.CLEAR_WATCHLIST })}>Listeyi Temizle</button>
      )}
    </aside>
  );
}