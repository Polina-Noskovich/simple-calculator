/* eslint-disable */
import { performBinaryCalculation, calculatePercentage } from "./math";

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

/**
 * Форматирует число для отображения (заменяет . на , и ограничивает точность).
 * @param {number} num - Число для форматирования
 * @returns {string} - Строковое представление числа
 */
function formatDisplay(num) {
  const cleanNum = parseFloat(num.toFixed(10));

  let displayStr = cleanNum.toString().replace(".", ",");

  if (displayStr.length > 9) {
    displayStr = cleanNum.toPrecision(9).replace(".", ",");
  }

  return displayStr;
}

export function getDisplayValue() {
  return calculator.displayValue;
}

export function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    return;
  }

  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
}

export function inputDecimal(dot = ",") {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = `0${dot}`;
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

export function toggleSign() {
  const currentValue = parseFloat(calculator.displayValue.replace(",", "."));
  calculator.displayValue = formatDisplay(currentValue * -1);
}

export function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

export function handleOperator(nextOperator) {
  const inputValue = parseFloat(calculator.displayValue.replace(",", "."));

  if (Number.isNaN(inputValue) || !Number.isFinite(inputValue)) {
    resetCalculator();
    calculator.displayValue = "Error";
    return;
  }

  if (calculator.operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (calculator.firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    let result = performBinaryCalculation[calculator.operator](
      calculator.firstOperand,
      inputValue,
    );

    if (result === Infinity) {
      resetCalculator();
      calculator.displayValue = "Error";
      return;
    }

    calculator.displayValue = formatDisplay(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

export function handlePercent() {
  const currentValue = parseFloat(calculator.displayValue.replace(",", "."));
  const result = calculatePercentage(
    currentValue,
    calculator.firstOperand,
    calculator.operator,
  );

  if (result === Infinity) {
    resetCalculator();
    calculator.displayValue = "Error";
    return;
  }

  calculator.displayValue = formatDisplay(result);
  calculator.waitingForSecondOperand = true;
  calculator.firstOperand = result;
}
