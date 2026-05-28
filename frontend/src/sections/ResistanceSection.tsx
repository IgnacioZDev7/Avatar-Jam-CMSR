import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { WebBlendModel } from '../components/three/WebBlendModel';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import factoryCity from '../assets/imagenes/8.png';

const ModelRevealPanel = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      variants={FADE_IN_UP}
      className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden border border-cyan-100/20 bg-[#04151b]/42"
    >
      <motion.div
        initial={false}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.75 }}
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <div className="absolute inset-0 bg-black/24" />
        <motion.div
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/24 to-transparent"
        />
        <motion.div
          animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.28, 0.58, 0.28] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-40 w-40 rounded-full border border-cyan-100/35"
        />
        <div className="relative z-10 flex flex-col items-center gap-7 text-center">
          <span className="font-mono text-[8px] uppercase tracking-[1em] text-cyan-50/78">Archivo recuperado // Avatar 360</span>
          <button
            type="button"
            onClick={() => setIsRevealed(true)}
            className="border border-white/20 bg-white px-8 py-4 text-[9px] font-black uppercase tracking-[0.55em] text-black transition hover:bg-cyan-100 active:scale-95"
          >
            Desbloquear avatar
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.96 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        {isRevealed && <WebBlendModel />}
      </motion.div>
    </motion.div>
  );
};

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
        <img src={factoryCity} alt="" className="h-full w-full object-cover object-center opacity-88 saturate-[1.16] contrast-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06070a]/82 via-black/12 to-[#170706]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-transparent to-[#2a0907]/46" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(248,113,113,0.2),transparent_32%)] mix-blend-screen" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.05, 0.18, 0.05] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(248,113,113,0.32)_1px,transparent_1px)] bg-[size:100%_4px]"
      />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 flex w-full max-w-6xl flex-col items-center gap-24 md:gap-32"
      >
        <motion.span variants={FADE_IN_UP} className="text-center text-[10px] font-black uppercase tracking-[1em] text-red-100/78">
          Alerta // Insurreccion detectada
        </motion.span>

        <header className="flex flex-col items-center gap-10 text-center">
          <motion.h2
            variants={TITLE_REVEAL}
            className="text-7xl font-black uppercase leading-[0.8] tracking-normal text-white md:text-9xl"
          >
            La Resistencia
          </motion.h2>
          <motion.div variants={FADE_IN_UP} className="h-px w-24 bg-red-200/55" />
        </header>

        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <motion.div variants={FADE_IN_UP} className="border-t border-red-100/22 bg-[#1b0708]/38 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.6em] text-red-100/78">La Mascara</h3>
            <p className="border-l border-red-100/35 pl-8 text-xl font-light italic leading-relaxed text-white/88">
              "La mascara no solo oculta un rostro. Convierte una enfermedad pulmonar en simbolo de una nacion que se niega a ser borrada."
            </p>
          </motion.div>

          <motion.div variants={FADE_IN_UP} className="border-t border-yellow-100/22 bg-[#171006]/38 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.6em] text-yellow-100/78">La Bandera</h3>
            <p className="text-xl font-light leading-relaxed text-white/88">
              Su baston minero fue modificado para descargar energia, hackear sistemas industriales y alimentar
              dispositivos clandestinos. Sus pulsos brillan rojo, amarillo y verde.
            </p>
          </motion.div>
        </div>

        <ModelRevealPanel />
      </motion.div>
    </section>
  );
};
