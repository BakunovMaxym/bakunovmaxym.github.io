let rowCount;
let pascalsTriangle;
let isAllRowsDisplayedUp = false;
let isAllRowsDisplayedDown = false;
let firstRowUp = 0;
let firstRowDown = 0;
let hideDownFirst = 0;
let hideDownSecond = 1;
let addRowUp = 0;
let addRowDown = 0;
let isScrollDown = true;
var isScrollToMiddle = false;
var highestElement;

var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var documentHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

var scrollToMiddle;

document.addEventListener("DOMContentLoaded", function () {
    let tbutt = document.getElementById("tbutt");
    var info = this.getElementsByClassName("triangle")[0];
    let windowRowCount = Math.round(window.innerHeight / 29 * 1.7);

    tbutt.addEventListener("click", function () {
        info.classList.add('overflow');
        info.classList.remove('triangle');
        rowCount = document.getElementById("rows").value;
        pascalsTriangle = calculatePascalsTriangle(rowCount);
        isScrollDown = true;
        clearRowNumbers();

        generatePascalsTriangle();
        isAllRowsDisplayed = false;

        
    });

    let lastScrollTop = 0;



    window.addEventListener('scroll', function () {

        let st = window.pageYOffset || document.documentElement.scrollTop;
        let rows = document.querySelectorAll('.rowNumber');
        //console.log(rows);
        let lastRow = rows[rows.length - 1];
        //console.log(lastRow);

        var highestTop = Infinity;

        rows.forEach(function (current) {
            var rect = current.getBoundingClientRect();
            if (rect.top < highestTop && current.textContent.trim() !== "") {
                highestTop = rect.top;
                highestElement = current;
            }
        });

        // console.log(highestElement);

        if (st > lastScrollTop) {
            displayDownFirst = parseInt(lastRow.textContent);
            displayDownSecond = parseInt(lastRow.textContent) + windowRowCount;
            //scroll down 
            isScrollDown = true;
            if (lastRow.offsetTop <= window.scrollY + window.innerHeight && !isAllRowsDisplayedDown) {
                displayPascalsTriangle(pascalsTriangle, displayDownFirst+1, displayDownSecond);

                hideDownFirst = parseInt(highestElement.textContent);
                hideDownSecond = displayDownFirst - 10;
                console.log(hideDownSecond);
                if(hideDownFirst < 0)hideDownFirst = 0;

                console.log("+++++++++++++++++++++++");
                console.log(displayDownFirst);
                console.log(displayDownSecond);
                console.log(hideDownFirst)
                console.log(hideDownSecond)
                console.log(displayDownFirst - displayDownSecond)
                console.log(hideDownFirst - hideDownSecond)
                console.log("+++++++++++++++++++++++");

                isScrollToMiddle = true;
                hidePascalsTriangle(hideDownFirst, hideDownSecond+2, 1);
                var scrollToMiddle = window.innerHeight / 2.5;
                window.scrollTo(0, scrollToMiddle);

                if (parseInt(lastRow.textContent) + windowRowCount >= pascalsTriangle.length) {
                    isAllRowsDisplayedDown = true;
                }
                isAllRowsDisplayedUp = false;
            }
        } 
        else {

            //scroll up

            isScrollDown = false;

            // console.log("highestElement", highestElement.offsetTop);
            // console.log("scroll", this.window.scrollY);


            if (highestElement.offsetTop >= this.window.scrollY && !isAllRowsDisplayedUp) {
                displayDownFirst = parseInt(lastRow.textContent);
                displayDownSecond = displayDownFirst - windowRowCount + 15;

                hideDownFirst = parseInt(highestElement.textContent);
                hideDownSecond = hideDownFirst - windowRowCount;
                if (hideDownSecond < 0) hideDownSecond = 0;

                hideUpFirst = parseInt(lastRow.textContent);
                hideUpSecond = hideUpFirst - windowRowCount;


                console.log("----------------------");
                console.log(rows.length);
                console.log(hideDownFirst);
                console.log(hideDownSecond);
                console.log(displayDownFirst)
                console.log(displayDownSecond)
                console.log("----------------------");


                if (hideDownSecond == 0) {
                    isAllRowsDisplayedUp = true;
                }
                // if (isAllRowsDisplayedUp) {

                // }
                // console.log(rows);

                    displayPascalsTriangle(pascalsTriangle, hideDownSecond, hideDownFirst);
                    // console.log('success');
 
                    
                    hidePascalsTriangle(displayDownSecond, displayDownFirst+1, displayDownFirst - displayDownSecond + 28);
                    
                    
                console.log(hideDownSecond);

                    // console.log(rows);
                    
                    // var scrollToMiddle = windowHeight / 1.1;
                    // document.documentElement.scrollTop = scrollToMiddle;
                    // document.body.scrollTop = scrollToMiddle;
                    var scrollToMiddle = window.innerHeight / 0.7;
                    window.scrollTo(0, scrollToMiddle);
                console.log("scrollToMiddle", scrollToMiddle);

                }
            }
            // console.log(rows);

        
        lastScrollTop = st;

        
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

    displayPascalsTriangle(pascalsTriangle, 0, (window.innerHeight / 29 * 1.7));
    
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

    const firstNum = resultDiv.firstChild;
    const firstLeft = left.firstChild;
    const firstRight = right.firstChild;

    for (let i = rowf; i < Math.min(triangle.length, rowl); i++) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row");

        let rowNumber = document.createElement("div");
        rowNumber.classList.add("rowNumber");
        rowNumber.textContent = i;
        let rowNumber2 = document.createElement("div");
        rowNumber2.classList.add("rowNumber");
        rowNumber2.textContent = i;

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
                    console.log("show tip");
                    tooltip.offsetTop = numElement.offsetTop
                    console.log(numElement.offsetTop);
                    console.log(tooltip.offsetTop);
                    console.log(tooltip.offsetLeft);
                    console.log(tooltip.style.display);
                    console.log(tooltip);
                } else {
                    tooltip.innerHTML = " ";
                    tooltip.style.display = 'none';
                    isTooltipVisible = false;
                    console.log("hide tip");
                }
            });
        }

        if (isScrollDown) {
            left.appendChild(rowNumber);
            right.appendChild(rowNumber2);

            resultDiv.appendChild(rowElement);
        }
        else {
            // console.log("firstLeft", firstLeft);
            // console.log("rowNumber", rowNumber);
            // console.log("firstRight", firstRight);
            // console.log("rowNumber2", rowNumber2);
            // console.log("firstNum", firstNum);
            // console.log("rowElement", rowElement);

            left.insertBefore(rowNumber, firstLeft);
            right.insertBefore(rowNumber2, firstRight);

            resultDiv.insertBefore(rowElement, firstNum);
        }

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

