document.addEventListener("DOMContentLoaded", () => {
  const buttonDrop = document.querySelector(".button-drop");
  const dropdownWrapper = document.querySelector(".dropdown__list__wrapper");
  const dropdownItems = dropdownWrapper.querySelectorAll(".dropdown__item");
  let timeoutId;

  // Initialisation de GSAP
  gsap.set(dropdownWrapper, {
    opacity: 0,
    visibility: "hidden",
    backdropFilter: "blur(0px)",
  });
  gsap.set(dropdownItems, { opacity: 0, y: 10 });

  function showDropdown() {
    gsap.to(dropdownWrapper, {
      duration: 0.3,
      opacity: 1,
      visibility: "visible",
      backdropFilter: "blur(8px)", // Ajustez la valeur selon vos besoins
      ease: "power2.out",
    });

    gsap.to(dropdownItems, {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

  function hideDropdown() {
    gsap.to(dropdownWrapper, {
      duration: 0.3,
      opacity: 0,
      backdropFilter: "blur(0px)",
      ease: "power2.in",
      onComplete: () => {
        gsap.set(dropdownWrapper, { visibility: "hidden" });
      },
    });

    gsap.to(dropdownItems, {
      duration: 0.2,
      opacity: 0,
      y: 10,
      stagger: 0.03,
      ease: "power2.in",
    });
  }

  buttonDrop.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
    showDropdown();
  });

  buttonDrop.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      if (!dropdownWrapper.matches(":hover")) {
        hideDropdown();
      }
    }, 100);
  });

  dropdownWrapper.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      if (!buttonDrop.matches(":hover")) {
        hideDropdown();
      }
    }, 100);
  });
});
