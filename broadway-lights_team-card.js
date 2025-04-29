// First, add this CSS to your Webflow project's custom code
const css = `
@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.team_card_portrait-wrapper {
  position: relative;
}

.broadway-lights {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.broadway-lights_circle {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: twinkle 1s ease-in-out infinite;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
}`;

// Add the CSS to the document
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// Main JavaScript function to create and position circles
function createBroadwayLights() {
  const containers = document.querySelectorAll(".team_card_portrait-wrapper");

  // Get responsive sizes based on viewport width
  const { circleSize, inset } = getResponsiveSizes();

  containers.forEach((container) => {
    // Create or get the broadway-lights container
    let lightsContainer = container.querySelector(".broadway-lights");
    if (!lightsContainer) {
      lightsContainer = document.createElement("div");
      lightsContainer.className = "broadway-lights";
      container.appendChild(lightsContainer);
    }

    // Clear existing circles
    lightsContainer.innerHTML = "";

    // Get container dimensions
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Configuration
    const horizontalCircles = 12; // circles on top/bottom
    const verticalCircles = 14; // circles on left/right

    // Calculate spacing (convert rem to px for calculations)
    const pxPerRem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const insetPx = inset * pxPerRem;

    // Calculate spacing
    const horizontalSpacing = (width - insetPx * 2) / (horizontalCircles - 1);
    const verticalSpacing = (height - insetPx * 2) / (verticalCircles - 1);

    // Create circles for each side with random animation delays
    const createCircle = (x, y, index) => {
      const circle = document.createElement("div");
      circle.className = "broadway-lights_circle";
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.width = `${circleSize}rem`;
      circle.style.height = `${circleSize}rem`;

      // Add random animation delay for twinkling effect
      const delay = Math.random() * 2; // Random delay between 0 and 2 seconds
      circle.style.animationDelay = `${delay}s`;

      lightsContainer.appendChild(circle);
    };

    // Top edge
    for (let i = 0; i < horizontalCircles; i++) {
      createCircle(insetPx + i * horizontalSpacing, insetPx, i);
    }

    // Bottom edge
    for (let i = 0; i < horizontalCircles; i++) {
      createCircle(
        insetPx + i * horizontalSpacing,
        height - insetPx,
        i + horizontalCircles
      );
    }

    // Left edge (excluding corners)
    for (let i = 1; i < verticalCircles - 1; i++) {
      createCircle(
        insetPx,
        insetPx + i * verticalSpacing,
        i + horizontalCircles * 2
      );
    }

    // Right edge (excluding corners)
    for (let i = 1; i < verticalCircles - 1; i++) {
      createCircle(
        width - insetPx,
        insetPx + i * verticalSpacing,
        i + horizontalCircles * 2 + verticalCircles
      );
    }
  });
}

// Function to get responsive sizes based on viewport width
function getResponsiveSizes() {
  const viewportWidth = window.innerWidth;

  // Webflow breakpoints (in pixels)
  // Desktop: 992px and above
  // Tablet: 768px to 991px
  // Mobile Landscape: 480px to 767px
  // Mobile Portrait: 479px and below

  if (viewportWidth >= 992) {
    // Desktop
    return {
      circleSize: 1.25,
      inset: 1,
    };
  } else if (viewportWidth >= 768) {
    // Tablet
    return {
      circleSize: 1,
      inset: 0.8,
    };
  } else if (viewportWidth >= 480) {
    // Mobile Landscape
    return {
      circleSize: 2,
      inset: 1.5,
    };
  } else {
    // Mobile Portrait
    return {
      circleSize: 1,
      inset: 1,
    };
  }
}

// Initial creation
createBroadwayLights();

// Update positions on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createBroadwayLights, 100);
});

// For Webflow interactions and dynamic updates
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsload",
  () => {
    createBroadwayLights();
  },
]);
