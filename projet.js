
console.log("hey projects");
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.left [data-project-name]');
    const projectList = document.querySelector('.project__list');
    const projects = projectList ? projectList.querySelectorAll('.project__item') : [];

    function showProject(projectName) {
        projects.forEach(project => {
            if (project.getAttribute('data-project-name') === projectName) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });

        buttons.forEach(button => {
            if (button.getAttribute('data-project-name') === projectName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Afficher le premier projet par défaut
    if (projects.length > 0) {
        const firstProjectName = projects[0].getAttribute('data-project-name');
        showProject(firstProjectName);
        console.log('Premier projet affiché:', firstProjectName);
    } else {
        console.error('Aucun projet trouvé dans .project__list');
    }

    // Gestion des clics sur les boutons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project-name');
            showProject(projectName);
        });
    });

    // Log pour le débogage
    console.log('Nombre de projets trouvés:', projects.length);
    console.log('Projets:', projects);
});
//////////////////////LOGO NAVBAR BLACK///////////////////////
document.addEventListener('DOMContentLoaded', () => {
    function updateNavbarLogo() {
        const navbarLogo = document.querySelector('.navbar__logo');
        if (navbarLogo) {
            if (window.location.href.includes('projets')) {
                navbarLogo.style.color = '#131313';
            } else {
                navbarLogo.style.color = ''; 
            }
        }
    }

    updateNavbarLogo();

    window.addEventListener('popstate', updateNavbarLogo);

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            setTimeout(updateNavbarLogo, 0);
        });
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
  