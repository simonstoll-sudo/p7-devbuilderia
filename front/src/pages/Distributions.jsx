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

  if (loading) return <main className="distributions"><p className="loading">Chargement des distributions…</p></main>;
  if (error)   return <main className="distributions"><p className="error" role="alert">{error}</p></main>;

  return (
    <main className="distributions">
      <div className="distrib-chip">éspace membre</div>
      <h1>Distributions planifiées</h1>
      <p className="subtitle">{distributions.length} date{distributions.length !== 1 ? 's' : ''} à venir.</p>

      {distributions.length === 0 ? (
        <p className="empty-state">Aucune distribution à venir.</p>
      ) : (
        <div className="distrib-table">
          {distributions.map((d) => (
            <div key={d.id} className="distrib-row">
              <span className="distrib-row__date">
                {new Date(d.date_heure).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
              <div className="distrib-row__info">
                <strong>{d.panier_nom}</strong>
                <span>{d.lieu} · {new Date(d.date_heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <span className={`statut statut--${d.statut}`}>{d.statut}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
