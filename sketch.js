const gridSize = 23;
let catLimit = 2;
let rockLimit = 0
let cellSize;

let mouseStartPos;
let mousePos = [];
let mouseImage;
let blockImage;
let catImage;
let catDeadImage;
let rockImage;

let gameMap = []
let cats = []
let testCat
let gameState = "game-over"

function preload() {
  mouseImage = loadImage('assets/mouse.png');
  blockImage = loadImage('assets/brick.png');
  catImage = loadImage( 'assets/cat.png' )
  catDeadImage = loadImage( 'assets/sit.png' )
  rockImage = loadImage( 'assets/rocks.png' )
}

function newGame() {
  console.log("New game starting")  
  gameState = "playing"
  //set all tiles to null first
  for ( let counter = 0; counter < gridSize * gridSize; counter++ )
  {
    gameMap[counter] = "null"
  }

  //mouse pos is center to start
  mouseStartPos = Math.floor( gridSize/2)
  mousePos = [mouseStartPos, mouseStartPos]

  let catCount = 0;

  //populate map with non null components
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {

      if ( x === mouseStartPos && y === mouseStartPos ) {
        let tileNum = NumFrom2D( x, y)
        gameMap[tileNum] = "mouse";
      }
      else if ( ( x < 20 && x > 2 ) && ( y < 20 && y > 2 ) ) {
        let tileNum = NumFrom2D( x, y)
        gameMap[tileNum] = "brick";
      }
    }
  }

  //create rocks
  for ( let rockCount = 0; rockCount < rockLimit; rockCount++ ) {
    let randPos = Math.floor( Math.random() * gridSize * gridSize );
    while ( gameMap[randPos] !== "brick") {
      randPos = Math.floor( Math.random() * gridSize * gridSize );
    }

    gameMap[ randPos ] = "rock"
    rockCount++;
  }

  //create enemies
  cats.splice(0, cats.length);

  for ( let catCount = 0; catCount < catLimit; catCount++ )
  {
    console.log("Creating cat: ", catCount );
    let randPos = Math.floor( Math.random() * gridSize * gridSize );
    while ( gameMap[randPos] !== "null") {
      randPos = Math.floor( Math.random() * gridSize * gridSize );
    }
    let newCatCoords = NumTo2D( randPos );
    let newCat = new Cat( newCatCoords[0], newCatCoords[1], catImage, catDeadImage, cellSize, cellSize, gridSize );
    newCat.move()
    gameMap[ randPos ] = "cat"
    cats.push( newCat )
  }
}

function setup() {
  const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
  cellSize = Math.floor(smallerDimension / gridSize);

  createCanvas(gridSize * cellSize, gridSize * cellSize);
  newGame();
}

function draw() {
  background(220);

  // Draw the grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const xPos = x * cellSize;
      const yPos = y * cellSize;
      let currTile = gameMap[NumFrom2D( x, y )];
      if ( currTile === "brick" || currTile === "mouse" || currTile === "rock" )
      {
        let tileImage;
        switch( currTile ) {
          case "brick": {
            tileImage = blockImage;
            break;
          }
          case "mouse": {
            tileImage = mouseImage;
            break;
          }
          case "rock": {
            tileImage = rockImage;
            break;
          }
        }
        image( tileImage, xPos, yPos, cellSize, cellSize );
      }
      // else {
      //   rect( xPos, yPos, cellSize, cellSize )
      // }
      // let gridNum = NumFrom2D( x, y)

      // textSize(12);
      // textAlign(CENTER, CENTER);
      // text(gridNum, xPos + cellSize / 2, yPos + cellSize / 2);
    }
  }

  let anyAlive = false
  for ( let catCount = 0; catCount < cats.length; catCount++ )
  {
    if ( cats[ catCount ].isAlive() )
      anyAlive = true;

    if ( cats[catCount].checkCollision( mousePos[0], mousePos[1] ) )
      gameState = "game-over"
    cats[catCount].display()
  }

  if ( !anyAlive )
  {
    rockLimit++;
    catLimit++;
    newGame()
  }

  if ( gameState === "game-over" )
  {
    textSize(48)
    fill( 128, 128, 128, 128 );
    noStroke();
    rect( 0, 0, gridSize * cellSize, gridSize * cellSize )
    
    fill( 256, 256, 0, 256 );
    textAlign(CENTER, CENTER);
    text("GAME OVER!", gridSize * cellSize/2, gridSize * cellSize/2);
  }

  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text("Level " + (catLimit - 1), 10, 10);

}

function keyPressed() {
  if ( gameState !== "game-over" )
  {
    if (key === 'w' || key === 'W' || keyCode === UP_ARROW) {
      moveVertically(-1)
    } else if (key === 'a' || key === 'A' || keyCode === LEFT_ARROW) {
      moveHorizontally(-1)
    } else if (key === 's' || key === 'S' || keyCode === DOWN_ARROW) {
      moveVertically( 1 )
    } else if (key === 'd' || key === 'D' || keyCode === RIGHT_ARROW) {
      moveHorizontally(1)
    }
  }
}