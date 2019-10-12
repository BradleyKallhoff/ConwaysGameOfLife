var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var rectSize = 10;
var drag = false;
var positions = [];
var lastMove = [];

ctx.strokeStyle = "#666";

game();

function game() {
    drawGrid(ctx, height, width, rectSize);
}

canvas.addEventListener("mousedown", e => {
    drag = true;

    var xPos = e.clientX - e.clientX%rectSize - rectSize;
    var yPos = e.clientY - e.clientY%rectSize - rectSize;

    var xArr = Math.floor((e.clientX - rectSize) / rectSize);
    var yArr = Math.floor((e.clientY - rectSize) / rectSize);

    if(positions[yArr][xArr] === 0){
        addCell(xPos, yPos, yArr, xArr);
    } else {
        removeCell(xPos, yPos, yArr, xArr);
    }
});

canvas.addEventListener("mousemove", e=> {
    if(drag === true) {

        var xPos = e.clientX - e.clientX%rectSize - rectSize;
        var yPos = e.clientY - e.clientY%rectSize - rectSize;

        var xArr = Math.floor((e.clientX - rectSize) / rectSize);
        var yArr = Math.floor((e.clientY - rectSize) / rectSize);

        if(lastMove[0] != xArr || lastMove[1] != yArr) {
            console.log(lastMove);
            if(positions[yArr][xArr] === 0){
                addCell(xPos, yPos, yArr, xArr);
            } else {
                removeCell(xPos, yPos, yArr, xArr);
            }
        }
    }
});

canvas.addEventListener("mouseup", function(){
    drag = false;
});

function drawGrid(ctx, height, width, rectSize) {

    for(var i = 0; i < height; i += rectSize) {
        var row = [];
        for( var j = 0; j < width; j += rectSize) {
            ctx.strokeRect(j, i, rectSize, rectSize);
            row.push(0);
        }
        positions.push(row);
    }
}

function addCell(xPos, yPos, yArr, xArr) {

    ctx.fillRect(xPos, yPos, rectSize, rectSize);

    positions[yArr][xArr] = 1;
    lastMove = [xArr, yArr];
}

function removeCell(xPos, yPos, yArr, xArr) {
    
    ctx.clearRect(xPos, yPos, rectSize, rectSize);
    ctx.strokeRect(xPos, yPos, rectSize, rectSize);

    positions[yArr][xArr] = 0;
    lastMove = [xArr, yArr];
}