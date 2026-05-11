import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPanierById } from '../services/api.js';

export default function PanierDetail() {
  const { id } = useParams();
  const [panier, setPanier] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPanierById(id)
      .then(setPanier)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="panier-detail"><p className="loading">Chargement…</p></main>;
  if (error)   return <main className="panier-detail"><p className="error" role="alert">{error}</p></main>;
  if (!panier) return null;

  return (
    <main className="panier-detail">
      <Link to="/" className="back-link">← Retour aux paniers</Link>

      <div className="panier-detail__layout">
        {/* Colonne gauche — visuel placeholder */}
        <div>
          <div className="detail-image-placeholder">image du panier</div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <span className={`badge badge--${panier.disponible ? 'disponible' : 'indisponible'}`}>
              {panier.disponible ? 'Disponible' : 'Complet'}
            </span>
          </div>
        </div>

        {/* Colonne droite — infos */}
        <div>
          <div className="panier-detail__header">
            <h1>{panier.nom}</h1>
            <p className="description">{panier.description}</p>
          </div>

          <div className="panier-detail__price-box">
            <p className="desc">prix du panier</p>
            <p className="detail-prix">{panier.prix != null ? `${panier.prix.toFixed(2)} €` : '—'}</p>
          </div>

          <section className="contenus">
            <h2>Contenu du panier</h2>
            <ul>
              {panier.contenu.map((item, index) => (
                <li key={index}>
                  <span className="legume">{item.legume}</span>
                  <span className="qte">{item.quantite} {item.unite}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
