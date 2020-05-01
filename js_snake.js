var mycanvas = document.getElementById('big_canvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10; 
var w = 700;
var h = 700 ;

var runing;

var snake1;
var snake2;

var snakeSize = 10;
var food;

	// pattern
var drawModule = (function () { 

  var bodySnake = function(x, y, id) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        if (id == 0) 
          ctx.fillStyle = 'red';
        else
          ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
}

  var foods = function(x, y, s) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, s*snakeSize, s*snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, s*snakeSize-2, s*snakeSize-2);

  }

  var scoreText = function() {
    var score_text = "P1: " + snake1.score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 40, h-5);
    var score_text = "P2: " + snake2.score;
    ctx.fillText(score_text, 120, h-5);
  }

  var drawSnake = function() {
      var length = 5;
      snake1 = [];
      snake1.boost = false;
      snake1.score = 0;
      snake1.id = 0;
      snake1.lock = false;
      snake1.refresh = false;
      snake1.direction = "right"
      var pos = spawnrnd();
      for (var i = length-1; i>=0; i--) {
          snake1.push({x:pos.x + i, y:pos.y + 0});
      }

      pos = spawnrnd();
      snake2 = [];
      snake2.boost = false;
      snake2.lock = false;
      snake2.score = 0;
      snake2.id = 1;
      snake2.refresh = false;
      snake2.direction = "left"
      for (var i = length-1; i>=0; i--) {
          snake2.push({x:i + pos.x, y:1 + pos.y});
      }  
  }

  var spawnrnd = function() {
    return {
        x: Math.floor((Math.random() * 66) + 1),
        y: Math.floor((Math.random() * 66) + 1),
      };
  }

  var checkpuetpuet = function(sx, sy) {
  
  	for (var x = food.x; x < food.x + food.size; x++) {
  		for (var y = food.y; y < food.y + food.size; y++) {
  			if (x== sx && y==sy) {
  				return true;
  			}
  		}
  	}


  	return false;
  }
    
  var paint = function(snake){
    /*  if ((snake.id == 0 && snake1.score >= snake2.score) || (snake.id == 1 && snake2.score >= snake1.score)) {
        snake.refresh = true;
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
      }*/

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (snake.direction == 'right') { 
        snakeX++; }
      else if (snake.direction == 'left') { 
        snakeX--; }
      else if (snake.direction == 'up') { 
        snakeY--; 
      } else if(snake.direction == 'down') { 
        snakeY++; }

        if (snake.id == 0)  {
          if (checkCollision(snakeX, snakeY, snake2)) {
            btn.removeAttribute('disabled', true);
            runing = false;
            alert("Player 2 win");
            return;
          }
        }
        else {
          if (checkCollision(snakeX, snakeY, snake1)) {
            btn.removeAttribute('disabled', true);
            runing = false;
            alert("Player 1 win");
            return;
          }
        }
        

      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize) {
        
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);    

          	if (snakeX <= 0)
      			snakeX =  (w / snakeSize) - 1;
      		if (snakeX >= w / snakeSize)
      			snakeX =  0;
      		if (snakeY <= 0)
      			snakeY =  (h / snakeSize) - 1;
      		if (snakeY >= h / snakeSize)
      			snakeY =  0;

        }
        var old = snake.score;
        // colision food
        if(checkpuetpuet(snakeX, snakeY)) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          snake.score += food.size;
          if (snake.score % 5==0) {
          	createFood(4);
          }
          else {
          	createFood(2);
          }
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        old = snake.score - old;
        if (old > 0) {
        while (old--) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail

          snake.unshift(tail); //puts back the tail as the first cell

        }
      }
      else {
          snake.unshift(tail); //puts back the tail as the first cell

      }

        if (runing) {

          window.setTimeout(() => 
          {

            paint(snake);
          }, getinterval(snake));
        }
  }

  var getinterval = function(snake) {
    if (snake.boost) {
      return 15;
    }
    if (snake.score <= 30) {
      return 100;
    }
    if (snake.score <= 60) {
      return 80;
    }
    if (snake.score <= 90) {
      return 70;
    }
    if (snake.score <= 120) {
      return 60;
    }
    if (snake.score <= 150) {
      return 50;
    }
    if (snake.score <= 180) {
      return 40;
    }
    return 30;
}

  var check = function(x, y) {

  }

  var createFood = function(size) {
      food = {
        x: Math.floor((Math.random() * 66) + 1),
        y: Math.floor((Math.random() * 66) + 1),
        size: size
      }

      for (var i=0; i>snake1.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

      for (var i=0; i>snake2.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (checkpuetpuet(snakeX, snakeY)) {
          food.x = Math.floor((Math.random() * 66) + 1);
          food.y = Math.floor((Math.random() * 66) + 1);
        }
       }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      runing = true;
      drawSnake(snake1);
      drawSnake(snake2);
      createFood(2);
      paint(snake1);
      paint(snake2);
      setInterval(() => {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
        for(var i = 0; i < snake1.length; i++) {
          bodySnake(snake1[i].x, snake1[i].y, snake1.id);
        }
        for(var i = 0; i < snake2.length; i++) {
          bodySnake(snake2[i].x, snake2[i].y, snake2.id);
        } 
        foods(food.x, food.y, food.size); 
        scoreText();

      }, 10);
  }


    return {
      init : init
    };

    
}());
// function nom(params) { action}
function boost (snake) {
  if (snake.lock === false) {
            snake.lock=true;
          window.setTimeout(() =>{
            snake.lock = false;
          },5000)
            snake.boost= true;
          window.setTimeout(() =>{
            snake.boost=false;
          },500);
          }
  }


(function(window, document, drawModule, undefined) {

	//Connecter le boutton à l'HTML avec le _init_ function.
	document.getElementById('btn').addEventListener("click", () => {
    drawModule.init();
  });

	document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;
          console.log(keyCode);

        switch(keyCode) {
        
        case 37: 
          if (snake1.direction != 'right') {
           snake1.direction = 'left';
          }
          break;

        case 39:
          if (snake1.direction != 'left') {
           snake1.direction = 'right';
          }
          break;

        case 38:
          if (snake1.direction != 'down') {
           snake1.direction = 'up';
          }
          break;

        case 40:
          if (snake1.direction != 'up') {
           snake1.direction = 'down';
          }
          break;

        case 65, 81: 
          if (snake2.direction != 'right') {
           snake2.direction = 'left';
          }
          break;

        case 65: 
          if (snake2.direction != 'right') {
           snake2.direction = 'left';
          }
          break;

        case 68:
          if (snake2.direction != 'left') {
           snake2.direction = 'right';
          }
          break;

        case 90:
          if (snake2.direction != 'down') {
           snake2.direction = 'up';
          }
          break;

        case 87:
          if (snake2.direction != 'down') {
           snake2.direction = 'up';
          }
          break;  

        case 83:
          if (snake2.direction != 'up') {
           snake2.direction = 'down';
          }
          break;
          
        case 32:
          boost(snake2);
          break;

        case 96:
          boost(snake1);
          break;

        case 13:
          drawModule.init();
          break;
          }
      }


})(window, document, drawModule);