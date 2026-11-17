import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** Rota las palabras de [data-rotativo] letra por letra y ajusta el ancho de la pastilla. */
export function animarRotativo() {
  const limpiezas: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('[data-rotativo]').forEach((raiz) => {
    const caja = raiz.querySelector<HTMLElement>('[data-rotativo-caja]');
    const palabras = [...raiz.querySelectorAll<HTMLElement>('[data-rotativo-palabra]')];
    if (!caja || palabras.length < 2) return;

    const letras = palabras.map((p) => SplitText.create(p, { type: 'chars' }).chars);
    const relleno = () => {
      const estilo = getComputedStyle(caja);
      return parseFloat(estilo.paddingLeft) + parseFloat(estilo.paddingRight);
    };
    const ancho = (i: number) => palabras[i].getBoundingClientRect().width + relleno();

    palabras.forEach((p, i) => gsap.set(p, { autoAlpha: i === 0 ? 1 : 0 }));
    gsap.set(caja, { width: ancho(0) });

    let actual = 0;
    const siguiente = () => {
      const prox = (actual + 1) % palabras.length;
      const tl = gsap.timeline();
      tl.to(letras[actual], { yPercent: -120, opacity: 0, duration: 0.4, stagger: 0.015, ease: 'power2.in' })
        .set(palabras[actual], { autoAlpha: 0 })
        .set(palabras[prox], { autoAlpha: 1 })
        .to(caja, { width: ancho(prox), duration: 0.5, ease: 'expo.out' }, '-=0.1')
        .fromTo(letras[prox], { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.02, ease: 'expo.out' }, '<');
      actual = prox;
    };
    const intervalo = window.setInterval(siguiente, 2600);
    limpiezas.push(() => window.clearInterval(intervalo));
  });
  return () => limpiezas.forEach((f) => f());
}
