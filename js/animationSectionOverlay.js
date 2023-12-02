import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const textContainerEnd = document.querySelector('.textContainerEnd');
const textContainerStart = document.querySelector('.textContainerStart');
const textContainerStartPosition = textContainerStart.getBoundingClientRect();
const text = document.querySelector('.textStart');
const styleFontSize = window
  .getComputedStyle(text, null)
  .getPropertyValue('font-size');
const currentFontSize = parseFloat(styleFontSize);
const textEnd = document.querySelector('.textEnd');
const styleMinFontSize = window
  .getComputedStyle(textEnd, null)
  .getPropertyValue('font-size');
const minFontSize = parseFloat(styleMinFontSize);

const maxFontSize = 450;
const textInitPosition = text.getBoundingClientRect();

ScrollTrigger.create({
  trigger: '.textContainerStart',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  markers: false,
  onUpdate: (self) => {
    let tl = gsap.timeline();
    const currFontStyle = (text.style.fontSize = `${Math.max(
      minFontSize,
      Math.min(maxFontSize, currentFontSize * (1 - self.progress))
    )}px`);

    const currFont = parseFloat(currFontStyle);
    const textPosition = text.getBoundingClientRect();
    const textEndPosition = textEnd.getBoundingClientRect();

    const textEndPositionCenterY =
      (textEndPosition.top + textEndPosition.bottom) / 2;
    const textEndPositionCenterX =
      (textEndPosition.left + textEndPosition.right) / 2;

    if (currFont <= minFontSize * 2 && self.direction == 1) {
      tl.to('.textStart', {
        left: textEndPositionCenterX,
        top: textEndPositionCenterY,
      });
    }

    //Upward scroll animation
    if (self.direction == -1) {
      tl.to('.textStart', {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
      });
      gsap.to('.textContainerStart', {
        opacity: self.progress <= 0.99 ? 1 : 0,

        duration: 1,
        position: self.progress >= 1 ? 'relative' : 'sticky',
      });
    }

    //Downwards scroll animation
    if (textPosition.y > textEndPosition.y) {
      gsap.to('.textContainerStart', {
        opacity: self.progress <= 0.99 ? 1 : 0,
        duration: 0.5,
        position: self.progress >= 1 ? 'relative' : 'sticky',
      });
    }
  },
});
