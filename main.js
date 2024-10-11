const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#FFC0CB", "#FF69B4", "#FFB6C1", "#FF1493", "#FF4500"];

let particles = [];

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 5; // Random size between 5 and 10
    this.speedY = Math.random() * 1 + 0.5; // Speed in Y direction
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY; // Move particle downwards
    if (this.y > canvas.height) {
      this.y = 0; // Reset to top
      this.x = Math.random() * canvas.width; // Randomize X position
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create particles
function createParticles() {
  for (let i = 0; i < 100; i++) {
    // Adjust the number of particles
    particles.push(
      new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Initialize
createParticles();
animateParticles();

let slideIndex = 0; // Start at the first slide
showSlide(slideIndex); // Show the first slide

function changeSlide(n) {
  slideIndex += n; // Increment or decrement the slide index
  if (slideIndex >= document.querySelectorAll(".slide").length) {
    slideIndex = 0; // Loop back to the first slide
  } else if (slideIndex < 0) {
    slideIndex = document.querySelectorAll(".slide").length - 1; // Go to the last slide
  }
  showSlide(slideIndex);
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.style.display = "none"; // Hide all slides
  });
  slides[index].style.display = "block"; // Show the current slide
}
