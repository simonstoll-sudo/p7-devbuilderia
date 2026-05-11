import { useEffect, useState } from 'react';
import { fetchPaniers } from '../services/api.js';
import PanierCard from '../components/PanierCard.jsx';
import InfoBanner from '../components/InfoBanner.jsx';
import FilterBar from '../components/FilterBar.jsx';

const STATS = [
  { n: '120', l: 'adhérents' },
  { n: '4', l: 'fermes partenaires' },
  { n: '32 km', l: 'rayon moyen' },
];

export default function Home() {
  const [paniers, setPaniers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');

  useEffect(() => {
    fetchPaniers()
      .then(setPaniers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = paniers.filter((p) => {
    if (filter === 'disponibles') return p.disponible;
    if (filter === 'indisponibles') return !p.disponible;
    return true;
  });

  return (
    <>
      <InfoBanner />
      <main className="home">
        <div className="home__hero">
          <h1>Des paniers de légumes bio,<br/><span>cultivés près de chez vous.</span></h1>
          <p>Chaque semaine, nous préparons des paniers à partir des récoltes de nos fermes
          partenaires. Réservez, récupérez sur place, dégustez de saison.</p>
        </div>

        <div className="home__stats">
          {STATS.map((s) => (
            <div key={s.l} className="stat-card">
              <div className="stat-card__number">{s.n}</div>
              <div className="stat-card__label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="home__catalogue">
          <h2>Nos paniers</h2>
          <p className="subtitle">Disponibles cette semaine — réservation jusqu’au mardi 18h.</p>
          <FilterBar value={filter} onChange={setFilter} />

          {loading && <p className="loading">Chargement des paniers…</p>}
          {error  && <p className="error" role="alert">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="empty-state">Aucun panier pour ce filtre.</p>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="paniers-grid">
              {filtered.map((panier) => (
                <PanierCard key={panier.id} panier={panier} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
