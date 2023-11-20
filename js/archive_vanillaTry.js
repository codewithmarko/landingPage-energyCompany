"use strict";
/**
 * Animation of 2030 Section
 */

const maxFontSize = 450;

//BigText
const largeTextContainer = document.querySelector(".largeTextContainer");
const largeText = document.querySelector(".largeText");
const largeTextStyleFontSize = window
  .getComputedStyle(largeText, null)
  .getPropertyValue("font-size");
const largeTextCurrentFontSize = parseFloat(largeTextStyleFontSize);
console.log(largeTextCurrentFontSize);

//Small Text
const smallTextContainer = document.querySelector(".smallTextContainer");
const smallText = document.querySelector(".smallText");
const smallTextStyleFontSize = window
  .getComputedStyle(smallText, null)
  .getPropertyValue("font-size");
const smallTextCurrentFontSize = parseFloat(smallTextStyleFontSize);

const options = {
  threshold: [0, 0.5, 0.99],
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", animate);
    }
    if (!entry.isIntersecting) {
      window.removeEventListener("scroll", animate);
    }
  });
}, options);

observer.observe(smallTextContainer);

console.log(largeTextCurrentFontSize);
function animate() {
  requestAnimationFrame(() => {
    const smallTextCurrentPosition = smallText.getBoundingClientRect();
    const largeTextContainerPosition =
      largeTextContainer.getBoundingClientRect();
    const smallTextContainerPosition =
      smallTextContainer.getBoundingClientRect();
    const largeTextContainerHeight = largeTextContainerPosition.height;
    const smallTextContainerTop = smallTextContainerPosition.top;

    const progress = smallTextContainerTop / largeTextContainerHeight;

    if (progress >= 0 && progress <= 1) {
      console.log(progress);

      largeText.style.fontSize = `${Math.max(
        smallTextCurrentFontSize,
        Math.min(maxFontSize, largeTextCurrentFontSize * progress),
      )}px`;
      largeText.top = smallTextContainerPosition.top;
    }
  });
}

//       //Absteigend
//       const progressDescending = (currentHeight / containerHeight).toFixed(3);
//       const halfContainerHeight = containerHeight / 2;
//       const halfContainerWidth = containerWidth / 2;

//       const textEndPosition = textEnd.getBoundingClientRect();
//       const textcoor = text.getBoundingClientRect();
//       const textEndPostionYScrollPercentage =
//         textEndPosition.top / containerHeight;

//       // if (textEndPostionYScrollPercentage <= 0.5) {
//       //   textCurrentPosition.x = textEndPosition.x * progressAscending;
//       //   textCurrentPosition.y = textEndPosition.y * progressAscending;
//       // }
//       if (userScrolling && progressDescending >= 0 && progressDescending <= 1) {
//         text.style.fontSize = `${Math.max(
//           minFontSize,
//           Math.min(maxFontSize, (currentFontSize - 5) * progressDescending),
//         )}px`;
//       }

//       console.log(textcoor.y);

//       if (
//         userScrolling &&
//         progressDescending >= 0 &&
//         progressDescending <= 1 &&
//         1 - textEndPostionYScrollPercentage >= 0.45
//       ) {
//         console.log(textcoor.y);
//         // text.style.top = `${
//         //   textCurrentPosition.top +
//         //   (textCurrentPosition.top - textEndPosition.top) * progressAscending
//         // }px`;
//         text.style.top = `${textEndPosition.y * progressAscending}px`;
//         text.style.left = `${textEndPosition.x * progressAscending}px`;
//       }

//       //! Das ist für später wenn die Animation stimmt
//       // if (progressDescending <= 0.01) {
//       //   textGrowContainer.classList.remove("bg-white");
//       //   text.style.visibility = "hidden";
//       // }
//       // if (progressDescending <= 0.02) {
//       //   textGrowContainer.style.opacity = "0";
//       // } else {
//       //   textGrowContainer.style.opacity = "1";
//       // }
//     });
//   }, options);
//   progressObserver.observe(textContainer);
// });
