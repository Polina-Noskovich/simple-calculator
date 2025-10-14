/* eslint-disable */
const performBinaryCalculation = {
  "/": (firstOperand, secondOperand) => {
    if (secondOperand === 0) {
      return secondOperand === 0 ? Infinity : firstOperand / secondOperand;
    }
    return firstOperand / secondOperand;
  },
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand,
};

/**
 * Выполняет процентную операцию.
 * @param {number} currentValue - Текущее число на дисплее
 * @param {number | null} firstOperand - Первое сохраненное число
 * @param {string | null} operator - Текущий оператор
 * @returns {number} - Результат
 */
function calculatePercentage(currentValue, firstOperand, operator) {
  if (firstOperand !== null && operator !== null) {
    const percentValue = currentValue / 100;
    return performBinaryCalculation["*"](firstOperand, percentValue);
  }
  return currentValue / 100;
}

export { performBinaryCalculation, calculatePercentage };
