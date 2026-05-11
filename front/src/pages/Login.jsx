import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginApi(email, password);
      localStorage.setItem('token', data.token);
      navigate('/distributions');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <div className="login">
        <h1>Connexion</h1>
        <p className="subtitle">Espace membres de l’association Panions.</p>
        {error && (
          <p role="alert" className="error">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="votre@email.fr"
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </main>
  );
}
