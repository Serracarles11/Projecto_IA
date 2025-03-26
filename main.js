gsap.registerPlugin(ScrollTrigger);

gsap.to(".todo_header", {
    opacity: 0.7, 
    backgroundColor: "rgba(128, 128, 128)", 
    duration: 2, 
    ease: "power2.out", 
    scrollTrigger: {
        trigger: ".abajo",
        start: "top+=100px center",
        end: "bottom-=174px center",
        scrub: 2, 
    }
});

gsap.to(".background_header",{
    visibility: 'visible',
    opacity:'1',
    y: 80, 

    scrollTrigger:{
        markers:true,
        trigger:".abajo",
        start:"top+=215px center",
        end:"bottom-=118px center",
        scrub:true
    }
})
ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });