import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { iniciarEncabezado } from './encabezado';
import { iniciarServicios } from './servicios';
import { iniciarLogin } from './login';
import { iniciarScrollSuave } from './animations/scrollSuave';
import { animarIntro } from './animations/intro';
import { animarHero, parallaxPuntero } from './animations/hero';
import { animarRevelar } from './animations/revelar';
import { animarTitulos } from './animations/titulos';
import { animarTarjetas, inclinarTarjetas } from './animations/tarjetas';
import { animarProceso } from './animations/proceso';
import { animarRotativo } from './animations/rotativo';
import { animarCinta } from './animations/cinta';
import { barraProgreso, parallax, animarContacto, botonesMagneticos } from './animations/extras';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Funcionalidad (siempre activa, con o sin animaciones)
iniciarEncabezado();
iniciarServicios();
iniciarLogin();

// Páginas sin animaciones (p. ej. login): BaseLayout marca <html data-sin-animaciones>.
const conAnimaciones = !document.documentElement.hasAttribute('data-sin-animaciones');

// Las animaciones solo corren si la persona no pidió "reducir movimiento".
// Sin ellas, todo el contenido queda visible y estático.
const mm = gsap.matchMedia();
if (conAnimaciones) {
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
    const detenerRotativo = animarRotativo();
    const detenerCinta = animarCinta();
    return () => {
      detenerScroll();
      detenerRotativo();
      detenerCinta?.();
    };
  });

  // Efectos que dependen del puntero: solo con mouse/trackpad.
  mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
    const quitar = [parallaxPuntero(), inclinarTarjetas(), botonesMagneticos()];
    return () => quitar.forEach((f) => f?.());
  });
}
