/*! ------------------------------------------------
 * Project Name: Blayden - Personal Portfolio & Resume HTML Template
 * Project Description: Show yourself brightly with Blayden - clean and creative portfolio and resume template!
 * Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
 * Version: 1.0.0
 * Build Date: June 2024
 * Last Update: June 2024
 * This product is available exclusively on Themeforest
 * Author: mix_design
 * Author URI: https://themeforest.net/user/mix_design
 * File name: app.js
 * ------------------------------------------------

 * ------------------------------------------------
 * Table of Contents
 * ------------------------------------------------
 *
 *  01. Loader & Loading Animation
 *  02. Bootstrap Scroll Spy Plugin Settings
 *  03. Lenis Scroll Plugin
 *  04. Scroll to Top Button
 *  05. Stacking Cards
 *  06. Scroll Animations
 *  07. Fade-in Type Effect
 *  08. Blocks Marquee
 *  09. Parallax
 *  10. Swiper Slider
 *  11. Typed.js Plugin
 *  12. Magnific Popup
 *  13. Layout Masonry
 *  14. Smooth Scrolling
 *  15. Buttons Hover Effect
 *  16. SVG Fallback
 *  17. Chrome Smooth Scroll
 *  18. Images Moving Ban
 *  19. Detecting Mobile/Desktop
 *  20. PhotoSwipe Gallery Images Replace
 *  21. Contact Form
 *  22. Color Switch
 *
 * ------------------------------------------------
 * Table of Contents End
 * ------------------------------------------------ */

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
const content = document.querySelector("body");
const imgLoad = imagesLoaded(content);
const loadingWrap = document.querySelector(".loading-wrap");
const loadingItems = loadingWrap ? loadingWrap.querySelectorAll(".loading__item") : [];
const fadeInItems = document.querySelectorAll(".loading__fade");

function startLoader() {
  let counterElement = document.querySelector(".loader__count .count__text");
  let currentValue = 0;
  function updateCounter() {
    if (currentValue < 100) {
      let increment = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;
      let delay = Math.floor(Math.random() * 120) + 25;
      setTimeout(updateCounter, delay);
    }
  }
  updateCounter();
}
startLoader();

imgLoad.on("done", (instance) => {
  hideLoader();
  pageAppearance();
});

function hideLoader() {
  gsap.to(".loader__count", { duration: 0.8, ease: "power2.in", y: "100%", delay: 1.8 });
  gsap.to(".loader__wrapper", { duration: 0.8, ease: "power4.in", y: "-100%", delay: 2.2 });
  setTimeout(() => {
    document.getElementById("loader").classList.add("loaded");
  }, 3200);
}

function pageAppearance() {
  gsap.set(loadingItems, { opacity: 0 });
  gsap.to(
    loadingItems,
    {
      duration: 1.1,
      ease: "power4",
      startAt: { y: 120 },
      y: 0,
      opacity: 1,
      delay: 0.8,
      stagger: 0.05,
    },
    ">-=1.1"
  );
  gsap.set(fadeInItems, { opacity: 0 });
  gsap.to(fadeInItems, { duration: 0.8, ease: "none", opacity: 1, delay: 3.2 });
}
// --------------------------------------------- //
// Loader & Loading Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings Start
// --------------------------------------------- //
// Configuración más robusta del ScrollSpy
const menuLinks = document.querySelectorAll("#menu .menu__link");
const sections = document.querySelectorAll("section[id]");

