document.write("<script type='text/javascript' src='style-free.js'<>\/script>");
window.onload = function() {
  
  //document.write("<script type='text/javascript' src='style-free.js'<>\/script>");

  
  //�`��R���e�L�X�g�̎擾
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  var timer;
  var delay = 10;

  var textcol = 1; //�����x�i�O�`�P�j
  var textcount = 0.01; //�����l

  function draw(){
    ctx.clearRect(0,0,600,500);

    text();
    free();

  }

  function text(){
    ctx.font = "36px '�l�r �o�S�V�b�N'";
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
    //�`�揈�����Ăяo��
    draw(); //���[�v�����`��֐�
    //�^�C�}�[(��x�N���A���Ă���Đݒ�B)
    clearTimeout(timer);
    timer = setTimeout(loop,delay);
  }
  loop();
  } //if(canvas.getContext)
}