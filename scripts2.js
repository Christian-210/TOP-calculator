const numKeys = document.querySelectorAll(".num-pad ul li");
const displayVal = document.querySelector("#display h2");
const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");
const multiplyBtn = document.getElementById("multiply-btn");
const divideBtn = document.getElementById("divide-btn");
const equalsBtn = document.getElementById("equals-btn");
const alertMsg = document.querySelector(".alert");

let inputValue = "";
let currentValue = 0;
let initialValue = 0;
let prevEval = "";

console.log(numKeys);

numKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (prevEval === "equal") {
      alertMsg.classList.add("show-alert");
      alertMsg.innerHTML = `<p>You must select an operator to continue!</p>`;
    } else {
      btnAnimation(e);
      inputValue.textContent = "";
      let numVal = e.target.textContent;
      inputValue += numVal;
      displayVal.textContent = inputValue;
    }
  });
});

// Button animation
const btnAnimation = (e) => {
  e.target.classList.add("btn-clicked");
  setTimeout(() => {
    e.target.classList.remove("btn-clicked");
  }, 75);
};

// Add function
const add = (num) => {
  return (initialValue += num);
};

// Subtract function
const subtract = (num) => {
  if (initialValue === 0) {
    initialValue = num;
  } else {
    return (initialValue -= num);
  }
};

// Multiply function
const multiply = (num) => {
  if (initialValue === 0) {
    initialValue = num;
  } else {
    return (initialValue *= num);
  }
};

// Divide function
const divide = (num) => {
  if (initialValue === 0) {
    initialValue = num;
  } else {
    return (initialValue /= num);
  }
};

// Operate function
const operate = (num, operator) => {
  return operator(num, operator);
};

// Mathmatical Evaluation. This will account for the string title of the button the user clicks (add, subtract, multiply, divide, equals);

const mathmaticalEval = (fn) => {
  currentValue = Number(inputValue);

  if (prevEval === "divide" && currentValue === 0) {
    alertMsg.classList.add("show-alert");
    alertMsg.innerHTML = `<p>Error! You can't divide by 0! Try again!</p>`;
  } else {
    operate(currentValue, fn);
  }

  prevEval === "equal"
    ? (currentValue = Number(inputValue))
    : (inputValue = "");

  Number.isInteger(initialValue)
    ? (displayVal.textContent = initialValue)
    : (displayVal.textContent = initialValue.toFixed(2)); // clears the input
  currentValue = 0;
};

const equals = () => {
  if (prevEval === "add") {
    mathmaticalEval(add);
  }
  if (prevEval === "subtract") {
    mathmaticalEval(subtract);
  }
  if (prevEval === "multiply") {
    mathmaticalEval(multiply);
  }
  if (prevEval === "divide") {
    mathmaticalEval(divide);
  }
};

addBtn.addEventListener("click", (e) => {
  btnAnimation(e);
  alertMsg.classList.remove("show-alert");

  if (prevEval === "") {
    prevEval = e.target.value;
  }

  equals();
  prevEval = e.target.value;
  console.log(prevEval);
});

subtractBtn.addEventListener("click", (e) => {
  alertMsg.classList.remove("show-alert");
  btnAnimation(e);

  if (prevEval === "") {
    prevEval = e.target.value;
  }
  //   mathmaticalEval(subtract);
  equals();
  prevEval = e.target.value;
  console.log(prevEval);
});

multiplyBtn.addEventListener("click", (e) => {
  alertMsg.classList.remove("show-alert");
  btnAnimation(e);

  if (prevEval === "") {
    prevEval = e.target.value;
  }
  //   mathmaticalEval(multiply);
  equals();
  prevEval = e.target.value;
  console.log(prevEval);
});

divideBtn.addEventListener("click", (e) => {
  alertMsg.classList.remove("show-alert");
  btnAnimation(e);

  if (prevEval === "") {
    prevEval = e.target.value;
  }
  //   mathmaticalEval(divide);
  equals();
  prevEval = e.target.value;
  console.log(prevEval);
});

equalsBtn.addEventListener("click", (e) => {
  btnAnimation(e);

  equals();
  prevEval = "equal";
});

clearBtn.addEventListener("click", (e) => {
  btnAnimation(e);

  inputValue = "";
  displayVal.textContent = 0;
  currentValue = 0;
  initialValue = 0;
  prevEval = "";
  alertMsg.classList.remove("show-alert");
});

document.addEventListener("keyup", (e) => {
  if (e.key >= 0 && e.key <= 9) {
    if (prevEval === "equal") {
      alertMsg.classList.add("show-alert");
      alertMsg.innerHTML = `<p>You must select an operator to continue!</p>`;
    } else {
      inputValue.textContent = "";
      let numVal = e.key;
      inputValue += numVal;
      displayVal.textContent = inputValue;
    }
  }

  if (e.key === "Enter") {
    equals();
    prevEval = "equal";
  }

  if (e.key === "=") {
    alertMsg.classList.remove("show-alert");
    if (prevEval === "") {
      prevEval = "add";
    }

    equals();
    prevEval = "add";
    console.log(prevEval);
  }

  if (e.key === "-") {
    alertMsg.classList.remove("show-alert");
    if (prevEval === "") {
      prevEval = "subtract";
    }
    //   mathmaticalEval(subtract);
    equals();
    prevEval = "subtract";
    console.log(prevEval);
  }

  if (e.key === "x") {
    alertMsg.classList.remove("show-alert");
    if (prevEval === "") {
      prevEval = "multiply";
    }
    //   mathmaticalEval(multiply);
    equals();
    prevEval = "multiply";
    console.log(prevEval);
  }

  if (e.key === "/") {
    alertMsg.classList.remove("show-alert");
    if (prevEval === "") {
      prevEval = "divide";
    }
    //   mathmaticalEval(divide);
    equals();
    prevEval = "divide";
    console.log(prevEval);
  }

  console.log(e.key);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" && inputValue !== "") {
    const newStr = inputValue.slice(0, inputValue.length - 1);
    inputValue = newStr;
    displayVal.textContent = newStr;
    console.log(newStr);
  }
});
