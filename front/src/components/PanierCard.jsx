import { Link } from 'react-router-dom';

export default function PanierCard({ panier }) {
  return (
    <article className={`panier-card${!panier.disponible ? ' panier-card--indisponible' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h2>{panier.nom}</h2>
        <span className={`badge badge--${panier.disponible ? 'disponible' : 'indisponible'}`}>
          {panier.disponible ? 'Dispo' : 'Complet'}
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{panier.description}</p>
      <div className="card-footer">
        <p className="prix">{panier.prix != null ? `${panier.prix.toFixed(2)} €` : '—'}</p>
        <Link to={`/paniers/${panier.id}`} className="voir-plus">
          Voir →
        </Link>
      </div>
    </article>
  );
}
