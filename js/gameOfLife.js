var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var rectSize = 10;
drawGrid();

function drawGrid() {

    ctx.lineWidth = .5;
    for(var i = 0; i < height; i += rectSize) {
        for( var j = 0; j < width; j += rectSize) {
            ctx.strokeRect(j, i, rectSize, rectSize);
        }
    }

}