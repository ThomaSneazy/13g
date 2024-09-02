
gsap.registerPlugin(ScrollTrigger);


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




//////////////////////COMMENTAIRE ICI//////////////////////
// const blocks = document.querySelectorAll('.tag__item__block');

// // Créez une timeline pour chaque bloc
// blocks.forEach((block, index) => {
//   gsap.set(block, { opacity: 0, rotationY: -90 }); // État initial

//   gsap.timeline({
//     scrollTrigger: {
//       trigger: block,
//       start: "top 80%", // Déclenche l'animation quand le haut du bloc atteint 80% de la hauteur de la fenêtre
//       toggleActions: "play none none reverse"
//     }
//   })
//   .to(block, {
//     opacity: 1,
//     rotationY: 0,
//     duration: 1.5,
//     ease: "elastic.out(1, 0.3)", // Effet de rebond long
//     delay: index * 0.1 // Léger décalage entre chaque bloc
//   });
// });
//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.section.is-custom-h2');
  const blocks = Array.from(document.querySelectorAll('.tag__item__block'));

  if (!section || blocks.length === 0) {
    console.error("La section ou les blocs n'ont pas été trouvés. Vérifiez vos sélecteurs.");
    return;
  }

  const maxMovement = 80; // Augmenté pour un mouvement encore plus prononcé
  const smoothFactor = 0.05; // Garde la même valeur pour la fluidité

  // Augmenter la plage des facteurs aléatoires
  const randomFactors = blocks.map(() => ({
    x: (Math.random() - 0.5) * 5, // Entre -1.5 et 1.5
    y: (Math.random() - 0.5) * 5, // Entre -1.5 et 1.5
    speed: Math.random() * 0.7 + 0.3 // Vitesse aléatoire entre 0.3 et 1
  }));

  const targetPositions = blocks.map(() => ({ x: 0, y: 0 }));

  function updateBlockPositions() {
    blocks.forEach((block, index) => {
      const currentTransform = block.style.transform;
      const currentX = currentTransform ? parseFloat(currentTransform.split(',')[0].split('(')[1]) || 0 : 0;
      const currentY = currentTransform ? parseFloat(currentTransform.split(',')[1]) || 0 : 0;

      const targetX = targetPositions[index].x;
      const targetY = targetPositions[index].y;

      const newX = currentX + (targetX - currentX) * smoothFactor;
      const newY = currentY + (targetY - currentY) * smoothFactor;

      block.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    requestAnimationFrame(updateBlockPositions);
  }

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    blocks.forEach((block, index) => {
      const factor = randomFactors[index];
      targetPositions[index] = {
        x: mouseX * maxMovement * factor.x * factor.speed,
        y: mouseY * maxMovement * factor.y * factor.speed
      };
    });
  });

  // Augmenter l'amplitude du mouvement aléatoire
  function addRandomMovement() {
    blocks.forEach((block, index) => {
      const randomX = (Math.random() - 0.5) * 10; // Augmenté à 20
      const randomY = (Math.random() - 0.5) * 10; // Augmenté à 20
      targetPositions[index].x += randomX;
      targetPositions[index].y += randomY;
    });
    setTimeout(addRandomMovement, 1500); // Réduit à 1.5 secondes pour plus de dynamisme
  }

  updateBlockPositions();
  addRandomMovement();
});


//////////////////////COMMENTAIRE ICI//////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const customH2Elements = document.querySelectorAll('.custom-h2__wrapper .custom-h2');

  customH2Elements.forEach(element => {
    const splitText = new SplitType(element, { types: 'words', tagName: 'span' });

    if (splitText.words && splitText.words.length > 0) {
      // Définir l'état initial : rotation -90deg et opacité 0
      gsap.set(splitText.words, {
        opacity: 0,
        rotationX: -90,
        transformPerspective: 1000,
        transformOrigin: "50% 0%"
      });

      // Créer l'animation GSAP
      gsap.to(splitText.words, {
        opacity: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 0.5,
          toggleActions: 'play none none reverse'
        }
      });
    } else {
      console.error('SplitType n\'a pas réussi à diviser le texte en mots:', element.textContent);
    }
  });
});

//////////////////////CARD 180 HOVER////////////////////////
const cardItems = document.querySelectorAll('.card__180__item');

