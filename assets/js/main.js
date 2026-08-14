/**
 * Template Name: Kelly
 * Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");

    if (!selectHeader) return;

    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    ) {
      return;
    }

    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);


  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");

    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }


  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach(function (navmenu) {
    navmenu.addEventListener("click", function () {

      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }

    });
  });


  /**
   * Toggle mobile nav dropdowns
   */
  document
    .querySelectorAll(".navmenu .toggle-dropdown")
    .forEach(function (navmenu) {

      navmenu.addEventListener("click", function (e) {

        e.preventDefault();

        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");

        e.stopImmediatePropagation();

      });

    });


  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");

  if (preloader) {

    window.addEventListener("load", function () {
      preloader.remove();
    });

  }


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {

    if (scrollTop) {

      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");

    }

  }

  if (scrollTop) {

    scrollTop.addEventListener("click", function (e) {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);


  /**
   * Animation on scroll function and init
   */
  function aosInit() {

    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

  }

  window.addEventListener("load", aosInit);


  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");

  skillsAnimation.forEach(function (item) {

    new Waypoint({
      element: item,
      offset: "80%",

      handler: function () {

        let progress = item.querySelectorAll(".progress .progress-bar");

        progress.forEach(function (el) {

          el.style.width = el.getAttribute("aria-valuenow") + "%";

        });

      }

    });

  });


  /**
   * Initiate Pure Counter
   */
  new PureCounter();


  /**
   * Init swiper sliders
   */
  function initSwiper() {

    document
      .querySelectorAll(".init-swiper")
      .forEach(function (swiperElement) {

        let config = JSON.parse(
          swiperElement
            .querySelector(".swiper-config")
            .innerHTML
            .trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {

          initSwiperWithCustomPagination(
            swiperElement,
            config
          );

        } else {

          new Swiper(
            swiperElement,
            config
          );

        }

      });

  }

  window.addEventListener("load", initSwiper);


  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox"
  });


  /**
   * Init isotope layout and filters
   *
   * Used by the Projects page.
   *
   * Project categories:
   *
   * AI / ML          -> .filter-ai
   * Robotics         -> .filter-robotics
   * Computer Vision  -> .filter-vision
   * SLAM             -> .filter-slam
   * Middleware       -> .filter-middleware
   */
  document
    .querySelectorAll(".isotope-layout")
    .forEach(function (isotopeItem) {

      let layout =
        isotopeItem.getAttribute("data-layout") ?? "masonry";

      let filter =
        isotopeItem.getAttribute("data-default-filter") ?? "*";

      let sort =
        isotopeItem.getAttribute("data-sort") ?? "original-order";

      let isotopeContainer =
        isotopeItem.querySelector(".isotope-container");

      if (!isotopeContainer) {
        return;
      }

      imagesLoaded(
        isotopeContainer,
        function () {

          let initIsotope = new Isotope(
            isotopeContainer,
            {
              itemSelector: ".isotope-item",
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            }
          );


          /**
           * Project filter buttons
           */
          isotopeItem
            .querySelectorAll(".isotope-filters li")
            .forEach(function (filterButton) {

              filterButton.addEventListener(
                "click",
                function () {

                  /**
                   * Remove active state
                   * from previous filter
                   */
                  let activeFilter =
                    isotopeItem.querySelector(
                      ".isotope-filters .filter-active"
                    );

                  if (activeFilter) {

                    activeFilter.classList.remove(
                      "filter-active"
                    );

                  }


                  /**
                   * Activate clicked filter
                   */
                  this.classList.add(
                    "filter-active"
                  );


                  /**
                   * Apply Isotope filter
                   */
                  let selectedFilter =
                    this.getAttribute(
                      "data-filter"
                    );

                  initIsotope.arrange({
                    filter: selectedFilter
                  });


                  /**
                   * Re-trigger AOS
                   */
                  if (typeof aosInit === "function") {
                    aosInit();
                  }

                }
              );

            });

        }
      );

    });

})();