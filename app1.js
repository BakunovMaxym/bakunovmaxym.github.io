document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");
    var info = this.getElementsByClassName("triangle")[0];

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
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    left.innerHTML="";
    right.innerHTML="";
    let maxRowWidth = 0;

    for (let i = 0; i < triangle.length; i++) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row");

        let rowNumber = document.createElement("div");
        rowNumber.classList.add("rowNumber");
        rowNumber.textContent = i;
        let rowNumber2 = document.createElement("div");
        rowNumber2.classList.add("rowNumber");
        rowNumber2.textContent = i;
        left.appendChild(rowNumber);
        right.appendChild(rowNumber2);
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
        over.style.overflowX = 'auto';
    }
    
    resultDiv.style.width = maxRowWidth + 'px';
    over.scrollLeft = (over.scrollWidth - over.clientWidth) / 2;

    document.querySelectorAll('.rowNumber').forEach(function(rowNumber) {
        rowNumber.addEventListener('click', handleRowNumberClick);
    });

    document.querySelectorAll('.rowNumber').forEach(function(rowNumber) {
        rowNumber.addEventListener('click', handleRowNumberClick);
        rowNumber.addEventListener('mouseover', handleRowNumberHover);
        rowNumber.addEventListener('mouseout', handleRowNumberHover);
    });
}

function handleRowNumberClick(event) {
    let rowIndex = parseInt(event.target.textContent);

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1}), #left .rowNumberActiveL:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1}), #right .rowNumberActiveR:nth-child(${rowIndex + 1})`);
    console.log(rowIdLeft);
    
    let rowElement = document.querySelector(`.row:nth-child(${rowIndex + 1})`);

    rowIdLeft.classList.toggle('rowNumberActiveL');
    rowIdLeft.classList.toggle('rowNumber');
    
    rowIdRight.classList.toggle('rowNumberActiveR');
    rowIdRight.classList.toggle('rowNumber');

    rowElement.classList.toggle('elementActive');
}



function handleRowNumberHover(event) {
    let rowIndex = parseInt(event.target.textContent);

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1}), #left .rowNumberActiveL:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1}), #right .rowNumberActiveR:nth-child(${rowIndex + 1})`);

    console.log(rowIdLeft);
    console.log(rowIdRight);
    
    rowIdLeft.classList.toggle('rowNumberHover');
    rowIdRight.classList.toggle('rowNumberHover');
}