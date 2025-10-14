/* eslint-disable */
import "./styles/main.css";
import {
  getDisplayValue,
  inputDigit,
  inputDecimal,
  toggleSign,
  resetCalculator,
  handleOperator,
  handlePercent,
} from "./state";

const themeToggleBtn = document.getElementById("theme-toggle-btn");
const calculatorContainer = document.querySelector(".calculator-container");

function toggleTheme(isDark) {
  if (isDark) {
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
  }
}

if (themeToggleBtn) {
  toggleTheme(true);

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("light-theme");
    toggleTheme(!isDark);
  });
}

const display = document.getElementById("display");
const keys = document.querySelector(".calculator-keys");

function updateDisplay() {
  display.textContent = getDisplayValue();
}

const trafficLights = document.querySelector(".traffic-lights");

trafficLights.addEventListener("click", (event) => {
  const { target } = event;
  const { control } = target.dataset;

  if (!control) return;

  const isHidden = calculatorContainer.classList.contains("hidden");
  const isCollapsed = calculatorContainer.classList.contains("collapsed");
  const isFullSize = calculatorContainer.classList.contains("full-size");

  switch (control) {
    case "close":
      calculatorContainer.classList.toggle("hidden");
      if (!isHidden) {
        calculatorContainer.classList.remove("collapsed", "full-size");
      }
      break;
    case "minimize":
      if (!isHidden) {
        calculatorContainer.classList.toggle("collapsed");
        calculatorContainer.classList.remove("full-size");
      }
      break;
    case "resize":
      if (!isHidden) {
        calculatorContainer.classList.toggle("full-size");
        calculatorContainer.classList.remove("collapsed");
      }
      break;
    default:
      break;
  }
});

keys.addEventListener("click", (event) => {
  const { target } = event;
  const { action } = target.dataset;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("key-operator")) {
    handleOperator(action);
  } else if (target.classList.contains("key-function")) {
    switch (action) {
      case "clear":
        resetCalculator();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        handlePercent();
        break;
      default:
        break;
    }
  } else if (action === "decimal") {
    inputDecimal(",");
  } else if (target.classList.contains("key-number")) {
    inputDigit(target.textContent);
  }

  updateDisplay();
});

updateDisplay();
