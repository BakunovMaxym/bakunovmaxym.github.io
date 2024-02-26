document.addEventListener("DOMContentLoaded", function () {
    let cbutt = document.getElementById("cbutt");

    cbutt.addEventListener("click", function () {
        generatePascalsElement();
    });
});

function generatePascalsElement() {
    let k = document.getElementById("rows").value;
    let n = document.getElementById("num").value -1;
    document.getElementById("result").innerHTML = "";

    const pascalsElement = calculatePascalsElement(k, n);
    displayPascalsElement(pascalsElement);
}

function calculatePascalsElement(k, n) {
    if (n < 0 || n > k) {
        return 0;
    }

    if (k === 0 || n === 0 || n === k) {
        return 1; 
    }
    if(n>=k-n){
        return (factorial(k, n+1)/(factorial(k-n, 1)));
    }else{
        return (factorial(k, k-n+1)/factorial(n, 1));
    }
}

const factorial = (e, x) => {
    let temp = 1;
    for (let i = x; i <= e; i++) {
        temp *= i;
        console.log(`i = ${i}`);
        console.log(`temp = ${temp}`);
    }
    console.log(temp);
    return temp;
}

function displayPascalsElement(element) {
    const resultDiv = document.getElementById("result");

    const containerElement = document.createElement("p");

    containerElement.textContent = "Елемент трикутника Паскаля: ";

    const numElement = document.createElement("span");
    numElement.textContent = element;
    numElement.classList.add("highlight"); 

    containerElement.appendChild(numElement);

    resultDiv.appendChild(containerElement);
}