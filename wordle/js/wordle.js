/* 
    1. Read a random word from the words.txt file
    2. Break the word through it's letters.
    3. Check the given input through the letter array, if position and word is correct, change it's style to correct, 
    if it occurs but not on the right position, change it's style to occur.
    4. 2 outputs: Done & Out Of Options.
*/

const COLS = 5;
const ROWS = 6;

var restartButton = document.getElementById("restart-button");
var checkButton = document.getElementById("check-button");
var container = document.getElementById("container");
var index = 0;


function createGrid()
{
    for(let i = 0; i < ROWS; i++)
    {
        var inputContainer = document.getElementById("input" + `${i}`);
        for(let j = 0; j < COLS; j++)
        {   
            let block = document.createElement("input");
            block.id = `${i}${j}`;
            block.className = "block-empty";
            block.maxLength = "1";
            inputContainer.appendChild(block);
        }
    }
}

function checkInput(input,lineNumber)
{
    for(let i = 0; i < COLS; i++)
    {
        var block = document.getElementById(`${lineNumber}${i}`);
        var value = block.value.toLowerCase();
        
        if(input.includes(value) && value != "")
        {
            if(value == input[i])
            {
                block.className = "block-true";
            }
            else 
            {
                for(let j = 0; j < COLS; j++)
                {
                    if(input[j] == value && j != i && document.getElementById(`${lineNumber}${j}`).className == "block-empty")
                    {
                        block.className = "block-contains";
                        break;
                    }
                }
            }
        }
    }
}

function blockOtherTiles(lineNumber)
{
    for(let i = 0; i < ROWS; i++)
    {
        for(let j = 0; j < COLS; j++)
        {
            if(i != lineNumber)
            {
                var block = document.getElementById(`${i}${j}`);
                block.disabled = "true";
            }
        }
    }
}

function clearTiles()
{
    for(let i = 0; i < ROWS; i++)
    {
        for(let j = 0; j < COLS; j++)
        {
            var block = document.getElementById(`${i}${j}`);
            block.removeAttribute('disabled');
        }
    }
}

function isGameOver(lineNumber)
{
    for(let i = 0; i < COLS; i++)
    {
        var block = document.getElementById(`${lineNumber}${i}`);
        console.log(block.className);
        if(block.className != "block-true")
            return false;
    }
    return true;
}


function isInputFull(lineNumber)
{
    for(let i = 0; i < COLS; i++)
    {
        var block = document.getElementById(`${lineNumber}${i}`);
        if(block.value == "")
            return false;
    }
    return true;
}

function startGame(index)
{
    clearTiles();
    blockOtherTiles(index);
}

async function getRandomWord() {
    try {
        const response = await fetch('../db/5-letter-words.json');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * 1000) + 1;
        const randomWord = data[randomIndex].toString();
        console.log(randomWord.toString());    
        return randomWord.toString(); // Return the random word if needed
    } catch (error) {
        console.error('Error fetching random word:', error);
        return null; // Handle errors gracefully
    }
}

var randomWord; 

(async function() {
    try {
        randomWord = await getRandomWord(); 
        console.log(randomWord);
        createGrid();
        startGame(index);
    } catch(error) {
        console.log(error);
    }
})();


checkButton.addEventListener("click", function() {
    if(isInputFull(index))
    {
        console.log(index);
        if(index > 5) {
            alert("You are out of options!");
            return ;
        }
        checkInput(randomWord, index);
        if(isGameOver(index))
        {
            alert("You Win!");
            return;
        }
        index++;
        startGame(index);
    }
})

restartButton.addEventListener("click", function() {
    location.reload();
}
)