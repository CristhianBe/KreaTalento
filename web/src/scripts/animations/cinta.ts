import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Cinta infinita: cada fila se desplaza en su dirección; al hacer scroll
 * acelera y cambia de sentido según hacia dónde se mueva la página.
 */
export function animarCinta() {
  const cinta = document.querySelector<HTMLElement>('[data-cinta]');
  if (!cinta) return;
  const filas = [...cinta.querySelectorAll<HTMLElement>('[data-cinta-fila]')].map((fila) => ({
    pista: fila.querySelector<HTMLElement>('[data-cinta-pista]')!,
    dir: Number(fila.dataset.direccion) || -1,
    x: fila.dataset.direccion === '1' ? -50 : 0,
  }));
  const envolver = gsap.utils.wrap(-50, 0);
  const base = 50 / 45000; // % por milisegundo: media pista en 45 s

  let impulso = 0;
  let sentido = 1;
  let velocidad = 1;

  const disparador = ScrollTrigger.create({
    trigger: cinta,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      impulso = Math.min(10, Math.abs(self.getVelocity()) / 180);
      sentido = self.direction;
    },
  });

  const tick = (_t: number, delta: number) => {
    velocidad += (sentido * (1 + impulso) - velocidad) * 0.08;
    impulso *= 0.94;
    filas.forEach((f) => {
      f.x = envolver(f.x + f.dir * velocidad * base * delta);
      gsap.set(f.pista, { xPercent: f.x });
    });
  };
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    disparador.kill();
  };
}
