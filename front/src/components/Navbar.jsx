import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">Panions 🌱</Link>
      <ul className="navbar__links">
        <li><Link to="/">Paniers</Link></li>
        <li><Link to="/about">À propos</Link></li>
        {token ? (
          <>
            <li><Link to="/distributions">Distributions</Link></li>
            <li>
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
}
