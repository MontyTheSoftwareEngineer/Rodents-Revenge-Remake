class Cat {
    constructor(x, y, aliveImg, deadImg, width, height, gridSize) {
      this.x = x;
      this.y = y;
      this.aliveImg = aliveImg;
      this.deadImg = deadImg;
      this.width = width;
      this.height = height;
      this.gridSize = gridSize;
      this.state = "alive"
    }
  
    display() {
      image( this.state === "alive" ? this.aliveImg : this.deadImg, this.x * this.width , this.y*this.width, this.width, this.height);
    }

    isAlive()
    {
        return this.state === "alive"
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkCollision( x, y )
    {
        return ( x === this.x && y === this.y )
    }

    checkValidMoves() {
        let validMoves = []

        // Check up
        if (this.y - 1 >= 0) {
            const nextTile = getTile(this.x, this.y - 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("up");
            }
        }
        
        // Check down
        if (this.y + 1 < this.gridSize ) {
            const nextTile = getTile(this.x, this.y + 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("down");
            }
        }
        
        // Check right
        if (this.x + 1 < this.gridSize ) {
            const nextTile = getTile(this.x + 1, this.y);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("right");
            }
        }
        
        // Check left
        if (this.x - 1 >= 0) {
            const nextTile = getTile(this.x - 1, this.y);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("left");
            }
        }
        
        // Check top-right diagonal
        if (this.x + 1 < this.gridSize - 1 && this.y - 1 >= 0) {
            const nextTile = getTile(this.x + 1, this.y - 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("top-right");
            }
        }
        
        // Check top-left diagonal
        if (this.x - 1 >= 0 && this.y - 1 >= 0) {
            const nextTile = getTile(this.x - 1, this.y - 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("top-left");
            }
        }
        
        // Check bottom-right diagonal
        if (this.x + 1 < this.gridSize - 1 && this.y + 1 < this.gridSize - 1) {
            const nextTile = getTile(this.x + 1, this.y + 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("bottom-right");
            }
        }
        
        // Check bottom-left diagonal
        if (this.x - 1 >= 0 && this.y + 1 < this.gridSize - 1) {
            const nextTile = getTile(this.x - 1, this.y + 1);
            if (nextTile !== "brick" && nextTile !== "cat" && nextTile !== "rock") {
            validMoves.push("bottom-left");
            }
        }
  
        return validMoves;
    }

    performMove( move ) {
        setTile( this.x, this.y, "null" )
        switch( move ) {
            case "up": {
                this.y -= 1;
                break;
            }
            
            case "down": {
                this.y += 1;
                break;
            }

            
            case "left": {
                this.x -= 1;
                break;
            }

            
            case "right": {
                this.x += 1;
                break;
            }
            case "bottom-right": {
                this.y += 1;
                this.x += 1;
                break;
            }
            
            case "bottom-left": {
                this.y += 1;
                this.x -= 1;
                break;
            }

            
            case "top-right": {
                this.x += 1;
                this.y -= 1;
                break;
            }

            
            case "top-left": {
                this.x -= 1;
                this.y -= 1;
                break;
            }
        }
        
        setTile( this.x, this.y, "cat" )
    }

    async move() {
        while ( this.state !== "dead" && gameState !== "game-over" )
        {
            //check if cat is dead
            if ( this.state === "dead" )
                return;

            //figure out valid moves
            let validMoves = this.checkValidMoves();

            //check if cat state should be dead
            if( validMoves.length < 1 ) {
                //console.log("CAT DEAD")
                this.state = "dead"
                return;
            }

            //check if this furball only has one place to go
            if ( validMoves.length === 1) {
                this.performMove( validMoves[0] )
            }
            else {
                let mouseX = mousePos[0];
                let mouseY = mousePos[1];
            
                let minDistance = Infinity;
                let bestMove;
            
                for (let move of validMoves) {
                let newX = this.x;
                let newY = this.y;
            
                // Calculate the new coordinates based on the move
                switch (move) {
                    case "up":
                    newY -= 1;
                    break;
                    case "down":
                    newY += 1;
                    break;
                    case "left":
                    newX -= 1;
                    break;
                    case "right":
                    newX += 1;
                    break;
                    case "bottom-right":
                    newY += 1;
                    newX += 1;
                    break;
                    case "bottom-left":
                    newY += 1;
                    newX -= 1;
                    break;
                    case "top-right":
                    newY -= 1;
                    newX += 1;
                    break;
                    case "top-left":
                    newY -= 1;
                    newX -= 1;
                    break;
                }
            
                // Calculate the distance between the new coordinates and the mouse position
                let distance = Math.sqrt(Math.pow(newX - mouseX, 2) + Math.pow(newY - mouseY, 2));
            
                // Update the best move if the current move brings the cat closer to the mouse
                if (distance < minDistance) {
                    minDistance = distance;
                    bestMove = move;
                }
                }
            
                // Perform the best move
                this.performMove(bestMove);
            }
            
            await this.delay( 1000 );
        }
      }
  }
   