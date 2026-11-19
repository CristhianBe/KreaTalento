import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** Títulos de sección: las palabras suben desde una máscara al entrar en pantalla. */
export function animarTitulos() {
  document.querySelectorAll<HTMLElement>('section h2').forEach((h2) => {
    SplitText.create(h2, {
      type: 'lines,words',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: h2, start: 'top 88%', once: true },
        }),
    });
  });
}
