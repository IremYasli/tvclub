export default function SearchBox({ query, onChange }) {
  
  return (
    <div style={{ display:"flex", gap:8 }}>
      <input
        className="input"
        value={query}           
        onChange={(e) => onChange({ type: "text", value: e.target.value })}
        onKeyDown={(e) => { if (e.key === "Enter") onChange({ type: "submit" }); }}
        placeholder="Dizi ara... (örn: dark, witcher)"
      />
      <button className="btn" onClick={() => onChange({ type: "submit" })}>
        Ara
      </button>
    </div>
  );
}