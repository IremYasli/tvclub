import TVCard from "./TVCard";
export default function TVList({ shows }) {
  return (
    <div className="cards">
      {shows.map(s => <TVCard key={s.id} show={s} />)}
    </div>
  );
}