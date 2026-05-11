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

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!panier) return null;

  return (
    <main className="panier-detail">
      <Link to="/" className="back-link">← Retour aux paniers</Link>
      <h1>{panier.nom}</h1>
      <p className="description">{panier.description}</p>
      <p className="prix detail-prix">{panier.prix != null ? `${panier.prix.toFixed(2)} €` : '—'}</p>
      <p className="date">
        Distribution le {new Date(panier.date_distribution).toLocaleDateString('fr-FR')}
      </p>
      <span className={`badge badge--${panier.disponible ? 'disponible' : 'indisponible'}`}>
        {panier.disponible ? 'Disponible' : 'Complet'}
      </span>
      <section className="contenus">
        <h2>Contenu du panier</h2>
        <ul>
          {panier.contenu.map((item, index) => (
            <li key={index}>
              {item.quantite} {item.unite} de {item.legume}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
