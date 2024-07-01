var canvas = $('#main');
console.log(canvas)

$(canvas).prop('width', window.innerWidth);
$(canvas).prop('height', window.innerHeight);

var c = canvas[0].getContext('2d');

// for (var i = 0; i <= 20; i++) {
//     x = Math.random() * window.innerWidth
//     y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x, y, Math.random() * 125, 0, 2 * Math.PI, false)
//     c.fillStyle = 'green';
//     c.fill();
//     c.lineWidth = 5;
//     c.strokeStyle = '#003300';
//     c.stroke();
// }

class circle {
    constructor(x, y, dx, dy, rad, color, borderColor) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rad = rad
        this.gravity = 1
        this.gravitySpeed = 0;
        this.bounce = 0.8;
        this.damping = 0.9;
        this.traction = 0.8;
        this.color = color
        this.borderColor = borderColor
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false)
        c.fillStyle = `${this.color}`;
        c.fill();
        c.lineWidth = 5;
        c.strokeStyle = `#111`;
        c.stroke();
    }

    update() {
        // if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
        //     this.dx = parseFloat(-(this.dx));
        //     if(this.dx > 0) this.dx -= 0.5
        //     if(this.dx < 0) this.dx += 0.5
        // }
        // if (this.y + this.rad > window.innerHeight || this.y - this.rad < 0) {
        //     this.dy = parseFloat(-(this.dy));
        //     if(this.dy > 0) this.dy -= 0.5
        //     if(this.dy < 0) this.dy += 0.5
        // }

        // this.x += this.dx;
        // this.y += this.dy;
        if (!paused) {

            this.hitBottom();


        }
        this.draw();



    }

    hitBottom() {
        var rockbottom = window.innerHeight - this.rad;
        var rocksideend = window.innerWidth - this.rad;

        if (this.y > rockbottom) {
            this.y = 1 + rockbottom;

            this.dx *= this.traction;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce) * this.damping;
        }

        if (this.y <= 0) {
            this.y = 1 + this.rad;
            this.dy = -this.dy
            this.gravitySpeed = -(this.gravitySpeed * this.bounce) * this.damping;
        }

        if (this.x > rocksideend) {
            this.x = rocksideend;
            this.dx = -this.dx
            this.gravitySpeed = -(this.gravitySpeed * this.bounce) * this.damping;
        }

        if (this.x <= 0) {
            this.x = 1 + this.rad;
            this.dx = -this.dx
            this.gravitySpeed = -(this.gravitySpeed * this.bounce) * this.damping;
        }

        this.gravitySpeed += this.gravity;
        this.x += this.dx;
        this.y += this.dy + this.gravitySpeed;
    }

    speedup() {

        if (paused) {
            if (this.holdDx > 0) {
                this.holdDx += 1;
            }
            else {
                this.holdDx -= 1
            }

            if (this.holdDy > 0) {
                this.holdDy += 1;
            }
            else {
                this.holdDy -= 1
            }
            return;
        }

        if (this.dx > 0) {
            this.dx += 1;
        }
        else {
            this.dx -= 1
        }

        if (this.dy > 0) {
            this.dy += 1;
        }
        else {
            this.dy -= 1
        }

    }

    pause() {
        if (paused) return;
        this.holdDx = this.dx;
        this.holdDy = this.dy;
        this.dx = 0;
        this.dy = 0;

    }

    resume() {
        if (!paused) return;
        this.dx = this.holdDx;
        this.dy = this.holdDy;
        this.holdDx = undefined;
        this.holdDy = undefined;

    }



    speeddown() {

        if (paused) {
            if (this.holdDx > 0) {
                this.holdDx -= 1;
            }
            else {
                this.holdDx += 1
            }

            if (this.holdDy > 0) {
                this.holdDy -= 1;
            }
            else {
                this.holdDy += 1
            }
            return;
        }

        if (this.dx > 0) {
            this.dx -= 1;
        }
        else {
            this.dx += 1
        }

        if (this.dy > 0) {
            this.dy -= 1;
        }
        else {
            this.dy += 1
        }

    }

    clean() {
        if (this.x < 100) {
            this.x += 50
        }

        if (this.x > window.innerWidth - 100) {
            this.x -= 50
        }

        if (this.y < 100) {
            this.y += 50
        }

        if (this.y > window.innerHeight - 100) {
            this.y -= 50
        }


    }
}

var circleArray = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

for (i = 0; i <= 100; i++) {
    let rad = 30
    let x = (Math.floor(Math.random() * (window.innerWidth - rad + 1) + rad))
    let y = (Math.floor(Math.random() * (window.innerHeight - rad + 1) + rad))
    let dx = (Math.random() - 0.5) * 8
    let dy = (Math.random() - 0.5) * 8

    circleArray.push(new circle(x, y, dx, dy, rad, getRandomColor(), getRandomColor()));
}



var total = 0;
var paused = false;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, innerHeight)
    total = 0;
    for (i of circleArray) {
        i.update();
        if (i.dx == 0) {
            total += Math.sqrt(Math.pow(Math.abs(i.holdDx), 2) + Math.pow(Math.abs(i.holdDy), 2));
        }
        else {
            total += Math.sqrt(Math.pow(Math.abs(i.dx), 2) + Math.pow(Math.abs(i.dy), 2));
        }
    }

    $('#avg').text(`Avg Velocity: ${parseFloat(Number(total) / circleArray.length).toFixed(5)} ${paused ? 'PAUSED' : ''}`)
    // c.clearRect(0, 0, window.innerWidth, innerHeight)
    // c.beginPath();
    // c.arc(x, y, rad, 0, 2 * Math.PI, false)
    // c.fillStyle = 'green';
    // c.fill();
    // c.lineWidth = 5;
    // c.strokeStyle = '#003300';
    // c.stroke();
    // console.log('Iteration')

    // x += dx;
    // y += dy;

    // if (x >= window.innerWidth - rad || x <= rad) {
    //     dx = -dx;
    // }
    // if (y >= window.innerHeight - rad || y <= rad) {
    //     dy = -dy;
    // }
}

for (i of circleArray) {
    i.clean()
}

$('#speedup').on('click', () => {

    for (i of circleArray) {
        i.speedup()
    }
})

$('#speeddown').on('click', () => {
    for (i of circleArray) {
        i.speeddown()
    }
})
$('#pause').on('click', () => {
    for (i of circleArray) {
        i.pause()
    }
    if (!paused) {
        paused = true;
    }

})
$('#resume').on('click', () => {
    for (i of circleArray) {
        i.resume()
    }

    if (paused) {
        paused = false;
    }
})



animate();