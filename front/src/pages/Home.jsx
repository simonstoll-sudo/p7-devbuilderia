import { useEffect, useState } from 'react';
import { fetchPaniers } from '../services/api.js';
import PanierCard from '../components/PanierCard.jsx';

export default function Home() {
  const [paniers, setPaniers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaniers()
      .then(setPaniers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Chargement des paniers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="home">
      <h1>Paniers disponibles</h1>
      {paniers.length === 0 ? (
        <p>Aucun panier disponible pour le moment.</p>
      ) : (
        <div className="paniers-grid">
          {paniers.map((panier) => (
            <PanierCard key={panier.id} panier={panier} />
          ))}
        </div>
      )}
    </main>
  );
}
