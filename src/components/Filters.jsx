export default function Filters({ filters, onChange, onPageSize }) {
  const genres = ["Drama","Comedy","Action","Romance","Science-Fiction","Thriller","Adventure","Fantasy","Music"];
  const languages = ["English","Turkish","Japanese","Korean","Spanish","German","French"];
  return (
    <>
      <select className="select" value={filters.genre} onChange={e=>onChange({genre:e.target.value})}>
        <option value="">Tür (hepsi)</option>
        {genres.map(g=> <option key={g} value={g}>{g}</option>)}
      </select>
      <select className="select" value={filters.language} onChange={e=>onChange({language:e.target.value})}>
        <option value="">Dil (hepsi)</option>
        {languages.map(l=> <option key={l} value={l}>{l}</option>)}
      </select>
      <select className="select" value={filters.minRating} onChange={e=>onChange({minRating:e.target.value})}>
        {[0,5,6,7,8,9].map(n=><option key={n} value={n}>Min. Puan ({n}+)</option>)}
      </select>
    </>
  );
}