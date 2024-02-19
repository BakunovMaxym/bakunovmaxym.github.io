document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");

    tbutt.addEventListener("click", function () {
        generatePascalsTriangle();
    });
});

function generatePascalsTriangle() {
    let rowCount = document.getElementById("rows").value;
    document.getElementById("result").innerHTML = "";

    const pascalsTriangle = calculatePascalsTriangle(rowCount);
    displayPascalsTriangle(pascalsTriangle);
}

function calculatePascalsTriangle(rows) {
    let triangle = [];

    for (let i = 0; i < rows; i++) {
        triangle[i] = [];
        triangle[i][0] = 1;

        for (let j = 1; j < i; j++) {
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }

        triangle[i][i] = 1;
    }

    return triangle;
}

function displayPascalsTriangle(triangle) {
    const resultDiv = document.getElementById("result");

    for (let i = 0; i < triangle.length; i++) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row");

        for (let j = 0; j < triangle[i].length; j++) {
            let numElement = document.createElement("div");
            numElement.classList.add("number");
            numElement.textContent = triangle[i][j];
            rowElement.appendChild(numElement);
        }

        resultDiv.appendChild(rowElement);
    }
}