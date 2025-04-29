window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  // Initial setup
  gsap.set(".section_text-scroll, .wrapper, li, li > span", {
    clearProps: "all",
  });
  gsap.set("li > span", { transformOrigin: "50% 50%" });
  gsap.set("li:not(:first-of-type) span", { opacity: 0.1, scale: 0.9 });
  gsap.set(".paragraph-block-wrapper", { opacity: 0 }); // Set all paragraphs to 0
  gsap.set(".paragraph-block-wrapper:first-of-type", { opacity: 1 }); // First paragraph visible

  // Define the background colors for each word
  const bgColors = ["#56B7B2", "#F4C119", "#dbbdff", "#ED8965"];

  // Set initial background color
  gsap.set(".section_text-scroll", { backgroundColor: bgColors[0] });

  // Set initial positions
  const spacing = 150;
  document.querySelectorAll("li").forEach((li, i) => {
    gsap.set(li, { y: i * spacing });
  });

  const tl = gsap.timeline();

  // For each word
  document.querySelectorAll("li").forEach((_, index) => {
    const state = gsap.timeline();
    const totalItems = document.querySelectorAll("li").length;

    // Calculate positions for all items relative to the focused item
    document.querySelectorAll("li").forEach((_, i) => {
      const distance = i - index;
      const yPos = distance * spacing;

      state.to(`li:nth-child(${i + 1})`, { y: yPos }, 0);
    });

    // Set the focused word
    state.to(`li:nth-child(${index + 1}) span`, { opacity: 1, scale: 1 }, 0);

    // Animate the corresponding paragraph
    state.to(
      ".paragraph-block-wrapper",
      {
        opacity: function (i) {
          return i === index ? 1 : 0; // Show only the paragraph that matches current index
        },
        ease: "power2.inOut",
      },
      0
    );

    // Animate the background color
    state.to(
      ".section_text-scroll",
      {
        backgroundColor: bgColors[index],
        ease: "power2.inOut", // Match the ease of your other animations
        duration: 0.5, // Adjust duration to match your transition timing
      },
      0
    );

    // Set adjacent words
    if (index > 0) {
      state.to(`li:nth-child(${index}) span`, { opacity: 0.3, scale: 0.9 }, 0);
    }
    if (index < totalItems - 1) {
      state.to(
        `li:nth-child(${index + 2}) span`,
        { opacity: 0.3, scale: 0.9 },
        0
      );
    }

    // Set all other words
    state.to(
      `li:not(:nth-child(${index}), :nth-child(${index + 1}), :nth-child(${
        index + 2
      })) span`,
      { opacity: 0.1, scale: 0.9 },
      0
    );

    // tl.add(state, index * 0.5);
    tl.addLabel(`section-${index}`).add(state, `section-${index}`);
  });

  ScrollTrigger.create({
    trigger: ".section_text-scroll",
    start: "top top",
    end: "bottom bottom",
    pin: ".wrapper",
    pinSpacing: true,
    markers: false,
    animation: tl,
    scrub: 0.5, // Lower value reduces lag
    snap: {
      // snapTo: "labels", // Snap to timeline labels
      // duration: 0.3, // Smooth transition between snaps
      // ease: "power1.inOut", // Smooth easing

      snapTo: (value, self) => {
        // Get all label positions
        const labels = Object.keys(tl.labels);
        const labelPositions = labels.map((label) => tl.labels[label]);

        // Find the closest label position
        let closest = labelPositions.reduce((prev, curr) => {
          return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });

        // If we're very close to the end, snap to the last position
        if (value > labelPositions[labelPositions.length - 1] - 0.1) {
          return labelPositions[labelPositions.length - 1];
        }

        return closest;
      },
      duration: 0.3,
      ease: "power1.inOut",
    },
  });

  ScrollTrigger.refresh(true);
});
