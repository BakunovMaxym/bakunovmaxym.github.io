document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");
    var info = this.getElementsByClassName("triangle")[0];
    let lScroll = document.getElementById("lScroll");

    tbutt.addEventListener("click", function () {
        info.classList.add('overflow');
        info.classList.remove('triangle');
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
    const over = document.getElementsByClassName("overflow")[0];


    let maxRowWidth = 0;

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

        var rowWidth = rowElement.offsetWidth;

        if (rowWidth > maxRowWidth) {
            maxRowWidth = rowWidth;
        }

        
    }
    
    if(rowWidth <= over.clientWidth){
        over.style.display = 'flex';
        over.style.removeProperty('overflow-x');
    }else if(rowWidth > over.clientWidth){
        over.style.removeProperty('display');
        //over.style.overflow-x = 'scroll';
    }
    
    resultDiv.style.width = maxRowWidth + 'px';
    over.scrollLeft = (over.scrollWidth - over.clientWidth) / 2;
    console.log(over.scrollLeft);

    hui.addEventListener("click", function () {
        over.scrollLeft += 100;
        console.log(over.scrollLeft);

    });
}