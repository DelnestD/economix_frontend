import { Component } from '@angular/core';

interface Angel {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Fire {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  passed: boolean;
}
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  //board
  declare board: HTMLCanvasElement;
  declare context: CanvasRenderingContext2D;
  boardWidth: number = 360;
  boardHeight: number = 640;

  //sound
  declare hitSound: HTMLAudioElement;
  declare buttonSound: HTMLAudioElement;
  declare backgroundSound: HTMLAudioElement;
  volume: number = 0.1;

  //angel
  currentFrame: number = 0;
  frameDelay: number = 0;
  angelImg: HTMLImageElement[] = [];
  angelWidth: number = 58; //width/height ratio = 408/228 = 17/12
  angelHeight: number = 46;
  angelX: number = this.boardWidth / 8;
  angelY: number = this.boardHeight / 2;

  angel: Angel = {
    x: this.angelX,
    y: this.angelY,
    width: this.angelWidth,
    height: this.angelHeight,
  };

  //fires
  fireArray: Array<Fire> = [];
  fireWidth: number = 64;
  fireHeight: number = 512;
  fireX: number = this.boardWidth;
  fireY: number = 0;

  declare topFireImg: HTMLImageElement;
  declare bottomFireImg: HTMLImageElement;

  //physics
  velocityX: number = -2; //fires moving to left speed
  velocityY: number = 0; //angel jump speed
  gravity: number = 0.3;

  startingBlock: boolean = true;
  gameOver: boolean = false;
  score: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.board = document.getElementById('board') as HTMLCanvasElement;
    this.board.width = this.boardWidth;
    this.board.height = this.boardHeight;
    this.context = this.board.getContext('2d')!;

    //load images
    for (let i = 1; i <= 3; i++) {
      const img = new Image();
      img.src = `assets/flappyAngel/images/angel${i}.png`;
      img.onload = () => {
        this.context.drawImage(
          img,
          this.angelX,
          this.angelY,
          this.angelWidth,
          this.angelHeight
        );
      };
      this.angelImg.push(img);
    }
    const img = new Image();
    img.src = `assets/flappyAngel/images/angel2.png`;
    img.onload = () => {
      this.context.drawImage(
        img,
        this.angelX,
        this.angelY,
        this.angelWidth,
        this.angelHeight
      );
    };
    this.angelImg.push(img);

    this.topFireImg = new Image();
    this.topFireImg.src = 'assets/flappyAngel/images/topFire.png';

    this.bottomFireImg = new Image();
    this.bottomFireImg.src = 'assets/flappyAngel/images/bottomFire.png';

    //load sounds
    this.hitSound = new Audio();
    this.hitSound.src = 'assets/flappyAngel/sounds/hit.wav';
    this.hitSound.volume = this.volume;
    this.hitSound.load();
    this.buttonSound = new Audio();
    this.buttonSound.src = 'assets/flappyAngel/sounds/button.wav';
    this.buttonSound.volume = this.volume;
    this.buttonSound.load();
    this.backgroundSound = new Audio();
    this.backgroundSound.src = 'assets/flappyAngel/sounds/gamemusic.wav';
    this.backgroundSound.volume = this.volume;
    this.backgroundSound.loop = true;

    if (this.startingBlock) {
      this.context.fillStyle = 'white';
      this.context.font = '120px';
      this.context.fillText(
        'Appuyez sur espace, z ou fléche du haut pour jouer',
        5,
        45
      );
    }
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    if (this.gameOver) return;
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    //angel
    this.velocityY += this.gravity;
    this.angel.y = Math.max(this.angel.y + this.velocityY, 0);
    this.context.drawImage(
      this.angelImg[this.currentFrame],
      this.angel.x,
      this.angel.y,
      this.angel.width,
      this.angel.height
    );
    this.frameDelay++;
    if (this.frameDelay % 7 == 0) {
      this.currentFrame = (this.currentFrame + 1) % 4;
      this.frameDelay = 0;
    }

    if (this.angel.y > this.board.height) {
      this.gameOver = true;
      0;
    }

    //fires

    for (let i = 0; i < this.fireArray.length; i++) {
      let fire: Fire = this.fireArray[i];
      fire.x += this.velocityX;
      this.context.drawImage(fire.img, fire.x, fire.y, fire.width, fire.height);

      if (!fire.passed && this.angel.x > fire.x + fire.width) {
        this.score += 0.5; //half point for each fire
        fire.passed = true;
      }

      if (this.detectCollision(this.angel, fire)) {
        this.hitSound.play();
        this.gameOver = true;
      }
    }

    while (this.fireArray.length > 0 && this.fireArray[0].x < -this.fireWidth) {
      this.fireArray.shift();
    }

    //score
    this.context.fillStyle = 'white';
    this.context.font = '45px';
    this.context.fillText(this.score.toString(), 340, 30);

    if (this.gameOver) {
      this.backgroundSound.pause();
      this.backgroundSound.currentTime = 0;
      this.context.fillStyle = 'white';
      this.context.fillText('Game Over', 80, 300);
    }
  }

  placeFires() {
    if (this.gameOver) return;

    const randomFireY =
      this.fireY - this.fireHeight / 4 - Math.random() * (this.fireHeight / 2);
    const openingSpace = this.board.height / 3.5;

    const topFire: Fire = {
      img: this.topFireImg,
      x: this.fireX,
      y: randomFireY,
      width: this.fireWidth,
      height: this.fireHeight,
      passed: false,
    };

    this.fireArray.push(topFire);

    const bottomFire: Fire = {
      img: this.bottomFireImg,
      x: this.fireX,
      y: randomFireY + this.fireHeight + openingSpace,
      width: this.fireWidth,
      height: this.fireHeight,
      passed: false,
    };
    this.fireArray.push(bottomFire);
  }

  moveAngel(e: any) {
    if (e.code == 'Space' || e.code == 'ArrowUp' || e.code == 'KeyW') {
      this.backgroundSound.play();
      if (this.startingBlock) {
        requestAnimationFrame(this.update.bind(this));
        setInterval(() => this.placeFires(), 2000);
        this.startingBlock = false;
      }
      //jump
      this.velocityY = -6;

      //reset game
      if (this.gameOver) {
        this.angel.y = this.angelY;
        this.fireArray = [];
        this.score = 0;
        this.gameOver = false;
      }
    }
  }

  detectCollision(a: Angel, b: Fire) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}
