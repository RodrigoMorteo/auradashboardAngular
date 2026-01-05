const request = require('supertest');
const app = require('./server');

describe('Auth API', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrong' });
    
    expect(response.statusCode).toBe(401);
  });
});

describe('State Management API', () => {
  it('should reset state to a valid profile', async () => {
    const response = await request(app)
      .post('/api/state/reset')
      .send({ profile: 'empty_state' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('empty_state');
  });

  it('should fail to reset to an invalid profile', async () => {
    const response = await request(app)
      .post('/api/state/reset')
      .send({ profile: 'non_existent' });
    
    expect(response.statusCode).toBe(404);
  });
});

describe('Widgets API', () => {
  beforeEach(async () => {
    await request(app).post('/api/state/reset').send({ profile: 'default' });
  });

  it('should get sales records with pagination', async () => {
    const response = await request(app).get('/api/widgets/sales-records?page=1&pageSize=5');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(5);
    expect(response.body.hasMore).toBe(true);
  });

  it('should get activity feed', async () => {
    const response = await request(app).get('/api/widgets/activity-feed');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  it('should get KPI trends', async () => {
    const response = await request(app).get('/api/widgets/kpi-trends');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('labels');
    expect(response.body).toHaveProperty('datasets');
  });
});
