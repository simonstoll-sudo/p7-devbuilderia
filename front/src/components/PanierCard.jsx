import { Link } from 'react-router-dom';

export default function PanierCard({ panier }) {
  return (
    <article className={`panier-card${!panier.disponible ? ' panier-card--indisponible' : ''}`}>
      <h2>{panier.nom}</h2>
      <p>{panier.description}</p>
      <p className="date">
        Distribution le {new Date(panier.date_distribution).toLocaleDateString('fr-FR')}
      </p>
      <span className={`badge badge--${panier.disponible ? 'disponible' : 'indisponible'}`}>
        {panier.disponible ? 'Disponible' : 'Indisponible'}
      </span>
      <Link to={`/paniers/${panier.id}`} className="voir-plus">
        Voir le contenu →
      </Link>
    </article>
  );
}
