import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Animaton of Progress bar
 */

const circleBox = document.querySelectorAll(".circle-box");
const circles = document.querySelectorAll(".progress-ring__circle");

function animateCircle(percent) {
  circles.forEach((circle) => {
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
      const offset = (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    if (circle.classList.contains("full")) {
      setProgress(100);
    } else {
      setProgress(percent);
    }
  });
}

const options = { threshold: "0.8" };
const circleObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animateCircle(61);
    }
  });
}, options);
circleBox.forEach((box) => circleObserver.observe(box));

/**
 * Animation of 2030 Section
 */

const textContainerEnd = document.querySelector(".textContainerEnd");
const textContainerStart = document.querySelector(".textContainerStart");

//Big Text
const text = document.querySelector(".textStart");
const styleFontSize = window
  .getComputedStyle(text, null)
  .getPropertyValue("font-size");
const currentFontSize = parseFloat(styleFontSize);
// const textPosition = text.getBoundingClientRect();
//EndPosition Text
const textEnd = document.querySelector(".textEnd");
const styleMinFontSize = window
  .getComputedStyle(textEnd, null)
  .getPropertyValue("font-size");
const minFontSize = parseFloat(styleMinFontSize);
// const textEndPosition = textEnd.getBoundingClientRect();
//
const textEndPosition = textEnd.getBoundingClientRect();
const maxFontSize = 450;

// gsap.to(".textStart", {
//   duration: 2,
//   x: textEndPosition.x,
//   y: textEndPosition.y,
// });

ScrollTrigger.create({
  trigger: ".textContainerEnd",
  start: "top bottom",
  end: "top top",
  // scrub: true,
  markers: true,
  onUpdate: (self) => {
    text.style.fontSize = `${Math.max(
      minFontSize,
      Math.min(maxFontSize, currentFontSize * (1 - self.progress)),
    )}px`;
    const textPosition = text.getBoundingClientRect();
    const textEndPosition = textEnd.getBoundingClientRect();

    console.log(textPosition.top);
    console.log(textEndPosition.top);

    // console.log("X Werte");
    // console.log(textPosition.left + window.scrollX);
    // console.log(textEndPosition.left + window.scrollX);

    // gsap.to(".textContainerStart", {
    //   opacity: self.progress <= 0.99 ? 1 : 0,
    //   duration: 0.3,
    // });

    // 650 - (650 - 65) * 0.1;

    // console.log(
    //   textPosition.x - (textPosition.x - textEndPosition.x) * self.progress,
    // );

    //X:- 605 Y: -172 ist die Lösung

    if (self.progress >= 0.9) {
      gsap.to(".textStart", {
        // x:
        //   textPosition.left -
        //   (textPosition.left - textEndPosition.left) * self.progress,

        y: -textEndPosition.top,
      });
    }
  },
});

// if (userScrolling && textEndPosition.y <= containerHeight) {
//   text.style.transform = ` translateX(${
//     textCurrentPosition.left / -(textEndPosition.y / containerHeight) +
//     textCurrentPosition.left
//   }px)`;
// }

// currentX - (DiffEndXCurrentX * progress)

// if (userScrolling) {
//   text.style.transform = `translateX(${
//     (textCurrentPosition.left * textEndPosition.y) / containerHeight
//   }px)`;
// }
