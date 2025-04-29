window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsnest",
  (listInstances) => {
    // console.log("CMS Nest callback running");

    // Get all service items
    const serviceItems = document.querySelectorAll(".services-home_item");

    serviceItems.forEach((item) => {
      // Get category name
      const categoryElement = item.querySelector('[services-home="category"]');
      if (!categoryElement) return;

      const categoryName = categoryElement.textContent.trim().toLowerCase();

      // Get all subcategory link blocks
      const subcategoryLinkBlocks = item.querySelectorAll(
        '[services-home="subcategory_link-block"]'
      );

      subcategoryLinkBlocks.forEach((linkBlock) => {
        // Get subcategory name from the child element
        const subcategoryElement = linkBlock.querySelector(".category-tag");
        if (!subcategoryElement) return;

        const subcategoryName = subcategoryElement.textContent.trim();

        // Create the new URL
        const newUrl = `/categories/${categoryName}?subcategory=${subcategoryName}`;

        // Update the href attribute
        linkBlock.setAttribute("href", newUrl);
      });
    });
  },
]);
