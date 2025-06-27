import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const mediaQueryTablet = window.matchMedia("(min-width: 768px)");
  const mediaQueryDesktop = window.matchMedia("(min-width: 1200px)");

  const video = document.querySelector("video");
  const splitTextH1 = SplitText.create(".main-text", {
    type: "chars",
    charsClass: "text-gradient",
    mask: "chars",
  });
  const splitTextSubText = SplitText.create(".sub-text", {
    type: "lines",
    mask: "lines",
    linesClass: "line-sub-text",
  });

  gsap
    .timeline()
    .from(splitTextH1.chars, {
      duration: 1,
      yPercent: 100,
      opacity: 0,
      stagger: {
        each: 0.2,
        from: "start",
      },
      ease: "expo.out",
    })
    .from(
      splitTextSubText.lines,
      {
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: {
          each: 0.05,
          from: "start",
        },
        ease: "expo.out",
      },
      "-=.7"
    );

  let startDrinkST = "-55% 30%";
  let endDrinkST = "bottom top";

  if (mediaQueryTablet.matches) {
    startDrinkST = "20% center";
    endDrinkST = "bottom 40%";
  }

  video.addEventListener("loadedmetadata", () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: startDrinkST,
        end: endDrinkST,
        scrub: true,
        markers: true,
        pin: true,
      },
    });

    tl.to(video, {
      currentTime: mediaQueryTablet.matches ? 5 : video.duration,
      ease: "none",
    })
      .to(
        ".leaf-right",
        {
          y: mediaQueryDesktop.matches ? -50 : -100,
        },
        0
      )
      .to(
        ".leaf-left",
        {
          y: mediaQueryDesktop.matches ? -300 : -500,
        },
        0
      );

    ScrollTrigger.refresh();
  });
});
