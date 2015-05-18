//
// 2015/05/14
// ooisi
// ファイル名：walk3.js
// id＝canvaswalk
//

window.onload = function() {
var canvas = document.getElementById("canvaswalk");
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

ctx.fillStyle = "rgba(0,0,0,0)";
ctx.fillRect(0,0,canvas.width,canvas.height);
    
document.addEventListener("keydown", keyDownFunc);
document.addEventListener("keyup", keyUpFunc);

var leftFlg  = false;
var upFlg    = false;
var downFlg  = false;
var rightFlg = false;
var junpFlg  = false;
var jf = false;
var colflg = true;

var notright = false;
var notleft = false;

var t = -10; //
var y = 0;
var point = {x:0,y:0};
var repoint = 0;
var count = -10;

var bgspeed = 4; //スクロールスピード
var scroll = 0;
var brock = 10; //ブロック数

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

var text = new Array("責任","失敗","残業","左遷","同期"); 

var img = new Image();

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
        //if (e.keyCode == 32) junpFlg = false;
}

function loop() {
	if(leftFlg == true && notleft == false && 200+player.x > 0){
          player.x -= player.speed;
        }
	//if (upFlg)    player.y -= player.speed;
	//if (downFlg)  player.y += player.speed;
	if(rightFlg == true && notright == false && 200+player.x < canvas.width){
          if(yl == 0 && t == -10 && 200+player.x > 0 && 200+player.x > canvas.width-scroll-player.size){
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

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "rgb(120,60,10)";
    ctx.fillRect(scroll*(-1),300+player.size,canvas.width,100);

    //ctx.beginPath();
    //ctx.fillStyle = "rgb(250,190,15)";
    //ctx.fillRect(imotalobj[brock][0],imotalobj[brock][2],imotalobj[brock][4],100);


    for(i=0;i<brock;i++){
      ctx.beginPath();
      if(colflg == true){
        randomcolor(i);
      }
      ctx.fillStyle = 'rgb('+cl[i].r+', '+cl[i].g+', '+cl[i].b+')';
      ctx.fillRect(imotalobj[i][0],imotalobj[i][2]+player.size,imotalobj[i][4],imotalobj[i][5]);

      ctx.font = "26px 'ＭＳ Ｐゴシック'";
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText(text[imotalobj[i][6]],imotalobj[i][0] ,imotalobj[i][2]+imotalobj[i][5] ,imotalobj[i][4]);

    }
    colflg = false;

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.arc(200+player.x, 300+player.y, player.size, 0, Math.PI*2, true);
    ctx.fill();

    if(rightFlg == false && yl == 0 && t == -10 && 200+player.x > 0 && 200+player.x > canvas.width-scroll-player.size){
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

    //if(junpFlg == false){
    //  Fall();
    //}
    NotFall();
    Junp(); //ジャンプの判定関数
    Playerscroll();
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
      player.y = y;
/*    }else if(200+player.x < canvas.width+100){
      t = -10;
      yl = 0;
      junpFlg = false;
      player.y = y;
*/
/*
      t = -10;
      yl = 0;
      junpFlg = false;
      player.y = y;
*/
    }
  }
}

/*
function Junp(){ //ジャンプの判定
  if(jf == true){ //ジャンプ中のフラグ(通常時：false、下降時：true)
    JunpFlg = false; //下降時にはジャンプフラグをfalse
  }
  if(junpFlg == true && jf == false){ //ジャンプ押下かつ下降時でない
    if(count >= 0  && count <= 25){ //countが0以上25以下
      player.y = -count*4; //加速値4
      count++; //countを+1
    }else{ //countが25より大きい(初期値から100px以上上昇したとき)
      junpFlg = false; //ジャンプフラグをfalse、状態を下降(jfをtrue)にする
      jf = true;
    }
  }else{
    jf = true; //ジャンプ中にジャンプボタンが離された場合状態を下降にする
    if(count > 0 && player.y < 0){ //countが0より大きいかつ座標が初期値より小さい
      player.y = -count*4; //加速値-4
      count--; //countを-1
    }else if(count <= 0){ //countが0以下のときcountと座標を初期化
      count = 0;
      player.y = 0;
      jf = false; //下降中の終了
    }
  }
}

*/

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

      //imotalobj[brock][0] = imotalobj[i][1] + 300;
     //imotalobj[brock][1] = imotalobj[brock][0] + 300;
      //imotalobj[brock][2] = 300+player.size;
      //imotalobj[brock][3] = imotalobj[brock][2] + 100;
      //imotalobj[brock][4] = 300;
      //imotalobj[brock][5] = 100;
    }else{
      imotalobj[i][0] -= bgspeed;
      imotalobj[i][1] -= bgspeed;
      //imotalobj[brock][0] -= bgspeed;
      //imotalobj[brock][1] -= bgspeed;
    }
  }
  jf = true;
//*/
}
function randomcolor(n){ 
  cl[n] = {r:Math.floor(Math.random()*254),g:Math.floor(Math.random()*254),b:Math.floor(Math.random()*254)};
}
function Player() {
  this.size = 10;
  this.x = 0;
  this.y = 0;
  this.speed = 5;
}
}