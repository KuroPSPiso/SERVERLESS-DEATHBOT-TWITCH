let theme;
var deathLaugh;
var deathSound;
var missSound;
var critSound;
var atkSound;
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
  
  soundFormats('ogg', 'mp3');
  theme = loadSound('https://bogaardryan.com/client-side-bs-app/assets/pakimon2.mp3');
  deathLaugh = loadSound('https://bogaardryan.com/client-side-bs-app/assets/death-laugh.mp3');
  deathSound = loadSound('https://bogaardryan.com/client-side-bs-app/assets/death.mp3');
  missSound = loadSound('https://bogaardryan.com/client-side-bs-app/assets/miss.mp3');
  atkSound = loadSound('https://bogaardryan.com/client-side-bs-app/assets/atk.mp3');
  critSound = loadSound('https://bogaardryan.com/client-side-bs-app/assets/crit.mp3');
}

function setup() {
  font = loadFont('https://bogaardryan.com/client-side-bs-app/assets/Regular.otf');
  createCanvas(400, 200);
  player1.img = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeRearx2.png');
  player2.img = loadImage('https://bogaardryan.com/client-side-bs-app/assets/ratgeFrontx2.png');

  start("Debug_1", "kur0")
}

function shakePlayer(player, playerShake, player2 = false)
{
  if(playerShake.shake > 0 && playerShake.sine <= 0)
  {
    playerShake.sine = 1;
    playerShake.shake--;
  }
  if(player2 === true)
  {
    player.offset.x = 0 - Math.sin((playerShake.sine/0.5 >= 1? 1-playerShake.sine : playerShake.sine) * 2) * 20;
  }  
  else player.offset.x = -0 + Math.sin((playerShake.sine/0.5 >= 1? 1-playerShake.sine : playerShake.sine) * 2) * 20;
  playerShake.sine -= deltaTime * playerShake.strength;
  if(playerShake.sine < 0) playerShake.sine = 0;
  if(playerShake.sine == 0) player.offset.x = 0

}

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

var attack = {
  type: "",
  strength: 0.1
}

function turn(){
  turnTimer -= deltaTime * 0.001;

  var attackResponseText;
  switch(attack.type)
  {
    case "miss": 
      attackResponseText = "'s attack missed!";
      break;
    case "atk": 
      attackResponseText = " wrote Ratge";
      break;
    case "crit": 
      attackResponseText = " wrote RatJAMMM, A critical hit!";
      break;
  }

  attackText = `${playerTurn === true? player1.name : player2.name }${attackResponseText}`;

  if(turnTimer <= 0){
    
    var attackPct = Math.random() * 100;
    if(attackPct < 20)
    {
      attack.type = "miss"
      missSound.play();
    }
    else if(attackPct < 90)
    {
      attack.type = "atk"
      atkSound.play();
      attack.strength = 0.05 + Math.random() * 0.05;
    }
    else
    {
      attack.type = "crit"
      critSound.play();
      attack.strength = 0.01 + Math.random() * 0.1;
    }

    turnTimer = turnTime;
    playerTurn = !playerTurn;
    
    if(attack.type != "miss")
    {
      if(playerTurn === true){
        player1Shake.shake = 1
      } else {
        player2Shake.shake = 1
      }
    }
  }
  
  if(attack.type != "miss")
  {
    if(turnTimer <= 1.5 && turnTimer >= 1.4){
      if(playerTurn === true){
        player2Shake.shake = 2
      } else {
        player1Shake.shake = 2
      }
    }
  }
  
  var additionalStrenght = 1;
  if(attack.type === "crit") additionalStrenght = 2;

  if(playerTurn === true){
    //player 1
    player1Shake.strength = shakeStrenghtAttack * additionalStrenght
    player2Shake.strength = shakeStrenghtDamaged * additionalStrenght
  } else {
    //player 2
    player1Shake.strength = shakeStrenghtDamaged * additionalStrenght
    player2Shake.strength = shakeStrenghtAttack * additionalStrenght
  }
}

