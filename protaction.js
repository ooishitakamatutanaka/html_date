//
// 2015/05/14
// ooisi
// ƒtƒ@ƒCƒ‹–¼Fwalk3.js
// idcanvaswalk
//

window.onload = function main() {
var canvas = document.getElementById("canvaswalk");
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

//ctx.fillStyle = "rgba(0,0,0,0)";
//ctx.fillRect(0,0,canvas.width,canvas.height);
    
document.addEventListener("keydown", keyDownFunc);
document.addEventListener("keyup", keyUpFunc);

var leftFlg  = false;
var upFlg    = false;
var downFlg  = false;
var rightFlg = false;
var enterflg = false;
var startflg = false;
var retryflg = false;
var junpFlg  = false;
var jf = false;
var colflg = false;

var notright = false;
var notleft = false;

var t = -10; //
var y = 0;
var point = {x:0,y:0};
var repoint = 0;
var count = -10;

var bgspeed = 0; //ƒXƒNƒ[ƒ‹ƒXƒs[ƒh
var scroll = 0;
var brock = 10; //ƒuƒƒbƒN”

var bar = 200;
var textcol = 1; //“§–¾“xi‚O`‚Pj
var textcount = 0.01; //‘‰Á’l

var objcount = 0;
var ret = 1; //
var yl = 0;  //
var end = 0; //
var imotalobj = new Array(); //
ImotalobjSet();
/*
imotalobj[brock+1][0] = imotalobj[brock][1] + 300 - scroll;
    imotalobj[brock+1][1] = imotalobj[brock+1][0] + 300 - scroll;
    imotalobj[brock+1][2] = 300+player.size;
    imotalobj[brock+1][3] = imotalobj[brock+1][2] + 100;
    imotalobj[brock+1][4] = 300;
    imotalobj[brock+1][5] = 100;
*/
var cl = new Array(); //
cl = {r:0,g:0,b:0};

var text = new Array("Ó”C","Ž¸”s","Žc‹Æ","¶‘J","“¯Šú"); 

var player = new Player();

setInterval( loop, 1000 / 60);


function keyDownFunc(e){
	if (e.keyCode == 65) leftFlg  = true;
	if (e.keyCode == 87) upFlg    = true;
	if (e.keyCode == 83) downFlg  = true;
	if (e.keyCode == 68) rightFlg = true;
        if (e.keyCode == 32) junpFlg = true;
        if (e.keyCode == 13){
          if(retryflg == true)
          enterflg = true;
          startflg = true;
          bgspeed = 4;
        }
}

function keyUpFunc(e){
	if (e.keyCode == 65) leftFlg  = false;
	if (e.keyCode == 87) upFlg    = false;
	if (e.keyCode == 83) downFlg  = false;
	if (e.keyCode == 68) rightFlg = false;
}

function loop() {


	if(leftFlg == true && notleft == false && 200+player.x > 0){
          player.x -= player.speed;
        }
	if(rightFlg == true && notright == false && 200+player.x < canvas.width){
          if(yl == 0 && t == -10 && 200+player.x > canvas.width-scroll-player.size){
            player.x -= bgspeed;
          }else{
            player.x += player.speed;
          }
        }
    
    ImotalobjSet();

    scroll += bgspeed;
    if(scroll > end){
      jf = false;
      scroll = 0;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(startflg == false){
      start();
    }

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "rgb(120,60,10)";
    ctx.fillRect(scroll*(-1),300+player.size,canvas.width,100);

    for(i=0;i<brock;i++){
      ctx.beginPath();
      if(colflg == false){
        randomcolor(i);
      }
      ctx.fillStyle = 'rgb('+cl[i].r+', '+cl[i].g+', '+cl[i].b+')';
      ctx.fillRect(imotalobj[i][0],imotalobj[i][2]+player.size,imotalobj[i][4],imotalobj[i][5]);

      //ctx.font = "26px '‚l‚r ‚oƒSƒVƒbƒN'";
      //ctx.fillStyle = 'rgb(0, 0, 0)';
      //ctx.fillText(text[imotalobj[i][6]],imotalobj[i][0] ,imotalobj[i][2]+imotalobj[i][5] ,imotalobj[i][4]);

    }
    colflg = true;

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.arc(200+player.x, 300+player.y, player.size, 0, Math.PI*2, true);
    ctx.fill();

    if(rightFlg == false && yl == 0 && t == -10 && 200+player.x > canvas.width-scroll-player.size){
      player.x -= bgspeed;
    }

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.moveTo(0,0);
    for(i=0;i<=410;i+=10){
      if(ret > 0){
        ctx.lineTo(10,i+5);
        ret *= (-1);
      }else{
        ctx.lineTo(0,i);
        ret *= (-1);
      }
    }
    ctx.closePath();
    ctx.fill();
    ret = 1;

    NotFall();
    Junp(); //ƒWƒƒƒ“ƒv‚Ì”»’èŠÖ”
    Playerscroll();
    Clearflag();
    GameOver();
    retry();
}

function Junp(){
  if(junpFlg){
    notright = false;
    notleft = false;
    if(300+player.y > 300 && 200+player.x > canvas.width-scroll){
      player.y = (1/2)*Math.pow(t - 5, 2) - (100 + yl + player.size);
      t += 0.5;
    }else if(300+player.y <= 300+player.size){
      player.y = (1/2)*Math.pow(t - 5, 2) - (100 + yl + player.size);
      t += 0.5;
      FloorJuddeg(200+player.x,300+player.y);
    }else{
      t = -10;
      yl = 0;
      junpFlg = false;
      player.y = yl;
    }
  }
}

function FloorJuddeg(px,py){
  if(300+player.y <= 300+player.size && t >= 5){
    for(i=0;i<imotalobj.length;i++){
      if(px >= imotalobj[i][0] && px <= imotalobj[i][1]){
        if(py >= imotalobj[i][2] && py <= imotalobj[i][2]+10){
          junpFlg = false;
          yl = 300 - imotalobj[i][2];
          t = -10;
        }
      }
    }
  }
}

function Fall(){
  if(junpFlg == false && yl > 0){
    for(i=0;i<imotalobj.length;i++){
      if((300-imotalobj[i][2]) == yl){
        continue;
      }
      if((200+player.x) < imotalobj[i][0] || (200+player.x) > imotalobj[i][1]){
        for(j=0;j<imotalobj.length;j++){
          if((200+player.x) >= imotalobj[j][0] && (200+player.x) <= imotalobj[j][1]){
            if(imotalobj[i][2] <= imotalobj[j][2]){
              yl = 300 - imotalobj[j][2];
              t = -10
              player.y = (1/2)*Math.pow(t - 5, 2) - (100 + yl + player.size);
            }else{
              yl = 0;
              t = -10;
              player.y = (1/2)*Math.pow(t - 5, 2) - (100 + yl + player.size);
            }
          }else{
            yl = 0;
            t = -10;
            player.y = (1/2)*Math.pow(t - 5, 2) - (100 + yl + player.size);
          }
        }
      }else{
        break;
      }
    }
  }
}

function NotFall(){
  if(yl > 0){
    for(i=0;i<imotalobj.length;i++){
      if((300-imotalobj[i][2]) == yl){
        if(200+player.x <= imotalobj[i][0]){
          notleft = true;
        }else if(200+player.x >= imotalobj[i][1]){
          notright = true;
        }else{
          notleft = false;
          notright = false;
        }
      }
    }
  }
}

function Playerscroll(){
  if((200+player.x) > 0 && (200+player.x) < canvas.width){
    if(junpFlg == false && yl > 0){
      player.x -= bgspeed;
    }
  }
}
function ImotalobjSet(){
  imotalobj[0] = [800-scroll, 900-scroll, 250, 260, 100, 50, 0];
  imotalobj[1] = [900-scroll, 1000-scroll, 200, 210, 100, 50, 1];
  imotalobj[2] = [1050-scroll, 1100-scroll, 120, 130, 50, 40, 2];
///*
  for(i=3;i<brock;i++){
    if(jf == false){

      imotalobj[i] = [];
      imotalobj[i][0] = imotalobj[i-1][1] + Math.floor(Math.random()*100);
      imotalobj[i][1] = imotalobj[i][0] + 40 + Math.floor(Math.random()*100);
      imotalobj[i][2] = 100 + Math.floor(Math.random()*200);
      imotalobj[i][3] = imotalobj[i][2] + 30 + Math.floor(Math.random()*40);
      imotalobj[i][4] = imotalobj[i][1] - imotalobj[i][0];
      imotalobj[i][5] = imotalobj[i][3] - imotalobj[i][2];
      imotalobj[i][6] = Math.floor(Math.random()*5)
      end = imotalobj[i][1];
    }else{
      imotalobj[i][0] -= bgspeed;
      imotalobj[i][1] -= bgspeed;
    }
  }
  jf = true;
}
function randomcolor(n){ 
  cl[n] = {r:Math.floor(Math.random()*100),g:Math.floor(Math.random()*254),b:200/*Math.floor(Math.random()*254)*/};
}
function Clearflag(){
  if(200+player.x >= imotalobj[brock-1][0] && 200+player.x <= end-scroll && 300+player.y >= imotalobj[brock-1][2] && 300+player.y <= imotalobj[brock-1][2]+10 && startflg == true){
    retryflg = true;
    player.speed = 0;
    bgspeed = 0;
    ctx.font = "36px '‚l‚r ‚oƒSƒVƒbƒN'";
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText("GAMECLEAR!", 300, 100,200);
    if(textcol <= 0){
      textcount *= -1;
    }else if(textcol >= 1){
      textcount *= -1;
    }
    textcol += textcount;
    ctx.fillStyle = 'rgba(0, 0, 0, '+textcol+')';
    ctx.fillText("- RETRY ENTER -", 300, 150,200);
  }
}
function GameOver(){
  if(300+player.y >= 500 || 200+player.x <= 10){
    if(startflg == true){
      retryflg = true;
      player.speed = 0;
      bgspeed = 0;
      ctx.font = "36px '‚l‚r ‚oƒSƒVƒbƒN'";
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText("GAMEOVER", 300, 100,200);
      if(textcol <= 0){
        textcount *= -1;
      }else if(textcol >= 1){
        textcount *= -1;
      }
      textcol += textcount;
      ctx.fillStyle = 'rgba(0, 0, 0, '+textcol+')';
      ctx.fillText("- RETRY ENTER -", 300, 150,200);
    }
  }
}
function Player() {
  this.size = 10;
  this.x = 0;
  this.y = 0;
  this.speed = 5;
}
function start(){

  ctx.font = "36px '‚l‚r ‚oƒSƒVƒbƒN'";
    if(textcol <= 0){
      textcount *= -1;
    }else if(textcol >= 1){
      textcount *= -1;
    }
    textcol += textcount;
    ctx.fillStyle = 'rgba(0, 0, 0, '+textcol+')';
    ctx.fillText("- PUSH ENTER -", 300, 100,200);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText("LEFT:A  RIGHT:D  JUNP:space", 200, 150,400);
}
function retry(){
    if(enterflg == true && retryflg == true)
      location.reload(true);
}
}