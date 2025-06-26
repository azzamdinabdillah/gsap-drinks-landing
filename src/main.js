import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const video = document.querySelector("video");
  const splitTextH1 = SplitText.create(".main-text", {
    type: "chars",
    charsClass: "text-gradient",
    mask: "chars",
  });
  const splitTextSubText = SplitText.create(".sub-text", {
    type: "lines",
    mask: "lines",
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

  video.addEventListener("loadedmetadata", () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: "top 60%",
        end: "bottom top",
        scrub: true,
        markers: true,
        pin: true,
      },
    });

    tl.to(video, {
      currentTime: video.duration,
      ease: "none",
    })
      .to(
        ".leaf-right",
        {
          y: -100,
        },
        0
      )
      .to(
        ".leaf-left",
        {
          y: -500,
        },
        0
      );

    ScrollTrigger.refresh();
  });
});
