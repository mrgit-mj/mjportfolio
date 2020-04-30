const canvas = document.querySelector('canvas');
const banner = document.querySelector('.banner-section');

console.dir(banner)

canvas.width = banner.clientWidth;
canvas.height = banner.clientHeight;


// c stands for context
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

var c = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
// SETTINGS 
const numberOfCircles = 150
let circles = [];
let nameDots = [];
const nameDotsStartLocation = 
    {x: 500,
    y: 100}
;
// Mouse class

let mouse = {
}
// listener section

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

});

class Circle {
    constructor(x, y, r, dx,dy, color) {
        this.x = x,
        this.y = y,
        this.r = r,
        this.dx = dx,
        this.dy = dy,
        this.color = color
    }

    drawCircle() {
        // c.clearRect(0,0, width, height);
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
    }
    updateCircle() {

        this.directCircle();

        if (this.x + this.r > width || this.x - this.r < 0 ) {
            this.dx = this.flip(this.dx)
            // color = colorArr[Math.round(Math.random() * 10)];
        }
        if (this.y + this.r > height || this.y - this.r < 0) {
            this.dy = this.flip(this.dy);
            // color = colorArr[Math.round(Math.random() * 10)];
        }
        this.x += this.dx;
        this.y += this.dy
        // interactive with mouse

        // Make circle larger
        // if(mouse.x - this.x < 20 &&
        //     mouse.x - this.x > -20 &&
        //     mouse.y - this.y < 20 &&
        //     mouse.y - this.y > -20 && 
        //     this.r < 30) {
        //     this.r += 1;
        // } else if (this.r > 3) {
        //     this.r -= 1;
        // }

        // draw line between circles
        circles.forEach(circle => {
            if(circle.x - this.x < 40 &&
                circle.x - this.x > -40 &&
                circle.y - this.y < 40 &&
                circle.y - this.y > -40) {
                const opacity = this.getOpacity(circle.x,  circle.y, this.x, this.y)
                this.drawLine(circle.x, circle.y, opacity)
            }
        });
        this.drawCircle();
    }

    directCircle() {
        // scare dot away
        // cal difference in position:
        let xDifference = this.x - mouse.x;
        let yDifference = this.y - mouse.y;
        
        // get the distance we want to push
        if (xDifference < 30 && xDifference > -30 && yDifference < 30 && yDifference > -30){
            const distance = Math.sqrt(
                xDifference * xDifference +
                yDifference * yDifference
            );
    
            const forceDirection = {
                x: xDifference/ distance,
                y: yDifference/ distance
            }
            const maxDistance = 1000;
            var force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0
    
            this.dx = forceDirection.x * force *2
            this.dy = forceDirection.y * force*2

        }

    }

    flip(speed) {
        let rand = Math.random() ;
        if(speed > 0 ){
            return -rand
        } else {
            return rand
        }
    }

    drawLine(x2, y2, opacity) {

        // line 
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(x2, y2);
        c.strokeStyle = `rgba(255,255,255,${opacity})`;
        c.stroke();
    }
    getOpacity(x2, y2, x1, y1) {
        const distance = Math.sqrt(
            (x2 - x1) * (x2 - x1) +
            (y2 - y1) * (y2 - y1)
        )
        return (50 - distance) / 50;
    }
}


class Name {
    constructor(nameDotsStartLocation, dot, r, color, fontSize) {
        this.startLoc = nameDotsStartLocation,
        this.distanceX = dot.x;
        this.distanceY = dot.y;
        this.r = r;
        this.color = color;
        this.zeroX = this.startLoc.x + (this.distanceX * fontSize);
        this.zeroY = this.startLoc.y + (this.distanceY * fontSize);
        this.x = this.zeroX;
        this.y = this.zeroY;
        this.dx = 0;
        this.dy = 0;
    }

