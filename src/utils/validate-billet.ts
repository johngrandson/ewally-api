/* eslint-disable no-plusplus */
import BadRequest from '../errors/bad-request';
import bankList from './bank-list';

function validBank(barCode: string) {
  const bankDV = barCode.slice(0, 3);
  const exists = bankList.find(bank => bank.value === bankDV);
  return !!exists;
}

function handleBilletNumber(barCode: string, digitableLine: string) {
  const bankCode = barCode.slice(0, 3);
  const currencyCode = barCode.slice(3, 4);

  const dueDateFactorValue = barCode.slice(barCode.length - 14, barCode.length - 10);
  const documentValue = barCode.slice(barCode.length - 10, barCode.length);
  const agreementNumber = digitableLine.slice(4, 9) + digitableLine.slice(11, 12);
  const complement = digitableLine.slice(12, 17);
  const agency = digitableLine.slice(17, 21);
  const account = digitableLine.slice(23, 31);
  const cart = digitableLine.slice(31, 33);

  const factorValid = documentValue.length <= 10;

  const billetNumbers = `${bankCode}${currencyCode}${factorValid && dueDateFactorValue}${documentValue}${agreementNumber}${complement}${agency}${account}${cart}`;

  let position = billetNumbers.length - 1;
  const arr = [];

  for (let multiplier = 2; position >= 0; multiplier++) {
    const number = Number(billetNumbers[position]) * multiplier;
    arr.push(number);
    position--;

    if (multiplier === 9) {
      multiplier = 1;
    }
  }

  const sum = arr.reduce((prev, curr) => prev + curr);

  const res = sum % 11;
  let digit = 11 - res;

  if ([0, 10, 11].includes(res)) {
    digit = 1;
  } else if (res < 0) {
    throw new BadRequest('Dígito verificador inválido');
  }

  return `${bankCode}${currencyCode}${digit}${factorValid && dueDateFactorValue}${documentValue}${agreementNumber}${complement}${agency}${account}${cart}`;
}

function handleDigitableLine(barCode: string) {
  const firstField = barCode.slice(0, 9);
  const secondField = barCode.slice(10, 20);
  const thirdField = barCode.slice(21, 31);
  const fourthField = barCode.slice(31, 32);
  const fifthField = barCode.slice(32, 49);

  const allFields = firstField + secondField + thirdField;

  let position = allFields.length - 1;
  const arr = [];

  while (position >= 0) {
    const value = position % 2 === 0 ? 2 : 1;
    const number = Number(allFields[position]) * value;

    if (number > 9) {
      const digits = number
        .toString()
        .split('')
        .map(Number)
        .reduce((prev, curr) => prev + curr);
      arr.push(digits);
    } else {
      arr.push(number);
    }

    position--;
  }

  arr.reverse().splice(9, 0, 0);

  const firstDigit = Math.abs(
    (arr
      .slice(0, 9)
      .map(Number)
      .reduce((prev, curr) => prev + curr)
      % 10)
      - 10
  );
  const secondDigit = Math.abs(
    (arr
      .slice(9, 20)
      .map(Number)
      .reduce((prev, curr) => prev + curr)
      % 10)
      - 10
  );
  const thirdDigit = Math.abs(
    (arr
      .slice(20, 40)
      .map(Number)
      .reduce((prev, curr) => prev + curr)
      % 10)
      - 10
  );

  const completeFields = (`${firstField} ${secondField} ${thirdField} ${fourthField} ${fifthField}`).split('');

  completeFields.splice(9, 0, String(firstDigit));
  completeFields.splice(21, 0, String(secondDigit));
  completeFields.splice(33, 0, String(thirdDigit));

  return completeFields.join('');
}

export function validateBillet(barCode: string) {
  if (!validBank(barCode)) {
    throw new BadRequest('Número Código da IF Destinatária no SILOC inválido');
  }

  // Código da moeda (BRL)
  if (barCode[3] !== '9') {
    throw new BadRequest('Código da Moeda inválido');
  }

  const line = handleDigitableLine(barCode);
  const billetNumber = handleBilletNumber(barCode, line);

  return billetNumber;
}