// Función para actualizar el menú activo
function updateActiveMenu() {
  const scrollPosition = window.scrollY + 100; // Offset para mejor detección

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remover clase active de todos los links
      menuLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Agregar clase active al link correspondiente
      const activeLink = document.querySelector(`#menu .menu__link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
        console.log("Active section:", sectionId); // Debug log
      }
    }
  });
}

// Escuchar el scroll
window.addEventListener("scroll", updateActiveMenu);

// También actualizar en el load inicial
document.addEventListener("DOMContentLoaded", updateActiveMenu);

// Asegurar que se ejecute después de que todo esté cargado
window.addEventListener("load", () => {
  setTimeout(updateActiveMenu, 1000); // Pequeño delay para asegurar que todo esté listo
});

// Configuración del ScrollSpy de Bootstrap como fallback
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#menu",
  smoothScroll: true,
  rootMargin: "0px 0px -25%",
});
// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings End
// --------------------------------------------- //

// --------------------------------------------- //
// Lenis Scroll Plugin Start
// --------------------------------------------- //
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
// --------------------------------------------- //
// Lenis Scroll Plugin End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll to Top Button Start
// --------------------------------------------- //
const toTop = document.querySelector("#to-top");

if (toTop) {
  toTop.addEventListener("click", function (event) {
    event.preventDefault();
  });

  toTop.addEventListener("click", () =>
    gsap.to(window, {
      scrollTo: 0,
      ease: "power4.inOut",
      duration: 2,
    })
  );

  gsap.set(toTop, { opacity: 0 });

  gsap.to(toTop, {
    opacity: 1,
    autoAlpha: 1,
    scrollTrigger: {
      trigger: "body",
      start: "top -20%",
      end: "top -20%",
      toggleActions: "play none reverse none",
    },
  });
}
// --------------------------------------------- //
// Scroll to Top Button End
// --------------------------------------------- //

// --------------------------------------------- //
// Stacking Cards Start
// --------------------------------------------- //
const cards = document.querySelectorAll(".stack-item");
const stickySpace = document.querySelector(".stack-offset");
const animation = gsap.timeline();
let cardWidth;

if (cards.length && stickySpace) {
  function initCards() {
    animation.clear();
    cardWidth = cards[0].offsetWidth;
    //console.log("initCards()", cardWidth);
    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { x: index * cardWidth });
        animation.to(card, { x: 0, duration: index * 0.5, ease: "none" }, 0);
      }
    });
  }
  initCards();

  ScrollTrigger.create({
    trigger: ".stack-wrapper",
    start: "top top",
    pin: true,
    end: () => `+=${cards.length * cardWidth + stickySpace.offsetWidth}`,
    scrub: true,
    animation: animation,
    //markers: true,
    invalidateOnRefresh: true,
  });

  ScrollTrigger.addEventListener("refreshInit", initCards);
  ScrollTrigger.refresh();
}
// --------------------------------------------- //
// Stacking Cards End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll Animations Start
// --------------------------------------------- //
// Animation In Up
const animateInUp = document.querySelectorAll(".animate-in-up");
animateInUp.forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
      ease: "sine",
    },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none reverse",
      },
    }
  );
});

// Animation Cards Stack
// Grid 2x
if (document.querySelector(".animate-card-2")) {
  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 2] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
  });
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-2", { y: 0, opacity: 1 })
  );
}

// Grid 3x
if (document.querySelector(".animate-card-3")) {
  gsap.set(".animate-card-3", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 3] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-3", { y: 0, opacity: 1 })
  );
}

// Grid 4x
if (document.querySelector(".animate-card-4")) {
  gsap.set(".animate-card-4", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-4", {
    interval: 0.1,
    batchMax: 4,
    delay: 1000,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 4] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-4", { y: 0, opacity: 1 })
  );
}

// Grid 5x
if (document.querySelector(".animate-card-5")) {
  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 5] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-5", { y: 0, opacity: 1 })
  );
}
// --------------------------------------------- //
// Scroll Animations End
// --------------------------------------------- //

// --------------------------------------------- //
// Fade-in Type Effect Start
// --------------------------------------------- //
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
  const text = new SplitType(char, { types: "words, chars" });
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      markers: false,
    },
    opacity: 0.2,
    stagger: 0.1,
  });
});
// --------------------------------------------- //
// Fade-in Type Effect End
// --------------------------------------------- //

// --------------------------------------------- //
// Section Titles Font Weight Animation Start
// --------------------------------------------- //
const sectionTitles = document.querySelectorAll("h2.reveal-type, h1.reveal-type");

sectionTitles.forEach((title) => {
  const text = new SplitType(title, { types: "words, chars" });

  // Set initial fontWeight and opacity
  text.chars.forEach((char) => {
    char.style.fontWeight = 200;
    char.style.opacity = 0.2;
    char.style.fontVariationSettings = "'wght' 200";
  });

  gsap.to(text.chars, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      markers: false,
    },
    opacity: 1,
    fontWeight: 800,
    stagger: 0.1,
    onUpdate: function () {
      this.targets().forEach((el) => {
        el.style.fontVariationSettings = "'wght' " + el.style.fontWeight;
      });
    },
  });
});
// --------------------------------------------- //
// Section Titles Font Weight Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Blocks Marquee Start
// --------------------------------------------- //
const initMarquee = () => {
  const items = [...document.querySelectorAll(".items--gsap")];
  if (items) {
    const marqueeObject = {
      el: null,
      width: 0,
    };
    items.forEach((itemBlock) => {
      marqueeObject.el = itemBlock.querySelector(".items__container");
      marqueeObject.width = marqueeObject.el.offsetWidth;
      marqueeObject.el.innerHTML += marqueeObject.el.innerHTML;
      //let dirFromLeft = "-=50%";
      let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        //.add(marquee(marqueeObject.el, 20, dirFromLeft), 0);
        .add(marquee(marqueeObject.el, 20, dirFromRight), 0);
      let tween = gsap.to(master, {
        duration: 1.5,
        timeScale: 1,
        paused: true,
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        },
      });
    });
  }
};
const marquee = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%"),
    },
    repeat: -1,
  });
};
initMarquee();
// --------------------------------------------- //
// Blocks Marquee End
// --------------------------------------------- //

// ------------------------------------------------------------------------------ //
// Parallax (apply parallax effect to any element with a data-speed attribute) Start
// ------------------------------------------------------------------------------ //
const dataSpeedElements = document.querySelectorAll("[data-speed]");
if (dataSpeedElements.length) {
  gsap.to(dataSpeedElements, {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
    },
  });
}
// --------------------------------------------- //
// Parallax End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //
const testimonialsSlider = document.querySelector("testimonials-slider");

if (!testimonialsSlider) {
  const swiper = new Swiper(".swiper-testimonials", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: true,
    speed: 1000,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //

$(window).on("load", function () {
  "use strict";

  // --------------------------------------------- //
  // Typed.js Plugin Settings Start
  // --------------------------------------------- //
  var animatedHeadline = $(".animated-type");
  if (animatedHeadline.length && document.getElementById("typed")) {
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2500,
    });
  }
  // --------------------------------------------- //
  // Typed.js Plugin Settings End
  // --------------------------------------------- //
});

$(function () {
  "use strict";

  // --------------------------------------------- //
  // Magnific Popup Start
  // --------------------------------------------- //
  $(".popup-trigger").magnificPopup({
    type: "ajax",
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "scroll",
    preloader: false,
    midClick: true,
    removalDelay: 600,
    mainClass: "mfp-fade",
  });
  // --------------------------------------------- //
  // Magnific Popup End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads Start
  // --------------------------------------------- //
  $(".my-gallery")
    .imagesLoaded()
    .progress(function () {
      $(".my-gallery").masonry("layout");
    });
  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //
  $(".hover-default, .hover-circle, .circle, .inner-video-trigger, .socials-cards__link")
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("em").css({ top: relY, left: relX });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("em").css({ top: relY, left: relX });
    });
  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  }
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {}
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("html").addClass("touch");
    isMobile = true;
  } else {
    $("html").addClass("no-touch");
    isMobile = false;
  }
  //IE, Edge
  var isIE =
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent) ||
    /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $(".gallery__link").each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children(".picture")
      .css({ "background-image": "url(" + $(this).attr("data-image") + ")" });
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      $(".contact").find(".form").addClass("is-hidden");
      $(".contact").find(".form__reply").addClass("is-visible");
      setTimeout(function () {
        // Done Functions
        $(".contact").find(".form__reply").removeClass("is-visible");
        $(".contact").find(".form").delay(300).removeClass("is-hidden");
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //
});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
const themeBtn = document.querySelector(".color-switcher");

function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  localStorage.getItem("template.theme") ? (theme = localStorage.getItem("template.theme")) : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(":root");
  root.setAttribute("color-scheme", `${theme}`);
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    let theme = getCurrentTheme();
    if (theme === "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }
    localStorage.setItem("template.theme", `${theme}`);
    loadTheme(theme);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //

// --------------------------------------------- //
// About Image Animation Start
// --------------------------------------------- //
const aboutImage = document.querySelector(".about-image-1");

if (aboutImage) {
  // Configurar el estado inicial
  gsap.set(aboutImage, {
    width: "100%",
    filter: "blur(8px)",
    scale: 1.1,
  });

  // Crear la animación con ScrollTrigger
  gsap.to(aboutImage, {
    width: "100%", // Mantener el ancho al 100% (ya está configurado en CSS)
    filter: "blur(0px)",
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: aboutImage,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      toggleActions: "play none reverse none",
    },
  });
}
// --------------------------------------------- //
// About Image Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Typing Effect for Title Start
// --------------------------------------------- //
const typingTitle = document.getElementById("typing-title");

if (typingTitle) {
  const texts = [".dev", "deiv.dev", ".Deiv"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Deleting effect
      typingTitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 100;
    } else {
      // Typing effect
      typingTitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    // Check if we need to switch to deleting or next text
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end before deleting
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before starting next text
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start the typing effect after a delay
  setTimeout(typeText, 1000);
}
// --------------------------------------------- //
// Typing Effect for Title End
// --------------------------------------------- //

// --------------------------------------------- //
// Cards Title Font Weight Animation Start
// --------------------------------------------- //
const cardTitles = document.querySelectorAll(".cards__title:not(.services-title)");

cardTitles.forEach((title) => {
  const text = new SplitType(title, { types: "words, chars" });

  // Set initial fontWeight and opacity
  text.chars.forEach((char) => {
    char.style.fontWeight = 200;
    char.style.opacity = 0.2;
    char.style.fontVariationSettings = "'wght' 200";
  });

  gsap.to(text.chars, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      markers: false,
    },
    opacity: 1,
    fontWeight: 800,
    stagger: 0.1,
    onUpdate: function () {
      this.targets().forEach((el) => {
        el.style.fontVariationSettings = "'wght' " + el.style.fontWeight;
      });
    },
  });
});
// --------------------------------------------- //
// Cards Title Font Weight Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Services Title Shadow Animation Start
// --------------------------------------------- //
const servicesTitles = document.querySelectorAll(".services-title");

servicesTitles.forEach((title) => {
  const text = new SplitType(title, { types: "words, chars" });

  // Set initial state with font-weight 800 and no shadow
  text.chars.forEach((char) => {
    char.style.fontWeight = 800;
    char.style.fontVariationSettings = "'wght' 800";
    char.style.opacity = 0.3;
  });

  gsap.to(text.chars, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      markers: false,
    },
    opacity: 1,
    stagger: 0.1,
  });
});
// --------------------------------------------- //
// Services Title Shadow Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll Animations Service Image Start
// --------------------------------------------- //

if (document.querySelector(".service-card")) {
  gsap.set(".service-card", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".service-card", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: (batch) =>
      gsap.to(
        batch,
        {
          opacity: 1,
          y: 50,
          ease: "sine",
          stagger: { each: 0.15, grid: [1, 2] },
          overwrite: true,
        },
        gsap.from(
          batch.map((el) => el.querySelector(".service-image")),
          {
            opacity: 1,
            y: "-90%",
            duration: 1,
            ease: "power4.inout",
            stagger: 0.25,
          }
        )
      ),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
  });
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".service-card", { y: 0, opacity: 1 })
  );
}
