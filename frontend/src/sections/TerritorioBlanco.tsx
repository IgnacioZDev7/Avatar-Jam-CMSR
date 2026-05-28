import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import extractionImage from '../assets/imagenes/3.png';

export const TerritorioBlanco = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 px-6 py-36 md:px-24 md:py-44"
    >
      <motion.div style={{ y: imageY }} className="absolute -inset-x-8 -inset-y-20 z-0">
        <img src={extractionImage} alt="" className="h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050a] via-black/45 to-[#07080a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-black/70" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:120px_120px] opacity-15" />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 flex w-full max-w-6xl flex-col items-center gap-24 text-center md:gap-32"
      >
        <header className="flex flex-col items-center gap-8">
          <motion.span variants={FADE_IN_UP} className="text-[10px] font-black uppercase tracking-[1em] text-white/55">
            Coordenadas // Salar de Uyuni
          </motion.span>

          <motion.h2
            variants={TITLE_REVEAL}
            className="text-6xl font-bold uppercase leading-[0.8] tracking-normal text-white md:text-9xl"
          >
            El Territorio
            <br />
            Blanco
          </motion.h2>

          <motion.div variants={FADE_IN_UP} className="h-px w-20 bg-white/30" />
        </header>

        <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-3 md:gap-12">
          {[
            {
              label: 'La Explotacion',
              text: 'Despues de crisis climaticas y guerras energeticas, el litio se convirtio en el recurso mas importante del planeta.',
            },
            {
              label: 'La Zona',
              text: 'El Salar dejo de ser patrimonio natural y fue transformado en minas automatizadas, trenes magneticos y vigilancia permanente.',
            },
            {
              label: 'La Gente',
              text: 'Las familias obreras respiran polvo mineral, sobreviven con filtros reciclados y nacen bajo una esperanza de vida corta.',
            },
          ].map((item) => (
            <motion.article key={item.label} variants={FADE_IN_UP} className="border-l border-white/20 pl-6">
              <h3 className="mb-6 text-[9px] font-black uppercase tracking-[0.6em] text-white/55">{item.label}</h3>
              <p className="text-lg font-light leading-relaxed text-white/72 md:text-xl">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={FADE_IN_UP}
          className="group relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden border border-white/15 bg-black/30"
        >
          <img src={extractionImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[3000ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/45" />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          <div className="relative z-10 flex flex-col items-center gap-5 text-center">
            <span className="max-w-3xl text-2xl font-black uppercase leading-tight tracking-[0.28em] text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.35)] md:text-5xl">
              Antes por plata. Ahora por litio.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
