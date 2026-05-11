import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.DB_PATH = ':memory:';
});

describe('GET /api/paniers', () => {
  it('retourne un tableau', async () => {
    const res = await request(app).get('/api/paniers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('retourne les champs attendus pour chaque panier', async () => {
    const res = await request(app).get('/api/paniers');
    if (res.body.length > 0) {
      const panier = res.body[0];
      expect(panier).toHaveProperty('id');
      expect(panier).toHaveProperty('nom');
      expect(panier).toHaveProperty('date_distribution');
      expect(panier).toHaveProperty('disponible');
    }
  });
});

describe('GET /api/paniers/:id', () => {
  it('retourne 404 pour un panier inexistant', async () => {
    const res = await request(app).get('/api/paniers/99999');
    expect(res.status).toBe(404);
  });

  it('retourne les contenus du panier', async () => {
    const listRes = await request(app).get('/api/paniers');
    if (listRes.body.length > 0) {
      const id = listRes.body[0].id;
      const res = await request(app).get(`/api/paniers/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('contenus');
      expect(Array.isArray(res.body.contenus)).toBe(true);
    }
  });
});

describe('GET /api/paniers/distributions', () => {
  it('retourne 401 sans token', async () => {
    const res = await request(app).get('/api/paniers/distributions');
    expect(res.status).toBe(401);
  });
});
