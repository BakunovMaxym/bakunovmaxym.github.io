let rowCount;
let pascalsTriangle;
let isAllRowsDisplayed = false;

document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");
    var info = this.getElementsByClassName("triangle")[0];

    tbutt.addEventListener("click", function () {
        info.classList.add('overflow');
        info.classList.remove('triangle');
        rowCount = document.getElementById("rows").value;
        pascalsTriangle = calculatePascalsTriangle(rowCount);

        clearRowNumbers();

        generatePascalsTriangle();
        isAllRowsDisplayed = false;
    });


window.addEventListener('scroll', function () {
    let rows = document.querySelectorAll('.rowNumber');
    let lastRow = rows[rows.length - 1];
    //console.log(lastRow);

    
    if (lastRow.offsetTop <= window.scrollY + window.innerHeight && !isAllRowsDisplayed) {
        displayPascalsTriangle(pascalsTriangle, parseInt(lastRow.textContent) + 1, parseInt(lastRow.textContent) + 50);


        let temp = parseInt(lastRow.textContent) - Math.round(this.window.innerHeight/29) - 50;
        if(temp < 0)temp = -1;
        hidePascalsTriangle(temp, parseInt(lastRow.textContent) - this.window.innerHeight/29);

        if (parseInt(lastRow.textContent) + 50 >= pascalsTriangle.length - 1) {
            isAllRowsDisplayed = true;
        }        
    }

    
});

function clearRowNumbers() {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    left.innerHTML = "";
    right.innerHTML = "";
}
});


const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");

function generatePascalsTriangle() {
    document.getElementById("result").innerHTML = "";

    displayPascalsTriangle(pascalsTriangle, 0, window.innerHeight/29 + 10);
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


function displayPascalsTriangle(triangle, rowf, rowl) {
    const resultDiv = document.getElementById("result");
    const over = document.getElementsByClassName("overflow")[0];
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    let maxRowWidth = 0;

    for (let i = rowf; i < Math.min(triangle.length, rowl); i++) {
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
    
        rowElement.appendChild(tooltip);
    
        for (let j = 0; j < triangle[i].length; j++) {
            let numElement = document.createElement("div");
            numElement.classList.add("number");
            numElement.textContent = triangle[i][j];
            rowElement.appendChild(numElement);
    
            let isTooltipVisible = false;
            tooltip.style.display = "none";
    
            numElement.addEventListener('click', function (event) {
                if (!isTooltipVisible) {
                    handleMouseHover(event, i, j, tooltip, numElement, over, resultDiv);
                    isTooltipVisible = true;
                    tooltip.style.removeProperty('display');
                } else {
                    tooltip.innerHTML = " ";
                    tooltip.style.display = 'none';
                    isTooltipVisible = false;
                }
            });
        }
    
        resultDiv.appendChild(rowElement);
    
        var rowWidth = rowElement.offsetWidth;
    
        if (rowWidth > maxRowWidth) {
            maxRowWidth = rowWidth;
        }
    }
    over.style.overflowX = 'auto';
    if (maxRowWidth > over.clientWidth) {
        over.style.removeProperty('display');
    }
    if (maxRowWidth <= over.clientWidth) {
        over.style.display = 'flex';
    }
    
    resultDiv.style.width = maxRowWidth + 'px';
    over.scrollLeft = (over.scrollWidth - over.clientWidth) / 2;
    document.querySelectorAll('.rowNumber').forEach(function (rowNumber) {
        rowNumber.addEventListener('click', handleRowNumberClick);
        // rowNumber.addEventListener('mouseover', handleRowNumberHover);
        // rowNumber.addEventListener('mouseout', handleRowNumberHover);
    });

}

function hidePascalsTriangle(rowf, rowl) {
    
    console.log("working");
    for (let i = rowf - 9; i < rowl; i++) {
        const numElements = document.getElementsByClassName("row");

            //console.log(i);

            const numElement = numElements[Number(i)];
            const rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${i + 1}), #left .rowNumberActiveL:nth-child(${i + 1})`);
            const rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${i + 1}), #right .rowNumberActiveR:nth-child(${i + 1})`);

            numElement.innerHTML = "";
            if (rowIdLeft) {
                rowIdLeft.innerHTML = "";
                rowIdLeft.style.display="none"
            }
            if (rowIdRight){
                rowIdRight.innerHTML = "";
                rowIdRight.style.display="none"
        }
        //firstElement = Math.round(rowl + 1);
        // console.log(rowl);
    }
}


function handleMouseHover(event, rowIndex, elementIndex, tooltip, numElement, over, resultDiv) {
    tooltip.innerHTML = `
        <span>C</span>
        <span class="IDS">
            <span class ="ElemID">${elementIndex}</span>
            <span class ="RowID">${rowIndex }</span>
        </span>
    `;

    //console.log(numElement.width);
    tooltip.style.top = (numElement.offsetTop - 57) + 'px';
    tooltip.style.left = (numElement.offsetLeft - over.scrollLeft - 22 + numElement.offsetWidth /2) + 'px';

}



function handleRowNumberClick(event) {
    let rowIndex = parseInt(event.target.textContent);

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1}), #left .rowNumberActiveL:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1}), #right .rowNumberActiveR:nth-child(${rowIndex + 1})`);

    let rowElement = document.querySelector(`.row:nth-child(${rowIndex + 1})`);

    rowIdLeft.classList.toggle('rowNumberActiveL');
    rowIdLeft.classList.toggle('rowNumber');

    rowIdRight.classList.toggle('rowNumberActiveR');
    rowIdRight.classList.toggle('rowNumber');

    rowElement.classList.toggle('elementActive');
}

function handleRowNumberHover(event) {
    let rowIndex = parseInt(event.target.textContent);

    // Remove hover class from all rows
    document.querySelectorAll('.rowNumber').forEach(rowNumber => {
        rowNumber.classList.remove('rowNumberHover');
    });

    // Add hover class to the current row
    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1})`);

    rowIdLeft.classList.toggle('rowNumberHover');
    rowIdRight.classList.toggle('rowNumberHover');

}