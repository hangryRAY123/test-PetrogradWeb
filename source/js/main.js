import { iosVhFix } from "./utils/ios-vh-fix";
import { initModals } from "./modules/modals/init-modals";
import { Form } from "./modules/form-validate/form";
import { gsap } from "./vendor/gsap/gsap.min.js";
import { ScrollTrigger } from "./vendor/gsap/ScrollTrigger.min.js";
import { ScrollToPlugin } from "./vendor/gsap/ScrollToPlugin.min.js";

// ---------------------------------

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  const logo = document.querySelector(".logo");
  const video = document.querySelector(".demo__inner--video video");
  const body = document.querySelector("body");
  const nav = document.querySelector(".nav");
  const wrapper = document.querySelector(".wrapper");
  const toggle = document.querySelector(".btn-toggle");
  const playBtn = document.querySelector(".demo__btn--play");
  const intro = document.querySelector(".intro");

  toggle.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    nav.classList.toggle("active");
    wrapper.classList.toggle("active");
    body.classList.toggle("active");
  });

  playBtn.addEventListener("click", (e) => {
    video.play();
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // creeping line

  gsap.set(".box", {
    x: (i) => i * 750,
  });

  gsap.to(".box", {
    duration: 20,
    ease: "none",
    x: "+=7500", // move each box 500px to right
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % 7500), // force x value to be between 0 and 500 using modulus
    },
    repeat: -1,
  });

  gsap.set(".box-reverse", {
    x: (i) => i * -750,
  });

  gsap.to(".box-reverse", {
    duration: 20,
    ease: "none",
    x: "-=7500", // move each box 500px to right
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % 7500), // force x value to be between 0 and 500 using modulus
    },
    repeat: -1,
  });

  gsap.set(".box-video", {
    x: (i) => i * 430,
  });

  gsap.to(".box-video", {
    duration: 10,
    ease: "none",
    x: "+=4300", // move each box 500px to right
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % 4300), // force x value to be between 0 and 500 using modulus
    },
    repeat: -1,
  });

  gsap.set(".box-video-reverse", {
    x: (i) => i * -430,
  });

  gsap.to(".box-video-reverse", {
    duration: 10,
    ease: "none",
    x: "-=4300", // move each box 500px to right
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % 4300), // force x value to be between 0 and 500 using modulus
    },
    repeat: -1,
  });

  // snap to section
  const panels = gsap.utils.toArray(".scroll-section");

  function goToSection(panel, index) {
    gsap.to(window, {
      scrollTo: { y: panel, autoKill: false },
      duration: 1,
      ease: "power2.inOut",
    });
  }

  function snapIn(index) {
    const tlSnapIn = gsap.timeline({ paused: true, repeatRefresh: true });
    panels.forEach((panel, i) => {
      tlSnapIn.to(panel, {
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          onEnter: () => {
            goToSection(panel);
            if (panel.classList.contains("red")) {
              logo.classList.add("logo--red");
              nav.classList.add("nav--red");
              intro.classList.add('intro--red');
              video.play();
            } else {
              logo.classList.remove("logo--red");
              nav.classList.remove("nav--red");
              intro.classList.remove('intro--red');
            }
          },
          onEnterBack: () => {
            goToSection(panel);
            if (panel.classList.contains("red")) {
              logo.classList.add("logo--red");
              nav.classList.add("nav--red");
              intro.classList.add('intro--red');
            } else {
              logo.classList.remove("logo--red");
              nav.classList.remove("nav--red");
              intro.classList.remove('intro--red');
            }
          },
        },
      });
    });
    ScrollTrigger.refresh();
    return tlSnapIn;
  }

  function initPanelTl(index) {
    const tl = gsap.timeline({ paused: true, repeatRefresh: true });
    const snap = snapIn(index);
    tl.add(snap);
    gsap.ticker.remove(snap);
    return tl;
  }

  if (window.innerWidth > 1024) {
    initPanelTl();
  }

  // transform block

  const videoTimeline = gsap.timeline({ paused: true });
  const bikeTimeline = gsap.timeline({ paused: true });

  videoTimeline.fromTo(
    ".demo__inner--video",
    { yPercent: 100, rotation: 90, duration: 2, ease: "power2.out" },
    { yPercent: 0, rotation: 0, duration: 2, ease: "power2.out" }
  );
  ScrollTrigger.create({
    animation: videoTimeline,
    scrub: 1,
    trigger: ".demo-present",
    start: "top bottom",
    end: "top",
  });

  bikeTimeline.fromTo(
    ".demo__inner--bike",
    { yPercent: 100, rotation: 90, duration: 2, ease: "power2.out" },
    { yPercent: 0, rotation: 0, duration: 2, ease: "power2.out" }
  );
  ScrollTrigger.create({
    animation: bikeTimeline,
    scrub: 1,
    trigger: ".demo-product",
    start: "top bottom",
    end: "top",
  });

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener("load", () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
