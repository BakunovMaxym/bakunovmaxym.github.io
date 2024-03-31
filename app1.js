let rowCount;
let pascalsTriangle;
let isAllRowsDisplayedUp = true;
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
let isOverflowed = false;
let isTooltipVisible = false;

var scrollSpeed = 5;
let holdTime = 0;
let scrollInterval;

const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

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
        // info.innerHTML = "";
        info.classList.add('overflow');
        info.classList.remove('triangle');
        rowCount = parseInt(document.getElementById("rows").value);
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
        let lastRow = rows[rows.length - 1];

        var highestTop = Infinity;

        rows.forEach(function (current) {
            var rect = current.getBoundingClientRect();
            if (rect.top < highestTop && current.textContent.trim() !== "") {
                highestTop = rect.top;
                highestElement = current;
            }
        });

        if (st > lastScrollTop && lastRow.textContent != rowCount) {
            displayDownFirst = parseInt(lastRow.textContent);
            displayDownSecond = parseInt(lastRow.textContent) + windowRowCount;

            //scroll down 
            isScrollDown = true;

            if (lastRow.offsetTop <= window.scrollY + window.innerHeight && !isAllRowsDisplayedDown) {
                if (displayDownSecond > rowCount) {
                    displayDownSecond = rowCount;
                    isAllRowsDisplayedDown = true;
                }
                // console.log("+++++++++++++++++++++++");
                // console.log(displayDownFirst + 1);
                // console.log(displayDownSecond + 1);
                displayPascalsTriangle(pascalsTriangle, displayDownFirst + 1, displayDownSecond);

                hideDownFirst = parseInt(highestElement.textContent);
                if (hideDownFirst < 0) hideDownFirst = 0;
                hideDownSecond = displayDownFirst - 10;

                isScrollToMiddle = true;
                // console.log(displayDownFirst - displayDownSecond);
                // console.log(hideDownFirst - hideDownSecond);
                // console.log(hideDownSecond);
                // console.log(highestElement);

                // console.log(isAllRowsDisplayedUp);
                // console.log(hideDownSecond - hideDownFirst);
                var scrollToMiddle;
                scrollToMiddle = window.innerHeight / 2.5;

                if (hideDownSecond - hideDownFirst + 1 >= windowRowCount) {
                    hidePascalsTriangle(hideDownFirst, hideDownSecond, 1);
                isAllRowsDisplayedUp = false;
                scrollToMiddle = window.innerHeight / 2.8;
            }else{
                scrollToMiddle = document.documentElement.scrollHeight / 2.4;
            }
                // console.log(isAllRowsDisplayedUp);
                window.scrollTo(0, scrollToMiddle);
                // console.log("+++++++++++++++++++++++");

            }
        }
        // else {

        //scroll up

        isScrollDown = false;

        if (highestElement.offsetTop >= this.window.scrollY && !isAllRowsDisplayedUp) {
            if(highestElement.textContent == 0) isAllRowsDisplayedUp = true;
            displayDownFirst = parseInt(lastRow.textContent) + 1;
            displayDownSecond = displayDownFirst - windowRowCount + 10;
            if (displayDownSecond < windowRowCount) diwindowRowCount = windowRowCount;

            hideDownFirst = parseInt(highestElement.textContent);
            hideDownSecond = hideDownFirst - windowRowCount;
            if (hideDownSecond < 0) hideDownSecond = 0;

            hideUpFirst = parseInt(lastRow.textContent);
            hideUpSecond = hideUpFirst - windowRowCount;


            // // console.log("---------------------");
            // console.log(hideDownFirst - hideDownSecond);
            // console.log(displayDownSecond - displayDownFirst);
            // // console.log(hideDownSecond);
            // // console.log(hideDownFirst);
            // // console.log(displayDownSecond + 1);
            // // console.log(displayDownFirst + 1);

            // // console.log(hideDownSecond - hideDownFirst);
            // // console.log(windowRowCount);
            // // console.log(isAllRowsDisplayedUp);
            // console.log("---------------------");

            displayPascalsTriangle(pascalsTriangle, hideDownSecond, hideDownFirst);
            // if (displayDownFirst - displayDownSecond >= 1.5 * windowRowCount) {
                // console.log("fbdfbdfb");
                hidePascalsTriangle(displayDownSecond + 1, displayDownFirst + 1, displayDownFirst - hideDownSecond + 1);
                isAllRowsDisplayedDown = false;
            // }

            var scrollToMiddle = window.innerHeight / 0.7;
            window.scrollTo(0, scrollToMiddle);
        }
        if (hideDownSecond == 0) {
            isAllRowsDisplayedUp = true;
        }
        // console.log(isAllRowsDisplayedUp);
    

        lastScrollTop = st;


});

function clearRowNumbers() {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const res = document.getElementById("result");
    left.innerHTML = "";
    right.innerHTML = "";
    res.innerHTML = "";
}

setupScrollButtons();

    
});

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");

