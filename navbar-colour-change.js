document.addEventListener("DOMContentLoaded", function () {
  // Get the navbar element using the data-w-id attribute
  const navbar = document.querySelector(
    '[hndrx-dynamic-navbar-colour="navbar"]'
  );
  // Get all navbar links and logo with custom attributes
  const navbarLinks = document.querySelectorAll(
    '[hndrx-dynamic-navbar-colour="navbar-link"]'
  );
  const navbarLogo = document.querySelector(
    '[hndrx-dynamic-navbar-colour="navbar-logo"]'
  );

  // Create an observer to watch for style changes on the body
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        updateNavbarColor();
      }
    });
  });

  // Function to calculate inverse color
  function calculateInverseColor(r, g, b) {
    // Convert to YIQ to ensure good contrast
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // Return black or white based on YIQ value
    return yiq >= 128 ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
  }

  // Function to update navbar color and invert link/logo colors
  function updateNavbarColor() {
    const bodyStyle = getComputedStyle(document.body);
    const bodyBgColor = bodyStyle.backgroundColor;

    // Parse the RGB values
    const rgbValues = bodyBgColor.match(/\d+/g);
    if (rgbValues) {
      // Make navbar slightly darker/lighter than body; change opacity
      const adjustedColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1)`;
      navbar.style.backgroundColor = adjustedColor;

      // Calculate inverse color for links and logo
      const inverseColor = calculateInverseColor(
        parseInt(rgbValues[0]),
        parseInt(rgbValues[1]),
        parseInt(rgbValues[2])
      );

      // Update link colors
      navbarLinks.forEach((link) => {
        link.style.color = inverseColor;
      });

      // Update logo color
      if (navbarLogo) {
        navbarLogo.style.color = inverseColor;
      }
    }
  }

  // Start observing the body element for style changes
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });

  // Initial color sync
  updateNavbarColor();

  // Also update on scroll if needed
  document.addEventListener("scroll", function () {
    updateNavbarColor();
  });
});
