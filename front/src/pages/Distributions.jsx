import { useEffect, useState } from 'react';
import { fetchDistributions } from '../services/api.js';

export default function Distributions() {
  const [distributions, setDistributions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Accès non autorisé. Veuillez vous connecter.');
      setLoading(false);
      return;
    }
    fetchDistributions(token)
      .then(setDistributions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="loading">Chargement des distributions...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="distributions">
      <h1>Distributions planifiées</h1>
      {distributions.length === 0 ? (
        <p>Aucune distribution à venir.</p>
      ) : (
        <ul>
          {distributions.map((d) => (
            <li key={d.id}>
              <strong>{d.panier_nom}</strong>
              <span>{d.lieu}</span>
              <span>{new Date(d.date_heure).toLocaleString('fr-FR')}</span>
              <span className={`statut statut--${d.statut}`}>{d.statut}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
