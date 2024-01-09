/*

The Game Project

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var collectables;
var canyons;
var tree_x;
var treePos_y;
var cloud;
var mountain;
var cameraPosX;
var game_score;
var flagpole;
var lives;
var jumpSound;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}

function draw()
{
	///////////DRAWING CODE//////////
    // update camera position
	cameraPosX = gameChar_x - width/2;
    //fill the sky blue
	background(100,155,255); 
	noStroke();
    //draw some green ground
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
    // start camera transformation 
    push();
	translate(-cameraPosX, 0);
    //draw mountain
    drawMountains();
    // draw tree
    drawTrees();
    //draw cloud
    drawClouds();
    //check canyan
    for (var i = 0; i < canyons.length; i++) 
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    //draw collectable
    for (var i = 0; i < collectables.length; i++) 
    {
        if(!collectables[i].isFound)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
    }
    //the game character
    drawGameChar(); 
    //flagpole
    renderFlagpole();
    checkFlagpole();
    // end camera transformation
    pop();        
    //score
    fill(255);
    noStroke();
    text("score:" + game_score, 80, 30);
    //lives
    checkPlayerdie();
    fill(255, 0, 0);
    for (let i = 0; i < lives; i++) 
    {
        rect(10 + i * 20, 10, 10, 30);
    }
    // Check for game over
      if (lives < 1)
      {
        textSize(20);
        fill(255, 0, 0);
        text("GAME OVER", width/2, height/2);
        return; // End the function to prevent further game logic
      }
    // Check for level complete
      if (flagpole.isReached) 
      {
        textSize(20);
        fill(0, 255, 0);
        text("LEVEL COMPLETE", width/2, height/2);
        return; // End the function to prevent further game logic
      }
    ///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft == true)
        {
            gameChar_x -= 3;
        }
    if(isRight == true)
        {
            gameChar_x += 3;
        }
    if(gameChar_y < floorPos_y)
        {
            gameChar_y += 2;
            isFalling = true;
        }
    else
        {
            isFalling = false;
        }
}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    //move left
    if(keyCode == 65 && !isPlummeting)
        {
            console.log("left");
            isLeft = true;
        }
   //move right 
   else if(keyCode == 68 && !isPlummeting)
        {
            console.log("right");
            isRight = true;
        }
    
    //jump
    else if(keyCode == 87 && !isFalling)
        {
            isFalling = true;
            gameChar_y -= 100;     
        } 
        
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(keyCode == 65)
        {
            console.log("left");
            isLeft = false;
        }
    
    if(keyCode == 68)
        {
            console.log("right");
            isRight = false;
        }    
}

//clouds
function drawClouds()
{
    for(var i = 0; i < cloud.length; i++)
        {
            fill(255);
            ellipse(cloud[i].x_pos+50,cloud[i].y_pos,cloud[i].size+30);

            fill(255);
            ellipse(cloud[i].x_pos,cloud[i].y_pos,cloud[i].size);

            fill(255);
            ellipse(cloud[i].x_pos+100,cloud[i].y_pos,cloud[i].size);
        }   
}

//moutains
function drawMountains()
{
    for(var i = 0; i < mountain.length; i++)
        {
            stroke(0);
            
            //base
            fill(135, 206, 235);
            triangle(mountain[i].x_pos, mountain[i].y_pos,
            mountain[i].x_pos + mountain[i].size/2, mountain[i].y_pos - mountain[i].size,
            mountain[i].x_pos + mountain[i].size, mountain[i].y_pos);

            //slope
            fill(48, 99, 121);
            triangle(mountain[i].x_pos, mountain[i].y_pos,
            mountain[i].x_pos + mountain[i].size/4, mountain[i].y_pos - mountain[i].size/2,
            mountain[i].x_pos + mountain[i].size/2, mountain[i].y_pos - mountain[i].size/4);

            //slope
            fill(48, 99, 121);
            triangle(mountain[i].x_pos + mountain[i].size/2, mountain[i].y_pos - mountain[i].size/4,
            mountain[i].x_pos + 3*mountain[i].size/4, mountain[i].y_pos - mountain[i].size/2,
            mountain[i].x_pos + mountain[i].size, mountain[i].y_pos);
            
            noStroke();
 
        }
}

//trees
function drawTrees()
{
    for(var i = 0; i < tree_x.length; i++)
        {
            stroke(0),
            
            //trunk
            fill(205,133,63);
            rect(tree_x[i],treePos_y-38,10,40); 
            
            //crown
            fill(124,252,0);
            ellipse(tree_x[i]+5,treePos_y-85,30,100);
            
            noStroke();

        }
}

//collectable
function drawCollectable(t_collectable)
{
    if(t_collectable.isFound == false)
        {
        fill(255,215,0);
        ellipse(t_collectable.x_pos,t_collectable.y_pos-15,t_collectable.size);

        fill(255);
        ellipse(t_collectable.x_pos,t_collectable.y_pos-15,t_collectable.size-13);

        fill(0);
        ellipse(t_collectable.x_pos,t_collectable.y_pos-15,t_collectable.size-25,t_collectable.size-13);
        }
}

//canyon
function drawCanyon(t_canyon)
{
   if(isPlummeting)
        {
            gameChar_y += 4;
        }
    
    fill(100, 155, 255);
    rect(t_canyon.x_pos,430,t_canyon.width,145);
}

//if gameChar found collectable, score +1
function checkCollectable(t_collectable)
{
    if(dist(gameChar_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos)<20)
        {
            t_collectable.isFound = true;
            game_score += 1;
        }
}

//check gamChar and canyon
function checkCanyon(t_canyon)
{
     if((gameChar_x > t_canyon.x_pos) && (gameChar_x < (t_canyon.x_pos + t_canyon.width)) && (gameChar_y >= floorPos_y))
        {
            isPlummeting = true;
        }
}

//draw gameChar
function drawGameChar()
{
    stroke(0);
	
    if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(197,145,108);
        ellipse(gameChar_x-3,gameChar_y-50,25,25);

        fill(255,0,0);
        ellipse(gameChar_x,gameChar_y-10,26,20);    

        fill(255,165,0);
        ellipse(gameChar_x,gameChar_y-13,15,15);

        fill(255);
        ellipse(gameChar_x-3,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);

        fill(255,0,0);
        rect(gameChar_x-6,gameChar_y-53,6,6);
	}
    
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(197,145,108);
        ellipse(gameChar_x+3,gameChar_y-50,25,25);

        fill(255,0,0);
        ellipse(gameChar_x,gameChar_y-10,26,20);    

        fill(255,165,0);
        ellipse(gameChar_x,gameChar_y-13,15,15);

        fill(255);
        ellipse(gameChar_x+3,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);
        
        fill(255,0,0);
        rect(gameChar_x,gameChar_y-53,6,6);
	}
    
	else if(isLeft)
	{
		// add your walking left code
        fill(197,145,108);
        ellipse(gameChar_x-3,gameChar_y-50,25,25);

        fill(255);
        ellipse(gameChar_x-3,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);

        fill(0);
        rect(gameChar_x+5,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x-10,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x-6,gameChar_y-53,6,6);
	}
    
	else if(isRight)
	{
		// add your walking right code
        fill(197,145,108);
        ellipse(gameChar_x+3,gameChar_y-50,25,25);

        fill(255);
        ellipse(gameChar_x+3,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);

        fill(0);
        rect(gameChar_x+5,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x-10,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x,gameChar_y-53,6,6);
	}
    
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(197,145,108);
        ellipse(gameChar_x,gameChar_y-50,25,25);

        fill(255,0,0);
        ellipse(gameChar_x,gameChar_y-10,26,20);    

        fill(255,165,0);
        ellipse(gameChar_x,gameChar_y-13,15,15);

        fill(255);
        ellipse(gameChar_x,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);

        fill(255,0,0);
        rect(gameChar_x-3,gameChar_y-53,6,6);
	}
    
	else
	{
		// add your standing front facing code
        fill(197,145,108);
        ellipse(gameChar_x,gameChar_y-50,25,25);

        fill(255);
        ellipse(gameChar_x,gameChar_y-50,15,15);

        fill(104,104,104);
        rect(gameChar_x-15,gameChar_y-40,30,30);

        fill(0);
        rect(gameChar_x+5,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x-10,gameChar_y-10,5,10);

        fill(0);
        rect(gameChar_x-3,gameChar_y-53,6,6);
	}
    
}

//FlagPole
function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);
   
    noStroke();
    fill(255,0,0);
    if(flagpole.isReached)
        {

            rect(flagpole.x_pos,floorPos_y-250,80,50);
        }
    
    else
        {
            rect(flagpole.x_pos,floorPos_y-50,80,50);
        }
    pop();
}

//if gameChar touched FlagPole, flag goes up
function checkFlagpole()
{
    var d = flagpole.x_pos - gameChar_x;
    if (d < 5)
    {
        flagpole.isReached = true;
    }

}

//check lives,if there is remaining live,game countinues
function checkPlayerdie()
{
    if(gameChar_y > height)
        {
            lives --;
            if(lives > 0)
            {
                startGame();
            }
        }
 
}

//start game
function startGame()
{
    gameChar_x = width/2 - 30;
	gameChar_y = floorPos_y;
    
    isLeft =false;
    isRight =false;
    isPlummeting =false;
    isFalling =false;

    collectables = [
        {x_pos: -180, y_pos: floorPos_y, size: 30, isFound: false},
        {x_pos: 20, y_pos: floorPos_y, size: 30, isFound: false},
        {x_pos: 300, y_pos: floorPos_y, size: 30, isFound: false},
        {x_pos: 800, y_pos: floorPos_y, size: 30, isFound: false},
        {x_pos: 1000, y_pos: floorPos_y, size: 30, isFound: false},
        {x_pos: 1300, y_pos: floorPos_y, size: 30, isFound: false}
    ];

    canyons = [
        {x_pos: -150, width: 100},
        {x_pos: 100, width: 100},
        {x_pos: 515, width: 70},
        {x_pos: 1100, width: 110},
    ];
    
    tree_x = [-250,20,300,700,1000,1300];
    treePos_y = floorPos_y;
    cloud = [{x_pos:140, y_pos:120, size:70},
             {x_pos:480, y_pos:100, size:70},
             {x_pos:740, y_pos:90, size:70},
             {x_pos:1080, y_pos:75, size:70}]
    mountain = [{x_pos: 1300, y_pos: 433, size: 300},
               {x_pos: 300, y_pos: 433, size: 200},
               {x_pos: 600, y_pos: 433, size: 250},
               {x_pos: 800, y_pos: 433, size: 275},
               {x_pos: -500, y_pos: 433, size: 275}]
    cameraPosX = 0;
    
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 1800};
}