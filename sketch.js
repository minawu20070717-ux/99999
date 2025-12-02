let spriteSheet;
let leftSprite; // 來自資料夾 (3/0.png )的精靈表
// 資料夾3的單一幀尺寸：62 x 150
const FRAME_W = 62;
const FRAME_H = 150;
const TOTAL_FRAMES = 1;
// 左向精靈（../2/all.png）參數：每格 431*162，共 4 幀
const LEFT_FRAME_W = 109;
const LEFT_FRAME_H = 162;
const LEFT_TOTAL_FRAMES = 4;

// 角色座標與速度
let playerX;
let playerY;
const MOVE_SPEED = 4;

const FRAME_DELAY = 7; // 切換間隔（以 draw() 的 frame 計數為單位）

function preload() {
  // 注意：因為 index.html 放在 `1118/`，圖片在專案根目錄的 `2/` 和 `3/` 資料夾
  // 所以路徑需回到上層資料夾。
  spriteSheet = loadImage('../3/0.png');
  // 載入位於專案根目錄的資料夾 `2` 的 all.png（按方向鍵時使用）
  leftSprite = loadImage('../2/all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  // 初始位置置中
  playerX = width / 2;
  playerY = height / 2;
}
function draw() {
  // 背景色：#cea395ff
  background('#f5c9eaff');

  // 選擇要顯示的精靈表與參數：按住左箭鍵時使用 leftSprite
  let img = spriteSheet;
  let fw = FRAME_W;
  let fh = FRAME_H;
  let tf = TOTAL_FRAMES;
  let flipH = false; // 是否水平反轉

  if (keyIsDown(LEFT_ARROW) && leftSprite) {
    img = leftSprite;
    fw = LEFT_FRAME_W;
    fh = LEFT_FRAME_H;
    tf = LEFT_TOTAL_FRAMES;
    // 左向精靈鏡像顯示
    flipH = true;
  }

  if (keyIsDown(RIGHT_ARROW) && leftSprite) {
    img = leftSprite;
    fw = LEFT_FRAME_W;
    fh = LEFT_FRAME_H;
    tf = LEFT_TOTAL_FRAMES;
    // 右向不鏡像（或改為使用原始 spriteSheet）
    flipH = false;
  }

  // 計算目前幀
  const idx = floor(frameCount / FRAME_DELAY) % tf;
  const sx = idx * fw;
  const sy = 0;

  // 放大三倍
  const SCALE = 2;
  const drawW = fw * SCALE;
  const drawH = fh * SCALE;

  // 按住左鍵時移動
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= MOVE_SPEED;
  }

  // 按住右鍵時移動
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += MOVE_SPEED;
  }

  // 邊界限制（確保不會移出畫面）
  playerX = constrain(playerX, drawW / 2, width - drawW / 2);

  // 繪製在 playerX/playerY（靠左下對齊改為置中）
  push();
  translate(playerX, playerY);
  if (flipH) {
    scale(-1, 1);
  }
  // 使用 image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
  image(img, -drawW / 2, -drawH / 2, drawW, drawH, sx, sy, fw, fh);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
