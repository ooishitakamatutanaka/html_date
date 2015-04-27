// �e��ݒ�
var PICTURES = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "3.jpg"];
var PICTURE_URL = "1.jpg"; // �摜�t�@�C����URL
var BLOCK_W = 120;  // �u���b�N�̕�
var BLOCK_H = 120;  // �u���b�N�̍���
var ROW_COUNT = 5;  // ��������ɐ؂邩
var COL_COUNT = 5;  // �s�������ɐ؂邩
var NUM_BLOCKS = ROW_COUNT * COL_COUNT;
// �㉺���E�̑��΍��W���`��������
var UDLR = [[0,-1],[0,1],[-1,0],[1,0]];
// �Q�[���S�̂Ŏg���ϐ�
var context, image; // �`��p
var blocks = [];    // �e�u���b�N���Ǘ�����z��ϐ�
var isLock; // �}�E�X��������b�N���邩�ǂ���

// ����������
function init() {
    // �`��R���e�L�X�g�̎擾
    var canvas = document.getElementById("gameCanvas");
    if (!canvas.getContext) {
        alert("Canvas���T�|�[�g���Ă��܂���B");
        return;
    }
    context = canvas.getContext("2d");
    // �}�E�X�C�x���g�̐ݒ�
    canvas.onmousedown = mouseHandler;
    // �摜��I��
    selectImage();
};

// �摜�������_���ɑI���i���݂̓����_���v�f���Ȃ��Ă��܂��j
function selectImage() {
    //r = Math.floor(Math.random() * PICTURES.length);
    //PICTURE_URL = PICTURES[0];
    // ���C���摜��ǂݏo��
    image = new Image();
    image.src = PICTURE_URL;
    image.onload = initGame;    // �ǂݍ��񂾂�Q�[����������
}

// �Q�[���̏�����
function initGame() {
    isLock = true;  // ���[�U��������b�N����
    // �p�Y���̃u���b�N���쐬����
    for (var i = 0; i < NUM_BLOCKS; i++) {
        blocks[i] = i;
    }
    // �����i�E���j���󂫃u���b�N�Ƃ���
    blocks[NUM_BLOCKS -1] = -1;
    drawPuzzle();   // ���{��\������
    // 2�b��ɃV���b�t�����J�n����
    setTimeout(shufflePuzzle,2000);
}
// �p�Y���̊e�s�[�X���V���b�t������
function shufflePuzzle() {
    var scount = 80;   // �V���b�t������񐔂��w��
    var blank = NUM_BLOCKS - 1; // �󂫃u���b�N�ʒu
    // ���̂݃V���b�t�����s���֐�
    var shuffle = function () {
        scount--;
        if (scount <= 0) {
            isLock = false; // �Q�[���J�n
            return;
        }
        var r, px, py, no;
        while (1) {
            r = Math.floor(Math.random() * UDLR.length);
            px = getCol(blank) + UDLR[r][0];
            py = getRow(blank) + UDLR[r][1];
            if (px < 0 || px >= COL_COUNT) continue;
            if (py < 0 || py >= ROW_COUNT) continue;
            no = getIndex(px, py);
            break;
        }
        blocks[blank] = blocks[no]
        blocks[no] = -1;
        blank = no;
        drawPuzzle();
        setTimeout(shuffle, 10);
    };
    shuffle();
}
// �p�Y���̉�ʂ�`�悷��
function drawPuzzle() {
    for (var i = 0; i < NUM_BLOCKS; i++) {
        // �`�����W���v�Z
        var dx = (i % COL_COUNT) * BLOCK_W;
        var dy = Math.floor(i / COL_COUNT) * BLOCK_H;
        // �`�挳���W���v�Z
        var no = blocks[i];
        if (no < 0) {    // �󂫃u���b�N
            context.fillStyle = "#000000";
            context.fillRect(dx, dy, BLOCK_W, BLOCK_H);
        } else {
            var sx = (no % COL_COUNT) * BLOCK_W;
            var sy = Math.floor(no / COL_COUNT) * BLOCK_H;
            // �摜�̈ꕔ��؂����ĕ`��
            context.drawImage(image, sx, sy, BLOCK_W, BLOCK_H, dx, dy, BLOCK_W, BLOCK_H);
        }
        // �`��̘g��\��
        context.beginPath();
        context.strokeStyle = "white";
        context.lineWidth = 3;
        context.rect(dx, dy, BLOCK_W, BLOCK_H);
        context.stroke();
        context.closePath();
        // �u���b�N�ԍ���`�悷��
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.font = "13px MS�S�V�b�N";
        var cx = dx + (BLOCK_W - 40) / 2;
        var cy = dy + BLOCK_H /2;
        context.fillText((no+1), cx, cy);
        context.strokeStyle = "red";
        context.strokeText((no+1), cx, cy);
    }
}
// �}�E�X�ňړ�����N���b�N�������̏���
function mouseHandler(t) {
    if (isLock) return;
    // �^�b�`���W�̎擾
    var px = t.offsetX, py = t.offsetY;
    if (px == undefined) {  // FireFox�΍�
        var p = t.currentTarget;
        px = t.layerX - p.offsetLeft;
        py = t.layerY - p.offsetTop;
    }
    // ���Ԗڂ̃s�[�X�𓮂��������̂��v�Z����
    var px2 = Math.floor(px / BLOCK_W);
    var py2 = Math.floor(py / BLOCK_H);
    var no = getIndex(px2, py2);
    // �󔒃u���b�N�Ȃ瓮�����Ȃ�
    if (blocks[no] == -1) return;
    // �㉺���E�ɓ�������u���b�N�����邩�m�F
    for (var i = 0; i < UDLR.length; i++) {
        var pt = UDLR[i];
        var xx = px2 + pt[0];
        var yy = py2 + pt[1];
        var no = getIndex(xx, yy);
        if (xx < 0 || xx >= COL_COUNT) continue;
        if (yy < 0 || yy >= ROW_COUNT) continue;
        if (blocks[no] == -1) { // �ړ��\��
            blocks[no] = blocks[getIndex(px2,py2)];
            blocks[getIndex(px2,py2)] = -1;
            drawPuzzle();
            checkClear();
            break;
        }
    }
}
// �N���A�������ǂ����`�F�b�N����
function checkClear() {
    var flag = true;
    for (var i = 0; i < (NUM_BLOCKS -1); i++) {
        if (blocks[i] != i) { flag = false; break; }
    }
    if (flag) {
        alert("Congratulations�I");
        selectImage();  // �ēx�Q�[�������s
    }
}
// ��ƍs����u���b�N�ԍ��𒲂ׂ�֐�
function getIndex(col, row) {
    return row * COL_COUNT + col;
}
function getCol(no) { return no % COL_COUNT; }
function getRow(no) {
    return Math.floor(no / COL_COUNT);
}