var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var rectSize = 10;
var drag = false;
var positions = [];
var lastMove = [];
var starting;
var drawOption;

const dead = 0;
const alive = 1;
const tagDead = 2;
const tagAlive = 3;


ctx.strokeStyle = "#666";

drawGrid();

canvas.addEventListener("mousedown", e => {
    drag = true;
    drawOption = document.querySelector('input[name="drawOptions"]:checked').value;

    var xCoordinate = e.clientX - e.clientX%rectSize - rectSize;
    var yCoordinate = e.clientY - e.clientY%rectSize - rectSize;

    var xPosition = Math.floor((e.clientX - rectSize) / rectSize);
    var yPosition = Math.floor((e.clientY - rectSize) / rectSize);

    console.log(xPosition, yPosition)

    if(drawOption === "draw"){
        addCell(xCoordinate, yCoordinate, yPosition, xPosition);
    } else {
        removeCell(xCoordinate, yCoordinate, yPosition, xPosition);
    }
});

canvas.addEventListener("mousemove", e=> {
    if(drag === true) {
        
        var drawOption = document.querySelector('input[name="drawOptions"]:checked').value;

        var xCoordinate = e.clientX - e.clientX%rectSize - rectSize;
        var yCoordinate = e.clientY - e.clientY%rectSize - rectSize;

        var xPosition = Math.floor((e.clientX - rectSize) / rectSize);
        var yPosition = Math.floor((e.clientY - rectSize) / rectSize);

        if(lastMove[0] != xPosition || lastMove[1] != yPosition) {
            if(drawOption === "draw"){
                addCell(xCoordinate, yCoordinate, yPosition, xPosition);
            } else {
                removeCell(xCoordinate, yCoordinate, yPosition, xPosition);
            }
        }
    }
});

canvas.addEventListener("mouseup", function(){
    drag = false;
});

function drawGrid() {

    for(var i = 0; i < height; i += rectSize) {
        var row = [];
        for( var j = 0; j < width; j += rectSize) {
            ctx.strokeRect(j, i, rectSize, rectSize);
            row.push(dead);
        }
        positions.push(row);
    }
}

function updateGrid() {
    
    for(var i = 0; i < height/rectSize; i++) {
        for( var j = 0; j < width/rectSize; j++) {

            var neighbors = cellCount(j, i);

            if(positions[i][j] === dead) {
                if(neighbors === 3) {
                    positions[i][j] = tagAlive;
                }
            } else if(neighbors < 2 || neighbors > 3) {
                positions[i][j] = tagDead;
            }
            
        }
    }

    for(var i = 0; i < height/rectSize; i++) {
        for( var j = 0; j < width/rectSize; j++) {

            if(positions[i][j] === tagAlive) {
                addCell(j*rectSize, i*rectSize, i, j);
            } else if(positions[i][j] === tagDead) {
                removeCell(j*rectSize, i*rectSize, i, j);
            }
            
        }
    }
}

function startStopGame() {
    var startButton = document.getElementById("startButton");
    if (startButton.value === "Stop") {
        startButton.value = "Start";
        clearInterval(starting);
    } else {
        starting = setInterval(updateGrid, 500)
        startButton.value = "Stop";
    }
}

function addCell(xCoordinate, yCoordinate, yPosition, xPosition) {

    ctx.fillRect(xCoordinate, yCoordinate, rectSize, rectSize);

    positions[yPosition][xPosition] = 1;
    lastMove = [xPosition, yPosition];
}

function removeCell(xCoordinate, yCoordinate, yPosition, xPosition) {
    
    ctx.clearRect(xCoordinate, yCoordinate, rectSize, rectSize);
    ctx.strokeRect(xCoordinate, yCoordinate, rectSize, rectSize);

    positions[yPosition][xPosition] = 0;
    lastMove = [xPosition, yPosition];
}

function cellCount(xPosition, yPosition) {

    var result = 0;

    var startX = (xPosition - 1 < 0) ? xPosition : xPosition - 1;
    var endX = (xPosition + 1 < width/rectSize) ? xPosition + 1 : xPosition; 
    var startY = (yPosition - 1 < 0) ? yPosition : yPosition - 1;
    var endY = (yPosition + 1 < height/rectSize) ? yPosition + 1 : yPosition;

    for(var i = startY; i <= endY; i++) {
        for(var j = startX; j <= endX; j++) {
            if(j === xPosition && i === yPosition) {
                continue;
            }
            if(positions[i][j] === alive || positions[i][j] === tagDead) {
                result++;
            }
        }
    }

    return result;

}