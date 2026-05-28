import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { MainLayout } from './layouts/MainLayout'
import { Hero } from './sections/Hero'
import { TerritorioBlanco } from './sections/TerritorioBlanco'
import { MemoryWeaversSection } from './sections/MemoryWeaversSection'
import { ResistanceSection } from './sections/ResistanceSection'
import { FinalSection } from './sections/FinalSection'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.05,
      infinite: false,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <MainLayout>
      <Hero />
      <TerritorioBlanco />
      <MemoryWeaversSection />
      <ResistanceSection />
      <FinalSection />
    </MainLayout>
  )
}

export default App
