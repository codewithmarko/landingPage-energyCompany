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

    let backwards = false;
    if (self.progress >= 0.85) {
      backwards = true;
      gsap.to(".textStart", {
        left: textEndPosition.left,
        top: textEndPosition.top,
        x: 0,
        y: 0,
      });
    }
    if (self.progress <= 0.85 && backwards) {
      gsap.fromTo(
        ".textStart",
        {
          left: textEndPosition.left,
          top: textEndPosition.top,
          x: 0,
          y: 0,
        },
        {
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        },
      );
    }

    gsap.to(".textContainerStart", {
      opacity: self.progress <= 0.99 ? 1 : 0,
      duration: 0.3,
    });
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
