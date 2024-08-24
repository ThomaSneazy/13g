console.log("cc2");

///////////TAGS EFFECT ON CLICK SERVICE BUTTON////////////////////
$(document).ready(function () {
  const $arrowButtons = $(".services__button-logo.is-arrow");
  const $tagLists = $(".tag__list");
  let currentService = "Agences";

  function getRandomTags($tagList, count) {
    const $tags = $tagList.find(".tag__item");
    return $tags
      .get()
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  function animateTagsOut($tagList) {
    return gsap.to($tagList.find(".tag__item:not(.hidden)").get(), {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.in",
    });
  }

  function animateTagsIn($tagList) {
    const $tagsToAnimate = $tagList.find(".tag__item:not(.hidden)");
    gsap.set($tagsToAnimate.get(), { y: -50, opacity: 0 });
    return gsap.to($tagsToAnimate.get(), {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

  function switchTags(newServiceName) {
    if (newServiceName === currentService) {
      const $currentTagList = $(
        `.tag__list[data-name-services="${currentService}"]`,
      );
      animateTagsOut($currentTagList).then(() =>
        animateTagsIn($currentTagList),
      );
      return;
    }

    const timeline = gsap.timeline();

    const $currentTagList = $(
      `.tag__list[data-name-services="${currentService}"]`,
    );
    const $newTagList = $(`.tag__list[data-name-services="${newServiceName}"]`);

    if ($currentTagList.length) {
      timeline.add(animateTagsOut($currentTagList));
      timeline.set($currentTagList.get(), { display: "none" }, ">");
    }

    if ($newTagList.length) {
      timeline.set($newTagList.get(), { display: "flex" }, ">");
      $newTagList.find(".tag__item").removeClass("hidden");
      timeline.add(animateTagsIn($newTagList));
    }

    currentService = newServiceName;
  }

  const $agencesTagList = $('.tag__list[data-name-services="Agences"]');
  if ($agencesTagList.length) {
    $agencesTagList.css("display", "flex");
    const $randomTags = $(getRandomTags($agencesTagList, 5));
    $agencesTagList.find(".tag__item").addClass("hidden");
    $randomTags.removeClass("hidden");
    animateTagsIn($agencesTagList);
  }

  $arrowButtons.on("click", function () {
    const serviceName = $(this).attr("data-name-services");
    switchTags(serviceName);
  });
});

//////////////////////SERVICES BUTTONS ANIMATION//////////////////////

$(document).ready(function () {
  const $buttonBlocks = $(".services__button-block");

  function initializeButtonBlock(block) {
    const $block = $(block);
    const $buttons = $block.find(".services__button-logo");
    const $arrowButton = $block.find(".services__button-logo.is-arrow");
    const $otherButtons = $block.find(".services__button-logo:not(.is-arrow)");

    gsap.set($buttons.get(), { y: "22.9rem" });

    $otherButtons.each(function () {
      const $rotateElement = $(this).find(".rotate");
      if ($rotateElement.length) {
        const randomRotation = Math.random() * 360 - 180;
        gsap.set($rotateElement.get(0), { rotationZ: randomRotation });
      }
    });

    function animateButtons() {
      const timeline = gsap.timeline();

      timeline
        .to($arrowButton.get(0), {
          y: "-10rem",
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(
          $arrowButton.get(0),
          {
            opacity: 0,
            duration: 0.4,
            ease: "power1.inOut",
          },
          "-=0.3",
        );

      timeline.to(
        $otherButtons.get(),
        {
          y: "0rem",
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.6",
      );

      $otherButtons.each(function () {
        const $rotateElement = $(this).find(".rotate");
        if ($rotateElement.length) {
          timeline.to(
            $rotateElement.get(0),
            {
              rotationZ: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=1",
          );
        }
      });

      return timeline;
    }

    $arrowButton.on("click", animateButtons);
  }

  $buttonBlocks.each(function () {
    initializeButtonBlock(this);
  });
});

//////////////////////GRADIENT EFFECT NOISE/BLUR EFFECT//////////////////////
$(document).ready(function () {
  const $gradientBgs = $(".gradient-blur-bg");

  $gradientBgs.each(function () {
    const bg = this;

    gsap.to(bg, {
      x: "10%",
      y: "10%",
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

//////////////////////HOVER ON VIDEO HOMEPAGE//////////////////////
$(document).ready(function () {
  const $videoWrappers = $(".home-video__wrapper");

  $videoWrappers.each(function () {
    const $wrapper = $(this);
    const $itemWrappers = $wrapper.find(".home-video__item__wrapper");
    const $button = $wrapper.find(".button-icon.is-video-section");
    const $title = $wrapper.find(".home-video__btn .heading-style-h3");
    const $videoBe = $wrapper.find(".video-be");
    const $openButton = $wrapper.find(".home-video-btn__open");
    const $openIcon = $openButton.find(".icon-arrow:not(.is-close)");
    const $closeIcon = $openButton.find(".icon-arrow.is-close");

    let activeVideoIndex = Math.floor(Math.random() * $videoBe.length);

    gsap.set($itemWrappers.get(), { height: "4.72rem", width: "20rem" });
    gsap.set($button.get(0), { opacity: 0 });
    gsap.set($title.get(0), { opacity: 1 });
    gsap.set($videoBe.get(), { opacity: 0 });
    gsap.set($openButton.get(0), { left: "0.4rem" });
    gsap.set($closeIcon.get(0), { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to($itemWrappers.get(), {
      height: "32rem",
      width: "25rem",
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(
        $button.get(0),
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onStart: () => $button.addClass("pointer-events-auto"),
        },
        "-=0.6",
      )
      .to(
        $title.get(0),
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.4",
      )
      .to(
        $videoBe.get(activeVideoIndex),
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.4",
      )
      .to(
        $openButton.get(0),
        {
          left: "98%",
          xPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.3",
      )
      .to(
        $openIcon.get(0),
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.3",
      )
      .to(
        $closeIcon.get(0),
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.2",
      );

    const toggleVideo = () => {
      gsap.to($videoBe.get(activeVideoIndex), {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      activeVideoIndex = (activeVideoIndex + 1) % $videoBe.length;
      gsap.to($videoBe.get(activeVideoIndex), {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    };

    const hideAllVideos = () => {
      gsap.to($videoBe.get(), {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    };

    $wrapper.on("mouseenter", function () {
      tl.play();
      $wrapper.addClass("z-index-2");
    });

    $wrapper.on("mouseleave", function () {
      tl.reverse();
      hideAllVideos();
      $wrapper.removeClass("z-index-2");
      $button.removeClass("pointer-events-auto");
    });

    $openButton.on("click", function (e) {
      e.stopPropagation();
      if (tl.progress() === 0 || tl.reversed()) {
        tl.play();
        $wrapper.addClass("z-index-2");
      } else {
        tl.reverse();
        hideAllVideos();
        $wrapper.removeClass("z-index-2");
        $button.removeClass("pointer-events-auto");
      }
    });
  });
});
//////////////////////NAVBAR DROPDOWN//////////////////////
$(document).ready(function () {
  const $buttonDrop = $(".button-drop");
  const $dropdownWrapper = $(".dropdown__list__wrapper");
  const $dropdownItems = $dropdownWrapper.find(".dropdown__item");
  let timeoutId;

  gsap.set($dropdownWrapper.get(0), {
    opacity: 0,
    visibility: "hidden",
    backdropFilter: "blur(0px)",
  });
  gsap.set($dropdownItems.get(), { opacity: 0, y: 10 });

  function showDropdown() {
    gsap.to($dropdownWrapper.get(0), {
      duration: 0.3,
      opacity: 1,
      visibility: "visible",
      backdropFilter: "blur(8px)",
      ease: "power2.out",
    });

    gsap.to($dropdownItems.get(), {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

  function hideDropdown() {
    gsap.to($dropdownWrapper.get(0), {
      duration: 0.3,
      opacity: 0,
      backdropFilter: "blur(0px)",
      ease: "power2.in",
      onComplete: () => {
        gsap.set($dropdownWrapper.get(0), { visibility: "hidden" });
      },
    });

    gsap.to($dropdownItems.get(), {
      duration: 0.2,
      opacity: 0,
      y: 10,
      stagger: 0.03,
      ease: "power2.in",
    });
  }

  $buttonDrop.on("mouseenter", function () {
    clearTimeout(timeoutId);
    showDropdown();
  });

  $buttonDrop.on("mouseleave", function () {
    timeoutId = setTimeout(function () {
      if (!$dropdownWrapper.is(":hover")) {
        hideDropdown();
      }
    }, 100);
  });

  $dropdownWrapper.on("mouseleave", function () {
    timeoutId = setTimeout(function () {
      if (!$buttonDrop.is(":hover")) {
        hideDropdown();
      }
    }, 100);
  });
});