    drawDot() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
    }
    updateDot() {

        this.directDot();
        this.x += this.dx;
        this.y += this.dy

        // draw line between circles
        circles.forEach(circle => {
            if(circle.x - this.x < 40 &&
                circle.x - this.x > -40 &&
                circle.y - this.y < 40 &&
                circle.y - this.y > -40) {
                const opacity = this.getOpacity(circle.x,  circle.y, this.x, this.y)
                this.drawLine(circle.x, circle.y,opacity)
            }
        });
        nameDots.forEach(dot => {
            if(dot.x - this.x < 120 &&
                dot.x - this.x > -120 &&
                dot.y - this.y < 120 &&
                dot.y - this.y > -120) {
                const opacity = this.getOpacity(dot.x,  dot.y, this.x, this.y)
                this.drawLine(dot.x, dot.y, opacity);
            }
        });
        this.drawDot();
    }

    directDot() {
        // scare dot away
        // cal difference in position:
        let xDifference = this.x - mouse.x;
        let yDifference = this.y - mouse.y;
        
        // get the distance we want to push
        if (xDifference < 60 && xDifference > -60 && yDifference < 60 && yDifference > -60){
            const distance = Math.sqrt(
                xDifference * xDifference +
                yDifference * yDifference
            );
    
            const forceDirection = {
                x: xDifference/ distance,
                y: yDifference/ distance
            }
            const maxDistance = 1000;
            var force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0
    
            this.dx = forceDirection.x * force 
            this.dy = forceDirection.y * force

        } else if (this.x === this.zeroX && this.y === this.zeroY) {
            this.dx = 0;
            this.dy = 0
        } else {
            this.dx = (this.zeroX - this.x) * 0.02;
            this.dy = (this.zeroY - this.y) * 0.02;
        }

    }

    flip(speed) {
        let rand = Math.random() ;
        if(speed > 0 ){
            return -rand
        } else {
            return rand
        }
    }
    drawLine(x2, y2, opacity) {

        // line 
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(x2, y2);
        c.strokeStyle = `rgba(255,255,255,${opacity})`;
        c.stroke();
    }

    getOpacity(x2, y2, x1, y1) {
        const distance = Math.sqrt(
            (x2 - x1) * (x2 - x1) +
            (y2 - y1) * (y2 - y1)
        )
        return (60 - distance) / 60;
    }
}



const fontSize = 40;
const nameDotsLocation = [
    // first line of M left
    {x: 0,y: 0},
    {x: 0,y: 1},
    {x: 0,y: 2},
    {x: 0,y: 3},
    {x: 0,y: 4},
    {x: 0,y: 5},
    {x: 0,y: 6},
    {x: 0,y: 7},
    {x: 0,y: 8},
    {x: 0,y: 9},
    {x: 0,y: 10},
    // 1nd line of M right
    {x: 1,y: 0},
    {x: 1,y: 1},
    {x: 1,y: 2},
    {x: 1,y: 3},
    {x: 1,y: 4},
    {x: 1,y: 5},
    {x: 1,y: 6},
    {x: 1,y: 7},
    {x: 1,y: 8},
    {x: 1,y: 9},
    {x: 1,y: 10},
    // 2nd line of M top
    {x: 2,y: 1},
    {x: 2.5,y: 2},
    {x: 3,y: 3},
    {x: 3.5,y: 4},
    {x: 4,y: 5},
    // 2nd line of M bottom
    {x: 1.5,y: 2},
    {x: 1.5,y: 3},
    {x: 2,y: 4},
    {x: 2.5,y: 5},
    {x: 3,y: 6},
    {x: 4,y: 6},
    //  3rd line of M Top
    {x: 5,y: 6},
    {x: 5,y: 5},
    {x: 5.5,y: 4},
    {x: 6,y: 3},
    {x: 6.5,y: 2},
    {x: 7, y: 1},
    {x: 7.5, y: 0},
    //  3rd line of M Bottom
    {x: 6,y: 6},
    {x: 6.5,y: 5},
    {x: 7,y: 4},
    {x: 7.5,y: 3},
    {x: 8,y: 2},
    // 4th line of M left
    {x: 8.5,y: 0},
    {x: 8.5,y: 1},
    {x: 8.5,y: 2},
    {x: 8.5,y: 3},
    {x: 8.5,y: 4},
    {x: 8.5,y: 5},
    {x: 8.5,y: 6},
    {x: 8.5,y: 7},
    {x: 8.5,y: 8},
    {x: 8.5,y: 9},
    {x: 8.5,y: 10},
    // 4th line of M right
    {x: 9.5,y: 0},
    {x: 9.5,y: 1},
    {x: 9.5,y: 2},
    {x: 9.5,y: 3},
    {x: 9.5,y: 4},
    {x: 9.5,y: 5},
    {x: 9.5,y: 6},
    {x: 9.5,y: 7},
    {x: 9.5,y: 8},
    {x: 9.5,y: 9},
    {x: 9.5,y: 10},

];

nameDotsLocation.forEach(dot => {
    let r = 3;
    let color = 'white';
    nameDots.push(new Name(nameDotsStartLocation, dot, r, color, fontSize));
})
for (let i = 0; i < numberOfCircles; i++) {
    let r = 2;
    let x = Math.random() * (width - r * 2) + r;
    let y = Math.random() * (height - r * 2) + r;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    let color = 'rgba(255,255,255,0.8)';
    circles.push(new Circle(x, y, r, dx, dy, color));
}

const animate = () => {
    c.clearRect(0,0, width, height);
    requestAnimationFrame(animate);
    circles.forEach(circle => {
        circle.updateCircle();
    });
    nameDots.forEach(dot => {
        dot.updateDot()
    })
    
}
animate();