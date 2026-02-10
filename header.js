window.addEventListener('scroll', () => {
    const header = document.querySelector('.college-header');
    if (window.scrollY > 10) {
        header.style.padding = '10px 40px';
        header.style.height = '70px';
    } else {
        header.style.padding = '0 40px';
        header.style.height = '80px';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const collegeName = document.getElementById('collegeName');

    // Initial reveal animation
    setTimeout(() => {
        collegeName.style.opacity = '1';
        collegeName.style.transform = 'translateY(0)';
    }, 500);

    // Optional: add a subtle shimmer effect on hover
    collegeName.addEventListener('mouseover', () => {
        collegeName.style.color = 'var(--primary)';
    });

    collegeName.addEventListener('mouseout', () => {
        collegeName.style.color = '#1e293b';
    });
});