function setupScrollButtons() {
    scrollLeftBtn.addEventListener('mousedown', () => {
        startScroll(-1); // Scroll left
        if (isTooltipVisible) {
            console.log("bdfbdfb")
            tooltip.innerHTML = " ";
            tooltip.style.display = 'none';
            isTooltipVisible = false;
        }
    });

    scrollLeftBtn.addEventListener('mouseup', stopScroll);
    scrollLeftBtn.addEventListener('mouseleave', stopScroll);

    scrollRightBtn.addEventListener('mousedown', () => {
        startScroll(1); // Scroll right
        if (isTooltipVisible) {
            console.log("bdfbdfb")
            tooltip.innerHTML = " ";
            tooltip.style.display = 'none';
            isTooltipVisible = false;
        }
    });

    scrollRightBtn.addEventListener('mouseup', stopScroll);
    scrollRightBtn.addEventListener('mouseleave', stopScroll);
}

function generatePascalsTriangle() {
    document.getElementById("result").innerHTML = "";

    displayPascalsTriangle(pascalsTriangle, 0, (window.innerHeight / 29 * 1.7));
}

function calculatePascalsTriangle(rows) {
    let triangle = [];

    for (let i = 0; i <= rows; i++) {
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

        if (isScrollDown) {
            left.appendChild(rowNumber);
            right.appendChild(rowNumber2);
            resultDiv.appendChild(rowElement);
        }
        else {
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
        isOverflowed = true;
        if(windowHeight >= 900){

            scrollLeftBtn.style.display = "block";
            scrollRightBtn.style.display = "block";
        }
    }
    if (maxRowWidth <= over.clientWidth) {
        over.style.display = 'flex';
        isOverflowed = false;
        scrollLeftBtn.style.display = "none";
        scrollRightBtn.style.display = "none";
    }

    resultDiv.style.width = maxRowWidth + 'px';
    over.scrollLeft = (over.scrollWidth - over.clientWidth) / 2;
    document.querySelectorAll('.rowNumber').forEach(function (rowNumber) {
        rowNumber.addEventListener('click', handleRowNumberClick);
    });

}

function startScroll(direction) {
    scrollInterval = setInterval(() => {
        document.querySelector('.overflow').scrollLeft += direction * scrollSpeed;
        holdTime += 5;
        if (holdTime % 50 === 0) {
            increaseScrollSpeed();
        }
    }, 5);
}

function stopScroll() {
    clearInterval(scrollInterval);
    scrollSpeed = 5;
    holdTime = 0;
}

function increaseScrollSpeed() {
    scrollSpeed = scrollSpeed + 1;
}

function hidePascalsTriangle(rowf, rowl, temp) {
    // console.log("working")
    const numElements = document.getElementsByClassName("row");

    const elementsWithId = document.querySelectorAll('#left .rowNumber, #left .rowNumberActiveL');

    for (let i = rowf; i < rowl; i++) {

        temp--;
        if (temp <= 1) temp = 1;

        const numElement = numElements[temp - 1];
        const rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${temp}), #left .rowNumberActiveL:nth-child(${temp})`);
        const rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${temp}), #right .rowNumberActiveR:nth-child(${temp})`);

        numElement.remove();
        if (rowIdLeft) {
            rowIdLeft.remove();
        }
        if (rowIdRight) {
            rowIdRight.remove();
        }
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

    tooltip.style.top = (numElement.offsetTop - 57) + 'px';
    tooltip.style.left = (numElement.offsetLeft - over.scrollLeft - 22 + numElement.offsetWidth / 2) + 'px';

}



function handleRowNumberClick(event) {
    let rowIndex = parseInt(event.target.textContent);
    let firstElemend = 0;

    if (highestElement !== undefined) {
        firstElemend = highestElement.textContent;
    } else {
        firstElemend = 0;
    }
    if (firstElemend === undefined) firstElemend = 0;

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex - firstElemend + 1}), #left .rowNumberActiveL:nth-child(${rowIndex - firstElemend + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex - firstElemend + 1}), #right .rowNumberActiveR:nth-child(${rowIndex - firstElemend + 1})`);

    let rowElement = document.querySelector(`.row:nth-child(${rowIndex - firstElemend + 1})`);

    rowIdLeft.classList.toggle('rowNumberActiveL');
    rowIdLeft.classList.toggle('rowNumber');

    rowIdRight.classList.toggle('rowNumberActiveR');
    rowIdRight.classList.toggle('rowNumber');

    rowElement.classList.toggle('elementActive');
}

function handleRowNumberHover(event) {
    let rowIndex = parseInt(event.target.textContent);

    document.querySelectorAll('.rowNumber').forEach(rowNumber => {
        rowNumber.classList.remove('rowNumberHover');
    });

    let rowIdLeft = document.querySelector(`#left .rowNumber:nth-child(${rowIndex + 1})`);
    let rowIdRight = document.querySelector(`#right .rowNumber:nth-child(${rowIndex + 1})`);

    rowIdLeft.classList.toggle('rowNumberHover');
    rowIdRight.classList.toggle('rowNumberHover');

}