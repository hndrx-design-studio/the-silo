// Add a flag to track the first click
let isFirstClick = true;

$('[data-click="services-item"]').click(function (e) {
  // Skip the first click which is triggered programmatically on page load
  if (isFirstClick) {
    isFirstClick = false;
    return;
  }

  // Store reference to the clicked item
  var $clickedItem = $(this);

  // Wait slightly longer than Webflow's animation (500ms > 400ms)
  setTimeout(function () {
    // Get updated position after accordion has opened/closed
    var itemPosition = $clickedItem.offset().top;

    // Add offset for fixed headers if needed
    var headerOffset = 130; // Adjust based on your header height
    itemPosition = itemPosition - headerOffset;

    // Scroll to the item's position
    $("html, body").animate(
      {
        scrollTop: itemPosition,
      },
      350
    );
  }, 450); // Delay of 500ms to ensure accordion has time to open/close
});
