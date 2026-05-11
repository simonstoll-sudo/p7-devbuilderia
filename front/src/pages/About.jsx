export default function About() {
  return (
    <main className="about">
      <h1>À propos de Panions</h1>
      <p className="intro">
        Association loi 1901 fondée en 2018 — nous travaillons avec des maraîchers
        locaux pour proposer chaque semaine des paniers de légumes bio et de saison.
      </p>

      <div className="about__grid">
        <div className="about__section">
          <h2>Notre association</h2>
          <p>
            Panions réunit 120 adhérents et 4 fermes partenaires dans un rayon de 32 km.
            Chaque panier est composé de légumes récoltés dans la semaine, sans intermédiaire.
          </p>
        </div>
        <div className="about__section">
          <h2>Nos distributions</h2>
          <p>
            Chaque mercredi de 17h à 19h — Salle des fêtes, 12 rue des Lilas.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Connectez-vous pour consulter le calendrier complet des distributions.
          </p>
        </div>
      </div>

      <div className="about__contact">
        <h2>Nous contacter</h2>
        <div className="contact-row">
          <strong>Email</strong>
          <a href="mailto:contact@panions.fr">contact@panions.fr</a>
        </div>
        <div className="contact-row">
          <strong>Téléphone</strong>
          <span>06 12 34 56 78</span>
        </div>
        <div className="contact-row">
          <strong>Adresse</strong>
          <span>12 rue des Lilas, 78000 Villiers</span>
        </div>
        <div className="contact-row">
          <strong>Permanence</strong>
          <span>mercredi 16h–19h, samedi 10h–12h</span>
        </div>
      </div>
    </main>
  );
}