cardItems.forEach(item => {
  const backElement = item.querySelector('.card__180__back');
  const textWrapper = item.querySelector('.card-text__wrapper');
  const divider = item.querySelector('.divider-card-active');
  const backImage = backElement.querySelector('img');
  const backParagraph = backElement.querySelector('p');

  if (backElement && textWrapper && divider && backImage && backParagraph) {
    // Animation initiale (état de départ)
    gsap.set(backElement, {
      height: 0,
      borderTopLeftRadius: '15rem',
      borderTopRightRadius: '15rem',
      borderBottomLeftRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
    });
    gsap.set(divider, { width: 0 });
    
    // Cacher l'image et le paragraphe initialement
    gsap.set([backImage, backParagraph], {
      display: 'none',
      opacity: 0,
      y: 30
    });

    // Création de la timeline pour l'animation
    const tl = gsap.timeline({ paused: true });

    tl.to(backElement, {
      height: '100%',
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem',
      duration: 0.8,
      ease: 'power2.inOut'
    })
    .to(divider, {
      width: '100%',
      duration: 0.6,
      ease: 'power2.inOut'
    }, "-=0.4")
    .to([backImage, backParagraph], {
      display: 'block',
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, "-=0.4")
    .add(() => textWrapper.classList.add('active'), "-=0.6");

    // Ajout des écouteurs d'événements pour le survol
    item.addEventListener('mouseenter', () => {
      tl.play();
    });
    item.addEventListener('mouseleave', () => {
      tl.reverse();
      // Retirer la classe 'active' à la fin de l'animation inverse
      tl.eventCallback('onReverseComplete', () => {
        textWrapper.classList.remove('active');
        gsap.set([backImage, backParagraph], { display: 'none' });
      });
    });
  }
});

/////////////////
$(document).ready(function() {
  $('.button-marque__block').on('mouseenter', function() {
    $(this).addClass('active');
    $(this).find('.button-marque-arrow').addClass('active');
  });
});

/////////////////////
$(document).ready(function() {
  gsap.set('.popup__item, .popup__overlay', { display: 'none', opacity: 0 });

  function openPopup(id) {
    const $popup = $(`.popup__item[data-name="${id}"]`);
    const $overlay = $('.popup__overlay');

    if ($popup.length) {
      gsap.to($overlay, { display: 'flex', opacity: 1, duration: 0.3 });

      gsap.to($popup, { display: 'flex', opacity: 1, duration: 0.3 });

      initBulletHover($popup);
    }
  }

  function closeAllPopups() {
    const $popups = $('.popup__item');
    const $overlay = $('.popup__overlay');

    gsap.to($popups, { opacity: 0, duration: 0.3, onComplete: () => {
      gsap.set($popups, { display: 'none' });
    }});

    gsap.to($overlay, { opacity: 0, duration: 0.3, onComplete: () => {
      gsap.set($overlay, { display: 'none' });
    }});

    $(document).off('mousemove.bulletHover');
  }

  function initBulletHover($popup) {
    const $bullet = $popup.find('.bullet-hover');
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;

    gsap.ticker.add(() => {
      currentX += (targetX - currentX) * 0.3;
      currentY += (targetY - currentY) * 0.3;
      gsap.set($bullet, { left: currentX, top: currentY });
    });

    $(document).on('mousemove.bulletHover', function(e) {
      const popupRect = $popup[0].getBoundingClientRect();
      let x = e.clientX - popupRect.left;
      let y = e.clientY - popupRect.top;

      if (x < 0) x = 0;
      if (x > popupRect.width) x = popupRect.width;
      if (y < 0) y = 0;
      if (y > popupRect.height) y = popupRect.height;

      if (x > 0 && x < popupRect.width && y > 0 && y < popupRect.height) {
        const distToLeft = x;
        const distToRight = popupRect.width - x;
        const distToTop = y;
        const distToBottom = popupRect.height - y;
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

        if (minDist === distToLeft) x = 0;
        else if (minDist === distToRight) x = popupRect.width;
        else if (minDist === distToTop) y = 0;
        else y = popupRect.height;
      }

      targetX = x;
      targetY = y;
    });
  }

  $('.offre-lottie__block').click(function() {
    const id = $(this).attr('id');
    if (id) {
      openPopup(id);
    }
  });

  $(document).keydown(function(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  });

  $('.popup__overlay').click(function() {
    closeAllPopups();
  });
});
//////////////////Last lottie in grid/////////////////////
$(document).ready(function() {
  const $arrow = $('.offre-lottie__block.is_last .icon-arrow.is-lottie');
  let moveAnimation;

  $('.offre-lottie__block.is_last').hover(
    function() { 
      $arrow.css('animation', 'colorChange 1.5s infinite');

      moveAnimation = gsap.timeline({repeat: -1})
        .to($arrow, {
          x: '150%', 
          duration: 0.6, 
          ease: "power1.in"
        })
        .set($arrow, {x: '-150%'})
        .to($arrow, {
          x: '0%', 
          duration: 1.5, 
          ease: "elastic.out(1, 0.3)" 
        });
    },
    function() { 
      $arrow.css('animation', 'none');

      if (moveAnimation) {
        moveAnimation.kill();
        gsap.to($arrow, {
          x: 0, 
          duration: 1, 
          ease: "elastic.out(1, 0.3)" 
        });
      }
    }
  );
});


/////////////STEP ANIMATION HERO OFFRE//////////////////
// $(document).ready(function() {
//     $('.offre-step__text:not(.step-1)').hide();
    
//     $('#step-1').addClass('active');
//     $('.offre-video.step-1').addClass('active');
  
//     function switchContent(oldStep, newStep) {
//       var $oldContent = $('.offre-step__text.step-' + oldStep);
//       var $newContent = $('.offre-step__text.step-' + newStep);
//       var $oldVideo = $('.offre-video.step-' + oldStep);
//       var $newVideo = $('.offre-video.step-' + newStep);
      
//       gsap.to($oldContent, {
//         y: -50,
//         opacity: 0,
//         duration: 0.5,
//         onComplete: function() {
//           $oldContent.hide();
//           $newContent.show();
//           gsap.fromTo($newContent, 
//             { y: 50, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.5 }
//           );
//         }
//       });
  
//       $oldVideo.removeClass('active');
//       $newVideo.addClass('active');
  
//       $('.step__number').removeClass('active');
//       $('#step-' + newStep).addClass('active');
//     }
  
//     $('.step__number').click(function() {
//       var newStep = $(this).attr('id').split('-')[1];
//       var currentStep = $('.offre-step__text:visible').attr('class').split(' ')[1].split('-')[1];
      
//       if (newStep !== currentStep) {
//         switchContent(currentStep, newStep);
//       }
//     });
//   });
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
  