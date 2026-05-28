import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import weavingHall from '../assets/imagenes/7.png';

export const MemoryWeaversSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#07080a] px-6 py-36 md:px-24 md:py-44"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
        <img src={weavingHall} alt="" className="h-full w-full object-cover object-center opacity-92 saturate-[1.18] contrast-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/16 to-[#1f1208]/52" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/82 via-transparent to-[#120a05]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(245,158,11,0.2),transparent_32%)] mix-blend-screen" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 opacity-32 mix-blend-screen">
        <div className="absolute inset-0 rotate-45 scale-[2] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 flex w-full max-w-6xl flex-col items-start gap-24 md:gap-32"
      >
        <motion.div variants={FADE_IN_UP} className="flex items-center gap-6">
          <div className="h-px w-12 bg-white/35" />
          <span className="text-[10px] font-black uppercase tracking-[1.2em] text-amber-100/78">Protocolo // Memoria Viva</span>
        </motion.div>

        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
          <header className="flex flex-col gap-10">
            <motion.h2
              variants={TITLE_REVEAL}
              className="text-6xl font-bold uppercase leading-[0.85] tracking-normal text-white md:text-8xl"
            >
              Tejedoras de
              <br />
              la Memoria
            </motion.h2>
            <motion.div variants={FADE_IN_UP} className="h-px w-20 bg-white/35" />
            <motion.p variants={FADE_IN_UP} className="border-l border-amber-100/35 pl-8 text-xl font-light italic leading-relaxed text-white/88 md:text-2xl">
              "Cada hilo es un archivo. Cada patron, una ruta para que la historia sobreviva."
            </motion.p>
          </header>

          <motion.div variants={FADE_IN_UP} className="flex flex-col gap-10 bg-[#160d06]/42 p-6 backdrop-blur-sm md:p-8">
            <p className="text-lg font-light leading-relaxed text-white/88 md:text-xl">
              Las comunidades obreras esconden mapas, nombres, fechas y mensajes cifrados dentro de aguayos
              inteligentes. La resistencia abandono los dispositivos visibles: todo quedo oculto en la ropa.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-white/15 pt-8">
              <div className="flex flex-col gap-3">
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-amber-100/72">Ponchos</span>
                <span className="font-mono text-sm italic text-white/68">Almacenamiento textil</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-amber-100/72">Aguayos</span>
                <span className="font-mono text-sm italic text-white/68">Rutas codificadas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
