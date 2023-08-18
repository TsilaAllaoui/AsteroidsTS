interface EntityInfo {
  x: number;
  y: number;
  velocity: number[];
  angle: number;
}

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx!.fillStyle = "black";
ctx!.fillRect(0, 0, canvas.width, canvas.height);

class Player {
  info: EntityInfo;
  constructor(info: EntityInfo) {
    this.info = info;
  }

  draw = () => {
    ctx!.beginPath();
    ctx!.moveTo(this.info.x, this.info.y - 25);
    ctx!.lineTo(this.info.x + 12.5, this.info.y + 12.5);
    ctx!.lineTo(this.info.x - 12.5, this.info.y + 12.5);
    ctx!.lineTo(this.info.x, this.info.y - 25);
    ctx!.closePath();
    ctx!.strokeStyle = "white";
    ctx!.stroke();
  };

  update = () => {
    player.draw();
    this.info.x += this.info.velocity[0];
    this.info.y += this.info.velocity[1];
    if (keys.right) this.info.angle += 0.01;
    if (keys.left) this.info.angle -= 0.01;
  };
}

const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocity: [0, 0],
  angle: 0,
});

const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight") {
    player.info.angle += 0.01;
  } else if (e.code == "ArrowLeft") {
    player.info.angle -= 0.01;
  } else if (e.code == "ArrowUp") {
    player.info.velocity[0]++;
  } else if (e.code == "ArrowDown") {
    player.info.velocity[0]--;
  }
});
window.addEventListener("keyup", (e) => {
  if (e.code == "ArrowUp") {
    let interval = setInterval(() => {
      if (player.info.velocity[0] > 0) player.info.velocity[0]--;
      else clearInterval(interval);
    }, 25);
  } else if (e.code == "ArrowDown") {
    let interval = setInterval(() => {
      if (player.info.velocity[0] < 0) player.info.velocity[0]++;
      else clearInterval(interval);
    }, 25);
  }
});

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx!.fillStyle = "black";
  ctx!.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
};

// main loop
animate();
