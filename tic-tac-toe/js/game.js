const SIZE = 3;
const p1 = 'O';
const p2 = 'X';
const player1 = document.getElementById("p1");
const player2 = document.getElementById("p2");
player1.style.color = "rgb(0, 255, 51)";
player2.style.color = "#444";

let currentPlayer = p1;

function createGrid() {

    const board = document.getElementById("board-id");
    for (let i = 0; i < SIZE; i++)
    {
        for (let j = 0; j < SIZE; j++) 
        {
            const block = document.createElement("button");
            block.className = "block";
            block.id = `${i}${j}`;
            board.appendChild(block);

            block.addEventListener("click", function () {
                if (!block.textContent) 
                {
                    block.textContent = currentPlayer;
                    if(checkGameOver())
                    {
                        alert(currentPlayer + " WIN THE GAME!");
                        location.reload();
                        return;
                    }
                    currentPlayer = (currentPlayer === p1) ? p2 : p1;
                    changePlayer();
                }
            });
            
        }
    }
}

function changePlayer()
{
    if(currentPlayer == p1)
    {
        player1.style.color = "rgb(0, 255, 51)";
        player2.style.color = "#444";
    }
    else 
    {
        player1.style.color = "#444";
        player2.style.color = "rgb(0, 255, 51)";
    }
}

function isGridFull()
{
    for(let i  = 0; i < SIZE; i++)
    {
        for(let j = 0; j < SIZE; j++)
        {
            const block = document.getElementById(`${i}${j}`);
            if(!block.textContent)
                return false;
        }
    }
    return true;
}

function checkHorizontal()
{
    for(let i = 0; i < SIZE; i++)
    {
        const block1 = document.getElementById(`${i}${0}`);
        const block2 = document.getElementById(`${i}${1}`);
        const block3 = document.getElementById(`${i}${2}`);
        if((block1.textContent === block2.textContent && block2.textContent === block3.textContent)
            && (block1.textContent !== "" && block2.textContent !== "" && block3.textContent !== ""))  
            return true;
    }
    return false;
}

function checkVertical()
{
    for(let i = 0; i < SIZE; i++)
    {
        const block1 = document.getElementById(`${0}${i}`);
        const block2 = document.getElementById(`${1}${i}`);
        const block3 = document.getElementById(`${2}${i}`);
        if((block1.textContent === block2.textContent && block2.textContent === block3.textContent)
            && (block1.textContent !== "" && block2.textContent !== "" && block3.textContent !== ""))  
            return true;
    }
    return false;
}

function checkDiagonal()
{
    const block1 = document.getElementById(`${0}${0}`);
    const block2 = document.getElementById(`${1}${1}`);
    const block3 = document.getElementById(`${2}${2}`);
    const block11 = document.getElementById(`${0}${2}`);
    const block33 = document.getElementById(`${2}${0}`);

    if(((block1.textContent === block2.textContent && block2.textContent === block3.textContent) && (block1.textContent !== "" && block2.textContent !== "" && block3.textContent !== "")) || 
        ((block11.textContent === block2.textContent && block2.textContent === block33.textContent) && (block11.textContent !== "" && block2.textContent !== "" && block33.textContent !== "")))
        return true;
    
    return false;
}

function checkGameOver()
{
    return checkHorizontal() || checkDiagonal() || checkVertical();
}


createGrid();