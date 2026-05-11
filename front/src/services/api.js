const BASE_URL = 'http://localhost:3000/api';

export async function fetchPaniers() {
  const response = await fetch(`${BASE_URL}/paniers`);
  if (!response.ok) throw new Error('Erreur lors du chargement des paniers.');
  return response.json();
}

export async function fetchPanierById(id) {
  const response = await fetch(`${BASE_URL}/paniers/${id}`);
  if (!response.ok) throw new Error('Panier introuvable.');
  return response.json();
}

export async function login(email, password) {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Identifiants incorrects.');
  return response.json();
}

export async function fetchDistributions(token) {
  const response = await fetch(`${BASE_URL}/paniers/distributions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Erreur lors du chargement des distributions.');
  return response.json();
}
