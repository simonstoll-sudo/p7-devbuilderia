export default function About() {
  return (
    <main className="about">
      <h1>À propos de Panions</h1>

      <section>
        <h2>Notre association</h2>
        <p>
          Panions est une association loi 1901 fondée en 2018. Nous travaillons avec des
          maraîchers locaux pour proposer chaque semaine des paniers de légumes bio et de
          saison à nos adhérents.
        </p>
        <p>
          Chaque panier est composé de légumes récoltés dans la semaine, sans intermédiaire,
          à un prix juste pour les producteurs et les consommateurs.
        </p>
      </section>

      <section>
        <h2>Nos distributions</h2>
        <p>
          Les distributions se déroulent chaque jeudi de 17h à 19h sur la place du marché —
          Stand B12. Des distributions supplémentaires peuvent être organisées selon les saisons.
        </p>
        <p>
          Connectez-vous pour consulter le calendrier complet des distributions à venir.
        </p>
      </section>

      <section>
        <h2>Nous contacter</h2>
        <address>
          <p>
            <strong>Email :</strong>{' '}
            <a href="mailto:contact@panions.fr">contact@panions.fr</a>
          </p>
          <p>
            <strong>Téléphone :</strong> 06 12 34 56 78
          </p>
          <p>
            <strong>Adresse :</strong> 12 rue des Jardins, 75011 Paris
          </p>
        </address>
      </section>
    </main>
  );
}
