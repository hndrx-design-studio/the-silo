// // Default confetti configuration
// const defaultConfettiConfig = {
//   particleCount: 100,
//   spread: 70,
//   origin: { y: 0.6 },
// };

// // Function to trigger confetti with optional custom config
// function triggerConfetti(customConfig = {}) {
//   const config = { ...defaultConfettiConfig, ...customConfig };
//   confetti(config);
// }

// // Function to initialize confetti buttons
// function initializeConfettiButtons() {
//   // Get all buttons that should trigger confetti
//   const confettiButtons = document.querySelectorAll('[id^="confettiButton"]');

//   // Add click event listener to each button
//   confettiButtons.forEach((button) => {
//     button.addEventListener("click", () => triggerConfetti());
//   });
// }

// // Initialize when DOM is loaded
// document.addEventListener("DOMContentLoaded", initializeConfettiButtons);

// Default confetti configuration
const defaultConfettiConfig = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  particleCount: 30,
  scalar: 1.2,
  shapes: ["circle", "square"],
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  origin: { y: 0.6 },
};

// Emoji confetti configuration
const emojiConfettiConfig = {
  ...defaultConfettiConfig,
  particleCount: 40,
  scalar: 2,
  shapes: ["emoji"],
  shapeOptions: {
    emoji: {
      value: ["🦄", "🌈"],
    },
  },
};

// Function to trigger both regular and emoji confetti
function shoot() {
  confetti(defaultConfettiConfig);
  confetti(emojiConfettiConfig);
}

// Function to trigger confetti with optional custom config
function triggerConfetti(customConfig = {}) {
  // Trigger multiple bursts with slight delays
  shoot();
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

// Function to initialize confetti buttons
function initializeConfettiButtons() {
  // Get all buttons that should trigger confetti
  const confettiButtons = document.querySelectorAll('[id^="confettiButton"]');

  // Add click event listener to each button
  confettiButtons.forEach((button) => {
    button.addEventListener("click", () => triggerConfetti());
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeConfettiButtons);
