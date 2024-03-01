document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");
    var info = this.getElementsByClassName("triangle")[0];

    tbutt.addEventListener("click", function () {
        info.classList.add('overflow');
        info.classList.remove('triangle');
        generatePascalsTriangle();
    });
});

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");

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
    left.innerHTML = "";
    right.innerHTML = "";
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
        rowNumber.addEventListener('mouseover', handleRowNumberHover);
        rowNumber.addEventListener('mouseout', handleRowNumberHover);
    });
}

function handleMouseHover(event, rowIndex, elementIndex, tooltip, numElement, over, resultDiv) {
    tooltip.innerHTML = `
        <span>C</span>
        <span class="IDS">
            <span class ="ElemID">${elementIndex}</span>
            <span class ="RowID">${rowIndex }</span>
        </span>
    `;

    console.log(numElement.width);
    // console.log(over.scrollLeft );
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

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1}), #left .rowNumberActiveL:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1}), #right .rowNumberActiveR:nth-child(${rowIndex + 1})`);

    rowIdLeft.classList.toggle('rowNumberHover');
    rowIdRight.classList.toggle('rowNumberHover');
}