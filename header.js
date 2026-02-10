// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');
    const text = collegeName.innerText;
    collegeName.innerHTML = '';

    // 1. Wrap each character for Anime.js
    [...text].forEach((char) => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        collegeName.appendChild(span);
    });

    // 2. High-End Anime.js Reveal - Faster and punchier for Phase 8
    anime.timeline({ loop: false })
        .add({
            targets: '.college-name .letter',
            scale: [3, 1], // Reduced initial scale for a tighter reveal
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 800, // Faster duration (950 -> 800)
            delay: (el, i) => 40 * i, // Faster stagger (70 -> 40)
            complete: () => {
                gsap.set('.college-name .letter', { opacity: 1, scale: 1, clearProps: "transform" });
            }
        });

    // 3. Logo Entrance
    gsap.from('.college-logo', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        clearProps: "all"
    });

    // 4. Scroll Shrink Logic - Adjusted for 90px baseline
    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=80',
            scrub: 0.3,
        }
    });

    headerTl.to('.college-header', {
        height: '65px', // Adjusted shrink height
        padding: '0 30px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(15px)',
    }, 0);

    headerTl.to('.college-logo', {
        height: '45px',
        left: '30px',
    }, 0);

    headerTl.to('.college-name', {
        fontSize: '1.3rem',
    }, 0);
});
