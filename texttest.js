document.write("<script type='text/javascript' src='style-free.js'<>\/script>");
window.onload = function() {
  
  //document.write("<script type='text/javascript' src='style-free.js'<>\/script>");

  
  //描画コンテキストの取得
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  var timer;
  var delay = 10;

  var textcol = 1; //透明度（０～１）
  var textcount = 0.01; //増加値

  function draw(){
    ctx.clearRect(0,0,600,500);

    text();
    free();

  }

  function text(){
    ctx.font = "36px 'ＭＳ Ｐゴシック'";
    if(textcol <= 0){
      textcount *= -1;
    }else if(textcol >= 1){
      textcount *= -1;
    }
    textcol += textcount;
    ctx.fillStyle = 'rgba(0, 0, 0, '+textcol+')';
    ctx.fillText("- PUSH ENTER -", 200, 50,200);
  }

  var loop = function(){
    //描画処理を呼び出す
    draw(); //ループされる描画関数
    //タイマー(一度クリアしてから再設定。)
    clearTimeout(timer);
    timer = setTimeout(loop,delay);
  }
  loop();
  } //if(canvas.getContext)
}