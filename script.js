var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var Player = /** @class */ (function () {
    function Player(info) {
        var _this = this;
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(_this.info.x + Math.sin(player.info.angle), _this.info.y - 25 + Math.cos(player.info.angle));
            ctx.lineTo(_this.info.x + 12.5 + Math.sin(player.info.angle), _this.info.y + 12.5 + Math.cos(player.info.angle));
            ctx.lineTo(_this.info.x - 12.5 + Math.sin(player.info.angle), _this.info.y + 12.5 + Math.cos(player.info.angle));
            ctx.lineTo(_this.info.x + Math.sin(player.info.angle), _this.info.y - 25 + Math.cos(player.info.angle));
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();
        };
        this.update = function () {
            player.draw();
            _this.info.x += _this.info.velocity[0];
            _this.info.y += _this.info.velocity[1];
            if (keys.right)
                _this.info.angle += 0.01;
            if (keys.left)
                _this.info.angle -= 0.01;
        };
        this.info = info;
    }
    return Player;
}());
var player = new Player({
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocity: [0, 0],
    angle: 0,
});
var keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};
window.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.code == "ArrowRight") {
        keys.right = true;
    }
    else if (e.code == "ArrowLeft") {
        keys.left = true;
    }
    else if (e.code == "ArrowUp") {
        player.info.velocity[0]++;
    }
    else if (e.code == "ArrowDown") {
        player.info.velocity[0]--;
    }
});
window.addEventListener("keyup", function (e) {
    console.log(e);
    if (e.code == "ArrowRight") {
        keys.right = false;
    }
    else if (e.code == "ArrowLeft") {
        keys.left = false;
    }
    else if (e.code == "ArrowUp") {
        var interval_1 = setInterval(function () {
            if (player.info.velocity[0] > 0)
                player.info.velocity[0]--;
            else
                clearInterval(interval_1);
        }, 25);
    }
    else if (e.code == "ArrowDown") {
        var interval_2 = setInterval(function () {
            if (player.info.velocity[0] < 0)
                player.info.velocity[0]++;
            else
                clearInterval(interval_2);
        }, 25);
    }
});
var animate = function () {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
};
// main loop
animate();
