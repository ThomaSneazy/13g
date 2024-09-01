console.log('hello offre');

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
$(document).ready(function() {
    $('.offre-step__text:not(.step-1)').hide();
    
    $('#step-1').addClass('active');
    $('.offre-video.step-1').addClass('active');
  
    function switchContent(oldStep, newStep) {
      var $oldContent = $('.offre-step__text.step-' + oldStep);
      var $newContent = $('.offre-step__text.step-' + newStep);
      var $oldVideo = $('.offre-video.step-' + oldStep);
      var $newVideo = $('.offre-video.step-' + newStep);
      
      gsap.to($oldContent, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
          $oldContent.hide();
          $newContent.show();
          gsap.fromTo($newContent, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
  
      $oldVideo.removeClass('active');
      $newVideo.addClass('active');
  
      $('.step__number').removeClass('active');
      $('#step-' + newStep).addClass('active');
    }
  
    $('.step__number').click(function() {
      var newStep = $(this).attr('id').split('-')[1];
      var currentStep = $('.offre-step__text:visible').attr('class').split(' ')[1].split('-')[1];
      
      if (newStep !== currentStep) {
        switchContent(currentStep, newStep);
      }
    });
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
  