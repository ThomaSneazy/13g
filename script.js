//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const gradientBgs = document.querySelectorAll(".gradient-blur-bg");

  gradientBgs.forEach((bg) => {
    gsap.to(bg, {
      x: "8%",
      y: "8%",
      rotation: 2,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(bg, {
      scale: 1.1,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
});

//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const videoWrappers = document.querySelectorAll(".home-video__wrapper");

  videoWrappers.forEach((wrapper) => {
    const itemWrappers = wrapper.querySelectorAll(".home-video__item__wrapper");
    const button = wrapper.querySelector(".button-icon.is-video-section");
    const title = wrapper.querySelector(".home-video__btn .heading-style-h3");
    const videoBe = wrapper.querySelectorAll(".video-be");
    const openButton = wrapper.querySelector(".home-video-btn__open");
    const openIcon = openButton.querySelector(".icon-arrow");
    const closeIcon = openButton.querySelector(".icon-arrow.is-close");

    let activeVideoIndex = Math.floor(Math.random() * videoBe.length);

    gsap.set(itemWrappers, { height: "4.72rem", width: "20rem" });
    gsap.set(button, { opacity: 0 });
    gsap.set(title, { opacity: 1 });
    gsap.set(videoBe, { opacity: 0 });
    gsap.set(openButton, { left: "0.4rem" });
    gsap.set(closeIcon, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(itemWrappers, {
      height: "32rem",
      width: "auto",
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(
        button,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onStart: () => button.classList.add("pointer-events-auto"),
        },
        "-=0.6",
      )
      .to(
        title,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.4",
      )
      .to(
        videoBe[activeVideoIndex],
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.4",
      )
      .to(
        openButton,
        {
          left: "98%",
          xPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.3",
      )
      .to(
        openIcon,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.3",
      )
      .to(
        closeIcon,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.2",
      );

    const toggleVideo = () => {
      gsap.to(videoBe[activeVideoIndex], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      activeVideoIndex = (activeVideoIndex + 1) % videoBe.length;
      gsap.to(videoBe[activeVideoIndex], {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    };

    const hideAllVideos = () => {
      gsap.to(videoBe, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    };

    wrapper.addEventListener("mouseenter", () => {
      tl.play();
      wrapper.classList.add("z-index-2");
    });

    wrapper.addEventListener("mouseleave", () => {
      tl.reverse();
      hideAllVideos();
      wrapper.classList.remove("z-index-2");
      button.classList.remove("pointer-events-auto");
    });

    openButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (tl.progress() === 0 || tl.reversed()) {
        tl.play();
        wrapper.classList.add("z-index-2");
      } else {
        tl.reverse();
        hideAllVideos();
        wrapper.classList.remove("z-index-2");
        button.classList.remove("pointer-events-auto");
      }
    });
  });
});
//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const buttonDrop = document.querySelector(".button-drop");
  const dropdownWrapper = document.querySelector(".dropdown__list__wrapper");
  const dropdownItems = dropdownWrapper.querySelectorAll(".dropdown__item");
  let timeoutId;

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
      backdropFilter: "blur(8px)",
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
