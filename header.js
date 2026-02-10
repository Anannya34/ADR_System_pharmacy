// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');
    const text = collegeName.innerText;
    collegeName.innerHTML = ''; // Clear for animation wrapping

    // 1. Wrap each character in a span for Anime.js
    [...text].forEach((char) => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerText = char === ' ' ? '\u00A0' : char;
        // Set initial state via JS to prevent flickering and ensure they start hidden
        span.style.opacity = '0';
        span.style.display = 'inline-block';
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
            delay: (el, i) => 70 * i,
            complete: () => {
                // Ensure letters stay visible and have no lingering transform issues
                gsap.set('.college-name .letter', { opacity: 1, scale: 1, clearProps: "transform" });
            }
        });

    // 3. GSAP Entrance for Logo
    gsap.from('.college-logo', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
        clearProps: "all" // Ensure it doesn't stay in a transformed state
    });

    // 4. Ultra-Smooth Scroll Shrinking using GSAP ScrollTrigger
    // We use matchMedia to ensure these only run on desktop/larger screens if needed, 
    // but here we'll keep it simple and robust.

    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: 0.5, // Added slight smoothing to the scrub
        }
    });

    headerTl.to('.college-header', {
        height: '80px',
        padding: '0 40px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
    }, 0);

    headerTl.to('.college-logo', {
        height: '60px',
        left: '40px',
    }, 0);

    headerTl.to('.college-name', {
        fontSize: '1.5rem',
    }, 0);
});
