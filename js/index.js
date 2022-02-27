// Milestone 1
/* for (let i = 0; i < 10; i++) {
    let X = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let Y = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    let text = document.createElement('div');
    text.textContent = "The Fibonacci of " + X[i] + " is " + Y[i];
    let wrapper = document.getElementById('wrapper');
    wrapper.append(text);
} */

// Milestone 2
/* for (let i = 0; i <= 10; i++) {
    let X = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    function Y(X) {
    if (X == 0) {
        return 0;
    } else if (X == 1 || X == 2) {
        return 1; 
    }else {
        return Y(X - 2) + Y(X - 1);
    }
}  
    let text = document.createElement('div');
    text.textContent = "The Fibonacci of " + X[i] + " is " + Y(X[i]);
    let wrapper = document.getElementById('wrapper');
    wrapper.append(text);
} */

//Milestone 3
function showResultLocally() {
    let userInput = document.getElementById('input');
    let X = userInput.value;
    function Y(X) {
        if (X == 0) {
        return 0;
    } else if (X == 1 || X == 2) {
        return 1; 
    }else {
        return Y(X - 2) + Y(X - 1);
    }
}; 
let result = document.getElementById('output');
result.textContent = Y(X);
let calcWrapper = document.getElementById('calc-wrapper');
calcWrapper.append(result);
};

//Milestone 4, 5
let spinner = document.getElementById("spinner"); //defining spinner
function showResult() {
    let result = document.getElementById('output');
    result.textContent = "";
    let userInput = document.getElementById('input');
    let X = userInput.value;
    if (X > 50) {
       document.getElementById('alert-message').className = "alertclass-active";
       document.getElementById('input').className = 'input_error'; 
    } else {
        document.getElementById('alert-message').className = "no-alert";
        document.getElementById('input').className = 'input';
        spinner.classList.toggle('spinner_active'); //spinner is active
        let url = `http://localhost:5050/fibonacci/${X}`;
        fetch(url)
        .then((response) => {
            if (response.status != 200) {
                spinner.classList.remove('spinner_active'); //remove spinner
                result.textContent = "Server error: 42 is the meaning of life";
                result.className = 'output_42';
            } else {
                result.className = "output";
            }
            return response.json();
        })
        .then((data) => {
            result.textContent = data.result;
            let calcWrapper = document.getElementById('calc-wrapper');
            calcWrapper.append(result);
            spinner.classList.remove('spinner_active'); //remove spinner
        })};

// Milestone 6
let spinner2 = document.getElementById("spinner_2"); //defining spinner_2
function ShowResultsList() {
    spinner2.classList.toggle('spinner_active'); //spinner is active
    let newUrl = "http://localhost:5050/getFibonacciResults";
    fetch(newUrl).then((response) => response.json()).then((data) => {
        let newArray = data.results.sort(function (a, b) { //Sorting the array by createdDate value
            return b.createdDate - a.createdDate;
        });
        let resultsWrapper = document.createElement('div');
        resultsWrapper.classList.add('results-wrapper');
        document.getElementById('wrapper').append(resultsWrapper);
        for (let j=0; j < 3; j++) {
            let convertedDate = new Date(newArray[j].createdDate);
            let num = newArray[j].number;
            let res = newArray[j].result;
            let resultRow = document.createElement('div');
            resultRow.classList.add('result-row');
            resultRow.textContent = "The Fibonacci of " + num + " is " + res + ". Calculated at: " + convertedDate;
            resultsWrapper.append(resultRow);
            spinner2.classList.remove('spinner_active'); //remove spinner
        }     
    });
    // Clearing the DOM
    var elem = document.querySelector('.results-wrapper'); 
    elem.parentNode.removeChild(elem);
    }
ShowResultsList();
}
//Milestone 7
let button = document.getElementById("button");
let checkbox = document.getElementById('checkbox');
if (checkbox.checked == false) { // Initially
    button.onclick = showResultLocally;  
} 
checkbox.addEventListener('change', function() { //If the user change the checkbox status
    if (checkbox.checked == true) { 
        button.onclick = showResult;
    } else {
        button.onclick = showResultLocally;
    }
})
