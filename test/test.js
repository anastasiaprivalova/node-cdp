const assert = require('assert');
const data = require('./../config');

describe('Main module', () => {
  it('Should contain name equals to NodeMP HW App', () => {
    const name = data.name;
    const expectedResult = 'NodeMP HW App';
    assert.equal(name, expectedResult);
  });
});