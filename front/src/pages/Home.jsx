import { useEffect, useState } from 'react';
import { fetchPaniers } from '../services/api.js';
import PanierCard from '../components/PanierCard.jsx';
import InfoBanner from '../components/InfoBanner.jsx';
import FilterBar from '../components/FilterBar.jsx';

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

  if (loading) return <main><p className="loading">Chargement des paniers...</p></main>;
  if (error) return <main><p className="error" role="alert">{error}</p></main>;

  return (
    <>
      <InfoBanner />
      <main className="home">
        <h1>Nos paniers</h1>
        <FilterBar value={filter} onChange={setFilter} />
        {filtered.length === 0 ? (
          <p className="empty-state">Aucun panier pour ce filtre.</p>
        ) : (
          <div className="paniers-grid">
            {filtered.map((panier) => (
              <PanierCard key={panier.id} panier={panier} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