function hidePascalsTriangle(rowf, rowl, temp) {

    console.log("working");
    console.log("=================");
    console.log(rowf);
    console.log(rowl);
    console.log(temp);
    console.log("=================");
    const numElements = document.getElementsByClassName("row");
    // console.log(numElements);

    for (let i = rowf; i < rowl; i++) {

        //console.log(i);

        const numElement = numElements[temp-1];
        const rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${temp}), #left .rowNumberActiveL:nth-child(${temp})`);
        const rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${temp}), #right .rowNumberActiveR:nth-child(${temp})`);
        const rowIdLeftArr = document.getElementById(`left`);
// console.log(rowIdLeftArr.childElementCount);

        // console.log(rowIdLeft);
        // console.log(rowIdRight);
        // console.log(i);

        //numElement.remove();
        // numElement.innerHTML = "";
        numElement.remove();
        if (rowIdLeft) {
            // rowIdLeft.innerHTML = "";
            // rowIdLeft.style.display="none"
            rowIdLeft.remove();
        }
        if (rowIdRight) {
            // rowIdRight.innerHTML = "";
            // rowIdRight.style.display="none"
            rowIdRight.remove();
        }
        // console.log(rowl);
    }

}


function handleMouseHover(event, rowIndex, elementIndex, tooltip, numElement, over, resultDiv) {
    tooltip.innerHTML = `
        <span>C</span>
        <span class="IDS">
            <span class ="ElemID">${elementIndex}</span>
            <span class ="RowID">${rowIndex}</span>
        </span>
    `;

    //console.log(numElement.width);
    tooltip.style.top = (numElement.offsetTop - 57) + 'px';
    tooltip.style.left = (numElement.offsetLeft - over.scrollLeft - 22 + numElement.offsetWidth / 2) + 'px';

}



function handleRowNumberClick(event) {
    let rowIndex = parseInt(event.target.textContent);
    // console.log(rowIndex);
    // console.log(rowIndex - hideDownSecond);
    // console.log(hideDownSecond);

    // console.log(document.getElementsByClassName("rowNumber"));

    let firstElemend = 0;

    if (highestElement !== undefined) {
        firstElemend = highestElement.textContent;
    } else {
        firstElemend = 0;
    }
    if(firstElemend === undefined) firstElemend = 0;

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex - firstElemend +1}), #left .rowNumberActiveL:nth-child(${rowIndex - firstElemend +1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex - firstElemend +1}), #right .rowNumberActiveR:nth-child(${rowIndex - firstElemend +1})`);
    console.log(rowIdLeft);
    console.log(rowIdRight);

    let rowElement = document.querySelector(`.row:nth-child(${rowIndex - firstElemend +1})`);

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