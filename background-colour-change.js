window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  const colorThemes = [];
  const htmlStyles = getComputedStyle(document.documentElement);
  const targetStylesheet = document.querySelector("#color-themes");
  const regex = /--([^:\s]+):\s*var\(--([^)]+)\);/g;

  if (targetStylesheet) {
    const rules =
      targetStylesheet.sheet.cssRules || targetStylesheet.sheet.rules;
    for (const rule of rules) {
      const styleObject = {};
      let match;
      while ((match = regex.exec(rule.cssText)) !== null) {
        const key = "--" + match[1];
        const value = htmlStyles.getPropertyValue("--" + match[2]);
        styleObject[key] = value;
      }
      colorThemes.push(styleObject);
    }

    const durationSetting = attr(0.4, targetStylesheet.getAttribute("speed")),
      easeSetting = attr("power1.out", targetStylesheet.getAttribute("ease")),
      offsetSetting = attr(
        95,
        targetStylesheet.getAttribute("percent-from-top")
      ),
      breakpointSetting = attr(0, targetStylesheet.getAttribute("min-width"));
    gsap.registerPlugin(ScrollTrigger);

    const triggerElements = document.querySelectorAll("[animate-body-to]");

    // Create a ResizeObserver to handle viewport changes
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    triggerElements.forEach((element, index) => {
      const modeIndex = +element.getAttribute("animate-body-to");
      let endSetting = `bottom ${offsetSetting}%`;
      if (index === triggerElements.length - 1)
        endSetting = `bottom ${offsetSetting}%`;

      // Special cases for themes that trigger at 50%
      const thisOffsetSetting =
        modeIndex === 4 || modeIndex === 5 ? 50 : offsetSetting;

      // Define a function to create the ScrollTrigger with the correct settings
      const createScrollTrigger = () => {
        // Clear any existing ScrollTrigger for this element
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === element) {
            st.kill();
          }
        });

        const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed

        // Different settings for mobile
        const startPosition =
          isMobile && (modeIndex === 4 || modeIndex === 5)
            ? `top ${thisOffsetSetting}%`
            : `clamp(top ${thisOffsetSetting}%)`;

        const endPosition =
          isMobile && (modeIndex === 4 || modeIndex === 5)
            ? `bottom ${thisOffsetSetting}%`
            : modeIndex === 4 || modeIndex === 5
            ? `clamp(bottom ${thisOffsetSetting}%)`
            : endSetting;

        const colorScroll = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: startPosition,
            end: endPosition,
            toggleActions: "play complete none reverse",
            // Add markers for debugging
            // markers: true,
            onRefresh: (self) => {
              // Additional logic can be added here if needed
            },
          },
        });

        colorScroll.to("body", {
          ...colorThemes[modeIndex - 1],
          duration: durationSetting,
          ease: easeSetting,
        });
      };

      // Create initial ScrollTrigger
      gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
        createScrollTrigger();
      });

      // Update ScrollTrigger on orientation change
      window.addEventListener("orientationchange", () => {
        // Small delay to ensure DOM is updated
        setTimeout(createScrollTrigger, 100);
      });
    });
  }
});
