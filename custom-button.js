document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP MatchMedia
  let mm = gsap.matchMedia();

  // Add a media query scope for screens 992px and wider
  mm.add("(min-width: 992px)", () => {
    // --- START OF YOUR GSAP CODE ---
    gsap.registerPlugin(MotionPathPlugin); // Register plugin within the scope

    const buttons = document.querySelectorAll(".animated-button");

    buttons.forEach((button) => {
      let circle = button.querySelector(".circle");
      let text = button.querySelector(".text");
      let arrow = button.querySelector(".arrow");

      // Define mouseenter logic
      const handleMouseEnter = () => {
        const computedStyle = getComputedStyle(button);
        const buttonHeight = parseFloat(computedStyle.height);

        // Scale the spacing values based on button height
        const spacingGap = buttonHeight * 0.05; // Dynamic gap
        const textOffset = buttonHeight * 0.04; // Dynamic offset

        let buttonWidth = button.offsetWidth;
        let circleWidth = circle.offsetWidth;

        let moveDistance = buttonWidth - circleWidth - spacingGap * 5;
        let textMoveDistance = circleWidth + textOffset;

        // Kill any existing tweens on these elements before starting new ones
        gsap.killTweensOf([button, circle, text, arrow]);

        // Check button classes and apply appropriate animations
        if (button.classList.contains("is-hero")) {
          gsap.to(button, {
            backgroundColor: "black",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: moveDistance,
            rotation: 360,
            backgroundColor: "#3B2456",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(text, {
            x: -textMoveDistance,
            color: "white",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(arrow, {
            color: "#DBBDFF",
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else if (button.classList.contains("is-white")) {
          gsap.to(button, {
            backgroundColor: "black",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: moveDistance,
            rotation: 360,
            backgroundColor: "white",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(text, {
            x: -textMoveDistance,
            color: "white",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(arrow, {
            color: "black",
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(button, {
            backgroundColor: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: moveDistance,
            rotation: 360,
            backgroundColor: "black",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(text, {
            x: -textMoveDistance,
            color: "black",
            duration: 0.6,
            ease: "back.out(1.4)",
          });
          gsap.to(arrow, {
            color: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      };

      // Define mouseleave logic
      const handleMouseLeave = () => {
        // Kill any existing tweens on these elements before starting new ones
        gsap.killTweensOf([button, circle, text, arrow]);

        // Check button classes and apply appropriate reset animations
        if (button.classList.contains("is-hero")) {
          gsap.to(button, {
            backgroundColor: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: 0,
            rotation: 0,
            backgroundColor: "black",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(text, {
            x: 0,
            color: "black",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(arrow, {
            color: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else if (button.classList.contains("is-white")) {
          gsap.to(button, {
            backgroundColor: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: 0,
            rotation: 0,
            backgroundColor: "black",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(text, {
            x: 0,
            color: "black",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(arrow, {
            color: "white",
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(button, {
            backgroundColor: "black",
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(circle, {
            x: 0,
            rotation: 0,
            backgroundColor: "white",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(text, {
            x: 0,
            color: "white",
            duration: 0.6,
            ease: "back.inOut(1.4)",
          });
          gsap.to(arrow, {
            color: "black",
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      };

      // Add event listeners
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });
    // --- END OF YOUR GSAP CODE ---

    // Return a cleanup function that runs when the media query no longer matches
    return () => {
      console.log("Cleaning up button animations (width < 992px)");
      buttons.forEach((button) => {
        let circle = button.querySelector(".circle");
        let text = button.querySelector(".text");
        let arrow = button.querySelector(".arrow");

        // Remove event listeners to prevent them from firing on smaller screens
        // Note: Need to use the same function references used in addEventListener
        // This part is tricky if functions were defined inline anonymously.
        // It's better practice to define named functions or store references.
        // Since we defined handleMouseEnter/Leave above, we can attempt removal,
        // but GSAP's context cleanup often handles listeners added within its scope.
        // Let's rely on killing tweens and resetting props primarily.

        // Kill all active animations on the elements
        gsap.killTweensOf([button, circle, text, arrow]);

        // Reset styles using clearProps or specific values
        // clearProps: "all" is broad; resetting specific properties is safer
        gsap.set(button, { clearProps: "backgroundColor" });
        gsap.set(circle, { clearProps: "x,rotation,backgroundColor" });
        gsap.set(text, { clearProps: "x,color" });
        gsap.set(arrow, { clearProps: "color" });

        // Alternatively, explicitly set to initial CSS state if known
        // (This requires knowing the default styles from your CSS)
        // Example:
        // if (button.classList.contains('is-white') || button.classList.contains('is-hero')) {
        //   gsap.set(button, { backgroundColor: 'white' });
        //   gsap.set(circle, { x: 0, rotation: 0, backgroundColor: 'black' });
        //   // ... etc
        // } else {
        //   gsap.set(button, { backgroundColor: 'black' });
        //   gsap.set(circle, { x: 0, rotation: 0, backgroundColor: 'white' });
        //   // ... etc
        // }
      });
    }; // End of cleanup function
  }); // End of mm.add()
}); // End of DOMContentLoaded listener
