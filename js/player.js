class Player {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");
    this.left = 80;
    this.top = 400;
    this.width = 70;
    this.height = 140;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "../images/car.png";
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.classList.add("spin");
    this.gameScreen.appendChild(this.element);
  }
  move() {
    if (
      this.left + this.directionX <= 300 &&
      this.left + this.directionX >= 40
    ) {
      this.left += this.directionX;
    }
    if (this.top + this.directionY <= 400 && this.top + this.directionY >= 30) {
      this.top += this.directionY;
    }

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
