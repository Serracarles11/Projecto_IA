gsap.registerPlugin(ScrollTrigger);

gsap.to(".todo_header",{
    opacity: '0',
    scrollTrigger:{
        trigger:".abajo",
        start:"top center",
        end:"bottom center",
        scrub:true
    }
})
gsap.to(".background_header",{
    backgroundColor: 'grey', // Corrección aquí
    scrollTrigger:{
        trigger:".abajo",
        start:"top center",
        end:"bottom center",
        scrub:true
    }
})