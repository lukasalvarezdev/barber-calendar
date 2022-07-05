import { transformSingleDigit } from '../helpers';

it('should return 0{digit} if digit.length === 1', () => {
  expect(transformSingleDigit(1)).toBe('01');
});

it('should return {digit} if digit.lenght > 1', () => {
  expect(transformSingleDigit(10)).toBe('10');
});
