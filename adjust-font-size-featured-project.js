function adjustFontSize() {
  const containers = document.querySelectorAll(".portfolio18_heading");

  containers.forEach((container) => {
    // const title = container.querySelector(".portfolio18_heading-text");
    const title = container.querySelector("h3");
    if (!title) return;

    // Reset any previous inline styles
    title.style.cssText = "";
    title.style.visibility = "hidden";

    // Adjust initial font size based on screen width
    let initialFontSize;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 478) {
      initialFontSize = Math.min(container.clientWidth / 6, 40); // Smaller initial size for mobile
    } else {
      initialFontSize = Math.min(container.clientWidth / 4, 300);
    }

    // Set initial styling
    title.style.whiteSpace = "nowrap"; // Prevent wrapping
    title.style.fontSize = fontSize + "px";

    const targetWidth = container.clientWidth;
    const targetHeight = container.clientHeight;

    // Adjust minimum font size based on screen width
    let minFontSize = screenWidth <= 478 ? 14 : 8; // Larger minimum for mobile
    let maxFontSize = initialFontSize;
    let bestSize = minFontSize;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      title.style.fontSize = mid + "px";

      const tooWide = title.scrollWidth > targetWidth * 0.95; // Add some padding
      const tooTall = title.scrollHeight > targetHeight * 0.95;

      if (!tooWide && !tooTall) {
        // This size works, save it and try a larger one
        bestSize = mid;
        min = mid + 1;
      } else {
        // Too big, try a smaller size
        max = mid - 1;
      }
    }

    // Set the final font size
    title.style.fontSize = bestSize + "px";
    title.style.visibility = "visible";
  });
}

// Debounce function to prevent too many resize calculations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Adjust font size on window resize with debouncing
const debouncedAdjust = debounce(adjustFontSize, 250);
window.addEventListener("resize", debouncedAdjust);

// Run on load and after a short delay to ensure proper dimensions
window.addEventListener("load", () => {
  adjustFontSize();
  // Additional check after a short delay
  setTimeout(adjustFontSize, 100);
});

// Optional: Rerun when fonts are loaded to handle web fonts
if (document.fonts) {
  document.fonts.ready.then(adjustFontSize);
}
