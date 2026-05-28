import { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { FADE_IN_UP, STAGGER_CONTAINER, TITLE_REVEAL } from '../lib/motion';
import saltHorizon from '../assets/imagenes/6.png';
import personaje from '../assets/imagenes/personaje.png';

const MetadataBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 opacity-60">
    <span className="text-[6px] font-black uppercase tracking-[0.5em] text-white/60">{label}</span>
    <span className="font-mono text-[9px] tracking-[0.2em] text-white/75">{value}</span>
  </div>
);

const ScrollGuide = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.7 }}
    transition={{ delay: 3.2, duration: 1.4 }}
    className="absolute bottom-12 right-12 z-40 hidden items-center gap-6 md:flex"
  >
    <span className="font-mono text-[8px] uppercase tracking-[1em] text-white/60">Deslizar</span>
    <div className="relative h-px w-16 overflow-hidden bg-white/25">
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 h-full w-full bg-white/80"
      />
    </div>
  </motion.div>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 180]);
  const bgY = useTransform(scrollY, [0, 900], [0, 120]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 15, damping: 45 });
  const springY = useSpring(mouseY, { stiffness: 15, damping: 45 });

  const moveX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%']);
  const moveY = useTransform(springY, [-0.5, 0.5], ['-1%', '1%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex min-h-[112vh] w-full flex-col justify-between overflow-hidden px-6 py-10 md:px-16 md:py-16 lg:px-24">
      <motion.div style={{ y: bgY, x: moveX }} className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 z-0">
        <img src={saltHorizon} alt="" className="h-full w-full object-cover object-center opacity-100 saturate-[1.2] contrast-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3d1d58]/22 via-[#7c3aed]/10 to-[#100719]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/52 via-transparent to-[#12061d]/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(244,114,182,0.34),transparent_38%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(250,204,21,0.18),transparent_28%)] mix-blend-screen" />
      </motion.div>

      <motion.div style={{ x: moveX, y: moveY }} className="pointer-events-none absolute inset-0 z-10 opacity-70">
        <div className="absolute inset-x-0 top-1/2 h-[42vh] bg-gradient-to-t from-[#2b1548]/55 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:90px_90px] opacity-25" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 48, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.75, ease: 'easeOut' }}
        className="pointer-events-none absolute bottom-0 right-[3vw] z-20 hidden h-[78vh] max-h-[760px] min-h-[520px] w-[min(34vw,430px)] lg:block"
      >
        <motion.img
          src={personaje}
          alt=""
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-full object-contain object-bottom drop-shadow-[0_0_34px_rgba(251,191,36,0.28)]"
        />
        <div className="absolute bottom-[6%] left-1/2 h-20 w-52 -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
        <div className="absolute inset-y-[10%] right-0 w-2/3 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_62%)] blur-2xl" />
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="relative z-30 flex w-full items-start justify-between border-t border-white/15 pt-6"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.7em] text-white/90 md:tracking-[1em]">
            Archivo // Genoveva Rios
          </span>
          <span className="font-mono text-[7px] uppercase italic tracking-[0.4em] text-cyan-100/70">
            Fragmento recuperado: 27.05.2189
          </span>
        </div>
        <div className="hidden gap-20 lg:flex">
          <MetadataBlock label="Ubicacion" value="Territorio Blanco" />
          <MetadataBlock label="Seccion" value="Delta_01-A" />
        </div>
      </motion.header>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax }}
        className="relative z-30 mx-auto my-auto flex w-full max-w-[1500px] flex-col items-start pt-20 md:pt-0"
      >
        <div className="flex w-full flex-col gap-8 md:gap-14">
          <div className="flex flex-col">
            <motion.h1
              variants={TITLE_REVEAL}
              className="cinematic-glow max-w-[12ch] select-none text-[clamp(4rem,12vw,11rem)] font-black leading-[0.8] tracking-normal text-white"
            >
              GENOVEVA
              <br />
              RIOS
            </motion.h1>

            <motion.div variants={FADE_IN_UP} className="mt-12 flex items-center gap-8 overflow-hidden">
              <div className="h-16 w-px bg-white/35" />
              <h2 className="text-xl font-extralight uppercase leading-tight tracking-[0.42em] text-cyan-50/85 md:text-4xl">
                La Tejedora de la Memoria
              </h2>
            </motion.div>
          </div>

          <div className="flex w-full flex-col items-start gap-10 md:flex-row md:items-end md:gap-28">
            <motion.div variants={FADE_IN_UP} className="max-w-lg">
              <p className="border-l border-cyan-100/40 pl-8 text-lg font-light italic leading-relaxed tracking-wide text-white/90 drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)] md:pl-10 md:text-2xl">
                "Un pais no desaparece cuando pierde una guerra. Desaparece cuando su gente olvida quien es."
              </p>
            </motion.div>

            <motion.div variants={FADE_IN_UP} className="max-w-xl border-t border-cyan-100/25 pt-7">
              <p className="font-mono text-[10px] uppercase leading-loose tracking-[0.24em] text-cyan-50/82 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                Bolivia, ano 2189. El litio convirtio al Salar de Uyuni en una zona industrial militarizada.
                Genoveva guarda la historia prohibida en tejidos inteligentes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.8 }}
        className="relative z-30 flex w-full items-end justify-between border-b border-white/15 pb-6"
      >
        <div className="flex gap-10 font-mono text-[8px] uppercase tracking-[0.35em] text-white/45 md:gap-24">
          <div className="flex flex-col gap-2">
            <span className="opacity-60">Lat: -16.4897</span>
            <span className="opacity-60">Lng: -68.1193</span>
          </div>
          <div className="hidden flex-col gap-2 sm:flex">
            <span className="opacity-60">Alt: 3,640m</span>
            <span className="opacity-60">System: Loom_OS</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 text-right">
          <span className="text-[8px] font-bold uppercase italic tracking-[0.6em] text-white/45">Acceso Nivel 0</span>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.05, 0.35, 0.05] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                className="h-px w-5 bg-white/70"
              />
            ))}
          </div>
        </div>
      </motion.footer>

      <ScrollGuide />
    </section>
  );
};
