const request = require('supertest');
const app = require('../src/app');

test('Get Movie Test', async () => {
  
  const res = await request(app)
    .get(`/movie/`)
    .send()
    .expect(201);
});