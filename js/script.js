window.onload = function () {
  //global variables
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let ourGame;
  startButton.addEventListener("click", function () {
    startGame();
  });

  //keyboard event listeners
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      console.log("arrow left was pressed");
      ourGame.player.directionX = -3;
    } else if (event.code === "ArrowRight") {
      console.log("arrow right was pressed");
      ourGame.player.directionX = 3;
    } else if (event.code === "ArrowUp") {
      console.log("arrow up was pressed");
      ourGame.player.directionY = -3;
    } else if (event.code === "ArrowDown") {
      console.log("arrow down was pressed");
      ourGame.player.directionY = 3;
    }
  });
  document.addEventListener("keyup", () => {
    ourGame.player.directionX = 0;
    ourGame.player.directionY = 0;
  });
  restartButton.addEventListener("click", () => {
    location.reload();
  });

  function startGame() {
    console.log("start game");
    ourGame = new Game();
    ourGame.start();
  }
};
