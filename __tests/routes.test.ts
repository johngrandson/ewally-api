/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../src/app';

describe('API Routes test', () => {
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

const digitableLine = '21290001192110001210904475617405975870000002000';
const nonExistingDigitableLine = '21290001192210001210904475617405975870000002000';
const invalidMoneyCodeDigitableLine = '21210001192210001210904475617405975870000002000';
const invalidBankCodeDigitableLine = '21210001192210001210904475617405975870000002000';
const billetLine = '00193373700000001000500940144816060680935031';

describe('Billet Routes test', () => {
  test('GET /boleto/:id should return a valid billet', done => {
    request(app).get(`/boleto/${digitableLine}`)
      .expect(200);

    done();
  });

  test('GET /boleto/:id should return 404', done => {
    request(app).get(`/boleto/${nonExistingDigitableLine}`)
      .expect(404);

    done();
  });

  test('GET /boleto/:id return 400 on invalid money code', done => {
    request(app).get(`/boleto/${invalidMoneyCodeDigitableLine}`)
      .expect(400);

    done();
  });

  test('GET /boleto/:id return 400 on invalid money bank code', done => {
    request(app).get(`/boleto/${invalidBankCodeDigitableLine}`)
      .expect(400);

    done();
  });
});
