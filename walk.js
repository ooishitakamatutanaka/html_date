window.onload = function() {
var canvas = document.getElementById("sample");
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
    
document.addEventListener("keydown", keyDownFunc);
document.addEventListener("keyup", keyUpFunc);

var leftFlg  = false;
var upFlg    = false;
var downFlg  = false;
var rightFlg = false;
var junpFlg  = false;

var t = -10;
var y = 0;
var point = {x:0,y:0};
var repoint = 0;

var player = new Player();

setInterval( loop, 1000 / 60);


function keyDownFunc(e){
	if (e.keyCode == 65) leftFlg  = true;
	if (e.keyCode == 87) upFlg    = true;
	if (e.keyCode == 83) downFlg  = true;
	if (e.keyCode == 68) rightFlg = true;
        if (e.keyCode == 32) junpFlg = true;
}

function keyUpFunc(e){
	if (e.keyCode == 65) leftFlg  = false;
	if (e.keyCode == 87) upFlg    = false;
	if (e.keyCode == 83) downFlg  = false;
	if (e.keyCode == 68) rightFlg = false;
}

function loop() {
	if (leftFlg)  player.x -= player.speed;
	//if (upFlg)    player.y -= player.speed;
	//if (downFlg)  player.y += player.speed;
	if (rightFlg) player.x += player.speed;
    
    repoint = 300+player.y;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(200+player.x, 300+player.y, player.size, 0, Math.PI*2, true);
    ctx.fill();

    point.x = 200+player.x;
    point.y = 300+player.y;

    ctx.beginPath();
    ctx.moveTo(0,300+player.size);
    ctx.lineTo(canvas.width,300+player.size);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,250+player.size);
    ctx.lineTo(100,250+player.size);
    ctx.lineTo(100,300+player.size);
    ctx.stroke();
    ctx.closePath();

    if(t == -10){
    y = player.y;
    }
    Junp();
}

function Junp(){
  if(junpFlg){
    if(t <= 20){
      player.y = (1/2)*Math.pow(t - 5, 2) - ((112.5 + y) + player.size);
      t += 0.5;
      FloorJuddeg(0,100,250+player.size);
    }else{
      t = -10;
      junpFlg = false;
      player.y = y;
    }
  }
}

function FloorJuddeg(xs,xe,yl){
  if(point.x >= xs && point.x <= xe){
    if(repoint < yl && point.y >= yl){
      t = 21;
      y = yl;
    }
  }
}
function Player() {
  this.size = 10;
  this.x = 0;
  this.y = 0;
  this.speed = 5;
}
}