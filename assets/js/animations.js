import { stats } from './data.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function initScrollAnimations({ flags }) {
  if (!flags.enableScrollAnimations || prefersReducedMotion) {
    document.querySelectorAll('.stat-pill strong').forEach((el, index) => {
      el.textContent = stats[index]?.value ?? el.textContent;
    });
    return;
  }

  try {
    const { gsap } = await import('https://cdn.skypack.dev/gsap@3.12.5');
    const { ScrollTrigger } = await import('https://cdn.skypack.dev/gsap@3.12.5/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero h1', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.hero-mission', {
      y: 40,
      opacity: 0,
      duration: 1.1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.utils.toArray('.section').forEach((section, idx) => {
      gsap.from(section.querySelectorAll('.section-heading, .glass-panel, .case-card'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        },
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      if (idx % 2 === 0) {
        gsap.to(section, {
          background: idx % 4 === 0 ? 'rgba(11,30,45,0.2)' : 'rgba(15,38,56,0.2)',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        });
      }
    });

    const statElements = document.querySelectorAll('.stat-pill strong');
    statElements.forEach((el, index) => {
      const target = stats[index]?.value ?? el.textContent;
      const match = /^([0-9]+(?:\.[0-9]+)?)(%?)$/.exec(target);
      if (!match) {
        el.textContent = target;
        return;
      }
      const [, value, suffix] = match;
      const numeric = parseFloat(value);
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: numeric,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            const current = Math.round(this.targets()[0].innerText);
            el.innerText = `${current}${suffix}`;
          }
        }
      );
    });
  } catch (error) {
    console.error('GSAP загрузить не удалось', error);
  }
}
