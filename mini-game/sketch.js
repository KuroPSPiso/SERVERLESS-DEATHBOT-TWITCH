let gameOverIcon = {
  "frameIndex": -1,
  "frames" : []
}

function setSquarePos(x, y, size){
  return { "x": x - size/2, "y": y - size/2, "size": size };
}

function createNewPlayer(playerName, squarePos, startOffset = { "x": 0, "y": 0}){
  let newPlayer = {
    "hp": "100",
    "name": playerName,
    "square": squarePos,
    "offset": { x: startOffset.x, y: startOffset.y},
    "img": null
  }
  
  return newPlayer;
}

let player1 = createNewPlayer(
  "Player1",
  setSquarePos(100, 125, 75),
  { "x": -100, "y": 0}
);
let player2 = createNewPlayer(
  "Player2",
  setSquarePos(300, 50, 75),
  { "x": 100, "y": 0}
);

const shakeStrenghtAttack = 0.003;
const shakeStrenghtDamaged = 0.008;

let player1Shake = {
  "shake" : 0,
  "sine" : 0,
  "strength" : shakeStrenghtAttack
}
let player2Shake = {
  "shake" : 0,
  "sine" : 0,
  "strength" : shakeStrenghtAttack
}

function preload() {
  img1 = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeBan001.png');
  img2 = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeBan002.png');
  img3 = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeBan003.png');
  img4 = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeBan004.png');
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img2);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img2);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img2);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img2);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img1);
  gameOverIcon.frames.push(img3);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img4);
  gameOverIcon.frames.push(img3);
  if(gameOverIcon.frames.length > 0) gameOverIcon.frameIndex = 0;
}

function setup() {
  createCanvas(400, 200);
  player1.img = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeRearx2.png');
  player2.img = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeFrontx2.png');
}

function shakePlayer(player, playerShake)
{
  if(playerShake.shake > 0 && playerShake.sine <= 0)
  {
    playerShake.sine = 1;
    playerShake.shake--;
  }
  
  player.offset.x = -0 + Math.sin((playerShake.sine/0.5 >= 1? 1-playerShake.sine : playerShake.sine) * 2) * 20;
  playerShake.sine -= deltaTime * playerShake.strength;
  if(playerShake.sine < 0) playerShake.sine = 0;
  if(playerShake.sine == 0) player.offset.x = 0
}

let flash = 1;
function finishFlash() {
  if(flash <= 0) return true;
  let color = Math.sin(flash*16);
  flash -= deltaTime * 0.001;
  
  background(0, 255 * color, 0);
  
  if(flash < 0) flash = 0;
  
  return false;
}

let scrollInPct = 1;
function scrollInPlayers(){
  if(scrollInPct <= 0) return true;
  image(player1.img, player1.square.x + player1.offset.x, player1.square.y + player1.offset.y, player1.square.size, player1.square.size);
  image(player2.img, player2.square.x + player2.offset.x, player2.square.y + player2.offset.y, player2.square.size, player2.square.size);
  
  player1.offset.x = player1.offset.x * scrollInPct;
  player2.offset.x = player2.offset.x * scrollInPct;
  player1.offset.y = player1.offset.y * scrollInPct;
  player2.offset.y = player2.offset.y * scrollInPct;
  
  scrollInPct -= deltaTime * 0.001;
  
  if(scrollInPct < 0) scrollInPct = 0;
  return false;
}

function canPlay(){
  
  if(finishFlash() === true &&
     scrollInPlayers() === true
    ) return true;
  return false;
}

let playerTurn = Math.random() < 0.5;
const turnTime = 2;
let turnTimer = 0;

function turn(){
  turnTimer -= deltaTime * 0.001;
  if(turnTimer <= 0){
    turnTimer = turnTime;
    playerTurn = !playerTurn;
    if(playerTurn === true){
      player1Shake.shake = 1
    } else {
      player2Shake.shake = 1
    }
  }
  
  if(turnTimer <= 1.5 && turnTimer >= 1.4){
    if(playerTurn === true){
      player2Shake.shake = 2
    } else {
      player1Shake.shake = 2
    }
  }
  
  textSize(12);
  textAlign(LEFT);
  text(`${playerTurn === true? player1.name : player2.name } attacks with`, 10, 178);
  if(playerTurn === true){
    //player 1
    player1Shake.strength = shakeStrenghtAttack
    player2Shake.strength = shakeStrenghtDamaged
  } else {
    //player 2
    player1Shake.strength = shakeStrenghtDamaged
    player2Shake.strength = shakeStrenghtAttack
  }
}

var gameOverTime = 5;
var gameOverTimer = gameOverTime;

function drawGameOver()
{
    if(gameOverIcon.frameIndex > -1) {
      image(gameOverIcon.frames[gameOverIcon.frameIndex], 100, 100);
    }
  
    gameOverIcon.frameIndex = Math.ceil( Math.abs(gameOverTimer) * 20 % gameOverIcon.frames.length - 1); //10fps
  
    textAlign(CENTER);
    textSize(20);
    text(`${player1.hp <= 0? player1.name : player2.name } fainted`, 200, 100)
    gameOverTimer -= deltaTime * 0.001;
}

function draw() {
  background(255, 255, 255);
  
  if(player1.hp > 0 && player2.hp > 0){
    fill(color(0,0,0));
    rect(0, 0, 2, 200);
    rect(398, 0, 2, 200);
    rect(0, 163, 400, 1);
    if(canPlay() === false) return;
    turn();
  } else {
    drawGameOver();
    return;
  }
  
  shakePlayer(player1, player1Shake);
  shakePlayer(player2, player2Shake);
  
  image(player1.img, player1.square.x + player1.offset.x, player1.square.y + player1.offset.y, player1.square.size, player1.square.size);
  image(player2.img, player2.square.x + player2.offset.x, player2.square.y + player2.offset.y, player2.square.size, player2.square.size);
  
  
  //health bars
  //p2
  rect(30, 65, 150, 1);
  rect(29, 35, 1, 30);
  textSize(16);
  textAlign(LEFT);
  text(player2.name, 20, 15);
  //p1
  rect(200, 150, 150, 1);
  rect(350, 120, 1, 30);
  textAlign(RIGHT);
  textSize(16);
  text(player1.name, 360, 105);
  
  if(mouseIsPressed){
    player1.hp = 0
  }
}