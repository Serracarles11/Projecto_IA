gsap.registerPlugin(ScrollTrigger);

gsap.to(".todo_header", {
    opacity: 0.7, // No lo hace desaparecer del todo, lo hace más elegante
    backgroundColor: "rgba(128, 128, 128, 0.8)", // Un azul translúcido bonito
    duration: 2, // Hace la transición más lenta y fluida
    ease: "power2.out", // Suaviza la animación
    scrollTrigger: {
        // markers:true,

        trigger: ".abajo",
        start: "top+=100px center",
        end: "bottom center",
        scrub: 2, // Hace que el cambio sea progresivo
    }
});

gsap.to(".background_header",{
    visibility: 'visible',
    opacity:'1',
    y: 80, 

    scrollTrigger:{
        markers:true,
        trigger:".abajo",
        start:"top+=315px center",
        end:"bottom-=30px center",
        scrub:true
    }
})
ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });