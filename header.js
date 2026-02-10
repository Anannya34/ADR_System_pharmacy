// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');
    const text = collegeName.innerText;
    collegeName.innerHTML = ''; // Clear for animation wrapping

    // 1. Wrap each character in a span for Anime.js
    // Moving Letters - inspired structure
    [...text].forEach((char) => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerText = char === ' ' ? '\u00A0' : char;
        collegeName.appendChild(span);
    });

    // 2. High-End Anime.js "Moving Letters" entrance
    anime.timeline({ loop: false })
        .add({
            targets: '.college-name .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        });

    // 3. GSAP Entrance for Logo (keeping GSAP for consistency with other elements)
    gsap.from('.college-logo', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    // 4. Ultra-Smooth Scroll Shriniking using GSAP ScrollTrigger
    // We use GSAP here because ScrollTrigger is superior for scroll-bound interpolation
    gsap.to('.college-header', {
        height: '80px',
        padding: '0 40px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: true,
        }
    });

    gsap.to('.college-logo', {
        height: '60px',
        left: '40px',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: true,
        }
    });

    gsap.to('.college-name', {
        fontSize: '1.5rem',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: true,
        }
    });
});
