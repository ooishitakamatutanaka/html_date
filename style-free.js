window.onload = function() {
  //描画コンテキストの取得
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var n = Math.pow((count/100),2);
    var count = 0;
    var frag = -1;
    var timer;
    var delay = 10;

    var a = {x:0,y:0};
    var t = -30;

    var r = 100;
    var x;
    var y;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    var scf = 0;
    ctx.transform(0.8, -0.2, -0.4, 0.8, 100, 100);


  function draw(){
    ctx.clearRect(0,0,600,500);

    ctx.beginPath();
    //ctx.scale(n, 1);
    //if(scf == 0){
    //  ctx.scale(0.8, 1);
    //  ctx.scale(1, 0.8);
    //  scf = 1;
    //}
    //ctx.rotate( 2*Math.PI / 180 );
    ctx.fillStyle = 'rgb(0, 0, 200)';
    ctx.moveTo(230, 10);
    ctx.bezierCurveTo(65, 120, 225, 100, 100, 235);
    ctx.bezierCurveTo(260, 135, 100, 120, 230, 10);
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle = 'rgb(100, 170, 255)';
    ctx.moveTo(235, 85);
    ctx.bezierCurveTo(105, 170, 250, 225, 240, 320);
    ctx.bezierCurveTo(280, 220, 135, 170, 235, 85);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(245,175,10,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(245,135,10,0,Math.PI*2,true);
    ctx.fill();

    //turn();
    //slow();
    clock();

  }

  function turn(){
    n = 1;
    if(frag == 1){
      count += 0.1;
    }else{
      count -= 0.1;
    }
    n = (-1)*Math.pow(count,2) + 1;
    if(n <= 0){
      frag *= (-1);
    }
  }

  function slow(){

    a.x += 1;
    a.y = (1/10)*Math.pow(t - 10, 2) + 100;
    t += 0.5;

    ctx.beginPath();
    ctx.fillStyle = 'rgb(200, 100, 200)';
    ctx.arc(50+a.x,a.y,20,0,Math.PI*2,true);
    ctx.fill();

  }
  function clock(){

    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();

    var ds = 100;
    var dm = 75;
    var dh = 50

    var angle1 = Math.PI * 2 * ( 15 - s ) / 60;
    var angle2 = Math.PI * 2 * ( 15 - ( m + s / 60 ) ) / 60;
    var angle3 = Math.PI * 2 * ( 3 - ( h + m / 60 ) ) / 12;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 150, 100, 0.6)';
    ctx.arc(200,200,120,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(200, 150, 255, 0.6)';
    ctx.arc(200,200,150,0,Math.PI*2,true);
    ctx.fill();

    hou(h, m, s, angle3, dh);
    min(h, m, s, angle2, dm);
    sec(h, m, s, angle1, ds);

    for(i=1;i<=12;i++){
      angle = i * (Math.PI / 6);
      r2 = 10;
      if(i == 10){
        r2 = 15;
      }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(50, 50, 50, 0.6)';
      ctx.arc(200+(135 * Math.cos(angle)),200+(135 * Math.sin(angle)),r2,0,Math.PI*2,true);
      ctx.fill();
    }

    
  }

  function sec(h, m, s, angle, r){
    x = r * Math.cos(angle);
    y = -r * Math.sin(angle);


    ctx.beginPath();
    ctx.fillStyle = 'rgb(100, 100, 200)';
    ctx.arc(200+x,200+y,10,0,Math.PI*2,true);
    ctx.fill();
    ctx.moveTo(200,200);
    ctx.lineTo(200+x,200+y);
    ctx.stroke();
  }

function min(h, m, s, angle, r){
    x = r * Math.cos(angle);
    y = -r * Math.sin(angle);


    ctx.beginPath();
    ctx.fillStyle = 'rgb(100, 200, 100)';
    ctx.arc(200+x,200+y,15,0,Math.PI*2,true);
    ctx.fill();
    ctx.moveTo(200,200);
    ctx.lineTo(200+x,200+y);
    ctx.stroke();
  }

function hou(h, m, s, angle, r){
    x = r * Math.cos(angle);
    y = -r * Math.sin(angle);


    ctx.beginPath();
    ctx.fillStyle = 'rgb(200, 100, 100)';
    ctx.arc(200+x,200+y,20,0,Math.PI*2,true);
    ctx.fill();
    ctx.moveTo(200,200);
    ctx.lineTo(200+x,200+y);
    ctx.stroke();
  }

  var loop = function(){
    //描画処理を呼び出す
    draw();
    //タイマー(一度クリアしてから再設定。)
    clearTimeout(timer);
    timer = setTimeout(loop,delay);
  }
  loop();

  }
}