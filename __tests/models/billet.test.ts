import request from 'supertest';
import { ObjectID } from 'mongodb';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import BilletModel from '../../src/models/Billet';

describe('test mongoose User model', () => {
  test('should create a valid billet', done => {
    const payload = {
      _id: '602ac4a530da4d1a302b938c',
      barCode: '21299758700000020000001121100012100447561740',
      amount: '50.00',
      expirationDate: '10-03-2021'
    };

    mockingoose(BilletModel).toReturn(payload, 'findOne');

    return BilletModel.create(new BilletModel(payload)).then(billet => {
      expect(billet.barCode).toEqual(payload.barCode);
      expect(billet.amount).toEqual(payload.amount);
      expect(billet.expirationDate).toEqual(payload.expirationDate);

      done();
    });
  });

  test('should return the selected billet with findOne', done => {
    const billet = {
      _id: '602ac4a530da4d1a302b938c',
      barCode: '21299758700000020000001121100012100447561740',
      amount: '50.00',
      expirationDate: '10-03-2021',
      createdAt: '15-02-2021',
      updatedAt: '15-02-2021'
    };

    mockingoose(BilletModel).toReturn(billet, 'findOne');

    return BilletModel
      .findOne({ barCode: billet.barCode })
      .then(billetObj => {
        expect(billetObj.barCode).toEqual(billet.barCode);
        expect(billetObj.amount).toEqual(billet.amount);
        expect(billetObj.expirationDate).toEqual(billet.expirationDate);

        done();
      });
  });
});
