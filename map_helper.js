function NumFrom2D( x, y )
{
  return ( y * gridSize ) + x  
}

function NumTo2D( inputNum )
{
  let x = Math.floor( inputNum / gridSize );
  let y = inputNum - ( x * gridSize );
  return [x,y]
}

function getTile( x, y )
{
  return gameMap[ NumFrom2D( x, y ) ];
}

function setTile( x, y, tile )
{
  gameMap[ NumFrom2D( x, y ) ] = tile;
}
