import "./index.css";

//Animaton of progress bar

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

//Animaton of tex size

const textContainer = document.querySelector(".textContainer");
const textGrowContainer = document.querySelector(".textGrowContainer");
const text = document.querySelector(".textGrow");
const textEndPosition = document
  .querySelector(".textEndPosition")
  .getBoundingClientRect().x;

const textCurrentPosition = text.getBoundingClientRect().x;

const style = window.getComputedStyle(text, null).getPropertyValue("font-size");

const currentFontSize = parseFloat(style);
const maxFontSize = 450;
const minFontSize = 48;

//current Progress by intersection observer

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
      const containerHeight = entry.boundingClientRect.height;
      const currentHeight = entry.boundingClientRect.top;
      const progress = currentHeight / containerHeight;
      if (progress >= 0 && progress <= 1 && userScrolling) {
        console.log(progress.toFixed(3));
        text.style.fontSize = `${Math.max(
          minFontSize,
          Math.min(maxFontSize, (currentFontSize - 5) * progress.toFixed(3)),
        )}px`;
        console.log((progress + 0.5) * 100);
        text.style.transform = `translateX(${-(-progress + 0.5) * 100}%)`;
        console.log(textCurrentPosition);
      }

      if (progress <= 0.02) {
        textGrowContainer.style.opacity = "0";
      } else {
        textGrowContainer.style.opacity = "1";
      }
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
