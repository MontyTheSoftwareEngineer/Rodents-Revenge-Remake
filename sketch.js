const gridSize = 23;
let catLimit = 2;
let cellSize;

let mouseStartPos;
let mousePos = [];
let mouseImage;
let blockImage;
let catImage;
let catDeadImage;

let gameMap = []
let cats = []
let testCat
let gameState = "game-over"

function preload() {
  mouseImage = loadImage('assets/mouse.png');
  blockImage = loadImage('assets/brick.png');
  catImage = loadImage( 'assets/cat.png' )
  catDeadImage = loadImage( 'assets/sit.png' )
}

function newGame() {
  console.log("New game starting")  
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
      if ( currTile === "brick" || currTile === "mouse" )
      {
        let tileImage = ( currTile === "brick" ? blockImage : mouseImage )
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
    cats[catCount].display()
  }

  if ( !anyAlive )
  {
    catLimit++;
    newGame()
  }

}

function keyPressed() {
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