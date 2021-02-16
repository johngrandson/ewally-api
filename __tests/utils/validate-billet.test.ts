import { validateBillet } from '../../src/utils/validate-billet';

const digitableLine = '21290001192110001210904475617405975870000002000';
const billetNumber = '21299758700000020000001121100012100447561740';

describe('Utils Test', () => {
  test('Should return matching billet', done => {
    try {
      const result = validateBillet(digitableLine);
      expect(result).toBe(billetNumber);
      done();
    } catch (error) {
      done(error);
    }
  });
});
