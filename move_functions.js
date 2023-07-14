function moveHorizontally( displacement ) {
    console.log("Moving horizontally!", displacement);
    let newMouseX = mousePos[0] + displacement
    console.log( "New X: ", newMouseX )
    if ( newMouseX < 0 || newMouseX >= gridSize )
    {
      //invalid move
      return;
    }
    else if ( getTile( newMouseX, mousePos[1] ) === "null" )
    {
      //move mouse to empty spot
      setTile( mousePos[0], mousePos[1], "null" );
      setTile( newMouseX, mousePos[1], "mouse" );
      mousePos = [ newMouseX, mousePos[1] ];
    }
    else {
      let bricksInChain = [];
      let lastBrickX = newMouseX;
      while( getTile( lastBrickX, mousePos[1] ) === "brick" )
      {
        lastBrickX += displacement;
      }
      let lastTile = getTile( lastBrickX, mousePos[1] );
      if ( lastBrickX < 0 || lastBrickX >= gridSize ||  lastTile === "cat" ||  lastTile === "rock")
        return;
        
      console.log( "Last X: ", lastBrickX );
      console.log("Last in chain: ", NumFrom2D( lastBrickX, mousePos[1] ) )
  
      //set mouse current position to null
      setTile( mousePos[0], mousePos[1], "null" );
  
      //move bricks
      while ( lastBrickX != newMouseX )
      {
        setTile( lastBrickX, mousePos[1], "brick" );
        lastBrickX-= displacement; 
      }
  
      //set new Mouse Pos
      setTile( lastBrickX, mousePos[1], "mouse" );
      mousePos = [ lastBrickX, mousePos[1] ];
    }
  }
  
  function moveVertically( displacement ) {
    console.log("Moving vertically!", displacement);
    let newMouseY = mousePos[1] + displacement
    console.log( "New Y: ", newMouseY )
    if ( newMouseY < 0 || newMouseY >= gridSize )
    {
      //invalid move
      return;
    }
    else if ( getTile( mousePos[0], newMouseY ) === "null" )
    {
      //move mouse to empty spot
      setTile( mousePos[0], mousePos[1], "null" );
      setTile( mousePos[0], newMouseY, "mouse" );
      mousePos = [ mousePos[0], newMouseY ];
    }
    else {
      let bricksInChain = [];
      let lastBrickY = newMouseY;
      while( getTile( mousePos[0], lastBrickY ) === "brick" )
      {
        lastBrickY += displacement;
      }
      
      let lastTile = getTile( mousePos[0], lastBrickY );
      if ( lastBrickY < 0 || lastBrickY >= gridSize || lastTile === "cat" || lastTile === "rock") 
        return;
        
      console.log( "Last Y: ", lastBrickY );
      console.log("Last in chain: ", NumFrom2D( mousePos[0], lastBrickY ) )
  
      //set mouse current position to null
      setTile( mousePos[0], mousePos[1], "null" );
  
      //move bricks
      while ( lastBrickY != newMouseY )
      {
        setTile( mousePos[0], lastBrickY, "brick" );
        lastBrickY-= displacement; 
      }
  
      //set new Mouse Pos
      setTile( mousePos[0], lastBrickY, "mouse" );
      mousePos = [ mousePos[0], lastBrickY ];
    }
  }