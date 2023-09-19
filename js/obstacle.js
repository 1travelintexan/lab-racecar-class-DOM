class Obstacle {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");
    this.positions = [250, 80, 250, 80, 80, 250];
    this.left =
      this.positions[Math.floor(Math.random() * this.positions.length)];
    this.top = -200;
    this.width = 70;
    this.height = 140;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "../images/redCar.png";
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 6;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
