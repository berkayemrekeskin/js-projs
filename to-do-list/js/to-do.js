const MAX_TODO = 10;

const inputInfo = document.getElementById("input");

let counter = 0;

let clicked = false;

function addToList()
{
    if(checkJobAvailabilty())
    {
        var newJob = document.createElement("div");
        newJob.className = "job";
    
        var newButton = document.createElement("button");
        newButton.className = "job button";
        newButton.id = "buttonID" + counter;

        var newImage = document.createElement("img");
        newImage.className = "tick";
        newImage.src = "/images/Check-Accept-Correct-512.webp";

        newButton.appendChild(newImage);

        newButton.addEventListener("click", function() {
            if(!clicked)
            {
                newImage.style.display = "block"; 
                clicked = true;
            }
            else 
            {
                newImage.style.display = "none"; clicked = false;
                clicked = false;
            }
        });
        
        var newText = document.createElement("p");
        newText.className = "job p";
        newText.innerText = inputInfo.value;

        var removeButton = document.createElement("button");
        removeButton.className = "remove";
        removeButton.innerText = "X";
        removeButton.style.marginLeft = "250px"

        newJob.appendChild(newButton);
        newJob.appendChild(newText);
        newJob.appendChild(removeButton);

        var list = document.getElementById("list");
        list.appendChild(newJob);
        counter++;
    
        removeButton.addEventListener("click", function() {
            list.removeChild(newJob);
            counter--;
        });
    }
}

function checkJobAvailabilty()
{
    if(counter >= MAX_TODO)
    {
        alert("You reached maximum job to do!");
        return false;
    }
    else if(inputInfo.value == "")
    {
        alert("Job description is empty!");
        return false;
    }
    return true;
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToList);


