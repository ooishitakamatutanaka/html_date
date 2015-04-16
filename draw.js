
var drawFlag = false;
var oldX = 0;
var oldY = 0;
window.addEventListener("load", function(){
    var can = document.getElementById("myCanvas");
    can.addEventListener("mousemove", draw, true);
    can.addEventListener("mousedown", function(e){
        drawFlag = true;
        oldX = e.clientX;
        oldY = e.clientY;
    }, false);
    can.addEventListener("mouseup", function(){
        drawFlag = false;
    }, false);
}, true);
// ï`âÊèàóù
function draw(e){
    if (!drawFlag) return;
    var x = e.clientX;
    var y = e.clientY;
    var can = document.getElementById("myCanvas");
    var context = can.getContext("2d");
    context.strokeStyle = "rgba(253,245,230,1)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(oldX, oldY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    oldX = x;
    oldY = y;
}