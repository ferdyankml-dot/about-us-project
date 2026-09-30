function initScrollAnimations() {
    const targets = document.querySelectorAll('[data-animate]');

    if (!targets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    if (!('IntersectionObserver' in window)) {
        targets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    targets.forEach((target) => observer.observe(target));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations, { once: true });
} else {
    initScrollAnimations();
}

export { initScrollAnimations };
