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
toggleTheme(true);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    toggleTheme(isLight);
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

  switch (control) {
    case "close":
      if (!isHidden) {
        calculatorContainer.classList.add("hidden");
        reopenButton.classList.remove("hidden-reopen-button");
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

if (reopenButton) {
  reopenButton.addEventListener("click", () => {
    calculatorContainer.classList.remove("hidden");
    reopenButton.classList.add("hidden-reopen-button");
  });
}

keys.addEventListener("click", (event) => {
  const { target } = event;
  const { action } = target.dataset;

  if (!target.matches("button")) {
    return;
  }

  if (calculatorContainer.classList.contains("hidden")) {
    return;
  }

  if (target.classList.contains("key-operator") || action === "calculate") {
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
