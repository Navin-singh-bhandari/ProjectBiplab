import React, { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, easeInOut } from 'framer-motion'
import './stacked-scroll-gallery.css'

// Replace src paths with wherever you host these images in the new project
// (e.g. /public/images/... or an imported asset).
const images = [
  {
    id: 1,
    number: '01',
    src: '/Images/image-one.png',
    alt: 'Concept & Art Direction',
    title: 'CONCEPT & ART DIRECTION',
    description:
      'Great visuals start with a solid foundation. Drawing from my background in art and design, I help you craft stronger concepts before we even touch a camera. We still shape the story, build visual treatments and rough ideas into a clear, compelling creative direction.',
  },
  {
    id: 2,
    number: '02',
    src: '/Images/image-two.png',
    alt: 'Cinematography & Production',
    title: 'CINEMATOGRAPHY & PRODUCTION',
    description:
      'Bring cinematic quality to your vision. With dedicated experience in filmmaking and cinematography, I manage the visual logistics of the shoot. From lighting design to framing the perfect shot, I ensure every frame is captured with intention and professional precision.',
  },
  {
    id: 3,
    number: '03',
    src: '/Images/image-three.png',
    alt: 'Editing & Motion Design',
    title: 'EDITING & MOTION DESIGN',
    description:
      "This is where the story comes alive. Backed by three years of deep experience, I handle pacing, narrative structure, and dynamic motion design. Whether it is complex visual effects or seamless transitions, I build engaging content that holds your audience's attention from start to finish.",
  },
  {
    id: 4,
    number: '04',
    src: '/Images/image-four.jpg',
    alt: 'Color Grading & Finishing',
    title: 'COLOR GRADING & FINISHING',
    description:
      'Understand how great work gets finished. I utilize professional color grading techniques to give your project a distinct, high-end cinematic look. Coupled with careful sound design and final polish, these are the critical finishing decisions that take your work to the next level.',
  },
  {
    id: 5,
    number: '05',
    src: '/Images/image-five.png',
    alt: 'Business & Asset Delivery',
    title: 'BUSINESS & ASSET DELIVERY',
    description:
      'Creative work needs a professional structure. I pride myself on clear communication, transparent project pricing, and reliable delivery. You get access to a streamlined workflow, ensuring your final assets are organized, optimized, and ready to drive results for your business.',
  },
]

const TOTAL = images.length

// Scroll is split into TOTAL equal zones, generalized for any number of cards:
// zone 0        stable hold on the active (first) image
// zone 1..N-1   transition i -> i+1
// Zones are back-to-back with NO gap, so the cascade is continuous
// after the initial hold — no resting pause between transitions.
const BREAKPOINTS = Array.from({ length: TOTAL + 1 }, (_, i) => i / TOTAL)

// Visual state for a card at a given "depth" in the stack.
// depth 0        = active, front, full size, full opacity
// depth 1..4     = upcoming cards, stacked lower/behind, progressively
//                   smaller and more transparent (peeks out below)
// depth -1..-4   = passed cards, kept as a receding "spent" stack
//                   peeking out ABOVE the active card, instead of
//                   vanishing — mirrors the upcoming stack below
// depth <= -5    = fully faded, no longer visible
function getDepthState(depth) {
  if (depth === 0) return { y: 0, scale: 1.0, opacity: 1.0 }

  if (depth > 0) {
    if (depth === 1) return { y: 28, scale: 0.92, opacity: 0.65 }
    if (depth === 2) return { y: 56, scale: 0.84, opacity: 0.38 }
    if (depth === 3) return { y: 84, scale: 0.76, opacity: 0.18 }
    return { y: 112, scale: 0.68, opacity: 0.08 } // depth >= 4
  }

  const passed = -depth
  if (passed === 1) return { y: -22, scale: 0.94, opacity: 0.55 }
  if (passed === 2) return { y: -40, scale: 0.89, opacity: 0.3 }
  if (passed === 3) return { y: -54, scale: 0.85, opacity: 0.12 }
  return { y: -64, scale: 0.82, opacity: 0 } // passed >= 4, fully faded
}

// Builds the keyframe arrays for one card across the breakpoints.
// Every card starts at depth = its own index and loses one layer
// of depth at each transition zone it passes through.
function getCardTransforms(index) {
  const input = []
  const yOutput = []
  const scaleOutput = []
  const opacityOutput = []

  BREAKPOINTS.forEach((point, j) => {
    const depth = index - Math.max(j - 1, 0)
    const state = getDepthState(depth)

    input.push(point)
    yOutput.push(state.y)
    scaleOutput.push(state.scale)
    opacityOutput.push(state.opacity)
  })

  return { input, yOutput, scaleOutput, opacityOutput }
}

// Smooth ease-in-out on every segment. Still a pure function of
// scrollYProgress (no spring/lag), so it stays perfectly reversible
// and frame-accurate to scroll position in both directions.
const EASE = Array(BREAKPOINTS.length - 1).fill(easeInOut)

function Card({ img, index, scrollYProgress, activeIndex }) {
  const config = useMemo(() => getCardTransforms(index), [index])

  const y = useTransform(scrollYProgress, config.input, config.yOutput, { ease: EASE })
  const scale = useTransform(scrollYProgress, config.input, config.scaleOutput, { ease: EASE })
  const opacity = useTransform(scrollYProgress, config.input, config.opacityOutput, { ease: EASE })

  // Dynamic stacking order: whichever card is currently active sits on
  // top; cards get pushed further back the further they are (in either
  // direction) from the active one. This must be recalculated as
  // activeIndex changes — a static "card 0 is always on top" rank would
  // put old, passed cards in front of the current one once they're
  // visible again (see getDepthState above).
  const zIndex = 50 - Math.abs(index - activeIndex)

  return (
    <motion.div
      className="stacked-card"
      style={{
        y,
        scale,
        opacity,
        zIndex,
        willChange: 'transform, opacity',
      }}
    >
      <div className="stacked-card-media">
        <img src={img.src} alt={img.alt} loading="eager" />
        <div className="stacked-card-overlay" />
        <div className="stacked-card-content">
          <span className="stacked-card-watermark">{img.number}</span>
          <h3 className="stacked-card-title">{img.title}</h3>
          <p className="stacked-card-description">{img.description}</p>
          <div className="stacked-card-counter">
            <span>{img.number}</span>
            <span className="counter-separator">&nbsp;&nbsp;//&nbsp;&nbsp;</span>
            <span>0{TOTAL}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Midpoint of the hold zone / each transition zone, used to flip the
// active label. Generalized version of the original hardcoded 0.5 / 0.83
// (which were the midpoints for a 3-card sequence).
const ACTIVE_THRESHOLDS = Array.from(
  { length: TOTAL - 1 },
  (_, i) => (i + 1.5) / TOTAL
)

export default function StackedScrollGallery() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Switch the active label at the midpoint of each transition zone
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = ACTIVE_THRESHOLDS.findIndex((t) => latest < t)
    setActiveIndex(next === -1 ? TOTAL - 1 : next)
  })

  return (
    <section ref={containerRef} className="stacked-scroll-section" id="showcase">
      <div className="stacked-scroll-sticky">
        <div className="container stacked-gallery-inner">
          <div className="stacked-gallery-header">
            <h2 className="section-title">What I Bring to Your Project</h2>
          </div>
          <div className="stacked-cards-container">
            {images.map((img, index) => (
              <Card
                key={img.id}
                img={img}
                index={index}
                scrollYProgress={scrollYProgress}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}