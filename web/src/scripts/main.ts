import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iniciarEncabezado } from './encabezado';
import { iniciarScrollSuave } from './animations/scrollSuave';
import { animarHero } from './animations/hero';
import { animarRevelar } from './animations/revelar';
import { animarProceso } from './animations/proceso';

gsap.registerPlugin(ScrollTrigger);

iniciarEncabezado();

// Las animaciones solo corren si la persona no pidió "reducir movimiento".
// Sin ellas, todo el contenido queda visible y estático.
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const detenerScroll = iniciarScrollSuave();
  animarHero();
  animarRevelar();
  animarProceso();
  return () => detenerScroll();
});
