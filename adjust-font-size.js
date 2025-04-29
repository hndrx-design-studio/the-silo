function adjustFontSize() {
  const containers = document.querySelectorAll(".heading-bg");

  containers.forEach((container) => {
    const title = container.querySelector(".display-heading");
    if (!title) return;

    // Reset any previous inline styles
    title.style.cssText = "";
    title.style.visibility = "hidden";

    // Start with container width/4 for a larger initial size
    let fontSize = Math.min(container.clientWidth / 4, 300);

    // Set initial styling
    title.style.whiteSpace = "nowrap"; // Prevent wrapping
    title.style.fontSize = fontSize + "px";

    const targetWidth = container.clientWidth;
    const targetHeight = container.clientHeight;

    // Binary search for the optimal font size
    let min = 8; // Minimum readable font size
    let max = fontSize;
    let bestSize = min;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      title.style.fontSize = mid + "px";

      const tooWide = title.scrollWidth > targetWidth;
      const tooTall = title.scrollHeight > targetHeight;

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

    // // Debug output
    // console.log({
    //   containerWidth: targetWidth,
    //   containerHeight: targetHeight,
    //   finalFontSize: bestSize,
    //   textWidth: title.scrollWidth,
    //   textContent: title.textContent,
    // });
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
