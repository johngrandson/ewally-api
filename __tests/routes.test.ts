/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../src/app';

describe('Routes test', () => {
  test('GET /random-url should return 404', done => {
    request(app).get('/nonexisting-route')
      .expect(404);

    done();
  });

  test('GET /health should return 200', done => {
    request(app).get('/api-docs')
      .expect(200);

    done();
  });

  test('GET /api-docs should return 200', done => {
    request(app).get('/api-docs')
      .expect(200);

    done();
  });
});
