// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');
    const text = collegeName.innerText;
    collegeName.innerText = '';

    // Split text into characters and wrap in spans for GSAP
    [...text].forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        collegeName.appendChild(span);
    });

    // 1. Premium Character Stagger Reveal
    gsap.from('.college-name span', {
        opacity: 0,
        y: 20,
        duration: 1.2,
        stagger: 0.03,
        ease: "expo.out",
        onComplete: () => {
            // After reveal, ensure smooth transitions for subsequent interactions
            gsap.set('.college-name span', { transition: 'none' });
        }
    });

    // 2. High-End Logo Entrance
    gsap.from('.college-logo', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    // 3. Ultra-Smooth Scroll Shriniking using ScrollTrigger
    gsap.to('.college-header', {
        height: '80px',
        padding: '0 40px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: true, // Ties animation to scroll position
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
