// Universal solution for both mobile and desktop
document.addEventListener("DOMContentLoaded", function () {
  // Give the DOM a moment to fully render
  setTimeout(function () {
    const dropdownToggle = document.querySelector("#w-dropdown-toggle-0");

    if (dropdownToggle) {
      // Detect device type
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      //   console.log("Device detected as:", isMobile ? "mobile" : "desktop");

      // DESKTOP SPECIFIC EVENTS
      if (!isMobile) {
        // Mouse events for desktop browsers
        // console.log("Triggering desktop-specific events");
        const mousedownEvent = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        dropdownToggle.dispatchEvent(mousedownEvent);

        setTimeout(() => {
          const mouseupEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          dropdownToggle.dispatchEvent(mouseupEvent);
        }, 50);
      }

      // MOBILE SPECIFIC EVENTS
      if (isMobile) {
        // console.log("Triggering mobile-specific events");
        // Try touchstart/touchend with bubbling and cancelable flags
        try {
          const touchStartEvent = new TouchEvent("touchstart", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          const touchEndEvent = new TouchEvent("touchend", {
            bubbles: true,
            cancelable: true,
            view: window,
          });

          dropdownToggle.dispatchEvent(touchStartEvent);
          setTimeout(() => {
            dropdownToggle.dispatchEvent(touchEndEvent);
          }, 100);
        } catch (e) {
          // TouchEvent may not be supported, fallback to generic events
          const startEvent = new Event("touchstart", {
            bubbles: true,
            cancelable: true,
          });
          const endEvent = new Event("touchend", {
            bubbles: true,
            cancelable: true,
          });

          dropdownToggle.dispatchEvent(startEvent);
          setTimeout(() => {
            dropdownToggle.dispatchEvent(endEvent);
          }, 100);
        }
      }

      // UNIVERSAL APPROACH (fallback for both)
      setTimeout(() => {
        // console.log("Triggering universal click event as fallback");
        // 1. Native click as backup
        dropdownToggle.click();

        // 2. As last resort, try to find and manipulate dropdown items directly
        setTimeout(() => {
          const dropdownItems = document.querySelectorAll(
            '.dropdown-item, .dropdown-menu a, [role="menuitem"]'
          );
          if (dropdownItems && dropdownItems.length > 0) {
            // console.log("Found dropdown items, attempting to access directly");
            // Try to make dropdown items visible if they're hidden
            const dropdownMenu = document.querySelector(".dropdown-menu");
            if (dropdownMenu) {
              dropdownMenu.style.display = "block";
              dropdownMenu.style.visibility = "visible";
              dropdownMenu.style.opacity = "1";
            }
          }
        }, 150);
      }, 200);
    } else {
      console.error("Dropdown toggle element not found");
    }
  }, 250); // Balanced delay for both mobile and desktop
});
