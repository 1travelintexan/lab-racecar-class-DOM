class Game {
  constructor() {
    //All elements from the html file targeted
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEnd = document.querySelector("#game-end");
    this.scoreElement = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives");
    this.highScoreElement = document.querySelector("#high-score");
    //<====================>
    this.player = new Player();
    this.height = 500;
    this.width = 400;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.intervalId = 0;
    //New Audio is a class that allows us to play sounds easily
    //this.carHorn .play() is on line 69 when collision occurs
    this.carHorn = new Audio("../audio/car-horn.wav");
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameScreen.style.display = "block";
    this.gameLoop();
  }
  gameLoop() {
    if (this.isGameOver === false) {
      this.update();
      this.intervalId = window.requestAnimationFrame(() => this.gameLoop());
    } else {
      //this is when the game is over
      //cancel animation frame stops the loop from running

      window.cancelAnimationFrame(this.intervalId);
      this.gameContainer.style.display = "none";
      this.gameEnd.style.display = "block";
      const oldHighScore = localStorage.getItem("highScore");
      if (this.score > oldHighScore) {
        localStorage.setItem("highScore", this.score);
        //this is actually updating the DOM (showing on the screen the score)
        this.highScoreElement.innerText = this.score;
      } else {
        this.highScoreElement.innerText = oldHighScore;
      }
    }
  }
  update() {
    //Every 100 frames, push a new obstacle to the array.
    if (this.intervalId % 100 === 0) {
      this.obstacles.push(new Obstacle());
    }

    this.player.move();
    //Loop over the array of obstacles and check for collision
    this.obstacles.forEach((obs, i) => {
      obs.move();
      //If there was a collision with the player car and obstacle car
      if (this.player.didCollide(obs)) {
        //If there is a collision, remove red car from screen, then remove it from array, subtract lives by 1, change the DOM of the lives to reflect the new lives, Play car horn sound and check if lives equals 0
        obs.element.remove();
        this.obstacles.splice(i, 1);
        this.lives -= 1;
        this.livesElement.innerText = this.lives;
        this.carHorn.play();
        if (this.lives === 0) {
          this.isGameOver = true;
        }
      }
      //If the red car goes past the bottom of the screen, increase score, change score DOM, remove red car from array and remove car from screen

      if (obs.top > 500) {
        this.score += 1;
        this.scoreElement.innerText = this.score;
        this.obstacles.splice(i, 1);
        obs.element.remove();
      }
    });
  }
}
