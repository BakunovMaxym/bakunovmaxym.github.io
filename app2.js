document.addEventListener("DOMContentLoaded", function () {
    const cbutt = document.getElementById("cbutt");

    cbutt.addEventListener("click", generatePascalsElement);
});

function generatePascalsElement() {
    const k = document.getElementById("rows").value;
    const n = document.getElementById("num").value - 1;
    const resultDiv = document.getElementById("result");

    if (isNaN(k) || isNaN(n)) {
        resultDiv.innerHTML = "Введіть коректні числові значення для k та n.";
        return;
    }

    resultDiv.innerHTML = "";

    const pascalsElement = calculatePascalsElement(k, n);
    displayPascalsElement(pascalsElement, resultDiv);
}

function calculatePascalsElement(k, n) {
    if (n < 0 || n > k) {
        return 0;
    }

    return n >= k - n ? factorial(k, n + 1) / factorial(k - n, 1) : factorial(k, k - n + 1) / factorial(n, 1);
}

const factorial = (e, x) => {
    let temp = 1;
    for (let i = x; i <= e; i++) {
        temp *= i;
    }
    console.log(temp);
    return temp;
}

function displayPascalsElement(element, resultDiv) {
    const containerElement = document.createElement("p");
    containerElement.textContent = `Елемент трикутника Паскаля: ${element}`;
    containerElement.classList.add("highlight"); 

    resultDiv.appendChild(containerElement);
}