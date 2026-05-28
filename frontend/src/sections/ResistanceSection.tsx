import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import factoryCity from '../assets/imagenes/8.png';

export const ResistanceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#06070a] px-6 py-36 md:px-24 md:py-44"
    >
      <motion.div style={{ x: imageX }} className="absolute -inset-x-14 inset-y-0 z-0">
        <img src={factoryCity} alt="" className="h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06070a] via-black/35 to-[#050507]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/75" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.05, 0.18, 0.05] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(248,113,113,0.24)_1px,transparent_1px)] bg-[size:100%_4px]"
      />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 flex w-full max-w-6xl flex-col items-center gap-24 md:gap-32"
      >
        <motion.span variants={FADE_IN_UP} className="text-center text-[10px] font-black uppercase tracking-[1em] text-red-200/55">
          Alerta // Insurreccion detectada
        </motion.span>

        <header className="flex flex-col items-center gap-10 text-center">
          <motion.h2
            variants={TITLE_REVEAL}
            className="text-7xl font-black uppercase leading-[0.8] tracking-normal text-white md:text-9xl"
          >
            La Resistencia
          </motion.h2>
          <motion.div variants={FADE_IN_UP} className="h-px w-24 bg-red-300/35" />
        </header>

        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <motion.div variants={FADE_IN_UP} className="border-t border-white/15 bg-black/20 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.6em] text-white/58">La Mascara</h3>
            <p className="border-l border-white/20 pl-8 text-xl font-light italic leading-relaxed text-white/72">
              "La mascara no solo oculta un rostro. Convierte una enfermedad pulmonar en simbolo de una nacion que se niega a ser borrada."
            </p>
          </motion.div>

          <motion.div variants={FADE_IN_UP} className="border-t border-white/15 bg-black/20 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.6em] text-white/58">La Bandera</h3>
            <p className="text-xl font-light leading-relaxed text-white/75">
              Su baston minero fue modificado para descargar energia, hackear sistemas industriales y alimentar
              dispositivos clandestinos. Sus pulsos brillan rojo, amarillo y verde.
            </p>
          </motion.div>
        </div>

        <motion.div variants={FADE_IN_UP} className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden border border-red-200/15 bg-black/35">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,113,113,0.22),transparent_34%)]" />
          <motion.div
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-36 w-36 rounded-full border border-red-200/30"
          />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <span className="font-mono text-[8px] uppercase tracking-[1em] text-white/65">Senal cifrada // Nodo Rebelion</span>
            <div className="flex gap-2">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [6, 28, 6] }}
                  transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity }}
                  className="w-px bg-red-200/60"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
