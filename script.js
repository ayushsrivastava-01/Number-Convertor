// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeIcon.classList.add("rotate");

  setTimeout(() => {
    themeIcon.src = document.body.classList.contains("dark")
      ? "https://cdn-icons-png.flaticon.com/512/702/702459.png" // sun icon
      : "https://cdn-icons-png.flaticon.com/512/6714/6714978.png"; // moon icon
    themeIcon.classList.remove("rotate");
  }, 300);
});

// Visitor counter
let visitors = localStorage.getItem("visitors")
  ? parseInt(localStorage.getItem("visitors"))
  : 0;
visitors++;
localStorage.setItem("visitors", visitors);
document.getElementById("visitorCount").textContent = visitors;

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Base validation
function isValidForBase(value, base) {
  const regexMap = {
    2: /^[01]*$/,
    8: /^[0-7]*$/,
    10: /^[0-9]*\.?[0-9]*$/, // allow decimals in base 10
    16: /^[0-9A-F]*$/,
  };
  return regexMap[base].test(value);
}

document.getElementById("inputNumber").addEventListener("input", validateConverterInput);
document.getElementById("num1").addEventListener("input", validateCalcInput);
document.getElementById("num2").addEventListener("input", validateCalcInput);

function validateConverterInput() {
  const input = document.getElementById("inputNumber");
  const fromBase = parseInt(document.getElementById("fromBase").value);
  const errorMsg = document.getElementById("inputError");
  const val = input.value.toUpperCase();
  errorMsg.textContent = isValidForBase(val, fromBase)
    ? ""
    : `❌ Invalid for base ${fromBase}`;
}

function validateCalcInput() {
  const base = parseInt(document.getElementById("calcBase").value);
  const n1 = document.getElementById("num1"),
        n2 = document.getElementById("num2");
  const errorMsg = document.getElementById("calcError");
  errorMsg.textContent =
    isValidForBase(n1.value.toUpperCase(), base) &&
    isValidForBase(n2.value.toUpperCase(), base)
      ? ""
      : `❌ Invalid for base ${base}`;
}

function clearInputError() {
  document.getElementById("inputError").textContent = "";
  document.getElementById("inputNumber").value = "";
}
function clearCalcError() {
  document.getElementById("calcError").textContent = "";
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
}

// Converter
function convert() {
  const numStr = document.getElementById("inputNumber").value.trim().toUpperCase();
  const fromBase = parseInt(document.getElementById("fromBase").value);
  const toBase = parseInt(document.getElementById("toBase").value);
  const resultDiv = document.getElementById("convertResult");

  if (numStr === "") {
    resultDiv.textContent = "⚠️ Enter a number.";
    return;
  }
  if (!isValidForBase(numStr, fromBase)) {
    resultDiv.textContent = "❌ Invalid input for selected base.";
    return;
  }

  const decimalValue = parseInt(numStr, fromBase);
  resultDiv.textContent = `✅ Result: ${decimalValue.toString(toBase).toUpperCase()}`;
}

// Calculator
function calculate() {
  const num1Str = document.getElementById("num1").value.trim().toUpperCase();
  const num2Str = document.getElementById("num2").value.trim().toUpperCase();
  const base = parseInt(document.getElementById("calcBase").value);
  const operation = document.getElementById("operation").value;
  const resultDiv = document.getElementById("calcResult");

  if (num1Str === "" || num2Str === "") {
    resultDiv.textContent = "⚠️ Enter both numbers.";
    return;
  }
  if (!isValidForBase(num1Str, base) || !isValidForBase(num2Str, base)) {
    resultDiv.textContent = "❌ Invalid input for base.";
    return;
  }

  const n1 = parseInt(num1Str, base);
  const n2 = parseInt(num2Str, base);
  let result;

  switch (operation) {
    case "add":
      result = n1 + n2;
      break;
    case "sub":
      result = n1 - n2;
      break;
    case "mul":
      result = n1 * n2;
      break;
    case "div":
      if (n2 === 0) {
        resultDiv.textContent = "❌ Division by zero";
        return;
      }
      if (base === 10) {
        // Decimal division with up to 6 decimals
        result = n1 / n2;
        result = parseFloat(result.toFixed(6));
      } else {
        // Integer division for other bases
        result = Math.floor(n1 / n2);
      }
      break;
  }
  resultDiv.textContent = `✅ Result: ${result.toString(base).toUpperCase()}`;
}

// Swap converter
document.getElementById("swapArrow").addEventListener("click", () => {
  const fromSelect = document.getElementById("fromBase");
  const toSelect = document.getElementById("toBase");
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  clearInputError();
});
