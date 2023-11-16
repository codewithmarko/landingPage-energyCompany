import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//Get all section elements
const progressContainers = gsap.utils.toArray(".progressContainer");
const progressBlock = gsap.utils.toArray(".progressBlock");

progressContainers.forEach((container, i) => {
  gsap.to(progressBlock, {
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: "bottom center",
      onUpdate: () => {
        progressBlock.forEach((block) => block.classList.remove("bg-blue-900"));
        progressBlock[i].classList.add("bg-blue-900");
      },
      animation: gsap.to(".image", {}),
    },
  });
});
