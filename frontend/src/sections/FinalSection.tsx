import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import { playHover, playClick } from '../lib/sound';
import whiteTerritory from '../assets/imagenes/9.png';

export const FinalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-36 md:px-24 md:py-44"
    >
      <motion.div style={{ y: imageY }} className="absolute -inset-x-8 -inset-y-20 z-0">
        <img src={whiteTerritory} alt="" className="h-full w-full object-cover object-center opacity-88 saturate-[1.12] contrast-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/8 to-black/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-[#27120a]/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(251,191,36,0.18),transparent_32%)] mix-blend-screen" />
      </motion.div>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-20 text-center md:gap-24"
      >
        <motion.div variants={FADE_IN_UP} className="h-32 w-px bg-gradient-to-b from-white/10 via-white/65 to-transparent" />

        <header className="flex flex-col items-center gap-12">
          <motion.h2
            variants={TITLE_REVEAL}
            className="cinematic-glow text-5xl font-light uppercase leading-tight tracking-[0.35em] text-white md:text-7xl"
          >
            La Memoria es
            <br />
            la Semilla
          </motion.h2>
          <motion.p variants={FADE_IN_UP} className="max-w-3xl text-xl font-light italic leading-relaxed text-white/88 md:text-2xl">
            "Mientras un solo hilo permanezca tejido, Bolivia seguira respirando en el Territorio Blanco."
          </motion.p>
        </header>

        <motion.div variants={FADE_IN_UP} className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-4">
          {['Memoria', 'Identidad', 'Cultura', 'Dignidad'].map((word) => (
            <div key={word} className="border border-amber-100/20 bg-[#1c1006]/34 p-5 backdrop-blur-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-50/78">{word}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={FADE_IN_UP} className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3 opacity-55">
            <span className="text-[10px] font-black uppercase tracking-[1em] text-white/82">Fin de la Transmision</span>
            <span className="font-mono text-[7px] uppercase italic tracking-[0.4em] text-amber-50/65">
              Fragmento GR-2189 // Integridad: 100%
            </span>
          </div>

          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative border border-amber-100/26 bg-[#1c1006]/34 px-10 py-7 transition-all duration-700 ease-out hover:border-white/80 active:scale-95 md:px-16"
          >
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.9em] text-white/60 transition-colors group-hover:text-white">
              Reiniciar Sistema
            </span>
          </button>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_36vw_rgba(0,0,0,0.72)]" />
    </section>
  );
};
