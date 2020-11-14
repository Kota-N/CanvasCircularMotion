const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.stroke();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const colors = ['#F5E9BE', '#F2D5DC', '#C8DDF4', '#DCEDDA', '#DBD5ED'];
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.07;
    this.distanceFromCenter = {
      x: randomRange(20, 80),
      y: randomRange(50, 100),
    };
    // this.originalX = x;
    // this.originalY = y;
    this.lastMouse = {
      x: x,
      y: y,
    };
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y,
    };

    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.x;
    this.draw(lastPoint);
  }

  draw(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y); // try this instead -> c.lineTo(mouse.x, mouse.y);
    c.stroke();
    c.closePath();
  }
}

let particles = [];

const init = () => {
  particales = [];

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(300, 300, radius, color));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.1';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => particle.update());
};

init();

animate();
