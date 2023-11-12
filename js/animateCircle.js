/**
 * Animaton of Progress bar
 */
export const circleBox = document.querySelectorAll(".circle-box");
const circles = document.querySelectorAll(".progress-ring__circle");
export function animateCircle(percent) {
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
