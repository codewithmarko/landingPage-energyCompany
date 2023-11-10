import "./index.css";

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

const textContainer = document.querySelector(".textContainer");
const textGrowContainer = document.querySelector(".textGrowContainer");
//Big Text
const text = document.querySelector(".textGrow");
const styleFontSize = window
  .getComputedStyle(text, null)
  .getPropertyValue("font-size");
const currentFontSize = parseFloat(styleFontSize);
//EndPosition Text
const textEnd = document.querySelector(".textEndPosition");
const styleMinFontSize = window
  .getComputedStyle(textEnd, null)
  .getPropertyValue("font-size");
const minFontSize = parseFloat(styleMinFontSize);
const maxFontSize = 450;

let userScrolling = false;
window.onscroll = () => {
  userScrolling = true;
};

window.addEventListener("scroll", () => {
  const options = {};
  const progressObserver = new IntersectionObserver(function (
    entries,
    observer,
  ) {
    entries.forEach((entry) => {
      //Variable declarations
      const containerHeight = entry.boundingClientRect.height;
      const containerWidth = entry.boundingClientRect.width;
      const currentHeight = entry.boundingClientRect.top;
      const currentBottom = entry.boundingClientRect.bottom;
      //Aufsteigend
      const progressAscending =
        1 - (currentHeight / containerHeight).toFixed(3);
      //Absteigend
      const progressDescending = (currentHeight / containerHeight).toFixed(3);
      const halfContainerHeight = containerHeight / 2;
      const halfContainerWidth = containerWidth / 2;
      const textCurrentPosition = text.getBoundingClientRect();
      console.log(textCurrentPosition);
      const textEndPosition = textEnd.getBoundingClientRect();
      const textEndPostionYScrollPercentage =
        textEndPosition.top / containerHeight;

      console.log(textEndPostionYScrollPercentage);

      if (textEndPostionYScrollPercentage <= 0.5) {
        textCurrentPosition.x = textEndPosition.x * progressAscending;
        textCurrentPosition.y = textEndPosition.y * progressAscending;
      }

      if (userScrolling && progressDescending >= 0 && progressDescending <= 1) {
        text.style.fontSize = `${Math.max(
          minFontSize,
          Math.min(maxFontSize, (currentFontSize - 5) * progressDescending),
        )}px`;
      }

      // if (userScrolling && progressAscending <= 1 && progressAscending >= 0) {
      //   text.style.transform = ` translateX(${
      //     textCurrentPosition.left - halfContainerWidth * progressAscending
      //   }px)`;
      // }

      //! Das ist für später wenn die Animation stimmt

      // if (progressDescending <= 0.01) {
      //   textGrowContainer.classList.remove("bg-white");
      //   text.style.visibility = "hidden";
      // }

      // if (progressDescending <= 0.02) {
      //   textGrowContainer.style.opacity = "0";
      // } else {
      //   textGrowContainer.style.opacity = "1";
      // }
    });
  }, options);
  progressObserver.observe(textContainer);
});

// Hier brauche ich noch eine Variable welche die momentanten pixel ausgibt und dann kann ich progress berechnen

//Sektion bleibt picken
//2023 bleibt picken
//während 2023 klein hinein scrollt wird 2023 groß kleiner
//hier ein div mit 2-300 pixel einfügen damit es mehr zeit verschaft oder mit observer spielen
//2023 klein bleibt picken

// if (userScrolling && textEndPosition.y <= containerHeight) {
//   text.style.transform = ` translateX(${
//     textCurrentPosition.left / -(textEndPosition.y / containerHeight) +
//     textCurrentPosition.left
//   }px)`;
// }

// if (userScrolling) {
//   text.style.transform = `translateX(${
//     (textCurrentPosition.left * textEndPosition.y) / containerHeight
//   }px)`;
// }
