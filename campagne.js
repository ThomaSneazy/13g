
console.log("hey campagne");
gsap.registerPlugin(ScrollTrigger);



//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-anchor]');
    const anchorActives = document.querySelectorAll('.anchor-active');

    function resetAllAnchors() {
        anchorActives.forEach(anchor => {
            anchor.classList.remove('active');
        });
    }

    function activateAnchor(dataAnchor) {
        const targetAnchor = document.querySelector(`.anchor-active[data-anchor="${dataAnchor}"]`);
        if (targetAnchor) {
            resetAllAnchors();
            setTimeout(() => {
                targetAnchor.classList.add('active');
            }, 300); // Délai de 300ms avant d'ajouter la classe active
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const dataAnchor = button.getAttribute('data-anchor');

            const targetSection = document.querySelector(`[data-anchor="${dataAnchor}"]`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => activateAnchor(dataAnchor), 100);
            }
        });
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            let currentSection = null;

            document.querySelectorAll('[data-anchor]').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section;
                }
            });

            if (currentSection) {
                activateAnchor(currentSection.getAttribute('data-anchor'));
            }
        }, 100); 
    });
});
//////////////////////COMMENTAIRE ICI///////////////////////
$(document).ready(function () {
  $(".button__contact__nav.is-anchor").hover(
    function () {
      // Déterminer la couleur en fonction de la classe
      let color = "#8ddd8d"; // Couleur par défaut (vert)
      if ($(this).find(".icon-arrow-green-block").hasClass("is-digitale")) {
        color = "#faaafa"; // Rose pour .is-digitale
      } else if ($(this).find(".icon-arrow-green-block").hasClass("is-mixte")) {
        color = "#e0e055"; // Jaune pour .is-mixte
      } else if ($(this).find(".icon-arrow-green-block").hasClass("is-event")) {
        color = "#6066ee"; // Bleu pour .is-event
      }

      gsap.to($(this).find(".fake-arrow-width"), {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to(this, {
        paddingLeft: "1.11rem",
        paddingRight: "3.4rem",
        backgroundColor: color,
        color: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to($(this).find(".icon-arrow-green-block"), {
        backgroundColor: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to($(this).find(".icon-arrow-green-block svg"), {
        color: "#ffffff",
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    function () {
      // Déterminer la couleur en fonction de la classe (même logique que ci-dessus)
      let color = "#8ddd8d";
      if ($(this).find(".icon-arrow-green-block").hasClass("is-digitale")) {
        color = "#faaafa";
      } else if ($(this).find(".icon-arrow-green-block").hasClass("is-mixte")) {
        color = "#e0e055";
      } else if ($(this).find(".icon-arrow-green-block").hasClass("is-event")) {
        color = "#6066ee";
      }

      gsap.to($(this).find(".fake-arrow-width"), {
        width: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to(this, {
        paddingLeft: "3.4rem",
        paddingRight: "1.11rem",
        backgroundColor: "#131313",
        color: "#ffffff",
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to($(this).find(".icon-arrow-green-block"), {
        backgroundColor: color,
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.to($(this).find(".icon-arrow-green-block svg"), {
        color: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  );
});



//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const projectItems = gsap.utils.toArray('.offre-project__item');
  let currentActiveItem = null;

  function hideAllProjects() {
    projectItems.forEach(item => {
      const imgList = item.querySelector('.project-img__list');
      const h1 = item.querySelector('.h1-vw-style');
      gsap.to(imgList, { display: 'none', opacity: 0, duration: 0.3 });
      h1.classList.remove('active');
    });
  }

  function showProject(item) {
    if (currentActiveItem !== item) {
      if (currentActiveItem) {
        const oldImgList = currentActiveItem.querySelector('.project-img__list');
        const oldH1 = currentActiveItem.querySelector('.h1-vw-style');
        gsap.to(oldImgList, { display: 'none', opacity: 0, duration: 0.3 });
        oldH1.classList.remove('active');
      }
      const imgList = item.querySelector('.project-img__list');
      const h1 = item.querySelector('.h1-vw-style');
      gsap.to(imgList, { display: 'block', opacity: 1, duration: 0.3 });
      h1.classList.add('active');
      currentActiveItem = item;
    }
  }

  projectItems.forEach(item => {
    const imgList = item.querySelector('.project-img__list');
    gsap.set(imgList, { display: 'none', opacity: 0 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => showProject(item),
      onEnterBack: () => showProject(item),
      onLeave: () => {
        if (currentActiveItem === item) {
          hideAllProjects();
          currentActiveItem = null;
        }
      },
      onLeaveBack: () => {
        if (currentActiveItem === item) {
          hideAllProjects();
          currentActiveItem = null;
        }
      }
    });
  });
});
///////////////SWIPER HOME REVIEWS////////////////////
$(document).ready(function () {
  var swiper;

  function initSwiper() {
    swiper = new Swiper(".swiper.temoignage-home", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      breakpoints: {
        481: {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 30,
          loop: true,
        },
        0: {
          slidesPerView: 1.1,
          centeredSlides: false,
          spaceBetween: 20,
          loop: true,
        },
      },
      on: {
        init: function () {
          applyReviewCardStyles();
          showRelevantCards();
        },
      },
    });
  }

  function applyReviewCardStyles() {
    $(".card-review").each(function () {
      var $card = $(this);
      var source = $card.data("source");
      var className = "";
      switch (source) {
        case "linkedin":
          className = "linkedin";
          break;
        case "google":
          className = "google";
          break;
        case "13g":
          className = "treize-g";
          break;
      }
      if (className) {
        $card.addClass(className);
        $card
          .find(".content-review, .info-titre, .poste-review")
          .addClass(className);
      }
      handleStarRating($card);
    });
  }

  function handleStarRating($card) {
    var $starWrapper = $card.find(".etoile-wrap");
    var starRating = parseInt($starWrapper.data("star"));
    if (starRating >= 1 && starRating <= 5) {
      $starWrapper.find(".etoile-1").each(function (index) {
        if (index < starRating) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  }

  function showRelevantCards() {
    $(".card-review").hide();
    $(".card-review.linkedin, .card-review.google, .card-review.treize-g").show();
    if (swiper && typeof swiper.update === "function") {
      swiper.update();
    }
  }

  initSwiper();
});



//////////////////////NAVBAR DROPDOWN//////////////////////

$(document).ready(function () {
    const $buttonDrop = $(".button-drop");
    const $dropdownWrapper = $(".dropdown__list__wrapper");
    const $dropdownItems = $dropdownWrapper.find(".dropdown__item");
    let timeoutId;
    let isSmallScreen = window.innerWidth <= 991;
  
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
  
    function handleInteraction(event) {
      if (isSmallScreen) {
        if (event.type === 'click') {
          if ($dropdownWrapper.css('visibility') === 'hidden') {
            showDropdown();
          } else {
            hideDropdown();
          }
        }
      } else {
        if (event.type === 'mouseenter') {
          clearTimeout(timeoutId);
          showDropdown();
        } else if (event.type === 'mouseleave') {
          timeoutId = setTimeout(function () {
            if (!$dropdownWrapper.is(":hover")) {
              hideDropdown();
            }
          }, 100);
        }
      }
    }
  
    $buttonDrop.on("mouseenter mouseleave click", handleInteraction);
  
    $dropdownWrapper.on("mouseleave", function () {
      if (!isSmallScreen) {
        timeoutId = setTimeout(function () {
          if (!$buttonDrop.is(":hover")) {
            hideDropdown();
          }
        }, 100);
      }
    });
  
    $(window).on('resize', function() {
      isSmallScreen = window.innerWidth <= 991;
    });
  });
  