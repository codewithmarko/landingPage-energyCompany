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
const textContainerStartPosition = textContainerStart.getBoundingClientRect();
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
const maxFontSize = 450;

const textInitPosition = text.getBoundingClientRect();

ScrollTrigger.create({
  trigger: ".textContainerStart",
  start: "top top",
  end: "bottom top",
  scrub: true,
  markers: true,
  onUpdate: (self) => {
    let tl = gsap.timeline();
    text.style.fontSize = `${Math.max(
      minFontSize,
      Math.min(maxFontSize, currentFontSize * (1 - self.progress)),
    )}px`;

    const textPosition = text.getBoundingClientRect();
    const textEndPosition = textEnd.getBoundingClientRect();

    const textEndPositionCenterY =
      (textEndPosition.top + textEndPosition.bottom) / 2;
    const textEndPositionCenterX =
      (textEndPosition.left + textEndPosition.right) / 2;

    if (self.progress >= 0.8 && self.direction == 1) {
      tl.to(".textStart", {
        left: textEndPositionCenterX,
        top: textEndPositionCenterY,
      });
    }

    if (self.direction == -1) {
      tl.to(".textStart", {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });
    }

    gsap.to(".textContainerStart", {
      opacity: self.progress <= 0.99 ? 1 : 0,
      duration: 0.3,
    });
  },
});

// console.log("END X");
// console.log(textEndPositionCenterX);
// console.log("START X");
// console.log(textPositionCenterX);
// console.log("END Y");
// console.log(textEndPositionCenterY);
// console.log("START Y");
// console.log(textPositionCenterY);

// console.log(textPosition.top);
// const textPositionCenterY = (textPosition.top + textPosition.bottom) / 2;
// const textPositionCenterX = (textPosition.left + textPosition.right) / 2;
