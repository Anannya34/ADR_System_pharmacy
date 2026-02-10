window.addEventListener('scroll', () => {
    const header = document.querySelector('.college-header');
    const logo = document.querySelector('.college-logo');
    const name = document.querySelector('.college-name');

    if (window.scrollY > 50) {
        header.style.height = '80px';
        logo.style.height = '60px';
        logo.style.left = '40px';
        name.style.fontSize = '1.5rem';
    } else {
        header.style.height = '120px';
        logo.style.height = '80px';
        logo.style.left = '60px';
        name.style.fontSize = '2.2rem';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');
    const text = collegeName.innerText;
    collegeName.innerText = '';

    // Split text into characters and wrap in spans
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
        collegeName.appendChild(span);

        // Staggered reveal
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
            span.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        }, 100 + (i * 30));
    });

    // Optional: add a subtle shimmer effect on hover
    collegeName.addEventListener('mouseover', () => {
        // Shimmer is handled by CSS animation, but we can add more here if needed
    });
});
