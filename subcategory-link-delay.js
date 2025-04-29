window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsnest",
  (listInstances) => {
    // console.log("CMS Nest callback running");

    function addDelayToLinks() {
      const links = document.querySelectorAll(
        'a[services-home="subcategory_link-block"]'
      );

      if (links.length === 0) {
        console.warn("No matching links found.");
        return;
      }

      links.forEach(function (link) {
        if (!link.dataset.delayed) {
          // Prevent duplicate event listeners
          link.dataset.delayed = "true";
          link.addEventListener("click", function (event) {
            event.preventDefault();
            const href = this.getAttribute("href");

            // console.log("Delaying navigation to:", href);

            setTimeout(() => {
              window.location.href = href;
            }, 750);
          });
        }
      });
    }

    // Run once when CMS Nest is fully loaded
    addDelayToLinks();
  },
]);
