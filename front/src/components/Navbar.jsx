import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">Panions</Link>
      <ul className="navbar__links">
        <li><Link to="/" className={pathname === '/' ? 'active' : ''}>Paniers</Link></li>
        <li><Link to="/about" className={pathname === '/about' ? 'active' : ''}>À propos</Link></li>
        {token ? (
          <>
            <li><Link to="/distributions" className={pathname === '/distributions' ? 'active' : ''}>Distributions</Link></li>
            <li><button onClick={handleLogout}>Déconnexion</button></li>
          </>
        ) : (
          <li><Link to="/login" className={pathname === '/login' ? 'active' : ''}>Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
}