function drawGameOver()
{
    if(gameOverIcon.frameIndex > -1) {
      image(gameOverIcon.frames[gameOverIcon.frameIndex], 100, 100);
    }
  
    gameOverIcon.frameIndex = Math.ceil( Math.abs(gameOverDrawTimer) * 20 % gameOverIcon.frames.length - 1); //10fps
  
    noStroke()
    textFont(font);
    textAlign(CENTER);
    textSize(14);
    text(`"${player1.hp <= 0? player1.name : player2.name }" \n\nwill receive a ban`.toUpperCase(), 200, 60)
    gameOverDrawTimer -= deltaTime * 0.001;

}

function gameOver(player)
{
  theme.stop();

  if(gameOverTime === gameOverTimer)
  { 
    deathSound.play();
    attackText = `${player.name} fainted!`
  }

  if(gameOverTimer > 0)
  {
    gameOverTimer -= deltaTime * 0.001;
    player.offset.x = 0;
    player.offset.y += deltaTime * 0.3;
    return false;
  } 
  if(gameOverDrawTime === gameOverDrawTimer) deathLaugh.play();
  drawGameOver();
  gameOverAlertScreenTimer -= deltaTime * 0.001;
  if(gameOverAlertScreenTimer < 0) reset();
  return true;
}

function draw() {
  background(0, 255, 0);

  if(ready === false) return;
  background(255, 255, 255);
  stroke(1)

  if(player1.hp > 0 && player2.hp > 0){
    if(canPlay() === false) return;
    turn();
  } else {
    if(gameOver(player1.hp > player2.hp? player2 : player1) === true) return;
  }
  
  shakePlayer(player1, player1Shake);
  shakePlayer(player2, player2Shake, true);
  
  image(player1.img, player1.square.x + player1.offset.x, player1.square.y + player1.offset.y, player1.square.size, player1.square.size);
  image(player2.img, player2.square.x + player2.offset.x, player2.square.y + player2.offset.y, player2.square.size, player2.square.size);
  
  noStroke()
  fill(color(255,255,255));
  rect(player1.square.x, player1.square.y + player1.square.size, 200, 200)
  rect(player2.square.x, player2.square.y + player2.square.size, 200, 200)

  stroke(1)
  fill(color(0,0,0));
  rect(0, 0, 2, 200);
  rect(398, 0, 2, 200);
  rect(0, 163, 400, 1);
  
  fill(color(0,0,0));
  //health bars
  //p2
  stroke(1)
  rect(30, 65, 150, 1);
  rect(29, 35, 1, 30);
  noStroke()
  textFont(font);
  textSize(11);
  textAlign(LEFT);
  text(player2.name.toUpperCase(), 20, 15);
  //p1
  stroke(1)
  rect(200, 150, 150, 1);
  rect(350, 120, 1, 30);
  noStroke()
  textFont(font);
  textAlign(RIGHT);
  textSize(11);
  text(player1.name.toUpperCase(), 360, 105);
  
  //attack info
  noStroke()
  textFont(font);
  textSize(10);
  textAlign(LEFT);
  text(attackText.toUpperCase(), 10, 188);
  
  if(mouseIsPressed){
    //player1.hp = 0
    player2.hp = 0
  }
}


let playerTurn = Math.random() < 0.5;
const turnTime = 2;
let turnTimer = 0;
let attackText = "";

let flashTime = 2;
let flash = flashTime;

var gameOverDrawTime = 15;
var gameOverDrawTimer = gameOverDrawTime;

var gameOverTime = 2;
var gameOverTimer = gameOverTime;
var gameOverAlertScreenTime = 15;
var gameOverAlertScreenTimer = gameOverAlertScreenTime;

let ready = false;
let font;

function reset()
{
  flash = flashTime;
  gameOverDrawTimer = gameOverDrawTime;
  gameOverTimer = gameOverTime;
  gameOverAlertScreenTimer = gameOverAlertScreenTime;
  turnTimer = 0
  playerTurn = Math.random() < 0.5;
  attackText = "";
  ready = false;
}

function start(name1, name2)
{
  reset();
  ready = true;
  theme.loop()
  player1.name = name1
  player2.name = name2
}