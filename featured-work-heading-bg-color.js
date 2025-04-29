// Get the featured work heading element
const featuredWorkHeading = document.querySelector(".featured-work_heading");

// Check if the element exists
if (!featuredWorkHeading) {
  console.error("Element with class .featured-work_heading not found");
} else {
  // Set initial background color to transparent
  featuredWorkHeading.style.backgroundColor = "transparent";

  // Add transition property to the element to enable smooth color change
  featuredWorkHeading.style.transition = "background-color 0.2s linear";

  // Function to check if the element has reached 50% of viewport height
  function checkElementPosition() {
    // Get the element's position relative to the viewport
    const elementRect = featuredWorkHeading.getBoundingClientRect();

    // Calculate 50% of the viewport height
    const halfViewportHeight = window.innerHeight * 0.5;

    // Check if the element's top edge has reached 50% of the viewport height
    if (elementRect.top <= halfViewportHeight) {
      // Change the background color to white
      featuredWorkHeading.style.backgroundColor = "white";
    } else {
      // Reset the background color to transparent
      featuredWorkHeading.style.backgroundColor = "transparent";
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", checkElementPosition);

  // Check position initially (in case the element is already in view on page load)
  checkElementPosition();
}
