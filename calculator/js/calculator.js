var inputField = document.getElementById("input-area");
var clearButton = document.getElementById("AC");
var resultButton = document.getElementById("=");
var numButtons = [];
var opsButtons = [];

for(let i = 0; i < 10; i++)
{
    numButtons[i] = document.getElementById(`${i}`);
    numButtons[i].addEventListener("click", function() {
        inputField.value += this.innerText;
    })
}

opsButtons[0] = document.getElementById("/");
opsButtons[1] = document.getElementById("*");
opsButtons[2] = document.getElementById("-");
opsButtons[3] = document.getElementById("+");

var resultString;
var result;
var numbers = [];
var operations = [];
var counter = 0;

for(let i = 0; i < 4; i++)
{
    opsButtons[i].addEventListener("click", function() {

        if(counter == 0)
            numbers.push(inputField.value);
        else 
            numbers.push(inputField.value.substring(numbers[counter - 1].length + 1));

        operations.push(this.innerText);
        inputField.value += this.innerText;
        counter++;
    }
    )
}

clearButton.addEventListener("click", function() {
    inputField.value = null;
})

resultButton.addEventListener("click", function() {
    numbers.push(inputField.value.substring(numbers[counter - 1].length + 1));
    findResult();
    inputField.value = numbers[numbers.length - 1];
    numbers = [];
    operations = [];
    counter = 0;
})

function findResult()
{
    let i = 1;
    while(i < numbers.length)
    {
        switch(operations[i-1])
        {
            case "+":
                result = parseFloat(numbers[i-1]) + parseFloat(numbers[i]);
                break;
            case "-":
                result = parseFloat(numbers[i-1]) - parseFloat(numbers[i]);
                break;
            case "*":
                result = parseFloat(numbers[i-1]) * parseFloat(numbers[i]);
                break;
            case "/":
                result = parseFloat(numbers[i-1]) / parseFloat(numbers[i]);
                break;
        }
        numbers[i] = result;
        i++;
    }
}