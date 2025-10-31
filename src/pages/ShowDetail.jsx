import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShow, getEpisodes } from "../api/tvmaze";

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const [s, e] = await Promise.all([getShow(id), getEpisodes(id)]);
        if (!on) return;
        setShow(s.data);
        setEpisodes(e.data);
        setLoading(false);
      } catch {
        if (!on) return;
        setErr("Detaylar alınamadı");
        setLoading(false);
      }
    })();
    return () => { on = false; };
  }, [id]);

  if (loading) return <div className="spinner">Yükleniyor…</div>;
  if (err) return <div className="error">Hata: {err} <button className="btn" onClick={()=>location.reload()}>Tekrar dene</button></div>;
  if (!show) return <div className="spinner">Bulunamadı.</div>;

  return (
    <div>
      <Link to="/"><button className="btn">← Geri</button></Link>
      <h2 style={{marginTop:12}}>{show.name}</h2>
      {show.image?.original
        ? <img src={show.image.original} alt={show.name} style={{maxWidth:"100%", borderRadius:"16px", border:"1px solid var(--line)"}}/>
        : <div className="card" style={{height:200, alignItems:"center", justifyContent:"center"}}>Poster Yok</div>}
      <div dangerouslySetInnerHTML={{ __html: show.summary || "" }} />
      <h3>Bölümler ({episodes.length})</h3>
      <ul>
        {episodes.map(ep => (
          <li key={ep.id}>S{ep.season}E{ep.number} — {ep.name}</li>
        ))}
      </ul>
      <div className="footer">© Kampüs Film Kulübü • İrem Yaşlı</div>
    </div>
  );
}