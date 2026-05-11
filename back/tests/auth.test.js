import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { register, login } from '../src/controllers/auth.js';
import app from '../src/server.js';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.DB_PATH = ':memory:';
});

describe('POST /api/auth/register', () => {
  it('crée un nouvel utilisateur', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'nouveau@panions.fr',
      password: 'motdepasse123',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('refuse un mot de passe trop court', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@panions.fr',
      password: 'court',
    });
    expect(res.status).toBe(400);
  });

  it('refuse un email déjà utilisé', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'duplique@panions.fr',
      password: 'motdepasse123',
    });
    const res = await request(app).post('/api/auth/register').send({
      email: 'duplique@panions.fr',
      password: 'autrepassword',
    });
    expect(res.status).toBe(409);
  });
});

describe('POST /api/auth/login', () => {
  it('refuse des identifiants invalides', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'inexistant@panions.fr',
      password: 'mauvaismdp',
    });
    expect(res.status).toBe(401);
  });

  it('retourne un token pour des identifiants valides', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'valide@panions.fr',
      password: 'motdepasse123',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'valide@panions.fr',
      password: 'motdepasse123',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
