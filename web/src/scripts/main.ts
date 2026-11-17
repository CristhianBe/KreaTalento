import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { iniciarEncabezado } from './encabezado';
import { iniciarServicios } from './servicios';
import { iniciarScrollSuave } from './animations/scrollSuave';
import { animarIntro } from './animations/intro';
import { animarHero, parallaxPuntero } from './animations/hero';
import { animarRevelar } from './animations/revelar';
import { animarTitulos } from './animations/titulos';
import { animarTarjetas, inclinarTarjetas } from './animations/tarjetas';
import { animarProceso } from './animations/proceso';
import { barraProgreso, parallax, animarContacto, botonesMagneticos } from './animations/extras';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Funcionalidad (siempre activa, con o sin animaciones)
iniciarEncabezado();
iniciarServicios();

// Las animaciones solo corren si la persona no pidió "reducir movimiento".
// Sin ellas, todo el contenido queda visible y estático.
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const detenerScroll = iniciarScrollSuave();
  const retraso = animarIntro();
  animarHero(retraso);
  animarTitulos();
  animarRevelar();
  animarTarjetas();
  animarProceso();
  barraProgreso();
  parallax();
  animarContacto();
  return () => detenerScroll();
});

// Efectos que dependen del puntero: solo con mouse/trackpad.
mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
  const quitar = [parallaxPuntero(), inclinarTarjetas(), botonesMagneticos()];
  return () => quitar.forEach((f) => f?.());
});
