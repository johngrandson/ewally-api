/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../src/app';

describe('API Routes test', () => {
  test('GET /random-url should return 404', done => {
    request(app).get('/nonexisting-route').expect(404);

    done();
  });

  test('GET /health should return 200', done => {
    request(app).get('/api-docs').expect(200);

    done();
  });

  test('GET /api-docs should return 200', done => {
    request(app).get('/api-docs').expect(200);

    done();
  });
});

const digitableLine = '21290001192110001210904475617405975870000002000';
const nonExistingDigitableLine = '21290001192210001210904475617405975870000002000';
const invalidMoneyCodeDigitableLine = '21210001192210001210904475617405975870000002000';
const invalidBankCodeDigitableLine = '21210001192210001210904475617405975870000002000';
const payload = {
  barCode: '21299758700000020000001121100012100447561740',
  amount: '50.00',
  expirationDate: '10-03-2021'
};

describe('Billet Routes test', () => {
  test('GET /boleto/:id should return a valid billet', done => {
    request(app).get(`/boleto/${digitableLine}`).expect(200);

    done();
  });

  test('GET /boleto/:id should return 404', done => {
    request(app).get(`/boleto/${nonExistingDigitableLine}`).expect(404);

    done();
  });

  test('GET /boleto/:id return 400 on invalid money code', done => {
    request(app).get(`/boleto/${invalidMoneyCodeDigitableLine}`).expect(400);

    done();
  });

  test('GET /boleto/:id return 400 on invalid bank code', done => {
    request(app).get(`/boleto/${invalidBankCodeDigitableLine}`).expect(400);

    done();
  });

  test('POST /boleto return 400 on empty payload', done => {
    request(app).get('/boleto').send({}).expect(400);

    done();
  });

  test('POST /boleto should create billet with success', done => {
    request(app).get('/boleto').send(payload).expect(200);

    done();
  });
});
