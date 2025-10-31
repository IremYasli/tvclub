export default function Pagination({ page, pageSize, total, onPage }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="pag">
      <button className="btn" onClick={()=>onPage(1)} disabled={page===1}>İlk</button>
      <button className="btn" onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>Geri</button>
      <span>Sayfa {page}/{totalPages}</span>
      <button className="btn" onClick={()=>onPage(Math.min(totalPages,page+1))} disabled={page===totalPages}>İleri</button>
      <button className="btn" onClick={()=>onPage(totalPages)} disabled={page===totalPages}>Son</button>
    </div>
  );
}